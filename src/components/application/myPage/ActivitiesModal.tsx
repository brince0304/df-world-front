import Box from "@mui/material/Box";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useCallback, useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBell,
    faClock,
    faComment, faEllipsisV,
    faEye,
    faHeart,
    faList,
    faXmark,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {
    Avatar,
    Button, Card, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Grow,
    IconButton,
    List,
    ListItemButton, Menu, MenuItem, Pagination, Popper,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";


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

interface ITypeMenu {
    type: string,
    setType: (type: string) => void,
    label: string,
    icon: IconProp

}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
`;


const SquareChip = styled(Chip)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 1rem;
  font-size: 10px;
  font-weight: 700;
  border-radius: 5px;
  padding-left: 0;
  padding-right: 0;
`;

const TitleHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
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
                            <TitleHeader>
                                <SquareChip label={getBoardType(item.boardType)} size={"small"}
                                            color={"primary"}/>
                                {item.character && <SquareChip avatar={
                                    <Avatar src={item.character.characterImageUrl} sx={{
                                        backgroundColor: "white",
                                    }}/>
                                } label={item.character.characterName} sx={{
                                    "& .MuiChip-avatar": {
                                        width: "0.7rem",
                                        height: "0.7rem",
                                        "> img": {
                                            scale: "3"
                                        }
                                    }
                                }} size={"small"}
                                />}
                                <SquareChip icon={<FontAwesomeIcon icon={faHeart}
                                                                   style={{width: "0.7rem", height: "0.7rem", paddingLeft:"3px"}}/>}
                                            variant={"outlined"}
                                            label={item.boardLikeCount} size={"small"}/>
                                <SquareChip icon={<FontAwesomeIcon icon={faComment}
                                                                   style={{width: "0.7rem", height: "0.7rem", paddingLeft:"3px"}}/>}
                                            variant={"outlined"}
                                            label={item.commentCount} size={"small"}/>
                                <SquareChip label={item.createdAt}
                                            sx={{
                                                paddingLeft:0,
                                                paddingRight:0
                                            }}
                                            variant={"outlined"} size={"small"}/>
                            </TitleHeader>
                            <Typography component="span"
                                        fontFamily={"Core Sans"}
                                        fontSize={14}
                                        fontWeight={400}
                                        color={"#000"}
                                        display={"inline-block"}
                                        whiteSpace={"nowrap"}
                                        textOverflow={"ellipsis"}
                                        overflow={"hidden"}
                                        width={"380px"}>
                                {item.boardTitle}
                            </Typography>
                        </Box>
                    </ListItemButton>
                );
            })}
        </BoardList>
    );
};

interface IToggleButtonGroup {
    value: string,
    icon: IconDefinition,
    tooltipTitle: string,
    tooltipPlacement: TooltipProps["placement"]
}


const ToggleButtonGroupComponent = (
    props: {
        sortBy: string,
        handleChangeSortBy: (event: React.MouseEvent<HTMLElement>, newAlignment: "" | "like" | "commentCount" | "view") => void,
        groups: IToggleButtonGroup[]
    }
) => {
    return (
        <ToggleButtonGroup
            size="small"
            value={props.sortBy}
            exclusive
            onChange={props.handleChangeSortBy}
        >
            // TODO : disable 됐을 때 툴팁 안 뜨도록
            {props.groups.map((group, index) => {
                return (

                    <Tooltip title={group.tooltipTitle} placement={group.tooltipPlacement}
                             key={index}>
                        <ToggleButton value={group.value}
                                      selected={props.sortBy === group.value}>
                            <FontAwesomeIcon icon={group.icon}/>
                        </ToggleButton>
                    </Tooltip>
                );
            })}
        </ToggleButtonGroup>
    );
};



