
import createInstance from "../index";

export const getBoardDetail = async (url:string) => {
    return await createInstance.get(url);
}