import createInstance from "../index";
import {Content} from "../../interfaces/CharactersData";

export const getCharacterList = async (url:string) => {
    return await createInstance.get<Content[]>(url);
}