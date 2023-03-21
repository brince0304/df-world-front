import createInstance from "../../common/axios";
import {CharactersData} from "../../interfaces/CharactersData";
import store, {RootState} from "../../redux/store";
import {setIsLoading, setProgress} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";

export const getCharacters = (setIsError:(boolean:boolean)=>void,setCharacterLoading:(boolean:boolean)=>void,url:string,setData:({}:CharactersData)=>void)
                              :ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch, getState) => {
        {
            dispatch(setIsLoading(true));
            setIsError(false);
            setIsLoading(true);
            const instance = createInstance(url);
            dispatch(setProgress(10));
            dispatch(setProgress(25));
            dispatch(setProgress(50));
            dispatch(setProgress(65));
            instance.get('').then((res:any)=>{
                setData(res.data.characters);
                setIsLoading(false);
                dispatch(setProgress(70));
                dispatch(setProgress(100));
                dispatch(setIsLoading(false));
            }).catch((err:any)=>{
                dispatch(setProgress(70));
                dispatch(setProgress(100));
                dispatch(setIsLoading(false));
                setIsError(true);
                setIsLoading(false);
            })}
    }
}