const MenuButton = (props: { handleChange:(value:string)=>void, menuList : ITypeMenu[], isSelected : string}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e:React.MouseEvent) => {
        const type = e.currentTarget.attributes.getNamedItem("data-type")?.value;
        if(type) {
            props.handleChange(type);
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu-list"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: '10ch',
                    },
                }}
            >
                {props.menuList.map((menu,index) => (
                    <MenuItem key={index} selected={menu.type === props.isSelected} data-type={menu.type} onClick={handleClose}>
                        <Typography fontFamily={"Core Sans"} fontSize={13} fontWeight={700}>
                            {menu.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
  padding:0;
`;

const StyledDialogActions = styled(DialogActions)`
  display: flex;
  border-top: 0px solid #e0e0e0;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

const StyledDialogTitleMenuBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PaginationToggleGroupBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default function ActivitiesModal(props: ActivitiesModalProps) {


    const [isSortBy, setIsSortBy] = useState<"commentCount" | "like" | "view" | "">("");
    const userDetail = useSelector((state: RootState) => state.auth.userDetail);
    const [category, setCategory] = useState<"board" | "comment" | "notification">("board");
    const [sortBy, setSortBy] = useState<"commentCount" | "like" | "view" | "">("");
    const [page, setPage] = useState<number>(0);
    const [boardActivities, setBoardActivities] = useState<BoardActivitiesJson>({} as BoardActivitiesJson);
    const [commentActivities, setCommentActivities] = useState<CommentActivitiesJson>({} as CommentActivitiesJson);
    const [notificationActivities, setNotificationActivities] = useState<NotificationActivities>({} as NotificationActivities);

    const categories = [{
        type: "board",
        setType: setCategory,
        label: "게시글",
        icon: faList
    }, {
        type: "comment",
        setType: setCategory,
        label: "댓글",
        icon: faComment
    }, {
        type: "notification",
        setType: setCategory,
        label: "알림",
        icon: faBell
    },
    ] as ITypeMenu[];

    const getTypeName = (type: string) => {
        if (type === "board") {
            return "게시글";
        }
        if (type === "comment") {
            return "댓글";
        }
        if (type === "notification") {
            return "알림";
        }
        return "";
    };

    const handleChangeCategory = (type:string)=>{
        setCategory(type as "board" | "comment" | "notification");
        setPage(0);
    }

    const handleSetBoardActivities = useCallback((data: BoardActivitiesJson) => {
        setBoardActivities(data);
    }, [boardActivities]);

    const handleSetCommentActivities = useCallback((data: CommentActivitiesJson) => {
        setCommentActivities(data);
    }, [commentActivities]);

    const handleSetNotificationActivities = useCallback((data: NotificationActivities) => {
        setNotificationActivities(data);
    }, [notificationActivities]);

    const handleChangeSortBy = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, value: "" | "view" | "like" | "commentCount") => {
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


    const boardToggleButtonGroups: IToggleButtonGroup[] =
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
        ];


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
            <StyledDialogTitle>
                <Typography component="span" sx={{fontSize: 18, fontWeight: 700, color: "#000"}}
                            fontFamily="Core Sans">
                    활동 내역
                </Typography>
                <StyledDialogTitleMenuBox>
                    <MenuButton handleChange={handleChangeCategory} isSelected={category} menuList={categories}/>
                    <Button>
                        닫기
                    </Button>
                </StyledDialogTitleMenuBox>

            </StyledDialogTitle>
            <StyledDialogContent>
                {category === "board" && boardActivities.content &&
                    <ActivitiesModalBoardTemplate data={boardActivities}/>}
            </StyledDialogContent>
            <StyledDialogActions>

                {category === "board" &&
                    <PaginationToggleGroupBox>
                        <ToggleButtonGroupComponent sortBy={sortBy} handleChangeSortBy={handleChangeSortBy}
                                                    groups={boardToggleButtonGroups}/>
                        <Pagination count={boardActivities.totalPages} page={page + 1} onChange={(e, page) => {
                            setPage(page - 1);
                        }}/>
                    </PaginationToggleGroupBox>
                }
            </StyledDialogActions>
        </Dialog>
    );
}