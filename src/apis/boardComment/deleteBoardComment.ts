import {BOARD_COMMENT_DELETE_URL} from "../../data/ApiUrl";
import createInstance from "../index";

export const deleteBoardComment = async (commentId: string) => {
    return await createInstance.delete(BOARD_COMMENT_DELETE_URL + commentId);
}