import { HookImageResponse } from '../../components/ToastEditor/ToastEditor';
import useBoardForm from './useBoardForm';
import { useState } from 'react';

const useToastEditor = (useFormProps: ReturnType<typeof useBoardForm>) => {
  const [value, setValue] = useState<string>('');
  // TODO: 리액트 훅 사용 안하기 때문에 고려사항
  const onChange = (value: string) => {
    useFormProps.setValues.setBoardContent(value);
  };

  const hooksCallback = (data: HookImageResponse) => {
    console.info('hooksCallback', data);
    setValue(value + String(data.fileId));
    console.info('hooksCallback', value);
    console.info('hooksCallback', useFormProps.watchValues.watchBoardFiles);
  };

  return {
    onChange,
    hooksCallback,
  };
};

export default useToastEditor;
