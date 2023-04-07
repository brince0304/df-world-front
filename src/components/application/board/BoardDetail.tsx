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
    FormControl, TextField, InputBase, IconButton, CircularProgress
} from "@mui/material";
import {useParams} from "react-router";
import Box from "@mui/material/Box";
import React, {useCallback, useEffect, useState} from "react";
import {BoardDetailData} from "../../../interfaces/BoardDetailData";
import {BestArticleNoDataWrapper, BestArticleTitleComponent, getBoardType} from "./Board";
import {setIsError, setIsLoading} from "../../../redux";
import {RootState, useAppDispatch} from "../../../redux/store";
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
import {CommentListData} from "../../../interfaces/CommentListData";
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
    commentContent: yup.string().required("댓글을 입력해주세요.").min(2, "댓글을 2자 이상 입력해주세요..").max(1000, "댓글은 1000자 이내로 입력해주세요.")
});


export const BoardDetail = () => {
    const dispatch = useAppDispatch();
    const {boardId} = useParams<{ boardId: string }>();
    let navigate = useNavigate();
    const user = useSelector((state: RootState) => state.login.user);
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

    const handleCommentLike = (boardId: string, commentId: string) => {
        if (boardId) {
            postCommentLike(boardId, commentId).then((res) => {
                if (res.status === 200) {
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

    const handleDeleteComment = (commentId: string) => {
        if (boardId && window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteBoardComment(commentId).then((res) => {
                if (res.status === 200) {
                    handleGetBoardComment(boardId);
                    alert("댓글이 삭제되었습니다.");
                }
            }).catch((err) => {
                alert("댓글 삭제에 실패했습니다.");
            });
        }
    };

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
    }


    const handleNavigateToBoardList = () => {
        navigate(-1);
    };

    const handleNavigateToBoardInsert = () => {
        navigate(BOARD_INSERT_FORM_ROUTE);
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
                            <Chip label={getBoardType(boardData?.article?.boardType)} size={"small"} color={"primary"} sx={{fontWeight:"bold"}}
                                  clickable/>
                            {boardData?.article?.hashtags?.map((hashtag,index) => (
                                <Chip key={index} label={"#" + hashtag} size={"small"} color={"default"} sx={{fontWeight:"bold"}}/>
                            ))}
                            {boardData?.article?.character && <Chip avatar={
                                <Avatar src={boardData?.article?.character?.characterImageUrl} sx={{
                                    fontWeight: "bold",
                                    "& > img": {
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        height: "400%",
                                    }
                                }}/>
                            } label={boardData?.article?.character?.characterName} size={"small"} color={"default"}/>}
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
                            <Button sx={{marginRight: "10px"}}>목록</Button>
                            <Button>글 쓰기</Button>
                        </Box>
                        <ContentFlow data={bestComments} handleNavigate={handleBestCommentNavigate}
                                     flowTitle={<BestCommentTitle>베스트</BestCommentTitle>} chipColor={"default"}
                                     noDataWrapper={<BestCommentNoDataWrapper/>}/>
                        <BoardWriterWrapper sx={{fontSize: "14px", marginLeft: 0, paddingBottom: "10px"}}>
                            댓글 {commentData?.comments?.length}개
                            <CircularProgress size={18} sx={{
                                display: isCommentLoading ? "block" : "none",
                                marginLeft: "10px",
                                justifyContent: "center"
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
                                               disabled={!user.userId}/>
                                    <IconButton type="submit" disabled={!user.userId}>
                                        <SendIcon/>
                                    </IconButton>
                                </CommentContainer>
                            </form>
                            <Typography sx={{
                                fontSize: "12px",
                                color: "red",
                                textAlign: "left",
                                marginTop: "10px"
                            }}>{errors.commentContent?.message}</Typography>
                        </Box>
                        <Box>
                            {commentData?.comments?.map((comment, index) => (
                                <Box key={index} id={"comment-" + comment.id} sx={{paddingTop: "20px"}}>
                                    <Box sx={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                                        <Avatar src={comment.userProfileImgUrl} sx={{width: "25px", height: "25px"}}/>
                                        <Typography sx={{
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                            fontFamily: "Core Sans",
                                            marginLeft: "10px",
                                        }}>{comment.userNickname}</Typography>
                                        <Typography sx={{
                                            fontSize: "12px",
                                            marginLeft: "10px",
                                            color: "gray"
                                        }}> {comment.createdAt}</Typography>
                                        {user && user.userId === comment.userId &&
                                            <Box sx={{display: "flex", marginLeft: "auto", alignItems: "center"}}>
                                                <Button sx={commentButtonStyle}>수정</Button>
                                                <Button sx={commentButtonStyle} onClick={(e) => {
                                                    handleDeleteComment(comment.id.toString());
                                                }}>삭제</Button>
                                            </Box>}

                                    </Box>
                                    <Box sx={{
                                        marginTop: "10px",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        width: "100%",
                                    }}>
                                        <Typography sx={{
                                            fontSize: "15px",
                                            fontFamily: "Core Sans",
                                            textAlign: "left"
                                        }}>{comment.commentContent}</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        marginTop: "10px"
                                    }}>
                                        <Button sx={commentButtonStyle}>답글</Button>
                                        <FormControlLabel sx={{scale: "0.7", marginLeft: "5px"}}
                                                          id={"comment-like-" + comment.id}
                                                          control={<Checkbox color={"error"} checkedIcon={<Favorite/>}
                                                                             icon={<FavoriteBorder/>}/>}
                                                          checked={commentData.likeResponses.includes({
                                                              id: comment.id,
                                                              isLike: true
                                                          })} label={
                                            <LikeCountWrapper id={"comment-like-count-" + comment.id}>
                                                {comment.commentLikeCount}
                                            </LikeCountWrapper>} onClick={(e) => {
                                            handleCommentLike(boardData?.article?.id.toString(), comment.id.toString());
                                        }}/>
                                    </Box>
                                </Box>
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