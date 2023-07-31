import useSuccess from 'hooks/uiHooks/useSuccess';

const useBoardCommentSuccess = () => {
  const { handleSuccess } = useSuccess();

  const handleBoardCommentUpdateSuccess = () => {
    handleSuccess('댓글 수정에 성공했습니다. 😎');
  };

  const handleBoardCommentCreateSuccess = () => {
    handleSuccess('댓글 작성에 성공했습니다. 😎');
  };

  const handleBoardCommentDeleteSuccess = () => {
    handleSuccess('댓글 삭제에 성공했습니다. 😎');
  };

  return {
    handleBoardCommentUpdateSuccess,
    handleBoardCommentCreateSuccess,
    handleBoardCommentDeleteSuccess,
  };
};

export default useBoardCommentSuccess;
