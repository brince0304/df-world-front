import {TableCustom} from "../ui/TableCustom";
import {useParams, useNavigate, useLocation, useNavigation} from "react-router";
import React, {ReactNode, useEffect, useState} from "react";
import {BoardListData} from "../../../interfaces/BoardListData";
import axios from "axios";
import styled from "styled-components";
import {faChevronRight, faComment, faExclamationTriangle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SpeedDial from "./BoardSpeedDial";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import {
    Avatar,
    Chip,
    Container, Divider,
    Grid,
    IconButton, InputBase,
    ListItem,
    ListItemButton,
    Menu, MenuItem, Paper, Select,
    Skeleton, TextField,
    Tooltip
} from "@mui/material";
import {ContentFlow, ContentFlowProps} from "../ui/ContentFlow";
import {ContentFlowData} from "../../../interfaces/ContentFlowData";
import StarIcon from "@mui/icons-material/Star";
import {getBestArticles} from "../../../api/board/getBestArticles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    AllInbox, Announcement,
    ChatBubbleOutlined, ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined, FreeBreakfast, LocalMall,
    MonitorHeart, QuestionAnswer,
    RemoveRedEyeOutlined, Work
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loading from "react-loading";
import {ErrorScreen} from "../ui/ErrorScreen";
import SearchIcon from "@mui/icons-material/Search";
import {BOARD_BEST_ARTICLE_URL, BOARD_DETAIL_URL, BOARD_LIST_URL} from "../../../data/ApiUrl";
import {getBoardList} from "../../../api/board/getBoardList";
import {useAppDispatch} from "../../../redux/store";




export function getBoardType(p: string | undefined) {
    switch (p) {
        case "FREE":
            return "자유게시판";
        case "NOTICE":
            return "공지사항";
        case "MARKET":
            return "거래";
        case "QUESTION":
            return "질문/답변";
        case "REPORT":
            return "사건/사고";
        case "RECRUITMENT":
            return "구인/홍보";
        case "ALL":
            return "전체";
        default:
            return "전체";
    }
}


const BoardBody = (props: BoardListData) => {
    return (
        props.content.map((data, index: number) => {
            }
        )
    );
};

const SelectOptions = [
    {value: "title", label: "제목"},
    {value: "content", label: "내용"},
];

export const BestArticleTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const BoardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

`;

const BoardTitleWrapper = styled(Typography)`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
  padding-top: 5px;
`;

const BoardTagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
`;


const BoardAuthorWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
  padding-top: 12px;
`;

const BoardCommentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  padding-top: 5px;

`;


const BoardIconWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
  font-size: 12px;
  color: #000;
`;

const BoardIconValues = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: bold;
  }
`;

const BoardCreatedAtWrapper = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #000;
  justify-content: flex-end;
`;

const ITEM_HEIGHT = 48;

const TableTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
`;

const TableTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: bold;
    font-family: 'Core Sans';
  }
`;

const BoardCountWrapper = styled(Typography)`
  && {
    font-size: 14px;
    color: gray;
    align-self: flex-end;
    font-family: 'Core Sans';
  }
