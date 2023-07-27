import React from 'react';

interface Options {
  initialValue?: boolean;
  type?: 'boolean';
  label: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

type returnType = [boolean, (e: React.ChangeEvent<HTMLInputElement>) => void, string];

export function useCheckbox(options?: Options): returnType {
  const [value, setValue] = React.useState<boolean>(options?.initialValue || false);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValue(checked);
  }, []);

  return [value, onChange, options?.label || ''];
}
