import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import {Checkbox, FormControlLabel} from "@mui/material";

interface Options {
    initialValue?: string;
    type?: 'string';
    //검증용 정규표현식
    regex?: RegExp;
    errorMessage?: string;
    placeholder?: string;
}


type returnType = [string, (e: React.ChangeEvent<HTMLInputElement>) => void, boolean, string, string];


export function useInput(options?: Options): returnType {
    const {
        initialValue,
        type = 'string',
        regex,
        errorMessage,
        placeholder,
            } = options || {};
    const [value, setValue] = useState<string>(initialValue || '');
    const isValid = useRef<boolean>(true);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (type === 'string') {
            setValue(value);
        }
        if (regex && value.length > 0) {
            isValid.current = regex.test(value);
        }
        if(value.length === 0){
            isValid.current = false;
        }
    }, [type, regex]);
    return [value, onChange, isValid.current, errorMessage || '', placeholder || ''];
}