`;


export const LongMenu = (props: { menuList: MenuItem[], boardType: string }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let navigation = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        const type = e.currentTarget.getAttribute("data-type");
        if (type) {
            navigation(`/boards/?boardType=${type}`);
        }
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {props.menuList.map((item) => (
                    <MenuItem key={item.type} selected={props.boardType === item.type} onClick={handleClose}
                              data-type={item.type}>
                        {item.icon}
                        <Typography variant="inherit" noWrap>
                            {item.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

interface MenuItem {
    type: string;
    icon: ReactNode;
    label: string;
}

const MenuListItem = [
    {type: "ALL", icon: <AllInbox/>, label: "전체"},
    {type: "MARKET", icon: <LocalMall/>, label: "거래"},
    {type: "QUESTION", icon: <QuestionAnswer/>, label: "질문/답변"},
    {type: "RECRUITMENT", icon: <Work/>, label: "구인/홍보"},
    {type: "FREE", icon: <FreeBreakfast/>, label: "자유"},
    {type: "NOTICE", icon: <Announcement/>, label: "공지사항"},
];

export const BestArticleTitleComponent = () => {
    return (
        <BestArticleTitle><StarIcon/>인기글</BestArticleTitle>
    );
};


const Board = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<BoardListData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const searchType = searchParams.get("searchType")?.toString() || "";
    const keyword = searchParams.get("keyword")?.toString() || "";
    const boardType = searchParams.get("boardType")?.toString() || "ALL";
    const page = searchParams.get("page")?.toString() || "0";
    const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
        navigate(BOARD_LIST_URL + `?boardType=${boardType}&page=${newPage}&searchType=${searchType}&keyword=${keyword}`);
    };

    const [bestArticleData, setBestArticleData] = useState<ContentFlowProps[]>([]);
    const handleTypeTagClick = (e: React.MouseEvent<HTMLElement>) => {
        const type = e.currentTarget.getAttribute("data-type")!;
        navigate(BOARD_LIST_URL + `?boardType=${type}`);
    };
    const handleTagClick = (e: React.MouseEvent<HTMLElement>) => {
        const keyword = e.currentTarget.getAttribute("data-tag")!;
        navigate(BOARD_LIST_URL + `?boardType=${boardType}&searchType=hashtag&keyword=${keyword}`);
    };
    const handleCharacterTagClick = (e: React.MouseEvent<HTMLElement>) => {
        const keyword = e.currentTarget.getAttribute("data-name")!;
        navigate(BOARD_LIST_URL + `?boardType=${boardType}&searchType=character&keyword=${keyword}`);
    };
    useEffect(() => {
            dispatch(getBoardList(setIsError, BOARD_LIST_URL + `?boardType=${boardType}&page=${page}&searchType=${searchType}&keyword=${keyword}`, setData));
            getBestArticles(BOARD_BEST_ARTICLE_URL + `${boardType}`, BOARD_LIST_URL, setBestArticleData);
        }
        , [boardType, page, searchType, keyword]);
    const handleBestArticleNavigate = (id: number) => {
        navigate(BOARD_DETAIL_URL + `${id}`);
    };
    return (
        <Container maxWidth="md">

            <TableCustom title={
                <TableTitleWrapper>
                    <TableTitle>{getBoardType(boardType)}</TableTitle>
                    <BoardCountWrapper>{data?.totalElements}개의 게시글</BoardCountWrapper>
                </TableTitleWrapper>
            } useMenu={false} isLoading={isLoading} useIcon={true}
                         icon={<LongMenu menuList={MenuListItem} boardType={boardType}/>}>
                <Box sx={{padding:"0px 10px 10px 10px"}}>
                <ContentFlow data={bestArticleData} handleNavigate={handleBestArticleNavigate} chipColor={"default"} flowTitle={
                    <BestArticleTitleComponent/>
                }/>
                </Box>
                {!isLoading && data?.content?.map((item) => (
                    <ListItemButton key={item.id} onClick={() => navigate(`/boards/${item.id}`)}
                                    sx={{width: "100%", border: "0.2px solid #e0e0e0"}}>
                        <BoardContainer>
                            <BoardTagContainer>
                                <Chip label={getBoardType(item.boardType)} color="info" clickable={true}
                                      sx={{fontSize: "10px", fontWeight: "bold"}} size="small"
                                      data-type={item.boardType} onClick={handleTypeTagClick}/>
                                {item.hashtags.map((tag) => (
                                    <Tooltip title={tag} placement="top">
                                        <Chip label={"#" + tag} color="default" clickable={true}
                                              sx={{fontSize: "10px", fontWeight: "bold"}} size="small" data-tag={tag}
                                              onClick={handleTagClick}/>
                                    </Tooltip>
                                ))}
                                {item.character && <Chip avatar={<Avatar src={item.character?.characterImageUrl} sx={{
                                    fontSize: "10px",
                                    "& > img": {
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        height: "500%",
                                        width: "1300%",
                                        backgroundColor: "#c4c4c4",
                                    }
                                }}></Avatar>} label={item.character?.characterName} color="default" clickable={true}
                                                         sx={{fontSize: "10px", fontWeight: "bold"}} size="small"
                                                         data-name={item.character.characterName}
                                                         onClick={handleCharacterTagClick}/>}
                            </BoardTagContainer>
                            <BoardTitleWrapper>{item.boardTitle}</BoardTitleWrapper>
                            <BoardAuthorWrapper>
                                <Avatar src={item.userProfileImgUrl} sx={{width: 24, height: 24, bgcolor: "#c4c4c4"}}/>
                                <Typography sx={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    fontFamily: "Core Sans"
                                }}>{item.userNickname}</Typography>
                            </BoardAuthorWrapper>
                            <BoardCommentContainer>
                                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <BoardIconWrapper>
                                        <FavoriteBorderOutlined sx={{fontSize: "14px"}}/>
                                        <BoardIconValues>{item.boardLikeCount}</BoardIconValues>
                                    </BoardIconWrapper>
                                    <BoardIconWrapper>
                                        <ChatBubbleOutlineOutlined sx={{fontSize: "14px"}}/>
                                        <BoardIconValues>{item.commentCount}</BoardIconValues>
                                    </BoardIconWrapper>
                                    <BoardIconWrapper>
                                        <RemoveRedEyeOutlined sx={{fontSize: "14px"}}/>
                                        <BoardIconValues>{item.boardViewCount}</BoardIconValues>
                                    </BoardIconWrapper>
                                </div>
                                <BoardCreatedAtWrapper>
                                    <Typography
                                        sx={{fontSize: "12px", fontFamily: "Core Sans"}}>{item.createdAt}</Typography>
                                </BoardCreatedAtWrapper>
                            </BoardCommentContainer>
                        </BoardContainer>
                    </ListItemButton>
                ))
                }
                {data?.content?.length === 0 && !isError && <ErrorScreen icon={faXmark} message={"게시글이 없습니다."}/>}
                {isError && <ErrorScreen icon={faExclamationTriangle} message={"게시글을 불러오는데 실패했습니다."}/>}
                <SpeedDial boardType={boardType} totalPages={data ? data.totalPages : 0}
                           currentPage={data ? data.number : 0}
                           handlePaginationChange={handleChangePage}/>


            </TableCustom>


        </Container>
    );
};
export default Board;
