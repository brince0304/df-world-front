import {BOARD_COMMENT_GET_URL} from "../data/urls";
import createInstance from "../index";



export const getBoardComment = async (boardId: string)  => {
    return await createInstance.get(BOARD_COMMENT_GET_URL + boardId);
}