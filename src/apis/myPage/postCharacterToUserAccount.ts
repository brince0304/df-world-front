import createInstance from "../index";

export const postCharacterToUserAccount = async (url:string) => {
    return await createInstance.post(url);
}