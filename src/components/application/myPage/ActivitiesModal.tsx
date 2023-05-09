import Box from "@mui/material/Box";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useCallback, useEffect} from "react";
import {setLoginModalOpened} from "../../../redux";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {List, ListItemButton, styled} from "@mui/material";
import {useState} from "react";
import {getMyActivities} from "../../../api/myPage/getMyActivities";
import {BoardActivitiesJson} from "../../../interfaces/BoardActivitiesJson";
import {CommentActivitiesJson} from "../../../interfaces/CommentActivitiesJson";
import {NotificationActivities} from "../../../interfaces/NotificationActivities";
import Typography from "@mui/material/Typography";

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
    children: React.ReactNode,
    activitiesModalOpened: boolean,
    handleClose: () => void
}

export const ActivitiesModalContent = () => {
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


    return (
        <Box>
            {category === "board" && boardActivities.content && <ActivitiesModalBoardTemplate data={boardActivities}/>}
        </Box>
    );
};

const BoardList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

export const ActivitiesModalBoardTemplate = (props: { data: BoardActivitiesJson }) => {
    return (
        <BoardList>
            {props.data.content.map((item, index) => {
                return (
                    <ListItemButton key={index}>
                        <Box>
                            <Typography variant="h6" component="div" sx={{
                                fontSize: 18, fontWeight: 400, color: "#000", display: "inline-block",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: "100%"
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


export default function ActivitiesModal(props: ActivitiesModalProps) {
    const dispatch = useDispatch();
    return (
        <Modal
            open={props.activitiesModalOpened}
            onClose={props.handleClose}
        >
            <Fade in={props.activitiesModalOpened} unmountOnExit={true}>
                <ModalBox sx={style}>
                    <CloseButtonWrapper onClick={props.handleClose}>
                        <FontAwesomeIcon  icon={faXmark}/>
                    </CloseButtonWrapper>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalBox>
            </Fade>
        </Modal>
    );
}