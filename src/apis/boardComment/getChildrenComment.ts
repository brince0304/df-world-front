import {BOARD_COMMENT_CHILDREN_GET_URL, BOARD_COMMENT_CHILDREN_POST_URL} from "../data/urls";
import createInstance from "../index";

export const getChildrenComment = async (boardId:string,commentId: string) => {
    return await createInstance.get(BOARD_COMMENT_CHILDREN_GET_URL.replace("{commentId}",commentId).replace("{boardId}",boardId));
}