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
import {BestArticleTitleComponent, getBoardType} from "./Board";
import {setIsError} from "../../../redux";
import {RootState, useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {getBoardDetail} from "../../../api/board/getBoardDetail";
import {BOARD_BEST_ARTICLE_URL, BOARD_DETAIL_URL} from "../../../data/ApiUrl";
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


const TagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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
    padding: "0px 0px 0px 0px",
    "&:hover": {
        color: "black",
        transition: "all 0.3s",
    }
}

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
    useEffect(() => {
        if (boardId) {
            dispatch(getBoardDetail(setIsError, BOARD_DETAIL_URL + boardId, setBoardData, handleSetBoardLike));
            getBoardComment(boardId, setIsCommentLoading, setCommentData, setIsCommentError, setBestComments);
            console.log(commentData);
        }
        getBestArticles(BOARD_BEST_ARTICLE_URL + boardType, BOARD_DETAIL_URL, setBestArticle);
    }, [boardId]);
    const handleBestArticleNavigate = (articleId: number) => {
        navigate(BOARD_DETAIL_URL + articleId);
    };
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
    const {
        register,
        handleSubmit,
    } = useForm<CommentForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleCommentSubmit = (data: CommentForm) => {
        if(user&&boardId){
          postBoardComment(data,boardId).then((res)=>{
                if(res.status===200){
                    getBoardComment(boardId, setIsCommentLoading, setCommentData, setIsCommentError, setBestComments);
                    const id = res.data;
                    handleScroll(id);
                }
          }).catch((err)=>{
              alert("댓글 작성에 실패했습니다.");
          })

        }
    }

    const handleScroll = (commentId:number)=>{
        const commentSection = document.getElementById("comment-" + commentId);
        if (commentSection) {
            commentSection.scrollIntoView({behavior: "smooth"});
        }
    }

    const onInvalid = (errors: any) => {
        console.log(errors);
    }

    return (
        <Container maxWidth={"md"} sx={{paddingTop: "20px"}}>
            <Paper sx={{padding: "0px 20px 20px 20px"}}>
                <Box sx={{paddingBottom:"10px"}}>
                    <ContentFlow data={bestArticle} flowTitle={<BestArticleTitleComponent/>}
                                 handleNavigate={handleBestArticleNavigate} chipColor={"default"}/>
                </Box>
                <BoardDetailContainer>
                    <TagContainer>
                        <Chip label={getBoardType(boardData?.article?.boardType)} size={"small"} color={"primary"}
                              clickable/>
                        {boardData?.article?.hashtags?.map((hashtag) => (
                            <Chip label={"#" + hashtag} size={"small"} color={"default"}/>
                        ))}
                        {boardData?.article?.character && <Chip avatar={
                            <Avatar src={boardData?.article?.character?.characterImageUrl}/>
                        } label={boardData?.article?.character?.characterName} size={"small"} color={"secondary"}/>}
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
                                               onClick={handleBoardLike} checked={isLiked}/>} label={<LikeCountWrapper>
                            {likeCount}
                        </LikeCountWrapper>}/>
                        {user.userId && boardData?.article?.userId === user.userId &&
                            <Box sx={{display: "flex"}}>
                                <Button sx={deleteEditButtonStyle}>수정</Button>
                                <Button sx={deleteEditButtonStyle}>삭제</Button>
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
                    <ContentFlow data={bestComments} handleNavigate={handleBestCommentNavigate}
                                 flowTitle={<BestCommentTitle>베스트</BestCommentTitle>} chipColor={"default"}/>
                    <BoardWriterWrapper sx={{fontSize: "14px",marginLeft:0, paddingBottom:"10px"}}>
                        댓글 {commentData?.comments?.length}개
                        <CircularProgress size={18} sx={{
                            display: isCommentLoading ? "block" : "none",
                            marginLeft: "10px",
                            justifyContent: "center"
                        }}/>
                    </BoardWriterWrapper>
                    <Box >
                        <Box sx={{display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "10px"}}>
                            <Avatar src={user.profileImgPath} sx={{width: "23px", height: "23px"}}/>
                            <Typography sx={{
                                fontSize: "13px",
                                fontWeight: "bold",
                                fontFamily: "Core Sans",
                                marginLeft: "10px",
                                color: user.userId ? "black" : "gray"
                            }}>{user.nickname ? user.nickname : "게스트"}</Typography>
                        </Box>
                        <form onSubmit={handleSubmit(handleCommentSubmit,onInvalid)} style={{width:"100%"}} >
                        <CommentContainer>
                            <InputBase sx={{width: "100%"}} placeholder={user.userId ? "댓글을 입력하세요." : "로그인이 필요합니다."} {...register("commentContent")}
                                id={"comment-input"}
                                       disabled={!user.userId}/>
                            <IconButton type="submit" disabled={!user.userId}>
                                <SendIcon/>
                            </IconButton>
                        </CommentContainer>
                        </form>
                    </Box>
                    <Box>
                        {commentData?.comments?.map((comment, index) => (
                            <Box key={index} id={"comment-" + comment.id} sx={{paddingTop:"20px"}}>
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
                                    {user && user.userId===comment.userId && <Box sx={{display: "flex", marginLeft: "auto",alignItems:"center"}}>
                                        <Button sx={commentButtonStyle}>수정</Button>
                                        <Button sx={commentButtonStyle}>삭제</Button>
                                    </Box>}

                                </Box>
                                <Box sx={{
                                    marginTop: "10px",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    width: "100%",
                                    paddingLeft: "10px"
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
                                    <FormControlLabel sx={{scale: "0.7"}}
                                                      control={<Checkbox color={"error"} checkedIcon={<Favorite/>}
                                                                         icon={<FavoriteBorder/>}/>}
                                                      checked={commentData.likeResponses.includes({
                                                          id: comment.id,
                                                          isLike: true
                                                      })} label={
                                        <LikeCountWrapper>
                                            {comment.commentLikeCount}
                                        </LikeCountWrapper>}/>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </BoardDetailContainer>
            </Paper>
        </Container>
    );
};