import createInstance from "../index";
import {USER_DETAIL_UPDATE_PASSWORD_URL} from "../data/urls";

export default async function putChangePassword (password : string, newPassword : string){
    return await createInstance.put(USER_DETAIL_UPDATE_PASSWORD_URL.replace("{password}", password).replace("{newPassword}", newPassword))
}