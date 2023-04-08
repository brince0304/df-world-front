import {BOARD_COMMENT_CHILDREN_GET_URL, BOARD_COMMENT_CHILDREN_POST_URL} from "../../data/ApiUrl";
import axiosInstance from "../../common/axiosInstance";

export const getChildrenComment = async (boardId:string,commentId: string) => {
    return await axiosInstance().get(BOARD_COMMENT_CHILDREN_GET_URL.replace("{commentId}",commentId).replace("{boardId}",boardId));
}