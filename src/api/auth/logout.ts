import {Dispatch} from "redux";
import createInstance from "../../common/axios";
import store, {
    UserDetail
} from "../../redux/store";
import {NavigateFunction} from "react-router-dom";
import {setHasNotification, setLogin, setLoginModalIsOpened, setUser} from "../../redux";

export const logout=(dispatch:Dispatch,navigate:NavigateFunction)=>{
    const instance = createInstance("/users/logout");
    instance.get('')
        .then((res:any)=>{
            store.dispatch(setLogin(false));
            store.dispatch(setUser({} as UserDetail));
            store.dispatch(setHasNotification(false));
            store.dispatch(setLoginModalIsOpened(false));
            alert("로그아웃 되었습니다.")
        })
        .catch((err:any)=>{
            console.log(err)
            alert("로그아웃 실패")
        })
}