import { IAxiosClient } from 'AxiosClient/axiosClient';
import { CommentListData, CommentListDataComments } from 'interfaces/CommentListData';

export interface IBoardCommentService {
  getBoardComments(data: { boardId: string }): Promise<CommentListData>;
  getChildrenComments(data: { boardId: string; commentId: string }): Promise<CommentListDataComments[]>;
  likeComment(data: { boardId: string; commentId: string }): Promise<number>;
  createBoardComment(data: IBoardCommentRequest): Promise<number>;
  createChildrenComment(data: IBoardCommentUpdateChildrenRequest): Promise<number>;
  deleteBoardComment(data: { commentId: string }): Promise<void>;
  updateBoardComment(data: IBoardCommentUpdateChildrenRequest): Promise<number>;
}

export default class BoardCommentService implements IBoardCommentService {
  private axiosClient: IAxiosClient;
  private readonly getBoardCommentsUrl = '/comments/?boardId={boardId}';
  private readonly getChildrenCommentsUrl = '/comments/{boardId}/{commentId}';
  private readonly likeCommentUrl = '/comments/like-comment?boardId={boardId}&commentId={commentId}';
  private readonly createBoardCommentUrl = '/comments';
  private readonly createChildrenCommentUrl = '/comments?parentId={commentId}';
  private readonly deleteBoardCommentUrl = '/comments?commentId={commentId}';
  private readonly updateBoardCommentUrl = '/comments';

  constructor(axiosClient: IAxiosClient) {
    this.axiosClient = axiosClient;
  }
  getBoardComments(data: { boardId: string }): Promise<CommentListData> {
    return this.axiosClient.get(this.getBoardCommentsUrl.replace('{boardId}', data.boardId));
  }
  getChildrenComments(data: { boardId: string; commentId: string }): Promise<CommentListDataComments[]> {
    return this.axiosClient.get(
      this.getChildrenCommentsUrl.replace('{boardId}', data.boardId).replace('{commentId}', data.commentId),
    );
  }
  likeComment(data: { boardId: string; commentId: string }): Promise<number> {
    return this.axiosClient.post(
      this.likeCommentUrl.replace('{boardId}', data.boardId).replace('{commentId}', data.commentId),
    );
  }
  createBoardComment(data: IBoardCommentRequest): Promise<number> {
    const newData = {
      boardId: data.boardId,
      commentContent: data.commentContent,
    } as IBoardCommentRequest;
    return this.axiosClient.post(this.createBoardCommentUrl.replace('{boardId}', String(data.boardId)), newData);
  }
  createChildrenComment(data: IBoardCommentUpdateChildrenRequest): Promise<number> {
    return this.axiosClient.post(this.createChildrenCommentUrl.replace('{commentId}', String(data.commentId)), data);
  }
  deleteBoardComment(data: { commentId: string }): Promise<void> {
    return this.axiosClient.delete(this.deleteBoardCommentUrl.replace('{commentId}', data.commentId));
  }
  updateBoardComment(data: IBoardCommentUpdateChildrenRequest): Promise<number> {
    return this.axiosClient.put(this.updateBoardCommentUrl, data);
  }
}

export interface IBoardCommentRequest {
  boardId: number;
  commentContent: string;
}

export interface IBoardCommentUpdateChildrenRequest {
  boardId: number;
  commentContent: string;
  commentId: number;
}
