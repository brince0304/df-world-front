import * as React from 'react';
import { useCallback, useRef, useState } from 'react';

interface Options {
  initialValue?: string;
  type?: 'string';
  //검증용 정규표현식
  regex?: RegExp;
  errorMessage?: string;
  placeholder?: string;
}

type returnType = [string, (e: React.ChangeEvent<HTMLInputElement>) => void, boolean, string, string, boolean];

export function useInput(options?: Options): returnType {
  const { initialValue, type = 'string', regex, errorMessage, placeholder } = options || {};
  const [value, setValue] = useState<string>(initialValue || '');
  const isValid = useRef<boolean>(true);
  const isValidFinal = useRef<boolean>(true);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValue(value);
      if (regex) {
        isValid.current = regex.test(value);
      }
      if (value === '') {
        if (regex) {
          isValidFinal.current = false;
          isValid.current = true;
        }
      }
    },
    [type, regex],
  );
  return [value, onChange, isValid.current, errorMessage || '', placeholder || '', isValidFinal.current];
}
