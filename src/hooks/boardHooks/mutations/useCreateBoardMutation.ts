import { useBoardService } from '../../../context/boardServiceContext';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import useBoardSuccess from '../useBoardSuccess';
import useBoardError from '../useBoardError';
import { useNavigate } from 'react-router-dom';

const useCreateBoardMutation = () => {
  const { createBoard } = useBoardService();
  const { handleCreateBoardSuccess } = useBoardSuccess();
  const { handleCreateBoardError } = useBoardError();
  const navigate = useNavigate();
  const { mutate: createBoardMutation } = useMutation([QUERY_KEY.boards], createBoard, {
    onSuccess: (data) => {
      handleCreateBoardSuccess();
      navigate(`/boards/${data}`);
    },
    onError: (error: any) => {
      handleCreateBoardError(error);
    },
  });

  return createBoardMutation;
};

export default useCreateBoardMutation;
