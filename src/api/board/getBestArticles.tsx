import createInstance from "../../common/axios";
import {BestArticleType} from "../../interfaces/BestArticleType";
import {BestArticles} from "../../interfaces/ArticleType";
import {ContentFlowProps} from "../../components/application/ui/ContentFlow";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import {ReactNode} from "react";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material";
import Box from "@mui/material/Box";



const ChipContent = (props:{likeCount:number;commentCount:string}) => {
    return (
        <Container>
            <FavoriteIcon />
            <FontWrapper>{props.likeCount}</FontWrapper>
            <MessageIcon />
            <FontWrapper>{props.commentCount}</FontWrapper>
        </Container>
    )
}

const FontWrapper = styled(Typography)`
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
       padding: 10px;
  gap : 10px;
`;




export const getBestArticles = async (url:string,dataUrl : string,setData:(data:ContentFlowProps[])=>void) => {
    const instance = createInstance(url);
    instance.get('').then((res:any)=>{
        const data = res.data.bestArticles as BestArticles[];
        const contentFlowData = [] as ContentFlowProps[];
        data.forEach((item)=>{
            const contentFlowItem = {
                avatarSrc : item.userProfileImgUrl,
                avatarName : item.userNickname,
                id : item.id,
                content: <ChipContent commentCount={item.commentCount} likeCount={item.boardLikeCount}/>,
                title: item.boardTitle,
                link: dataUrl+item.id,
            }
            contentFlowData.push(contentFlowItem);
        })
        setData(contentFlowData);
    }).catch((err:any)=>{
        console.log(err);
    })}