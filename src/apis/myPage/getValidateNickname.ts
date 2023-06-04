import createInstance from "../index";
import {USER_VALIDATE_NICKNAME_URL} from "../../data/ApiUrl";

export default async function getValidateNickname (nickname: string) {
    return await createInstance.get(USER_VALIDATE_NICKNAME_URL.replace("{nickname}", nickname));
}