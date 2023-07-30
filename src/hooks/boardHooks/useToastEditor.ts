import { HookImageResponse } from '../../apis/board/postImage';

const useToastEditor = (setValues: any, watchValues: any) => {
  // TODO: 리액트 훅 사용 안하기 때문에 고려사항
  const onChange = (value: string) => {
    setValues.setBoardContent(value);
  };

  const hooksCallback = (data: HookImageResponse) => {
    setValues.setBoardFiles(watchValues.watchBoardFiles + data.fileId + ',');
  };

  return {
    onChange,
    hooksCallback,
  };
};

export default useToastEditor;
