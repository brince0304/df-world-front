import { HookImageResponse } from '../../components/ToastEditor/ToastEditor';

const useToastEditor = (setValues: any, watchValues: any) => {
  // TODO: 리액트 훅 사용 안하기 때문에 고려사항
  const onChange = (value: string) => {
    setValues.setBoardContent(value);
  };

  const hooksCallback = (data: HookImageResponse) => {
    console.info('hooksCallback', data);
    if(!watchValues.watchBoardFiles){
      setValues.setBoardFiles(String(data.fileId));
      return;
    }
    setValues.setBoardFiles(String(watchValues.watchBoardFiles)+','+String(data.fileId));
  };

  return {
    onChange,
    hooksCallback,
  };
};

export default useToastEditor;
