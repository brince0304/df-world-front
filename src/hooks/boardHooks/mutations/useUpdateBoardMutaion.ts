import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useUpdateBoardMutation = (boardId: string) => {
  const { updateBoard } = useBoardService();
  const { handleUpdateBoardSuccess } = useBoardSuccess();
  const { handleUpdateBoardError } = useBoardError();
  const { mutate: updateBoardMutation } = useMutation([QUERY_KEY.boards, boardId], updateBoard, {
    onSuccess: (data) => {
      handleUpdateBoardSuccess();
    },
    onError: (error: any) => {
      handleUpdateBoardError(error.response.data.message);
    },
  });

  return updateBoardMutation;
};

export default useUpdateBoardMutation;
function useBoardService(): { updateBoard: any } {
  throw new Error('Function not implemented.');
}

function useBoardSuccess(): { handleUpdateBoardSuccess: any } {
  throw new Error('Function not implemented.');
}

function useBoardError(): { handleUpdateBoardError: any } {
  throw new Error('Function not implemented.');
}
