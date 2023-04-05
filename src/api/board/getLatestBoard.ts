import createInstance from "../../common/axiosInstance";
import axios from "../../common/axiosInstance";
import {LATEST_BOARD_URL} from "../../data/ApiUrl";

export const getLatestBoard = async (setIsError:(boolean:boolean)=>void,setIsLoading:(boolean:boolean)=>void,url:string,isSelected:string,setData:([])=>void) => {
    setIsError(false);
    setIsLoading(true);
       axios().get(LATEST_BOARD_URL+isSelected).then((res:any)=>{
        if (res.data.content.length > 5) {
            res.data.content = res.data.content.slice(0, 5);
        }
        setData(res.data.content);
        setIsLoading(false);
    }).catch((err:any)=>{
        setIsError(true);
        setIsLoading(false);
    })}