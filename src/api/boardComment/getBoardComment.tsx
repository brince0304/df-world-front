import axios from "../../common/axiosInstance"
import {BOARD_COMMENT_GET_URL} from "../../data/ApiUrl";
import {CommentListData} from "../../interfaces/CommentListData";
import {ContentFlowProps} from "../../components/application/ui/ContentFlow";
import {ReactNode} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import {Chip, styled} from "@mui/material";
import Box from "@mui/material/Box";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage} from "@fortawesome/free-solid-svg-icons";


const FontWrapper = styled(Box)`
    display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
`



const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  gap : 10px;
`;

const ChipContent = (props:{likeCount:number;commentCount:number}) => {
    return (
        <Container>
            <FontWrapper>
                <FavoriteIcon sx={{fontSize: 12}}/>
                {props.likeCount}
            </FontWrapper>
            <FontWrapper>
                <FontAwesomeIcon icon={faMessage} />
                {props.commentCount}
            </FontWrapper>
        </Container>
    )
}




export const getBoardComment = async (boardId: string,setIsLoading :(v:boolean)=>void,setCommentData: (data:CommentListData)=>void,setIsError:(v:boolean)=>void,
   setBestComments:(props:ContentFlowProps[])=>void) => {
    setIsLoading(true);
    axios().get(BOARD_COMMENT_GET_URL+boardId).then((res)=>{
        const data = res.data as CommentListData;
        const bestComments = [] as ContentFlowProps[];
        if(data) {
            setCommentData(res.data);
            setIsLoading(false);
            data.bestComments.map((comment) => {
                bestComments.push({
                        avatarSrc: comment.userProfileImgUrl,
                        avatarName: comment.userNickname,
                        title: comment.commentContent,
                        link: "",
                        content: <ChipContent likeCount={comment.commentLikeCount} commentCount={comment.childrenComments.length}/>,
                        id: comment.id,
                    }
                )
            });
            setBestComments(bestComments);
        }
    }).catch((err)=>{
        console.log(err);
        setIsLoading(false);
        setIsError(true);
    })
}