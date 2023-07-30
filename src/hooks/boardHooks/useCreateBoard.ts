import { useBoardService } from '../../context/boardServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import useBoardSuccess from './useBoardSuccess';
import useBoardError from './useBoardError';
import { useNavigate } from 'react-router-dom';

const useCreateBoard = () => {
  const {createBoard} = useBoardService();
  const {handleCreateBoardSuccess} = useBoardSuccess();
  const {handleCreateBoardError} = useBoardError();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {mutate: createBoardMutation} = useMutation([QUERY_KEY.boards], createBoard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.boards]);
      handleCreateBoardSuccess();
      navigate(`/boards/${data}`);
    },
    onError: (error:any) => {
      handleCreateBoardError(error.response.data.message);
    }
  });

  return createBoardMutation;
}

export default useCreateBoard;