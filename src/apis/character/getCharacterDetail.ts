import { RootState } from '../../redux/store';
import { pushCharacterHistory, removeCharacterHistory, setIsLoading, setProgress } from '../../redux';
import { SearchOption } from '../../interfaces/SeachBox';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import createInstance from '../axiosClient';

export const getCharacterDetail = (
  url: string,
  setData: (...args: any[]) => void,
  setIsError: (isError: boolean) => void,
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    createInstance
      .get(url)
      .then((res) => {
        const history = {
          id: res.data.characterAbility.characterId,
          title: res.data.characterAbility.characterName,
          content: res.data.characterAbility.serverName,
          footer: res.data.characterAbility.jobGrowName,
          optionValue1: '레벨 ' + res.data.characterAbility.level,
          optionValue2: res.data.characterAbility.serverId,
          type: 'character',
        } as SearchOption;
        const searchHistory = getState().history.characterHistory;
        dispatch(setProgress(65));
        const isExist = searchHistory.find((item: SearchOption) => item.id === history.id);
        if (!isExist) {
          if (searchHistory.length > 4) {
            dispatch(removeCharacterHistory(searchHistory[searchHistory.length - 5].id));
          }
          dispatch(pushCharacterHistory(history));
        }
        dispatch(setIsLoading(false));
        setData(res.data);
        setIsError(false);
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        setIsLoading(false);
        setIsError(true);
      });
  };
};
