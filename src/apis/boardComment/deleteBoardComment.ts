import { BOARD_COMMENT_DELETE_URL } from '../data/urls';
import createInstance from '../axiosClient';

export const deleteBoardComment = async (commentId: string) => {
  return await createInstance.delete(BOARD_COMMENT_DELETE_URL + commentId);
};