
import createInstance from "../index";

export const getBoardList = async (url:string) => {
    return await createInstance.get(url);}