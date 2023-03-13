import Select from 'react-select';
import React, {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import SearchBar from '@mkyy/mui-search-bar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";



interface SelectSearchProps {
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
}




const SearchSelectContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  height: 100%;
  width: 400px;
  position: absolute;
`


const searchBarStyle = {
    border: "2px solid #2684FF",
    borderRadius: "2px",
    borderBottomRightRadius: "0px",
    borderTopRightRadius: "0px",
    borderRight: "0px",
    borderRightStyle: "none",
}

const SearchOption = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 0px solid #2684FF;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  grid-column-start: 1;
  grid-column-end: 4;
  z-index: 2;
`;


const SearchOptionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(226, 226, 226);
  padding: 8px 10px;
  color: gray;
  font-size: 13px;
  border-bottom: 0.5px solid silver;
`;


const SearchOptionBody = styled.div`
  display: grid;
  overflow: hidden;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
  background-color: white;
  font-size: 12px;
`


const OptionRow = styled.div`
  display: flex;
  width: 100%;
  &:hover {
    background-color: rgba(216, 239, 246, 0.49);
    cursor: pointer;
    transition: 0.2s;
  }
`;

const OptionCell = styled.div`
  display: flex;
    flex-direction: row;
    align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
`;

const BoldNameWrapper = styled.div`
  display: flex;
  font-weight: bold;
`


const SearchBarWrapper = styled.div`
  display: flex;
  grid-column-start: 1;
  grid-column-end:3;
`

const SelectWrapper = styled.div`
  display: flex;
  grid-column-start: 3;
  grid-column-end: 4;
`;

const LatestRemoveButtonWrapper = styled.div`
  display: flex;
  color: #939393;
  padding: 15px 15px;
`

const NoDataWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #939393;
      padding: 10px 0px;
`



//셀렉트 박스와 검색창을 나란히 배치하는 styled div

interface SearchOption {
    id: string;
    title: string;
    content:string;
    footer: string;

    optionValue: string | "";
    type: "board" | "character";
}


interface SearchType {
    type: string;
    url: string;
}




const SearchBox = (props: SelectSearchProps)  => {
    const handleRemoveSearchOptions = (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        if(props.searchOptions){
        const targetId = e.currentTarget.attributes.getNamedItem("data-id")?.value;
        props.searchOptions.splice(props.searchOptions.findIndex((option) => option.id === targetId),1);
        }}
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const handleOnFocus = useCallback((e:React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
    }, [setIsFocused]);
    const handleOnBlur = useCallback((e:React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
    }, [setIsFocused]);
    const handleSearch = () => {
        if(props.searchValue ===""){
            return;
        }
        props.handleNavigate(props.searchType.url,props.searchType.type,props.searchValue,props.selectValue);
    };

    return (
            <SearchSelectContainer >
                <SearchBarWrapper onBlur={handleOnBlur} onFocus={handleOnFocus}>
                    <SearchBar style={searchBarStyle}
                               value={props.searchValue}
                               onChange={props.handleSearchValueChange}
                               onSearch={handleSearch}
                               placeholder={props.placeholder}

                    />
                </SearchBarWrapper>
                <SelectWrapper>
                    <Select
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: "2px solid #2684FF",
                                borderRadius: "3px",
                                borderLeftWidth: "1px",
                                borderLeftColor: "silver",
                                borderBottomLeftRadius: "0px",
                                borderTopLeftRadius: "0px",
                                backgroundColor: 'rgb(255, 255, 255)',
                                boxShadow: '0 !important',
                                width: "140px",
                                //no scrollbar
                                '&:hover': {},
                            }),

                        }
                        }
                        defaultValue={props.selectOptions[0]}
                        isLoading={props.selectLoading}
                        options={props.selectOptions}
                        onChange={props.handleSelectValueChange}
                    />
                </SelectWrapper>
                {props.useSearchOption && isFocused && (
                (<SearchOption>
                    <SearchOptionTitle>
                        최근 검색 기록
                    </SearchOptionTitle>
                    <SearchOptionBody>
                        {props.searchOptions?.length!==0 && props.searchOptions?.map((data, index: number) => {
                                return (
                                    <OptionRow key={index} >
                                        <OptionCell data-id={data.id}  data-title={data.title} data-option={data.optionValue}
                                             onMouseDown={props.handleOptionMouseDown}
                                             >
                                        <div>
                                            <BoldNameWrapper>
                                                {data.title}
                                            </BoldNameWrapper>
                                        </div>
                                        <div>
                                            {data.content}
                                        </div>
                                        <div>
                                            {data.footer}
                                        </div>
                                        </OptionCell>
                                        <LatestRemoveButtonWrapper data-id={data.id} onMouseDown={handleRemoveSearchOptions}>
                                                <FontAwesomeIcon icon={faXmark} size={"lg"}/>
                                        </LatestRemoveButtonWrapper>
                                    </OptionRow>
                                )
                            }
                        )}
                        {props.searchOptions?.length === 0 && <OptionRow>
                            <NoDataWrapper>
                                최근 검색 결과가 없습니다.
                            </NoDataWrapper>
                        </OptionRow>}
                    </SearchOptionBody>
                </SearchOption>)
                )}
            </SearchSelectContainer>
    )
}

export default SearchBox;



