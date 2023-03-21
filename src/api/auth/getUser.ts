import {Dispatch} from "redux";
import createInstance from "../../common/axios";
import UserDetail from "../../redux/store";
import {setHasNotification, setLogin, setUser} from "../../redux";

export const getUser=( dispatch:Dispatch)=>{
    const instance = createInstance("/users/details");
    instance.get('')
        .then((res:any)=>{
            if(res.data.user){
                dispatch(setUser(res.data.user));
                dispatch(setLogin(true));
                if(res.data.notification>0){
                    dispatch(setHasNotification(true));
                }
            }else{
                dispatch(setUser({}));
                dispatch(setLogin(false))
                dispatch(setHasNotification(false));
            }
        })
        .catch((err:any)=>{
            console.log(err)
            dispatch(setUser({}));
            dispatch(setLogin(false));
            dispatch(setHasNotification(false));
        })
}