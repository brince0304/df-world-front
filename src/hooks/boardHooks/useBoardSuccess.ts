import useSuccess from '../useSuccess';

const useBoardSuccess = () => {
  const {handleSuccess} = useSuccess();
   const handleCreateBoardSuccess = () => {
      handleSuccess('게시글이 작성되었습니다. 🤩');
    }
    const handleUpdateBoardSuccess = () => {
      handleSuccess('게시글이 수정되었습니다. 🤩');
    }

    const handleDeleteBoardSuccess = () => {
      handleSuccess('게시글이 삭제되었습니다. 🤩');
    }

    return{
      handleCreateBoardSuccess,
      handleUpdateBoardSuccess,
      handleDeleteBoardSuccess,
    }

}

export default useBoardSuccess;