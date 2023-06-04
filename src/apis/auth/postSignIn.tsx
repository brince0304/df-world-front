import axiosInstance from "../index";
import {USER_LOGIN_URL} from "../data/urls";
export const postSignIn=async (data:{username:string, password:string}) => {
    try{
        const response = await axiosInstance.post(USER_LOGIN_URL,data);
        return response.data
    }catch(error){
        throw error;
    }
}

