import axiosInstance from "../../common/axiosInstance";

export const postCharacterToUserAccount = async (url:string) => {
    return await axiosInstance().post(url);
}