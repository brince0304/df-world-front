import { useEffect } from 'react';
import { Editor } from '@toast-ui/editor';
import { boardToolbarItems } from '../../constants/myConstants';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import * as React from 'react';
import { useBoardService } from '../../context/boardServiceContext';

const ToastEditor = ({ onChange, hooksCallback, initialValue }: IToastEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { postImage } = useBoardService();
  useEffect(() => {
    const tuieditor = new Editor({
      el: ref.current as HTMLDivElement,
      height: '500px',
      useCommandShortcut: true,
      toolbarItems: boardToolbarItems,
      previewStyle: 'vertical',
      plugins: [colorSyntax],
      initialValue: initialValue,
      events: {
        change: () => {
          onChange(tuieditor.getMarkdown());
        },
      },
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          const data = await postImage(blob);
          if (data) {
            const hook = {
              url: process.env.REACT_APP_API_URL + `files/?name=${data.fileName}`,
              fileId: data.id,
            } as HookImageResponse;
            callback(hook.url, '대체 텍스트');
            hooksCallback(hook);
          }
        },
      },
    });

    return () => {
      tuieditor.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={ref} />;
};

interface IToastEditorProps {
  onChange: (...args: any[]) => void;
  initialValue?: string;
  hooksCallback: (...args: any[]) => void;
}

export interface HookImageResponse {
  url: string;
  fileId: number;
}

export default ToastEditor;
