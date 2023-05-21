import Box from "@mui/material/Box";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useCallback, useEffect} from "react";
import {setLoginModalOpened} from "../../../redux";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faComment, faEye, faHeart, faXmark, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import {
    Avatar,
    Button, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItemButton,
    ListItemText, Pagination,
    styled, ToggleButton, ToggleButtonGroup, Tooltip, TooltipProps
} from "@mui/material";
import {useState} from "react";
import {getMyActivities} from "../../../api/myPage/getMyActivities";
import {BoardActivitiesJson} from "../../../interfaces/BoardActivitiesJson";
import {CommentActivitiesJson} from "../../../interfaces/CommentActivitiesJson";
import {NotificationActivities} from "../../../interfaces/NotificationActivities";
import Typography from "@mui/material/Typography";
import {getBoardType} from "../board/Board";
import {useNavigate} from "react-router-dom";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const style = {
    display: "flex" as "flex",
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    position: "absolute" as "absolute",
    overflow: "scroll" as "scroll",
    scrollBehavior: "smooth" as "smooth",
    //스크롤바 숨기기
    "&::-webkit-scrollbar": {
        display: "none",
    },
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //props width
    width: "auto",
    height: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
};


export const ModalHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  color: #000;
`;

const ModalBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    width: 400px;
    height: 600px;
    position: relative;
  }
`;


export const CloseButtonWrapper = styled(Box)`
  //우측 끝에 배치
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  font-size: 25px;
  margin-left: auto;
  margin-right: 15px;
  top: 0px;
  color: silver;
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: #282c34;
    transition: 0.3s;
  }
`;


