import createInstance from "../index";
import {BoardInsertDataProps} from "../../pages/Board/Write";
import {BOARD_UPDATE_URL} from "../../data/ApiUrl";

export const putBoard = async (data:BoardInsertDataProps) =>{
    return await createInstance.put(BOARD_UPDATE_URL, data );
}