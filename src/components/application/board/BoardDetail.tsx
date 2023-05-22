import {
    Avatar,
    Checkbox,
    Chip,
    Container,
    FormControlLabel,
    Paper,
    styled,
    Button,
    Divider,
    Zoom,
    FormControl, TextField, InputBase, IconButton, CircularProgress, Grow
} from "@mui/material";
import {useParams} from "react-router";
import Box from "@mui/material/Box";
import React, {useCallback, useEffect, useState} from "react";
import {BoardDetailData} from "../../../interfaces/BoardDetailData";
import {BestArticleNoDataWrapper, BestArticleTitleComponent, CharacterChip, getBoardType, TagChip} from "./Board";
import {setIsError, setIsLoading} from "../../../redux";
import {RootState, useAppDispatch, UserDetail} from "../../../redux/store";
import {useSelector} from "react-redux";
import {getBoardDetail} from "../../../api/board/getBoardDetail";
import {BOARD_BEST_ARTICLE_URL, BOARD_DETAIL_URL, BOARD_WRITE_URL} from "../../../data/ApiUrl";
import {ContentFlow, ContentFlowProps} from "../ui/ContentFlow";
import {getBestArticles} from "../../../api/board/getBestArticles";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {ToasterViewer} from "./ToasterViewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import {Viewer} from "@toast-ui/react-editor";
import {Delete, Favorite, FavoriteBorder} from "@mui/icons-material";
import {postBoardLike} from "../../../api/board/postBoardLike";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import {
    CommentListData,
    CommentListDataComments,
    CommentListDataLikeResponses
} from "../../../interfaces/CommentListData";
import {getBoardComment} from "../../../api/boardComment/getBoardComment";
import Loading from "react-loading";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {BoardInsertDataProps} from "./WriteBoard";
import {postBoard} from "../../../api/board/postBoard";
import {postBoardComment} from "../../../api/boardComment/postBoardComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {deleteBoardComment} from "../../../api/boardComment/deleteBoardComment";
import {deleteBoard} from "../../../api/board/deleteBoard";
import {BadRequest} from "../error/BadRequest";
import {BoardDetailSkeleton} from "../loading/BoardDetailSkeleton";
import {postCommentLike} from "../../../api/boardComment/postCommentLike";
import {BOARD_INSERT_FORM_ROUTE, BOARD_UPDATE_FORM_ROUTE} from "../../../data/routeLink";
import ReactDOM from "react-dom/client";
import {putBoardComment} from "../../../api/boardComment/putBoardComment";
import {postChildrenComment} from "../../../api/boardComment/postChildrenComment";
import {getChildrenComment} from "../../../api/boardComment/getChildrenComment";


const TagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`;

const BoardTitleWrapper = styled(Typography)`
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: black;
  width: 100%;
  text-align: left;
`;
const BoardDetailContainer = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
`;

const BoardAuthorContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  gap: 5px;
`;

const BoardWriterWrapper = styled(Typography)`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  font-family: "Core Sans", serif;
  color: black;
  margin-left: 10px;
  padding-top: 10px;
`;


const CreatedAtWrapper = styled(Typography)`
  display: flex;
  font-size: 14px;
  color: gray;
`;

const ViewCountWrapper = styled(Typography)`
  display: flex;
  font-size: 14px;
  color: gray;
  margin-left: 10px;
`;

const LikeButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const LikeCountWrapper = styled(Typography)`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const CommentContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;

const BestCommentTitle = styled(Typography)`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  font-family: "Core Sans", serif;
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  -webkit-background-clip: text;
  color: transparent;

`;

const deleteEditButtonStyle = {
    color: "gray", fontWeight: "400",
    "&:hover": {
        color: "black",
        transition: "all 0.3s",
    }
};

const commentButtonStyle = {
    color: "gray"
    , fontSize: "12px",
    justifyContent: "flex-start",
    minWidth: "0px",
    "&:hover": {
        color: "black",
        transition: "all 0.3s",
    }
};

const BestCommentNoDataWrapper = () => {
    return (
        <Box>
            <Typography fontFamily={"Core Sans"} fontSize={"15px"}>베댓이 존재하지 않습니다.</Typography>
        </Box>
    );
};


const ChipFontWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
`;


const ChipContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const ChipContent = (props: { likeCount: number; commentCount: number }) => {
    return (
        <ChipContainer>
            <ChipFontWrapper>
                <FavoriteIcon sx={{fontSize: 12}}/>
                {props.likeCount}
            </ChipFontWrapper>
            <ChipFontWrapper>
                <FontAwesomeIcon icon={faMessage}/>
                {props.commentCount}
            </ChipFontWrapper>
        </ChipContainer>
    );
};


export interface CommentForm {
    commentContent: string;
}


const schema = yup.object().shape({
    commentContent: yup.string().required("댓글을 입력해주세요.").min(2, "댓글을 2자 이상 입력해주세요").max(1000, "댓글은 1000자 이내로 입력해주세요.")
});


const CommentList = (props: { comment: CommentListDataComments, user: UserDetail, handleGetBoardComment: (boardId: string) => void, boardId: string, likeResponse: CommentListDataLikeResponses[] }) => {
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const commentLikeLog = props.likeResponse.map((comment) => {
        if (comment.isLike) {
            return comment.id;
        }
    });
    const [isLiked, setIsLiked] = useState(commentLikeLog.includes(props.comment.id));
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [childrenComments, setChildrenComments] = useState<CommentListDataComments[]>([]);
    const commentContent = props.comment.commentContent.split("\n").map((line, index) => {
        return (
            <Typography sx={{
                fontSize: "15px",
                fontFamily: "Core Sans",
                textAlign: "left"
            }}  key={index}>
                {line}
                {index !== props.comment.commentContent.split("\n").length - 1 ? <br/> : null}
            </Typography>
        );
    });
    const handleCommentLike = (boardId: string, commentId: string) => {
        if (boardId) {
            postCommentLike(boardId, commentId).then((res) => {
                if (res.status === 200) {
                    setIsLiked(!isLiked);
                    const dom = document.getElementById("comment-like-count-" + commentId);
                    if (dom) {
                        dom.innerText = res.data.toString();
                    }
                }
            }).catch((err) => {
                alert("댓글 좋아요에 실패했습니다.");
            });
        }
    };

    useEffect(() => {
        handleGetChildrenComment();
    }, []);


    const handleToggleEdit = useCallback(() => {
        setIsEditOpen(!isEditOpen);
    }, [isEditOpen]);

    const handleUpdateComment = (commentId: string, data: CommentForm) => {
        if (props.boardId && props.user && props.user.userId === props.comment.userId) {
            if (window.confirm("수정하시겠습니까?")) {
                putBoardComment(commentId, props.boardId, data).then((res) => {
                    if (res.status === 200) {
                        props.handleGetBoardComment(props.boardId);
                        alert("댓글이 수정되었습니다.");
                        setIsEditOpen(false);
                    }
                }).catch((err) => {
                    alert("댓글 수정에 실패했습니다.");
                });
            }
        } else {
            alert("댓글 수정 권한이 없습니다.");
        }
    };

    const onValidUpdateComment = (data: CommentForm) => {
        handleUpdateComment(props.comment.id.toString(), data);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<CommentForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });




    const handleDeleteComment = (commentId: string) => {
        if (props.boardId && window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteBoardComment(commentId).then((res) => {
                if (res.status === 200) {
                    props.handleGetBoardComment(props.boardId);
                    alert("댓글이 삭제되었습니다.");
                    handleGetChildrenComment();

                }
            }).catch((err) => {
                alert("댓글 삭제에 실패했습니다.");
            });
        }
    };
    const handleToggleOpenReply = useCallback(() => {
        setIsReplyOpen(!isReplyOpen);
        if (!isReplyOpen) {
            handleGetChildrenComment();
        }
    }, [isReplyOpen]);

    const handleGetChildrenComment = useCallback(() => {
        getChildrenComment(props.boardId.toString(), props.comment.id.toString()).then((res) => {
            if (res.status === 200) {
                setChildrenComments(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [isReplyOpen]);


    return (
        <Box id={"comment-" + props.comment.id} sx={{paddingTop: "20px", position: "relative"}}>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                <Avatar src={props.comment.userProfileImgUrl} sx={{width: "25px", height: "25px"}}/>
                <Typography sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "Core Sans",
                    marginLeft: "10px",
                }}>{props.comment.userNickname}</Typography>
                <Typography sx={{
                    fontSize: "12px",
                    marginLeft: "10px",
                    color: "gray"
                }}> {props.comment.createdAt}</Typography>
                {props.user && props.user.userId === props.comment.userId &&
                    <Box sx={{display: "flex", marginLeft: "auto", alignItems: "center"}}>
                        <Button sx={commentButtonStyle} onClick={handleToggleEdit}>{isEditOpen ? "취소" : "수정"}</Button>
                        <Button sx={commentButtonStyle} onClick={(e) => {
                            handleDeleteComment(props.comment.id.toString());
                        }}>삭제</Button>
                    </Box>}

            </Box>
            <Box sx={{
                marginTop: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
            }}>
                {!isEditOpen && commentContent}
                {isEditOpen &&
                    <Box sx={{width: "100%"}} component={"form"} onSubmit={handleSubmit(onValidUpdateComment)}>
                        <Paper sx={{width: "100%", padding: "10px", borderRadius: "10px"}}>
                            <InputBase {...register("commentContent")} multiline
                                       defaultValue={props.comment.commentContent}
                                       sx={{width: "100%", fontSize: "15px", fontFamily: "Core Sans"}}/>
                        </Paper>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "5px",
                            width: "100%"
                        }}>
                            <Typography sx={{
                                color: "red",
                                fontSize: "12px",
                            }}>{errors.commentContent ? errors.commentContent.message : " "}</Typography>
                            <Button sx={commentButtonStyle} type="submit" style={{marginRight: "auto"}}>
                                수정하기
                            </Button>
                            <Box/>
                        </Box>
                    </Box>
                }
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginTop: "5px",
                    width: "100%"
                }}>
                    <Button sx={commentButtonStyle}
                            onClick={handleToggleOpenReply}>답글 {childrenComments?.length}개</Button>
                    <FormControlLabel sx={{scale: "0.7", marginLeft: "0px"}}
                                      id={"comment-like-" + props.comment.id}
                                      control={<Checkbox color={"error"} checkedIcon={<Favorite/>}
                                                         icon={<FavoriteBorder/>}/>}
                                      checked={isLiked} label={
                        <LikeCountWrapper id={"comment-like-count-" + props.comment.id}>
                            {props.comment.commentLikeCount}
                        </LikeCountWrapper>} onClick={(e) => {
                        handleCommentLike(props.boardId, props.comment.id.toString());
                    }}/>
                </Box>
                <Box id={"comment-reply-" + props.comment.id}>
                </Box>
                <Grow in={isReplyOpen} mountOnEnter unmountOnExit>
                    <Box>
                        <ReplyInsertForm boardId={props.boardId} handleGetBoardComment={props.handleGetBoardComment}
                                            handleGetChildrenComment={handleGetChildrenComment} commentId={props.comment.id.toString()}
                                            user={props.user}
                        />
                        <Box>
                            {childrenComments?.map((reply: CommentListDataComments) => {
                                return (
                                    <ReplyList comment={reply} user={props.user}
                                               handleGetBoardComment={props.handleGetBoardComment}
                                               boardId={props.boardId} handleDeleteComment={handleDeleteComment}
                                               isLiked={commentLikeLog.includes(reply.id)} key={reply.id}
                                               handleGetChildrenComment={handleGetChildrenComment}/>
                                );
                            })}
                        </Box>
                    </Box>
                </Grow>
            </Box>
        </Box>
    );
};

const ReplyInsertForm = (props:{boardId:string,handleGetBoardComment:(boardId:string)=>void, handleGetChildrenComment:()=>void,commentId:string,user:UserDetail}) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<CommentForm>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const handlePostChildrenComment = (commentId: string, boardId: string, data: CommentForm) => {
        if (!props.user.userId) {
            alert("로그인이 필요합니다.");
            return;
        }
        postChildrenComment(commentId, boardId, data).then((res) => {
            if (res.status === 200) {
                props.handleGetBoardComment(props.boardId);
                props.handleGetChildrenComment();
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    const handleValidPostChildrenComment = (data: CommentForm) => {
        handlePostChildrenComment(props.commentId, props.boardId, data);
        setValue("commentContent", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValidPostChildrenComment)} style={{width: "100%"}}>
            <CommentContainer>
                <InputBase sx={{width: "100%"}}
                           placeholder={props.user.userId ? "답글을 입력하세요." : "로그인이 필요합니다."}
                           id={"comment-input"} {...register("commentContent")}
                           disabled={!props.user.userId}/>
                <IconButton type="submit" disabled={!props.user.userId}>
                    <SendIcon/>
                </IconButton>
            </CommentContainer>
            <Typography sx={{
                color: "red",
                fontSize: "12px",
                marginLeft: "10px",
                textAlign: "left",
                marginTop: "5px"
            }}>{errors.commentContent ? errors.commentContent.message : " "}</Typography>
        </form>
    )
}

const ReplyList = (props
                       : {
    comment: CommentListDataComments, user: UserDetail, handleGetBoardComment: (boardId: string) => void, boardId: string,
    handleDeleteComment: (boardId: string) => void, isLiked: boolean, handleGetChildrenComment: () => void
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const commentContent = props.comment.commentContent.split("\n").map((line, index) => {
        return (
            <Typography sx={{
                fontSize: "15px",
                fontFamily: "Core Sans",
                textAlign: "left"
            }} key={index}>
                {line}
                {index !== props.comment.commentContent.split("\n").length - 1 ? <br/> : null}
            </Typography>
        );
    });

    const handleCommentLike = (boardId: string, commentId: string) => {
        if (boardId) {
            postCommentLike(boardId, commentId).then((res) => {
                if (res.status === 200) {
                    setIsLiked(!isLiked);
                    const dom = document.getElementById("comment-like-count-" + commentId);
                    if (dom) {
                        dom.innerText = res.data.toString();
                    }
                }
            }).catch((err) => {
                alert("댓글 좋아요에 실패했습니다.");
            });
        }
    };

    const handleToggleEdit = useCallback(() => {
        setIsEdit(!isEdit);
    }, [isEdit]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<CommentForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });


    const handleUpdateComment = (commentId: string, data: CommentForm) => {
        if (props.boardId && props.user && props.user.userId === props.comment.userId) {
            if (window.confirm("수정하시겠습니까?")) {
                putBoardComment(commentId, props.boardId, data).then((res) => {
                    if (res.status === 200) {
                        props.handleGetBoardComment(props.boardId);
                        alert("댓글이 수정되었습니다.");
                        setIsEdit(false);
                        props.handleGetChildrenComment();
                    }
                }).catch((err) => {
                    alert("댓글 수정에 실패했습니다.");
                });
            }
        } else {
            alert("댓글 수정 권한이 없습니다.");
        }
    };

    const onValidUpdateComment = (data: CommentForm) => {
        handleUpdateComment(props.comment.id.toString(), data);
    };


    return (
        <Box id={"comment-" + props.comment.id} sx={{paddingTop: "20px", paddingLeft: "20px"}}>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                <Avatar src={props.comment.userProfileImgUrl} sx={{width: "25px", height: "25px"}}/>
                <Typography sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "Core Sans",
                    marginLeft: "10px",
                }}>{props.comment.userNickname}</Typography>
                <Typography sx={{
                    fontSize: "12px",
                    marginLeft: "10px",
                    color: "gray"
                }}> {props.comment.createdAt}</Typography>
                {props.user && props.user.userId === props.comment.userId &&
                    <Box sx={{display: "flex", marginLeft: "auto", alignItems: "center"}}>
                        <Button sx={commentButtonStyle} onClick={handleToggleEdit}>{isEdit ? "취소" : "수정"}</Button>
                        <Button sx={commentButtonStyle} onClick={(e) => {
                            props.handleDeleteComment(props.comment.id.toString());
                        }}>삭제</Button>
                    </Box>}

            </Box>
            <Box sx={{
                marginTop: "10px",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
            }}>
                {!isEdit && commentContent}
                {isEdit &&
                    <Box sx={{width: "100%"}} component={"form"} onSubmit={handleSubmit(onValidUpdateComment)}>
                        <Paper sx={{width: "100%", padding: "10px", borderRadius: "10px"}}>
                            <InputBase {...register("commentContent")} multiline
                                       defaultValue={props.comment.commentContent}
                                       sx={{width: "100%", fontSize: "15px", fontFamily: "Core Sans"}}/>
                        </Paper>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "5px",
                            width: "100%"
                        }}>
                            <Typography sx={{
                                color: "red",
                                fontSize: "12px",
                            }}>{errors.commentContent ? errors.commentContent.message : " "}</Typography>
                            <Button sx={commentButtonStyle} type="submit" style={{marginRight: "auto"}}>
                                수정하기
                            </Button>
                            <Box/>
                        </Box>
                    </Box>
                }
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "10px"
            }}>
                <FormControlLabel sx={{scale: "0.7"}}
                                  id={"comment-like-" + props.comment.id}
                                  control={<Checkbox color={"error"} checkedIcon={<Favorite/>}
                                                     icon={<FavoriteBorder/>}/>}
                                  checked={isLiked} label={
                    <LikeCountWrapper id={"comment-like-count-" + props.comment.id}>
                        {props.comment.commentLikeCount}
                    </LikeCountWrapper>} onClick={(e) => {
                    handleCommentLike(props.boardId, props.comment.id.toString());
                }}/>
            </Box>
        </Box>
    );

};


export const BoardDetail = () => {
    const dispatch = useAppDispatch();
    const {boardId} = useParams<{ boardId: string }>();
    let navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.userDetail);
    const [boardData, setBoardData] = useState<BoardDetailData>({} as BoardDetailData);
    const boardType = boardData?.article?.boardType ? boardData?.article?.boardType : "ALL";
    const [bestArticle, setBestArticle] = useState<ContentFlowProps[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [commentData, setCommentData] = useState<CommentListData>({} as CommentListData);
    const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
    const [isCommentError, setIsCommentError] = useState<boolean>(false);
    const [bestComments, setBestComments] = useState<ContentFlowProps[]>([]);
    const [isBoardDetailError, setIsBoardDetailError] = useState<boolean>(false);
    const isLoading = useSelector((state: RootState) => state.app.isLoading);


    const handleSetBestComment = useCallback((commentList: CommentListData) => {
        const data = [] as ContentFlowProps[];
        commentList.bestComments.map((comment) => {
            data.push({
                id: comment.id,
                title: comment.commentContent,
                avatarSrc: comment.userProfileImgUrl,
                avatarName: comment.userNickname,
                content: <ChipContent likeCount={comment.commentLikeCount}
                                      commentCount={comment.childrenComments?.length}/>,
                link: "",
            });
            setBestComments(data);
        });
    }, []);

    useEffect(() => {
        if (boardId) {
            handleGetBoardDetail(boardId);
            handleGetBoardComment(boardId);
        }
        getBestArticles(BOARD_BEST_ARTICLE_URL + boardType, BOARD_DETAIL_URL, setBestArticle);
    }, [boardId]);
    const handleBestArticleNavigate = (articleId: number) => {
        navigate(BOARD_DETAIL_URL + articleId);
    };
    const handleGetBoardDetail = useCallback((boardId: string) => {
        dispatch(setIsLoading(true));
        getBoardDetail(BOARD_DETAIL_URL + boardId).then((res) => {
            setBoardData(res.data);
            setIsBoardDetailError(false);
            dispatch(setIsLoading(false));
            handleSetBoardLike(res.data.likeLog, res.data.article.boardLikeCount);
        }).catch((err) => {
            dispatch(setIsLoading(false));
            setIsBoardDetailError(true);
        });
    }, [boardId]);

    const handleBoardLike = useCallback(() => {
        if (boardId) {
            postBoardLike(boardId, setLikeCount);
            setIsLiked(!isLiked);
        }
    }, [boardId, isLiked]);

    const handleSetBoardLike = useCallback((isLiked: boolean, likeCount: number) => {
        setIsLiked(isLiked);
        setLikeCount(likeCount);
    }, []);

    const handleBestCommentNavigate = (id: number) => {
        //해당 id 를 갖고있는 섹션으로 이동
        const commentSection = document.getElementById("comment-" + id);
        if (commentSection) {
            commentSection.scrollIntoView({behavior: "smooth"});
        }
    };

    const handleGetBoardComment = useCallback((boardId: string) => {
        setIsCommentLoading(true);
        getBoardComment(boardId).then((res) => {
            setCommentData(res.data);
            setIsCommentError(false);
            setIsCommentLoading(false);
            handleSetBestComment(res.data);
        }).catch((err) => {
            setIsCommentError(true);
            setIsCommentLoading(false);
        });
    }, []);


    const handleDeleteBoard = (boardId: string) => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            deleteBoard(boardId).then((res) => {
                if (res.status === 200) {
                    alert("게시글이 삭제되었습니다.");
                    navigate(-1);
                }
            }).catch((err) => {
                alert("게시글 삭제에 실패했습니다.");
            });
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<CommentForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleNavigateToBoardUpdate = () => {
        if (typeof boardId === "string") {
            navigate(BOARD_UPDATE_FORM_ROUTE.replace("{boardId}", boardId).replace("{boardType}", boardType));
        }
    };


    const handleNavigateToBoardList = () => {
        navigate(-1);
    };

    const handleNavigateToBoardInsert = () => {
        navigate(BOARD_INSERT_FORM_ROUTE + "?boardType=" + boardType + "&request=add");
    };
    const handleCommentSubmit = (data: CommentForm) => {
        if (user && boardId) {
            postBoardComment(data, boardId).then((res) => {
                if (res.status === 200) {
                    handleGetBoardComment(boardId);
                    setValue("commentContent", "");
                    document.scrollingElement?.scrollTo(0, document.scrollingElement.scrollHeight);
                }
            }).catch((err) => {
                alert("댓글 작성에 실패했습니다.");
            });

        }
    };


    const onInvalid = (errors: any) => {
        console.log(errors);
    };

    return (
        <Container maxWidth={"md"} sx={{paddingTop: "20px"}}>
            {!isBoardDetailError && isLoading && <BoardDetailSkeleton/>}
            {!isBoardDetailError && boardData?.article && !isLoading &&
                <Paper sx={{padding: "10px 20px 20px 20px"}}>
                    <Box sx={{paddingBottom: "10px"}}>
                        <ContentFlow data={bestArticle} flowTitle={<BestArticleTitleComponent/>}
                                     handleNavigate={handleBestArticleNavigate} chipColor={"default"}
                                     noDataWrapper={<BestArticleNoDataWrapper/>}/>
                    </Box>
                    <BoardDetailContainer>
                        <TagContainer>
                            <Chip label={getBoardType(boardData?.article?.boardType)} size={"small"} color={"primary"}
                                  sx={{fontWeight: "bold"}}
                                  />
                            {boardData?.article?.hashtags?.map((hashtag, index) => (
                                <TagChip key={index} boardType={boardData.article.boardType} tag={hashtag}/>
                            ))}
                            {boardData?.article?.character &&
                            <CharacterChip characterName={boardData.article.character.characterName} characterImgUrl={boardData.article.character.characterImageUrl}
                                           adventureName={boardData.article.character.adventureName} serverId={boardData.article.character.serverId} characterId={boardData.article.character.characterId}/>}
                        </TagContainer>
                        <BoardTitleWrapper>
                            {boardData?.article?.boardTitle}
                        </BoardTitleWrapper>
                        <BoardAuthorContainer>
                            <Avatar src={boardData?.article?.userProfileIconPath} sx={{width: "20px", height: "20px"}}/>
                            <Typography sx={{
                                fontSize: "13px",
                                fontWeight: "bold",
                                fontFamily: "Core Sans"
                            }}>{boardData?.article?.userNickname}</Typography>
                        </BoardAuthorContainer>
                        <BoardAuthorContainer>
                            <CreatedAtWrapper>
                                {boardData?.article?.createdAt}
                            </CreatedAtWrapper>
                            <ViewCountWrapper>
                                조회수 {boardData?.article?.boardViewCount}
                            </ViewCountWrapper>
                        </BoardAuthorContainer>
                        <Divider sx={{marginTop: "10px"}}/>
                        <LikeButtonContainer>
                            <FormControlLabel
                                control={<Checkbox color={"error"} checkedIcon={<Favorite/>} icon={<FavoriteBorder/>}
                                                   onClick={handleBoardLike} checked={isLiked}/>}
                                label={<LikeCountWrapper>
                                    {likeCount}
                                </LikeCountWrapper>}/>
                            {user.userId && boardData?.article?.userId === user.userId &&
                                <Box sx={{display: "flex"}}>
                                    <Button sx={deleteEditButtonStyle} onClick={handleNavigateToBoardUpdate}>수정</Button>
                                    <Button sx={deleteEditButtonStyle} onClick={(e) => {
                                        handleDeleteBoard(boardData?.article?.id.toString());
                                    }}>삭제</Button>
                                </Box>
                            }
                        </LikeButtonContainer>
                        <Box sx={{textAlign: "left"}}>
                            {boardData?.article?.boardContent && <Viewer
                                initialValue={boardData?.article?.boardContent}
                            />
                            }
                        </Box>
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto"}}>
                            <Button sx={{marginRight: "10px"}} onClick={handleNavigateToBoardList}>
                                <Typography sx={{fontSize: "14px", fontWeight: "bold", fontFamily: "Core Sans"}}
                                            color={"black"} component={"span"}>돌아가기</Typography>
                            </Button>
                            <Button onClick={handleNavigateToBoardInsert}>
                                <Typography sx={{fontSize: "14px", fontWeight: "bold", fontFamily: "Core Sans"}}
                                            color={"black"} component={"span"}>글쓰기</Typography>
                            </Button>
                        </Box>
                        <ContentFlow data={bestComments} handleNavigate={handleBestCommentNavigate}
                                     flowTitle={<BestCommentTitle>베스트</BestCommentTitle>} chipColor={"default"}
                                     noDataWrapper={<BestCommentNoDataWrapper/>}/>
                        <BoardWriterWrapper sx={{fontSize: "14px", marginLeft: 0, paddingBottom: "10px"}}>
                            댓글 {commentData?.comments?.length}개
                            <CircularProgress size={15} sx={{
                                display: isCommentLoading ? "block" : "none",
                                marginLeft: "10px",
                                justifyContent: "center",
                                alignItems: "center"
                            }}/>
                        </BoardWriterWrapper>
                        <Box>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                marginBottom: "10px"
                            }}>
                                <Avatar src={user.profileImgPath} sx={{width: "23px", height: "23px"}}/>
                                <Typography sx={{
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    fontFamily: "Core Sans",
                                    marginLeft: "10px",
                                    color: user.userId ? "black" : "gray"
                                }}>{user.nickname ? user.nickname : "게스트"}</Typography>
                            </Box>
                            <form onSubmit={handleSubmit(handleCommentSubmit, onInvalid)} style={{width: "100%"}}>
                                <CommentContainer>
                                    <InputBase sx={{width: "100%"}}
                                               placeholder={user.userId ? "댓글을 입력하세요." : "로그인이 필요합니다."} {...register("commentContent")}
                                               id={"comment-input"}
                                               disabled={!user.userId}
                                               multiline/>
                                    <IconButton type="submit" disabled={!user.userId}>
                                        <SendIcon/>
                                    </IconButton>
                                </CommentContainer>
                            </form>
                            <Typography sx={{
                                fontSize: "12px",
                                color: "red",
                                textAlign: "left",
                                marginTop: "5px"
                            }}>{errors.commentContent?.message}</Typography>
                        </Box>
                        <Box>
                            {commentData?.comments?.map((comment, index) => (
                                comment.isParent &&
                                <CommentList  key={comment.id} comment={comment} user={user}
                                             handleGetBoardComment={handleGetBoardComment}
                                             boardId={boardId ? boardId : "0"}
                                             likeResponse={commentData.likeResponses}/>
                            ))}
                        </Box>
                    </BoardDetailContainer>
                </Paper>
            }
            {isBoardDetailError &&
                <BadRequest/>
            }
        </Container>
    );
};