import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {Avatar, Badge, Chip, IconButton, Pagination, Slide, Stack, styled, Zoom} from "@mui/material";
import ModeIcon from '@mui/icons-material/Mode';
import SearchIcon from '@mui/icons-material/Search';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux/store";
import {useEffect, useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import {SearchType, SelectSearchProps} from "../../../interfaces/SeachBox";
import Fade from "@mui/material/Fade";
import {useNavigate} from "react-router-dom";
import {NewSearchBox} from "../ui/NewSearchBox";
import {DragHandleRounded, HighlightOffOutlined} from "@mui/icons-material";
import {setLoginModalIsOpened} from "../../../redux";
import {BOARD_LIST_URL, BOARD_WRITE_URL} from "../../../data/ApiUrl";

const actions = [
    { icon: <ModeIcon/>, name: '글쓰기' },
    { icon: <SearchIcon />, name: '검색' },
];

const CustomBox = styled(Box)`
    display: none;
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 1000;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const boardSearchType = {
    type:"board",
    url:"/boards/"
} as SearchType

export const boardSelectOptions = {
    types :[
        {value:"title", label:"제목"},
        {value:"content", label:"내용"},
    ]
    }

    const SearchboxWrapper = styled(Box)`
    position: fixed;
      display: flex;
      gap: 10px;
      flex-direction: column;
        justify-content: center;
        align-items: center;
    bottom: 40px;
    right: 100px;
    z-index: 1000;
      width: 350px;
      height:40px;
    `;



 export default function  BasicSpeedDial (props:{boardType:string,totalPages:number,currentPage:number,
     handlePaginationChange: (event: React.ChangeEvent<unknown>, value: number) => void}) {
    const isLogin = useSelector((state: RootState) => state.login.isLogin);
    const  dispatch = useAppDispatch();
    const [searchBoxIsOpened, setSearchBoxIsOpened] = useState(false);
    const [paginationIsOpened, setPaginationIsOpened] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
    if(!isLogin){
        actions.push({icon: <LoginIcon />, name: '로그인'})
    }
    }, []);
    const handleOpenSearchBox = () => {
        setSearchBoxIsOpened(!searchBoxIsOpened);
    }
    const handleOpenPagination = () => {
        setPaginationIsOpened(!paginationIsOpened);
    }

    const handleClick =(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e.currentTarget.dataset.id;
        if(id === "글쓰기"){
            if(isLogin){
                navigate(BOARD_WRITE_URL+`?type=${props.boardType}&request=add`);
            }else{
                alert("로그인이 필요한 서비스입니다.");
                dispatch(setLoginModalIsOpened(true));
            }
        }else if(id === "검색"){
            handleOpenSearchBox();
        }else if(id === "로그인"){
            dispatch(setLoginModalIsOpened(true));
        }
    }
    const handleNavigate =(searchType:string, searchKeyword: string)=> {
        navigate(BOARD_LIST_URL+`?searchType=${searchKeyword}&keyword=${searchType}&boardType=${props.boardType}`)
    }

    return (
        <CustomBox >
                <Slide in={searchBoxIsOpened} direction={"left"}>
                <SearchboxWrapper>
                    <Pagination count={props.totalPages} color="primary" size="small" onChange={props.handlePaginationChange} />
                    <IconButton sx={{
    position: "absolute",
    top: "-50%",
    right: "-10%",
    zIndex: 1000,}} onClick={handleOpenSearchBox}><HighlightOffOutlined/></IconButton>
                <NewSearchBox filterOptions={boardSelectOptions.types} useSearchOption={false} placeholder={"검색"}
                                             handleNavigate={handleNavigate}
                              direction={"up"} />
                </SearchboxWrapper>
                </Slide>
            <SpeedDial direction={"up"}
                ariaLabel="SpeedDial basic example"
                sx={{ }}
                icon={<DragHandleRounded />}
            >
                {actions.map((action) => (
                   <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        data-id={action.name}
                        onClick={handleClick}
                    />
                ))}
            </SpeedDial>
        </CustomBox>
    );
}