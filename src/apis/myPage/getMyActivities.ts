import createInstance from "../index";
import {USER_ACTIVITIES_GET_URL} from "../../data/ApiUrl";


export const  getMyActivities = async (type: 'board' | 'comment' | 'notification', sortBy: 'like'|'commentCount'|'view'|'', page: number) => {
        return await createInstance.get(USER_ACTIVITIES_GET_URL.replace('{type}', type).replace('{sortBy}', sortBy).replace('{page}', page.toString()));
}