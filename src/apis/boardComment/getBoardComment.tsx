import {BOARD_COMMENT_GET_URL} from "../../data/ApiUrl";
import createInstance from "../index";



export const getBoardComment = async (boardId: string)  => {
    return await createInstance.get(BOARD_COMMENT_GET_URL + boardId);
}