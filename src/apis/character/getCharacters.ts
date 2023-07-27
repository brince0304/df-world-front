import { CharactersData } from '../../interfaces/CharactersData';
import { RootState } from '../../redux/store';
import { setIsLoading } from '../../redux';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import createInstance from '../axiosClient';

export const getCharacters = (
  url: string,
  // eslint-disable-next-line no-empty-pattern
  setData: ({}: CharactersData) => void,
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    {
      dispatch(setIsLoading(true));
      setIsLoading(true);
      createInstance
        .get(url)
        .then((res: any) => {
          setData(res.data.characters);
          setIsLoading(false);
          dispatch(setIsLoading(false));
        })
        .catch((err: any) => {
          dispatch(setIsLoading(false));
          setIsLoading(false);
        });
    }
  };
};
