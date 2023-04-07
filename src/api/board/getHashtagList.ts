import axiosInstance from "../../common/axiosInstance";

export const getHashtagList = async (query:string) => {
    return await axiosInstance().get(`/hashtags/?query=${query}`);
}