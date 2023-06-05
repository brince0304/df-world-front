import createInstance from "../index";
import {USER_DETAIL_URL} from "../data/urls";

export const  getUser = async () => {
    try {
        const response = await createInstance.get(USER_DETAIL_URL);
        return response.data;
    }catch (e) {
        throw e;
    }
}
