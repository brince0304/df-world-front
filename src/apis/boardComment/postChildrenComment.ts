import { CommentForm } from '../../pages/Board/Detail';
import { BOARD_COMMENT_CHILDREN_POST_URL } from '../data/urls';
import createInstance from '../axiosClient';

export const postChildrenComment = async (commentId: string, boardId: string, data: CommentForm) => {
  const form = {
    commentId: commentId,
    boardId: boardId,
    commentContent: data.commentContent,
  };
  return await createInstance.post(BOARD_COMMENT_CHILDREN_POST_URL + commentId, form);
};