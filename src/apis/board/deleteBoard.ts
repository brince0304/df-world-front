import createInstance from '../axiosClient';
import { BOARD_DELETE_URL } from '../data/urls';

export const deleteBoard = async (boardId: string) => {
  return await createInstance.delete(BOARD_DELETE_URL + boardId);
};