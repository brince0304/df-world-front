import axiosInstance from "../../common/axiosInstance";
import {USER_DETAIL_UPDATE_PASSWORD_URL} from "../../data/ApiUrl";

export default async function putChangePassword (password : string, newPassword : string){
    return await axiosInstance().put(USER_DETAIL_UPDATE_PASSWORD_URL.replace("{password}", password).replace("{newPassword}", newPassword))
}