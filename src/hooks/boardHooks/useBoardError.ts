import useError from 'hooks/uiHooks/useError';

const useBoardError = () => {
  const { handleError } = useError();

  const handleCreateBoardError = (message: string) => {
    handleError(`글 작성에 실패했습니다. 😭 ${message}`);
  };

  const handleUpdateBoardError = (message: string) => {
    handleError(`글 수정에 실패했습니다. 😭 ${message}`);
  };

  const handleDeleteBoardError = (message: string) => {
    handleError(`글 삭제에 실패했습니다. 😭 ${message}`);
  };

  return {
    handleCreateBoardError,
    handleUpdateBoardError,
    handleDeleteBoardError,
  };
};

export default useBoardError;
