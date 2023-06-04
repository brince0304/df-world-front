import createInstance from "../index";

export const getBoardCoundByHashtag = async (tag:string) => {
    return await createInstance.get(`/hashtags/${tag}`);
}