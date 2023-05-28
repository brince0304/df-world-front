import {CommentForm} from "../../pages/Board/Detail";
import axiosInstance from "../../common/axiosInstance";
import {BOARD_COMMENT_CHILDREN_POST_URL} from "../../data/ApiUrl";

export const postChildrenComment = async (commentId: string, boardId: string, data: CommentForm) => {
    const form = {
        commentId: commentId,
        boardId: boardId,
        commentContent: data.commentContent,
    }
    return await axiosInstance().post(BOARD_COMMENT_CHILDREN_POST_URL+commentId, form);
}