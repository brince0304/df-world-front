import { useBoardService } from '../../../context/boardServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import useBoardSuccess from '../useBoardSuccess';
import useBoardError from '../useBoardError';
import { useNavigate } from 'react-router-dom';

const useCreateBoardMutation = () => {
  const { createBoard } = useBoardService();
  const { handleCreateBoardSuccess } = useBoardSuccess();
  const { handleCreateBoardError } = useBoardError();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createBoardMutation } = useMutation([QUERY_KEY.boards], createBoard, {
    onSuccess: (data) => {
      handleCreateBoardSuccess();
      navigate(`/boards/${data}`);
      queryClient.invalidateQueries([QUERY_KEY.boards]);
      queryClient.invalidateQueries([QUERY_KEY.latestBoardList]);
    },
    onError: (error: any) => {
      handleCreateBoardError(error.response.data);
    },
  });

  return createBoardMutation;
};

export default useCreateBoardMutation;
