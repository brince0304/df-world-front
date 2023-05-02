import axios from "../../common/axiosInstance";
import {BOARD_GET_CHARACTERS_URL} from "../../data/ApiUrl";
import {Content} from "../../interfaces/CharactersData";

export const getCharacterList = async (url:string) => {
    return await axios().get<Content[]>(url);
}