import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useUpdateBoardMutation = (boardId: string) => {
  const { updateBoard } = useBoardService();
  const { handleUpdateBoardSuccess } = useBoardSuccess();
  const { handleUpdateBoardError } = useBoardError();
  const { mutate: updateBoardMutation } = useMutation([QUERY_KEY.boards, boardId], updateBoard, {
    onSuccess: () => {
      handleUpdateBoardSuccess();
    },
    onError: () => {
      handleUpdateBoardError('게시글 수정에 실패했습니다. 😭');
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
