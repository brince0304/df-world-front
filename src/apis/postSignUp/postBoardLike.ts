import createInstance from "../index";
import {BOARD_LIKE_URL} from "../data/urls";

export const postBoardLike=async (boardId:string,setLikeCount:(count:number)=>void)=>{
    createInstance.post(BOARD_LIKE_URL+boardId).then((res)=>{
        setLikeCount(res.data);
    }).catch((err)=>{
        console.log(err);
    });
}