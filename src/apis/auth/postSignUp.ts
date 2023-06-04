import {USER_REGISTER_URL} from "../data/urls";
import createInstance from "../index";
import {RegisterFormProps} from "../data";


export async function postSignUp(data: RegisterFormProps) {
    try{
    const response = await createInstance.post(USER_REGISTER_URL, {
        userId: data.userId,
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck
    })
    return response.data}
    catch(error){
        throw error;
    }
}