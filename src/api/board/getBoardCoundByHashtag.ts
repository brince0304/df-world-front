import axiosInstance from "../../common/axiosInstance";

export const getBoardCoundByHashtag = async (tag:string) => {
    return await axiosInstance().get(`/hashtags/${tag}`);
}