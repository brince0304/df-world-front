import createInstance from '../axiosClient';
import { BoardInsertDataProps } from '../../pages/Board/Write';
import { NavigateFunction } from 'react-router-dom';

export const postBoard = async (boardData: BoardInsertDataProps, navigate: NavigateFunction) => {
  createInstance.post('/boards', boardData).then((res) => {
    const boardId = res.data;
    if (boardId) {
      navigate(`/boards/${boardId}`);
    }
  });
};
