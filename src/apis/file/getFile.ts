import axiosInstance from "../../common/axiosInstance";

export default async function getFile(url:string) {
    return await axiosInstance().get(url);
}