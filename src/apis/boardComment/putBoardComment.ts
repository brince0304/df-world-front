import {CommentForm} from "../../pages/Board/Detail";
import {BOARD_COMMENT_UPDATE_URL} from "../data/urls";
import createInstance from "../index";

export const putBoardComment = async (commentId: string,boardId:string, data:CommentForm) => {
    const form = {
        commentId: commentId,
        boardId: boardId,
        commentContent: data.commentContent,
    }
    return await createInstance.put(BOARD_COMMENT_UPDATE_URL, form);
}