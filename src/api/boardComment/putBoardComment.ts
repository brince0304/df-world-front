import {CommentForm} from "../../components/application/board/BoardDetail";
import axiosInstance from "../../common/axiosInstance";
import {BOARD_COMMENT_UPDATE_URL} from "../../data/ApiUrl";

export const putBoardComment = async (commentId: string,boardId:string, data:CommentForm) => {
    const form = {
        commentId: commentId,
        boardId: boardId,
        commentContent: data.commentContent,
    }
    return await axiosInstance().put(BOARD_COMMENT_UPDATE_URL, form);
}