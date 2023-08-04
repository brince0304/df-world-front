import { useEffect } from 'react';
import { Editor } from '@toast-ui/editor';
import { boardToolbarItems } from '../../constants/myConstants';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { HookImageResponse, postImage } from '../../apis/board/postImage';
import * as React from 'react';

const ToastEditor = ({ onChange, hooksCallback, initialValue }: IToastEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
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
          const data = (await postImage(blob)) as HookImageResponse;
          if (data.url) {
            callback(data.url, '대체 텍스트');
            hooksCallback();
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

export default ToastEditor;
