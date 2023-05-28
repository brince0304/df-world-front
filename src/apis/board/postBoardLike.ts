import axios from "../../common/axiosInstance";
import {BOARD_LIKE_URL} from "../../data/ApiUrl";

export const postBoardLike=async (boardId:string,setLikeCount:(count:number)=>void)=>{
    axios().post(BOARD_LIKE_URL+boardId).then((res)=>{
        setLikeCount(res.data);
    }).catch((err)=>{
        console.log(err);
    });
}