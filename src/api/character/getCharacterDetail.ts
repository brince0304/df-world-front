import  {RootState} from "../../redux/store";
import createInstance from "../../common/axios";
import {CharacterDetails} from "../../interfaces/CharacterDetails";
import {pushSearchHistory, removeSearchHistory, setIsLoading, setProgress} from "../../redux";
import {SearchOption} from "../../interfaces/SeachBox";
import {Action, ThunkAction} from "@reduxjs/toolkit";

export const getCharacterDetail = (url:string,setData:({}:CharacterDetails)=>void): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch, getState) => {
        const instance = createInstance(url);
        try {
            dispatch(setIsLoading(true));
            dispatch(setProgress(10));
            dispatch(setProgress(25));
            const res = await instance.get('')
            dispatch(setProgress(50));
            const history = {
                id : res.data.characterAbility.characterId,
                title : res.data.characterAbility.characterName,
                content : res.data.characterAbility.serverName,
                footer : res.data.characterAbility.jobGrowName,
                optionValue1 : "레벨 "+res.data.characterAbility.level,
                optionValue2 : res.data.characterAbility.serverId,
                type : "character",
            } as SearchOption;
            const searchHistory = getState().searchHistory.searchHistory.searchHistory;
            dispatch(setProgress(65));
            const isExist = searchHistory.find((item:SearchOption)=>item.id === history.id);
            if(!isExist){
                if(searchHistory.length >4){
                      dispatch(removeSearchHistory(searchHistory[searchHistory.length-5].id));
                }
                dispatch(pushSearchHistory(history));
            }
            dispatch(setProgress(70));
            dispatch(setProgress(100));
            dispatch(setIsLoading(false));
            setData(res.data);
        } catch (error) {
            dispatch(setProgress(70));
            dispatch(setProgress(100));
            dispatch(setIsLoading(false));
            setIsLoading(false);
        }
    };
};

export const removeCharacterHistory  = (id:string): ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch, getState) => {
        dispatch(removeSearchHistory(id));
    };
}
