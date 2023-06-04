import createInstance from "../index";

export const getHashtagList = async (query:string) => {
    return await createInstance.get(`/hashtags/?query=${query}`);
}