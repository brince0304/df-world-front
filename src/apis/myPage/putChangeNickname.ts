import axiosInstance from "../../common/axiosInstance";
import {USER_DETAIL_UPDATE_NICKNAME_URL} from "../../data/ApiUrl";

export default async function putChangeNickname (value:string) {
    return await axiosInstance().put(USER_DETAIL_UPDATE_NICKNAME_URL.replace("{nickname}", value));
}