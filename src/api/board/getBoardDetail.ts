import {BoardDetailData} from "../../interfaces/BoardDetailData";
import {Action, AsyncThunkAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";
import {setIsLoading} from "../../redux";
import axios from "../../common/axiosInstance";

export const getBoardDetail = (setIsError:(boolean:boolean)=>void,url:string,setData:({}:BoardDetailData)=>void,handleSetBoardLike:(isLiked:boolean,likeCount:number)=>void) : ThunkAction<any, RootState, unknown,Action> => {
    return async (dispatch) => {
        {
           dispatch(setIsLoading(true));
           setIsError(false);
           axios().get(url).then((res) => {
               setData(res.data);
               dispatch(setIsLoading(false));
               console.log(res.data);
                handleSetBoardLike(res.data.likeLog,res.data.article.boardLikeCount);
           }).catch((err) => {
                setIsError(true);
                dispatch(setIsLoading(false));
               }
           )
            }
    }
}