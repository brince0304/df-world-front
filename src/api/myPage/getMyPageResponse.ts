import {MyPageResponse} from "../../interfaces/MyPageResponse";
import axiosInstance from "../../common/axiosInstance";

export default async function getMyPageResponse() {
    return await axiosInstance().get<MyPageResponse>('/users/');
}