export const ModalBody = styled(Box)`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

interface ActivitiesModalProps {
    activitiesModalOpened: boolean,
    handleClose: () => void
}


const BoardList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const ActivitiesModalBoardTemplate = (props: { data: BoardActivitiesJson }) => {
    const navigate = useNavigate();
    const handleNavigateToBoard = useCallback((boardId: number) => {
        navigate(`/boards/${boardId}`);
    }, []);
    return (
        <BoardList>
            {props.data.content.map((item, index) => {
                return (
                    <ListItemButton key={index}
                                    onClick={() => handleNavigateToBoard(item.id)}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "5px"
                            }}>
                                <Chip label={getBoardType(item.boardType)} sx={{
                                    height: "1rem", fontSize: 10,
                                    fontWeight: 700,
                                    borderRadius: 1,
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                }} size={"small"}
                                      color={"primary"}/>
                                {item.character && <Chip avatar={
                                    <Avatar src={item.character.characterImageUrl} sx={{
                                        backgroundColor: "white",
                                    }}/>
                                } label={item.character.characterName} sx={{
                                    height: "1rem", fontSize: 10,
                                    fontWeight: 700,
                                    borderRadius: 1,
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                    "& .MuiChip-avatar": {
                                        width: "0.7rem",
                                        height: "0.7rem",
                                        "> img": {
                                            scale: "3"
                                        }
                                    }
                                }} size={"small"}
                                />}
                                <Chip icon={<FontAwesomeIcon icon={faHeart}
                                                             style={{width: "0.75rem", height: "0.75rem"}}
                                />}
                                      variant={"outlined"}
                                      label={item.boardLikeCount} sx={{
                                    height: "1rem", fontSize: 10,
                                    fontWeight: 700,
                                    borderRadius: 1,
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                }} size={"small"}/>
                                <Chip icon={<FontAwesomeIcon icon={faComment}
                                                             style={{width: "0.7rem", height: "0.7rem"}}
                                />}
                                      variant={"outlined"}
                                      label={item.commentCount} sx={{
                                    height: "1rem", fontSize: 10,
                                    fontWeight: 700,
                                    borderRadius: 1,
                                    paddingLeft: "0",
                                    paddingRight: "0",
                                }} size={"small"}/>
                                <Chip label={item.createdAt}
                                      variant={"outlined"}
                                      sx={{
                                          height: "1rem", fontSize: 10,
                                          fontWeight: 700,
                                          borderRadius: 1,
                                          paddingLeft: "0",
                                          paddingRight: "0",
                                      }} size={"small"}/>
                            </Box>
                            <Typography variant="h6" component="span"
                                        fontFamily={"Core Sans"}
                                        sx={{
                                            fontSize: 14, fontWeight: 400, color: "#000", display: "inline-block",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            width: "320px"
                                        }}>
                                {item.boardTitle}
                            </Typography>
                        </Box>
                    </ListItemButton>
                );
            })}
        </BoardList>
    );
};

interface IToogleButtonGroup {
    value: string,
        icon: IconDefinition,
    tooltipTitle: string,
    tooltipPlacement: TooltipProps['placement']
}


const ToggleButtonGroupComponent = (

    props:{
        sortBy: string,
        handleChangeSortBy: (event: React.MouseEvent<HTMLElement>, newAlignment: "" | "like" | "commentCount" | "view") => void,
        groups : IToogleButtonGroup[]
    }

) => {
    return (
        <ToggleButtonGroup
            size="small"
            value={props.sortBy}
            exclusive
            onChange={props.handleChangeSortBy}
            aria-label="text alignment"
        >
            {props.groups.map((group, index) => {
            return(<Tooltip title={group.tooltipTitle} placement={group.tooltipPlacement}
                                key={index}
            >
                <ToggleButton value={group.value}
                              disabled={props.sortBy === group.value}
                              selected={props.sortBy === group.value}
                >
                    <FontAwesomeIcon icon={group.icon} />
                </ToggleButton>
            </Tooltip>)
            })}
        </ToggleButtonGroup>
    )
}

export default function ActivitiesModal(props: ActivitiesModalProps) {
    const [isSortBy, setIsSortBy] = useState<"commentCount" | "like" | "view" | "">("");
    const userDetail = useSelector((state: RootState) => state.auth.userDetail);
    const [category, setCategory] = useState<"board" | "comment" | "notification">("board");
    const [sortBy, setSortBy] = useState<"commentCount" | "like" | "view" | "">("");
    const [page, setPage] = useState<number>(0);
    const [boardActivities, setBoardActivities] = useState<BoardActivitiesJson>({} as BoardActivitiesJson);
    const [commentActivities, setCommentActivities] = useState<CommentActivitiesJson>({} as CommentActivitiesJson);
    const [notificationActivities, setNotificationActivities] = useState<NotificationActivities>({} as NotificationActivities);

    const handleSetBoardActivities = useCallback((data: BoardActivitiesJson) => {
        setBoardActivities(data);
    }, [boardActivities]);

    const handleSetCommentActivities = useCallback((data: CommentActivitiesJson) => {
        setCommentActivities(data);
    }, [commentActivities]);

    const handleSetNotificationActivities = useCallback((data: NotificationActivities) => {
        setNotificationActivities(data);
    }, [notificationActivities]);

    const handleChangeSortBy = useCallback((event: React.MouseEvent<HTMLElement,MouseEvent>,value: "" | "view" | "like" | "commentCount") => {
        setSortBy(value);
        setPage(0);
    }, [sortBy]);
    useEffect(() => {
        getMyActivities(category, sortBy, page).then((res) => {
            switch (category) {
                case "board":
                    setBoardActivities(res.data);
                    break;
                case "comment":
                    setCommentActivities(res.data);
                    break;
                case "notification":
                    setNotificationActivities(res.data);
                    break;
                default:
                    break;
            }
        });
    }, [category, sortBy, page]);


    const boardToggleButtonGroups: IToogleButtonGroup[] =
        [
        {
            value: "",
            icon: faClock,
            tooltipTitle: "최신순",
            tooltipPlacement: "top",
        },
        {
            value: "view",
            icon: faEye,
            tooltipTitle: "조회순",
            tooltipPlacement: "top",
        },
        {
            value: "like",
            icon: faHeart,
            tooltipTitle: "좋아요순",
            tooltipPlacement: "top",
        },
        {
            value: "commentCount",
            icon: faComment,
            tooltipTitle: "댓글순",
            tooltipPlacement: "top",
        },
    ]


    return (
        <Dialog
            sx={{
                "& .MuiDialog-paper": {
                    width: "400px",
                    height: "550px",
                    display: "flex",
                }
            }}
            open={props.activitiesModalOpened}
            onClose={props.handleClose}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid #e0e0e0",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Typography variant="h6" component="h6" sx={{fontSize: 18, fontWeight: 700, color: "#000"}}
                            fontFamily="Core Sans"
                >
                    활동 내역
                </Typography>
                <Box sx={
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",

                    }
                }>
                    <Button>
                        게시글
                    </Button>
                    <Button>
                        닫기
                    </Button>
                </Box>

            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                }}>
                {category === "board" && boardActivities.content &&
                    <ActivitiesModalBoardTemplate data={boardActivities}/>}
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    borderTop: "0px solid #e0e0e0",
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                }}
            >

                {category === "board" &&
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <ToggleButtonGroupComponent sortBy={sortBy} handleChangeSortBy={handleChangeSortBy} groups={boardToggleButtonGroups}/>
                    <Pagination count={boardActivities.totalPages} page={page + 1} onChange={(e, page) => {
                        setPage(page - 1);
                    }}/>
                    </Box>
                }
            </DialogActions>
        </Dialog>
    );
}