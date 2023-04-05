import BoardData from "../../data/BoardData";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";
import {BoardListData} from "../../interfaces/BoardListData";
import {setIsLoading} from "../../redux";
import axios from "../../common/axiosInstance";

export const getBoardList = (setIsError:(boolean:boolean)=>void,url:string,setData:({}:BoardListData)=>void) : ThunkAction<any, RootState, unknown,Action> => {
    return async (dispatch) => {
        {
            setIsError(false);
            dispatch(setIsLoading(true));
            axios().get(url).then((response) => {
                setData(response.data.articles);
                dispatch(setIsLoading(false));
            }).catch((error) => {
                setIsError(true);
                dispatch(setIsLoading(false));
            }
            )
        }
    }
}