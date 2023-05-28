import axiosInstance from "../../common/axiosInstance";
import {BOARD_DELETE_URL} from "../../data/ApiUrl";

export const deleteBoard = async (boardId: string) => {
    return await axiosInstance().delete(BOARD_DELETE_URL + boardId);
}