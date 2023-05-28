import axiosInstance from "../../common/axiosInstance";
import {BoardInsertDataProps} from "../../pages/Board/Write";
import {BOARD_UPDATE_URL} from "../../data/ApiUrl";

export const putBoard = async (data:BoardInsertDataProps) =>{
    return await axiosInstance().put(BOARD_UPDATE_URL, data );
}