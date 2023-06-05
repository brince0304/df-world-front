import createInstance from "../index";

export const postCharacterToUserAccount = async (url:string) => {
    try {
        return await createInstance.post(url);
    }catch (e) {
        throw e;
    }
}