import Box from "@mui/material/Box";
import {
    Button,
    Card, Grow,
    IconButton,
    InputBase,
    ListItemButton,
    ListItemText,
    Paper,
    Slide,
    styled,
    Zoom
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {SearchOption} from "../../../interfaces/SeachBox";
import SearchBar from "@mkyy/mui-search-bar";
import Typography from "@mui/material/Typography";


const SearchOptionContainer = styled(Card)`
  position: absolute;
  ${(props: { direction: string }) => props.direction ===  'up' ? 'bottom: 100%' : 'top: 100%'};
  display: flex;
  width: 100%;
  flex-direction:     ${(props: { direction: string }) => props.direction ===  'up' ? 'column-reverse' : 'column'};
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 0px solid;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  grid-column-start: 1;
  grid-column-end: 4;
  z-index: 2;
`;


const SearchOptionTitle = styled(Box)`
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


const SearchOptionBody = styled(Box)`
  display: grid;
  overflow: hidden;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
  background-color: white;
  font-size: 12px;
`


const OptionRow = styled(Box)`
  display: flex;
  width: 100%;

  &:hover {
    background-color: rgba(216, 239, 246, 0.49);
    cursor: pointer;
    transition: 0.2s;
  }
`;

const OptionCell = styled(Box)`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  grid-template-columns: 40% 20% 20% 20%;
`;

const HistoryOptionCell = styled(Box)`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  grid-template-columns: 40% 20% 25% 20%;
`;

const BoldNameWrapper = styled(Box)`
  display: flex;
  font-weight: bold;
  color: black;
`

const ContentWrapper = styled(Box)`
  display: flex;
  color: gray;
  font-size: 12px;
`


const LatestRemoveButtonWrapper = styled(Box)`
  display: flex;
  color: #939393;
  padding: 15px 15px;
`

const NoDataWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #939393;
  padding: 10px 0px;
`


const SearchOptionTitleWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 14px;
  color: ${(props: { isselected: string }) => props.isselected==="true" ? "white" : "black"};
  font-weight: bold;
  padding: 8px 10px;
  background-color: ${(props: { isselected: string }) => props.isselected==="true" ? "cornflowerblue" : "lightgray"};

  &:hover {
    cursor: pointer;
    //cornflowerblue 보다 옅은 색으로 바꾸기
    background-color: rgb(216, 239, 246);
    transition: 0.2s;
  }


`

const customBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: "relative",
    justifyContent: 'center',
    width: "80px",
    backgroundColor: "rgb(234, 241, 248)",
    borderRadius: 0
    ,
    height: "100%",
    borderRight: '1px solid rgb(204, 204, 204)'
};

const searchFilterStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(0, 88, 202)',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgb(234, 241, 248)',
        transition: 'all 0.2s ease-in-out'
    }};

const searchFilterWrapperStyle = {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    width: '100%',
    height: '100%',
    border: "2px solid rgb(0, 157, 255)"
}

const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%'
}

interface SearchProps {
    placeholder: string
    direction: string

    filterOptions: { label: string, value: string }[]

    useSearchOption: boolean

    searchHistory?: SearchOption[];

    searchHistoryMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    removeSearchHistory?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    handleNavigate: (searchValue:string, selectValue:string) => void;


    autoCompleteUrl ?: string;

    autoCompleteHandler ?: (url:string,setData:({}:SearchOption[])=>void) => void;

}

const FilterContainer = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    ${(props: { direction: string }) => props.direction ===  'up' ? 'bottom: 120%' : 'top: 120%'};
    width: 100%;
    white-space: nowrap;
    background-color: white;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 0px 0px 5px 5px;
    z-index: 100;
`

const FilterOptionWrapper = styled(Typography)`
  &&{    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: rgb(0, 0, 0);
  }

    `;


export const NewSearchBox = (props: SearchProps) => {
    const [open, setOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<{label:string,value:string}>({label:props.filterOptions[0].label,value:props.filterOptions[0].value});
    const [searchValue, setSearchValue] = useState("");
    const [isselected, setIsselected] = useState<number>(0);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleOutsideClick = (event: MouseEvent) => {
        if (formRef.current && !formRef.current?.contains(event.target as Node)) {
            setIsFocused(false);
            setOpen(false)
        }
    };
    const [autoCompleteData, setAutoCompleteData] = useState<SearchOption[]>([]);
    const handleChangeIsSelected = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsselected(Number(e.currentTarget.attributes.getNamedItem("data-id")?.value));
    }, [isselected]);
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (searchValue === "") {
            setAutoCompleteData([]);
            return;
        } else if (searchValue.length > 0) {
            if (props.autoCompleteUrl) {
                const url = props.autoCompleteUrl.replace("{searchValue}", searchValue).replace("{selectValue}", selectedFilter.value);
                props.autoCompleteHandler?.(url, setAutoCompleteData);
            }
        }
    }, [searchValue, selectedFilter.value]);
    const handleFocus = useCallback(() => {
        setIsFocused(true);
        setOpen(false);
    }, [isFocused, open]);
    const handleOpen = useCallback(() => {
        setOpen(true);
        setIsFocused(false);
    }, [open, isFocused]);
    const handleOnchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, [searchValue]);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchValue === ""){
            return;
        }
        setIsFocused(false);
        props.handleNavigate(searchValue, selectedFilter.value);
    };
    return (
        <Box sx={containerStyle} ref={formRef}>
            <Paper
                component="form"
                sx={searchFilterWrapperStyle}
                onSubmit={handleSearch}
            >

                <Box sx={customBoxStyle}>
                            <Button style={searchFilterStyle} onClick={handleOpen}>
                                {selectedFilter.label}</Button>
                    <Grow in={open} mountOnEnter unmountOnExit>
                        <FilterContainer direction={props.direction}>
                        {props.filterOptions.map((option, index) => (
                           <ListItemButton key={index} sx={{width:"100%"}} onClick={() => {
                                 setSelectedFilter(option)
                                 setOpen(false);
                           }}>
                                 <FilterOptionWrapper>
                                        {option.label}
                                 </FilterOptionWrapper>
                            </ListItemButton>
                        ))}
                        </FilterContainer>
                    </Grow>
                </Box>
                <InputBase sx={{ml: 1, flex: 1,height:"100%"}} placeholder={props.placeholder} autoComplete={"off"} onFocus={handleFocus} value={searchValue} onChange={handleOnchange}/>
                <IconButton type="submit" aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
            {props.useSearchOption && (
                (<Fade in={isFocused} unmountOnExit={true}>
                    <SearchOptionContainer direction={props.direction}>
                        <SearchOptionTitle>
                            <SearchOptionTitleWrapper data-id={0} isselected={(isselected === 0).toString()}
                                                      onMouseDown={handleChangeIsSelected}>
                                최근 검색 기록
                            </SearchOptionTitleWrapper>
                            <SearchOptionTitleWrapper data-id={1} isselected={(isselected === 1).toString()}
                                                      onMouseDown={handleChangeIsSelected}>
                                빠른 검색
                            </SearchOptionTitleWrapper>
                        </SearchOptionTitle>
                        <SearchOptionBody>
                            {isselected === 0 ? props.searchHistory?.length !== 0 && props.searchHistory?.map((data, index: number) => {
                                    return (
                                        <Button key={index} sx={{padding: 0}}>
                                            <HistoryOptionCell data-id={data.id} data-title={data.title}
                                                               data-option={data.optionValue2}
                                                               onMouseDown={(e) => {
                                                                   props.searchHistoryMouseDown?.(e);
                                                                   setIsFocused(false);
                                                               }
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
                                                                       onMouseDown={props.removeSearchHistory}>
                                                <FontAwesomeIcon icon={faXmark} size={"lg"}/>
                                            </LatestRemoveButtonWrapper>
                                        </Button>
                                    )
                                }
                            ) : autoCompleteData.map((item: SearchOption, index: number) => {
                                    return (
                                        <ListItemButton key={index} sx={{padding: 0}}>
                                            <OptionCell data-id={item.id} data-title={item.title}
                                                        data-option={item.optionValue2}
                                                        onMouseDown={(e) => {
                                                            props.searchHistoryMouseDown?.(e);
                                                            setIsFocused(false);
                                                        }
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
                            {props.searchHistory?.length === 0 && isselected === 0 && <OptionRow>
                                <NoDataWrapper>
                                    검색 기록이 없습니다.
                                </NoDataWrapper>
                            </OptionRow>}
                            {autoCompleteData?.length === 0 && isselected === 1 && <OptionRow>
                                <NoDataWrapper>
                                    데이터가 존재하지 않습니다.
                                </NoDataWrapper>
                            </OptionRow>}
                        </SearchOptionBody>
                    </SearchOptionContainer>
                </Fade>)
            )}
        </Box>
    );
}