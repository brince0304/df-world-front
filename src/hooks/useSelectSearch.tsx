import { useCallback, useState } from 'react';

type returnTypes = [string, string, (e: any) => void, (query: string) => void];


interface Options {
    initialSearchValue: string;
    initialSelectValue: string;
    placeholder: string;

}

const useSelectSearch = (Options?:Options) :returnTypes => {
    const [selectValue, setSelectValue] = useState<string>(Options?.initialSelectValue || "");
    const [searchValue, setSearchValue] = useState<string>(Options?.initialSearchValue || "");

    const handleSearchOnChange = useCallback((query: string) => {
        setSearchValue(query);
    }, [setSearchValue]);

    const handleSelectOnChange = useCallback((e: any) => {
        setSelectValue(e.value);
    }, [setSelectValue]);
    return [searchValue, selectValue, handleSearchOnChange, handleSelectOnChange];
}

export default useSelectSearch;