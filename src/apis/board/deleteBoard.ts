import createInstance from "../index";
import {BOARD_DELETE_URL} from "../../data/ApiUrl";

export const deleteBoard = async (boardId: string) => {
    return await createInstance.delete(BOARD_DELETE_URL + boardId);
}