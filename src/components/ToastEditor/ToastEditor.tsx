import { useEffect } from 'react';
import { Editor } from '@toast-ui/editor';
import { boardToolbarItems } from '../../constants/myConstants';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import * as React from 'react';
import { useBoardService } from '../../context/boardServiceContext';
import useBoardForm from 'hooks/boardHooks/useBoardForm';

const ToastEditor = ({ useBoardForms }: IToastEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { setValues, watchValues } = useBoardForms;
  const boardService = useBoardService();
  if (!boardService) throw new Error('Cannot find BoardService');
  const { postImage } = boardService;
  useEffect(() => {
    let boardFiles: string[] = [];
    if (watchValues.watchBoardFiles && watchValues.watchBoardFiles.length > 0) {
      boardFiles = watchValues.watchBoardFiles.split(',').map((fileId) => fileId.trim());
    }
    const tuieditor = new Editor({
      el: ref.current as HTMLDivElement,
      height: '500px',
      useCommandShortcut: true,
      toolbarItems: boardToolbarItems,
      previewStyle: 'vertical',
      plugins: [colorSyntax],
      initialValue: watchValues.watchBoardContent,
      events: {
        change: () => {
          setValues.setBoardContent(tuieditor.getMarkdown());
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
            console.info(hook.fileId);
            boardFiles.push(String(hook.fileId));
            console.info(boardFiles);
            setValues.setBoardFiles(boardFiles.join(','));
            console.info(watchValues.watchBoardFiles);
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
  useBoardForms: ReturnType<typeof useBoardForm>;
}

export interface HookImageResponse {
  url: string;
  fileId: number;
}

export default ToastEditor;
