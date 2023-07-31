import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "constants/myConstants";
import { useBoardCommentService } from "context/boardCommentServiceContext";
import useBoardCommentError from "../useBoardCommentError";
import useBoardCommentSuccess from "../useBoardCommentSuccess";

const useCreateChildrenComment = (boardId: string) => {
    const { createChildrenComment } = useBoardCommentService();
    const { handleBoardCommentCreateSuccess } = useBoardCommentSuccess();
    const { handleBoardCommentCreateError } = useBoardCommentError();
    const { mutate: createChildrenCommentMutation } = useMutation([QUERY_KEY.boardComments, boardId], createChildrenComment, {
        onError: (error) => {
            handleBoardCommentCreateError(error as string);
        },
        onSuccess: (data) => {
            handleBoardCommentCreateSuccess();
        },
    });
    return createChildrenCommentMutation;
}

export default useCreateChildrenComment;