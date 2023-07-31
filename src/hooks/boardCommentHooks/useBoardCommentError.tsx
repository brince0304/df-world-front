import useError from "hooks/uiHooks/useError"

const useBoardCommentError = () => {
    const {handleError} = useError();
    const handleBoardCommentUpdateError = () => {
        handleError("댓글 수정에 실패했습니다. 😰");
    }
    const handleBoardCommentCreateError = (message: string) => {
        handleError(`댓글 작성에 실패했습니다. 😰 ${message}`);
    }

    const handleBoardCommentDeleteError = () => {
        handleError("댓글 삭제에 실패했습니다. 😰");
    }

    return {
        handleBoardCommentUpdateError,
        handleBoardCommentCreateError,
        handleBoardCommentDeleteError
    }
}

export default useBoardCommentError;
