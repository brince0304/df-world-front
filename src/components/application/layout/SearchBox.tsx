import Select from 'react-select';
import React, {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import SearchBar from '@mkyy/mui-search-bar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {SearchOption, SelectSearchProps} from "../../../interfaces/SeachBox";
import {getCharactersAutoComplete} from "../../../api/character/getCharactersAutoComplete";
import {AutoCompleteCharacterData} from "../../../interfaces/AutoCompleteCharacterData";
import {Button, Card, Collapse, Grow, ListItemButton} from "@mui/material";
import Fade from "@mui/material/Fade";

interface SearchSelectContainerStyledProps {
    width?: string;
    height?: string;
}


const SearchSelectContainer = styled.form<SearchSelectContainerStyledProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`


// max width 200px
const SearchBarStyled = styled(SearchBar)`
  && {
    border: 2px solid ${(props: SearchOptionContainerStyledProps) => props.color ? props.color : "rgb(226, 226, 226)"};
    border-radius: 2px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    border-right: 0px;
    border-right-style: none;
    width: 100%;
  }
`;


interface SearchOptionContainerStyledProps {
    color?: string;
}

const SearchOptionContainer = styled(Card)`
  position: absolute;
  top:100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 0px solid;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  grid-column-start: 1;
  grid-column-end: 4;
  z-index: 2;
`;


const SearchOptionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(226, 226, 226);
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
  display: grid;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  grid-template-columns: 40% 20% 20% 20%;
`;

const HistoryOptionCell = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  grid-template-columns: 40% 20% 25% 20%;
`;

const BoldNameWrapper = styled.div`
  display: flex;
  font-weight: bold;
  color: black;
`

const ContentWrapper = styled.div`
    display: flex;
    color : gray;
       font-size: 12px;
`


const SearchBarWrapper = styled.div<SearchSelectContainerStyledProps>`
  display: flex;
  grid-column-start: 1;
  grid-column-end: 3;
  width: ${(props) => props.width ? props.width : "100%"};
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




const SearchOptionTitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 14px;
    color: ${(props:{isSelected:boolean}) => props.isSelected ? "white" : "black"};
  font-weight: bold;
  padding: 8px 10px;
  background-color: ${(props:{isSelected:boolean}) => props.isSelected ? "cornflowerblue" : "lightgray"};
    &:hover {
        cursor: pointer;
      //cornflowerblue 보다 옅은 색으로 바꾸기
        background-color:  rgb(216, 239, 246);
        transition: 0.2s;
    }
  

`



const SearchBox = (props: SelectSearchProps) => {
    const [isSelected, setIsSelected] = useState<number>(0);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleOutsideClick = (event: MouseEvent) => {
        if (formRef.current && !formRef.current?.contains(event.target as Node)) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    const handleSearch = () => {
        if (props.searchValue === "") {
            return;
        }
        setIsFocused(false);
        props.handleNavigate(props.searchType.url, props.searchType.type, props.searchValue, props.selectValue);
    };
    const [autoCompleteData, setAutoCompleteData] = useState<SearchOption[]>([]);
    useEffect(() => {
        if (props.searchValue === "") {
            setAutoCompleteData([]);
            return;
        } else if (props.searchValue.length > 0) {
            if (props.autoCompleteUrl) {
                const url = props.autoCompleteUrl.replace("{searchValue}", props.searchValue).replace("{selectValue}", props.selectValue);
                props.autoCompleteHandler?.(url, setAutoCompleteData);
            }
        }

    }, [props.searchValue, props.selectValue]);
  const handleChangeIsSelected = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsSelected(Number(e.currentTarget.attributes.getNamedItem("data-id")?.value));
    }, [isSelected]);

    return (
        <SearchSelectContainer ref={formRef} width={props.width} height={props.height}>
            <SearchBarWrapper onFocus={(e)=>setIsFocused(true)} width={props.width}>
                <SearchBarStyled
                    value={props.searchValue} color={props.color}
                    onChange={props.handleSearchValueChange}
                    onSearch={handleSearch}
                    placeholder={props.placeholder}
                />
            </SearchBarWrapper>
            <SelectWrapper onMouseDown={(e)=>setIsFocused(false)}>
                <Select
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            border: "2px solid " + (props.color ? props.color : "rgb(226, 226, 226)"),
                            borderRadius: "3px",
                            borderLeftWidth: "1px",
                            borderLeftColor: "silver",
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                            backgroundColor: 'rgb(255, 255, 255)',
                            boxShadow: '0 !important',
                            width: "120px",
                            //no scrollbar
                            '&:hover': {},
                            '@media (max-width: 768px)': {
                                width: "147px",
                            }
                        }),

                    }
                    }
                    defaultValue={props.selectOptions[0]}
                    isLoading={props.selectLoading}
                    options={props.selectOptions}
                    onChange={(e)=> {
                       if(props.searchValue !== ""){
                           props.handleSelectValueChange(e);
                           setIsFocused(true);
                       }
                    }}
                />
            </SelectWrapper>
            {props.useSearchOption && (
                (<Fade in={isFocused} unmountOnExit={true}>
                    <SearchOptionContainer color={props.color} >
                    <SearchOptionTitle>
                        <SearchOptionTitleWrapper data-id={0}  isSelected={isSelected===0} onMouseDown={handleChangeIsSelected}>
                            최근 검색 기록
                        </SearchOptionTitleWrapper>
                        <SearchOptionTitleWrapper data-id={1} isSelected={isSelected===1} onMouseDown={handleChangeIsSelected}>
                            빠른 검색
                        </SearchOptionTitleWrapper>
                    </SearchOptionTitle>
                    <SearchOptionBody>
                        {isSelected===0 ? props.searchOptions?.length!==0 && props.searchOptions?.map((data, index: number) => {
                                return (
                                    <Button key={index} sx={{padding:0}}>
                                        <HistoryOptionCell data-id={data.id} data-title={data.title} data-option={data.optionValue2}
                                                    onMouseDown={(e)=>{
                                                        props.handleOptionMouseDown?.(e);
                                                        setIsFocused(false);}
                                                    }
                                        >
                                                <BoldNameWrapper>
                                                    {data.title}
                                                </BoldNameWrapper>
                                            <ContentWrapper>
                                                {data.content}
                                            </ContentWrapper>
                                            <ContentWrapper>
                                                {data.footer}
                                            </ContentWrapper>
                                            {data.optionValue1 && <ContentWrapper>
                                                {data.optionValue1}
                                            </ContentWrapper>}
                                        </HistoryOptionCell>
                                        <LatestRemoveButtonWrapper data-id={data.id}
                                                                   onMouseDown={props.handleOptionRemove}>
                                            <FontAwesomeIcon icon={faXmark} size={"lg"}/>
                                        </LatestRemoveButtonWrapper>
                                    </Button>
                                )
                            }
                        ) :  autoCompleteData.map((item: SearchOption, index: number) => {
                                return (
                                    <ListItemButton key={index} sx={{padding:0}}>
                                        <OptionCell data-id={item.id} data-title={item.title} data-option={item.optionValue2}
                                                    onMouseDown={(e)=>{
                                                        props.handleOptionMouseDown?.(e);
                                                        setIsFocused(false);}
                                                    }
                                        >
                                                <BoldNameWrapper>
                                                    {item.title}
                                                </BoldNameWrapper>
                                            <ContentWrapper>
                                                {item.content}
                                            </ContentWrapper>
                                            <ContentWrapper>
                                                {item.footer}
                                            </ContentWrapper>
                                            {item.optionValue1 && <ContentWrapper>
                                                {item.optionValue1}
                                            </ContentWrapper>}
                                        </OptionCell>
                                    </ListItemButton>
                                )
                            }
                        )}
                        {props.searchOptions?.length === 0 && isSelected===0 && <OptionRow>
                            <NoDataWrapper>
                                검색 기록이 없습니다.
                            </NoDataWrapper>
                        </OptionRow>}
                        {autoCompleteData?.length === 0 && isSelected===1 && <OptionRow>
                            <NoDataWrapper>
                                데이터가 존재하지 않습니다.
                            </NoDataWrapper>
                        </OptionRow>}
                    </SearchOptionBody>
                </SearchOptionContainer>
                </Fade>)
            )}
        </SearchSelectContainer>
    )
}

export default SearchBox;



