import axiosInstance from "../../common/axiosInstance";
import {BOARD_COMMENT_DELETE_URL} from "../../data/ApiUrl";

export const deleteBoardComment = async (commentId: string) => {
    return await axiosInstance().delete(BOARD_COMMENT_DELETE_URL + commentId);
}