import {TableCustom} from "../ui/TableCustom";
import {useParams, useNavigate, useLocation, useNavigation} from "react-router";
import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {BoardListData} from "../../../interfaces/BoardListData";
import axios from "axios";
import styled from "styled-components";
import {faChevronRight, faComment, faExclamationTriangle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SpeedDial, {boardSelectOptions} from "./BoardSpeedDial";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import {
    Avatar,
    Chip,
    Container, Divider,
    Grid,
    IconButton, InputBase,
    ListItem,
    ListItemButton,
    Menu, MenuItem, Pagination, Paper, Select,
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
import {BoardSkeleton} from "../loading/BoardSkeleton";
import {getBoardCoundByHashtag} from "../../../api/board/getBoardCoundByHashtag";
import {NewSearchBox} from "../ui/NewSearchBox";
import BoardData from "../../../data/BoardData";
import {getServerName} from "../character/Characters";


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
  align-items: center;
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

const HashtagLoading = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "10px",
        }}>
            <Loading type="spin" color="white" height={20} width={20}/>
            <Typography fontFamily={"Core Sans"} fontSize={"15px"}>로딩중...</Typography>
        </Box>
    );
};


export const BestArticleNoDataWrapper = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "10px",
        }}>
            <Typography fontFamily={"Core Sans"} fontSize={"15px"}>인기 게시글이 없습니다.</Typography>
        </Box>
    );
};


const CharacterContent = (props: { characterName:string,serverId:string,characterImgUrl:string,adventureName:string }) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "2px",
        }}>
            <Avatar src={props.characterImgUrl} sx={{width: "100px", height: "100px"}}  variant="rounded"/>
            <Typography fontFamily={"Core Sans"} fontSize={"13px"}>{props.characterName}</Typography>
            <Typography fontFamily={"Core Sans"} fontSize={"12px"}>{props.adventureName}</Typography>
            <Typography fontFamily={"Core Sans"} fontSize={"12px"}>{getServerName(props.serverId)}</Typography>
        </Box>
    );
};

