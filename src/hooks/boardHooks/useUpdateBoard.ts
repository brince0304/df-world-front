import { useBoardService } from '../../context/boardServiceContext';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import useBoardSuccess from './useBoardSuccess';
import useBoardError from './useBoardError';

const useUpdateBoard = (boardId:string) => {
  const {updateBoard} = useBoardService();
  const {handleUpdateBoardSuccess} = useBoardSuccess();
  const {handleUpdateBoardError} = useBoardError();
  const {mutate: updateBoardMutation} = useMutation([QUERY_KEY.boards,boardId], updateBoard, {
    onSuccess: (data) => {
      handleUpdateBoardSuccess();
    },
    onError: (error:any) => {
      handleUpdateBoardError(error.response.data.message);
    }
  });

  return updateBoardMutation;
}

export default useUpdateBoard;