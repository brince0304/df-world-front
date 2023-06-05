import createInstance from "../index";
import {BoardInsertDataProps} from "../../pages/Board/Write";
import {BOARD_UPDATE_URL} from "../data/urls";

export const putBoard = async (data:BoardInsertDataProps) =>{
    return await createInstance.put(BOARD_UPDATE_URL, data );
}