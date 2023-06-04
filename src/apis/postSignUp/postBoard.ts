import createInstance from "../index";
import {BoardInsertDataProps} from "../../pages/Board/Write";
import {Navigation} from "react-router";
import {NavigateFunction} from "react-router-dom";

export const postBoard = async (boardData : BoardInsertDataProps,navigate:NavigateFunction) => {
    createInstance.post('/boards', boardData).then((res)=>{
       const boardId = res.data;
       if(boardId){
              navigate(`/boards/${boardId}`);
       }
    }).catch((err)=>{
        console.log(err);
    })
}