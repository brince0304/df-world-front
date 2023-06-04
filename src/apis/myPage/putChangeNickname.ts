import createInstance from "../index";
import {USER_DETAIL_UPDATE_NICKNAME_URL} from "../data/urls";

export default async function putChangeNickname (value:string) {
    return await createInstance.put(USER_DETAIL_UPDATE_NICKNAME_URL.replace("{nickname}", value));
}