const HashtagContent = (props: { count: number }) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "5px",
        }}>
            <Typography fontFamily={"Core Sans"} fontSize={"12px"}>{props.count}개의 게시글이 등록되어있습니다.</Typography>
            <Typography fontFamily={"Core Sans"} fontSize={"12px"}>해당 게시글을 확인해보세요!</Typography>
        </Box>
    );
};


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
                        width: "130px"
                    },
                }}
            >
                {props.menuList.map((item) => (
                    <MenuItem key={item.type} selected={props.boardType === item.type} onClick={handleClose}
                              data-type={item.type}>
                        <Typography variant="inherit" noWrap fontFamily={"Core Sans"} fontWeight={"bold"}>
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

export const getSearchType = (type: string) => {
    switch (type) {
        case "title":
            return "제목";
        case "content":
            return "내용";
        case "hashtag":
            return "해시태그";
        case "characterName":
            return "캐릭터";
    }
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
    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 0;
    const handleChangePageByModal = (e: React.ChangeEvent<unknown>, newPage: number) => {
        navigate(BOARD_LIST_URL + `?boardType=${boardType}&page=${newPage - 1}&searchType=${searchType}&keyword=${keyword}`);
    };

    const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
        navigate(BOARD_LIST_URL + `?boardType=${boardType}&page=${newPage - 1}&searchType=${searchType}&keyword=${keyword}`);
    };


    const [hashtagContent, setHashtagContent] = useState<ReactNode>();
    const [isHashtagLoading, setIsHashtagLoading] = useState<boolean>(false);
    const [hashtagCountArray, setHashtagCountArray] = useState<{ name: string, count: number }[]>([]);

    const handleGetBoardCountByHashtagName = useCallback(async (e: React.MouseEvent) => {
        if (isHashtagLoading) {
            setIsHashtagLoading(false);
        }
        const name = e.currentTarget.getAttribute("data-tag");
        const hashtag = hashtagCountArray.find((item) => item.name === name);
        if (hashtag) {
            setIsHashtagLoading(false);
            setHashtagContent(<HashtagContent count={hashtag.count}/>);
            return;
        }
        if (name) {
            setIsHashtagLoading(true);
            getBoardCoundByHashtag(name).then((res) => {
                if (res.data) {
                    setIsHashtagLoading(false);
                    setHashtagCountArray([...hashtagCountArray, {name, count: res.data}]);
                    setHashtagContent(<HashtagContent count={res.data}/>);
                }
            }).catch((err) => {
                setIsHashtagLoading(false);
                setHashtagContent(<Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    gap: "5px",
                }}>
                    <Typography fontFamily={"Core Sans"} fontSize={"15px"}>정보를 불러올 수 없습니다.</Typography>
                </Box>);
            });
        }
    }, [hashtagCountArray, isHashtagLoading]);

    const handleNavigateToSearchResult = (searchType: string, searchKeyword: string) => {
        navigate(BOARD_LIST_URL + `?searchType=${searchKeyword}&keyword=${searchType}&boardType=${boardType}`);
    };


    const [bestArticleData, setBestArticleData] = useState<ContentFlowProps[]>([]);
    const handleTypeTagClick = (e: React.MouseEvent<HTMLElement>) => {
        const type = e.currentTarget.getAttribute("data-type")!;
        navigate(BOARD_LIST_URL + `?boardType=${type}`);
        e.stopPropagation();
    };
    const handleTagClick = (e: React.MouseEvent<HTMLElement>) => {
        const keyword = e.currentTarget.getAttribute("data-tag")!;
        navigate(BOARD_LIST_URL + `?boardType=${boardType}&searchType=hashtag&keyword=${keyword}`);
        e.stopPropagation();
    };
    const handleCharacterTagClick = (e: React.MouseEvent<HTMLElement>) => {
        const keyword = e.currentTarget.getAttribute("data-name")!;
        navigate(BOARD_LIST_URL + `?boardType=ALL&searchType=characterName&keyword=${keyword}`);
        e.stopPropagation();
    };
    const handleGetBoardList = (url: string) => {
        setIsLoading(true);
        getBoardList(url).then((res) => {
            setData(res.data.articles);
            setIsLoading(false);
        }).catch((e) => {
            setIsError(true);
            setIsLoading(false);
        });
    };
    useEffect(() => {
            handleGetBoardList(BOARD_LIST_URL + `?boardType=${boardType}&page=${page}&searchType=${searchType}&keyword=${keyword}`);
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
                    {!keyword && !searchType && <TableTitle>{getBoardType(boardType)}</TableTitle>}
                    {keyword && searchType && <TableTitle>{getBoardType(boardType)} - {getSearchType(searchType)} : {keyword}</TableTitle>}
                    <BoardCountWrapper>{data?.totalElements}개의 게시글</BoardCountWrapper>
                </TableTitleWrapper>
            } useMenu={false} isLoading={isLoading} useIcon={true}
                         icon={<LongMenu menuList={MenuListItem} boardType={boardType}/>}>
                <Box sx={{padding: "10px 10px 10px 10px"}}>
                    <ContentFlow data={bestArticleData} handleNavigate={handleBestArticleNavigate} chipColor={"default"}
                                 flowTitle={
                                     <BestArticleTitleComponent/>
                                 } noDataWrapper={<BestArticleNoDataWrapper/>}/>
                </Box>
                {isLoading && <BoardSkeleton/>}
                {!isLoading && data?.content?.map((item) => (
                        <ListItemButton key={item.id} onClick={() => navigate(`/boards/${item.id}`)}
                                        sx={{width: "100%", border: "0.2px solid #e0e0e0"}}>
                            <BoardContainer>
                                <BoardTagContainer>
                                    <Chip label={getBoardType(item.boardType)} color="info" clickable={true}
                                          sx={{fontSize: "10px", fontWeight: "bold"}} size="small"
                                          data-type={item.boardType} onClick={handleTypeTagClick}/>
                                    {item.hashtags.map((tag, index) => (
                                        <Tooltip key={index} title={isHashtagLoading ? <HashtagLoading/> : hashtagContent}
                                                 placement="top"
                                                 data-tag={tag}
                                                 onMouseOver={handleGetBoardCountByHashtagName}>
                                            <Chip label={"#" + tag} color="default" clickable={true}
                                                  sx={{fontSize: "10px", fontWeight: "bold"}} size="small" data-tag={tag}
                                                  onClick={handleTagClick}/>
                                        </Tooltip>
                                    ))}
                                    {item.character &&
                                        <Tooltip title={<CharacterContent characterName={item.character.characterName} serverId={item.character.serverId} characterImgUrl={item.character.characterImageUrl} adventureName={item.character.adventureName}/>} placement="top">
                                        <Chip avatar={<Avatar src={item.character?.characterImageUrl} sx={{
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
                                                             onClick={handleCharacterTagClick}/>
                                        </Tooltip>}
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
                    )
                )
                }
                {data?.content?.length === 0 && !isError && <ErrorScreen icon={faXmark} message={"게시글이 없습니다."}/>}
                {isError && <ErrorScreen icon={faExclamationTriangle} message={"게시글을 불러오는데 실패했습니다."}/>}
                {data && !isLoading &&
                    <Box sx={
                        {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "10px 10px 10px 10px",
                            flexDirection: "column",
                            gap: "10px",
                            '@media (max-width:1024px)':{
                                display: "none"
                            }
                        }}>
                        <Box>
                            <NewSearchBox placeholder={"검색"} direction={"up"} filterOptions={boardSelectOptions.types}
                                          useSearchOption={false} handleNavigate={handleNavigateToSearchResult}/>
                        </Box>
                        <Pagination count={data?.totalPages} page={page + 1} onChange={handleChangePage}/>
                    </Box>
                }
                <SpeedDial boardType={boardType} totalPages={data ? data.totalPages : 0}
                           currentPage={data ? data.number : 0}
                           handlePaginationChange={handleChangePageByModal}/>


            </TableCustom>


        </Container>
    );
};
export default Board;
