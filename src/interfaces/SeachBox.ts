import React from 'react';

export interface SearchOption {
  id: string;
  title: string;
  content: string;
  footer: string;
  optionValue1: string | '';
  optionValue2: string | '';
  type: 'postSignUp' | 'character';
}


export interface SearchType {
    type: string;
    url: string;
}

export interface SelectSearchProps {
    selectOptions: { value: string; label: string; }[];
    useSearchOption: boolean;
    placeholder: string;
    searchOptions?: SearchOption[];
    setSearchOptions?: (data: any) => void;
    selectLoading: boolean;
    searchType: SearchType;
    handleNavigate: (url: string, type: string, searchValue:string, selectValue:string) => void;
    searchValue : string;
    selectValue : string;
    handleSearchValueChange : (query:string) => void;
    handleSelectValueChange : (e: any) => void;
    handleOptionMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    color ?: string;

    width ?: string;
    height ?: string;

    useAutoComplete ?: boolean;

    autoCompleteUrl ?: string;

    autoCompleteHandler ?: (url:string,setData:({}:SearchOption[])=>void) => void;

    handleOptionRemove?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

}
