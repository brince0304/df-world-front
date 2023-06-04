import {CharactersData} from "../../interfaces/CharactersData";
import store, {RootState} from "../../redux/store";
import {setIsLoading, setProgress} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import createInstance from "../index";

export const getCharacters = (setIsError:(boolean:boolean)=>void,url:string,setData:({}:CharactersData)=>void)
                              :ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch) => {
        {
            dispatch(setIsLoading(true));
            setIsError(false);
            setIsLoading(true);
            createInstance.get(url).then((res:any)=>{
                setData(res.data.characters);
                setIsLoading(false);
                dispatch(setIsLoading(false));
            }).catch((err:any)=>{
                dispatch(setIsLoading(false));
                setIsError(true);
                setIsLoading(false);
            })}
    }
}

