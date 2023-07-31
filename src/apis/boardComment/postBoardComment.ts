import { BOARD_COMMENT_POST_URL } from '../data/urls';
import { AxiosResponse } from 'axios';
import { ICommentFormProps } from '../../pages/Board/Detail';
import createInstance from '../axiosClient';

export function postBoardComment(postData: ICommentFormProps, boardId: string): Promise<AxiosResponse> {
  const requestForm = {
    boardId: boardId,
    commentContent: postData.commentContent,
  };
  return createInstance.post(BOARD_COMMENT_POST_URL, requestForm);
}
