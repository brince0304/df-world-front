import BoardData from "../../data/BoardData";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";
import {BoardListData} from "../../interfaces/BoardListData";
import {setIsLoading} from "../../redux";
import axios from "../../common/axiosInstance";

export const getBoardList = async (url:string) => {
    return await axios().get(url);}