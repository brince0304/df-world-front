
import axiosInstance from "../../common/axiosInstance";

export const getBoardDetail = async (url:string) => {
    return await axiosInstance().get(url);
}