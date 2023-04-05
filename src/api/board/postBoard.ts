import axios from "../../common/axiosInstance";
import {BoardInsertDataProps} from "../../components/application/board/WriteBoard";
import {Navigation} from "react-router";
import {NavigateFunction} from "react-router-dom";

export const postBoard = async (boardData : BoardInsertDataProps,navigate:NavigateFunction) => {
    axios().post('/boards', boardData).then((res)=>{
       const boardId = res.data;
       if(boardId){
              navigate(`/boards/${boardId}`);
       }
    }).catch((err)=>{
        console.log(err);
    })
}