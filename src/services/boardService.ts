import { IBoardList } from '../interfaces/IBoardList';
import { IBestBoard } from '../interfaces/IBestBoard';
import { IBoardDetail } from '../interfaces/IBoardDetail';
import { IHashtag } from '../interfaces/IHashtag';
import { IAxiosClient } from '../axiosClient/axiosClient';

export interface IBoardService {
  getBoardList(data: { boardType?: string; searchType?: string; keyword?: string; page: number }): Promise<IBoardList>;

  getBestBoardList(data: { boardType?: string }): Promise<IBestBoard[]>;

  getLatestBoardList(data: { boardType?: string }): Promise<IBoardList>;

  likeBoard(data: { boardId: string }): Promise<number>;

  getBoardDetail(data: { boardId: string }): Promise<IBoardDetail>;

  getHashtags(data: { hashtag: string }): Promise<IHashtag[]>;

  getBoardCountByHashtag(data: { hashtag: string }): Promise<number>;

  deleteBoard(data: { boardId: string }): Promise<void>;

  createBoard(data: IBoardRequest): Promise<number>;
  updateBoard(data: IBoardRequest): Promise<number>;
}

export default class BoardService implements IBoardService {
  private axiosClient: IAxiosClient;
  private readonly getBoardListUrl =
    '/boards?boardType={boardType}&searchType={searchType}&keyword={keyword}&page={page}';
  private readonly getBestBoardListUrl = '/boards/best?boardType={boardType}';
  private readonly getLatestBoardListUrl = '/boards/latest?boardType={boardType}';
  private readonly likeBoardUrl = '/boards/like?boardId={boardId}';
  private readonly getBoardDetailUrl = '/boards/{boardId}';
  private readonly getHashtagsUrl = '/hashtags/?query={hashtag}';
  private readonly getBoardCountByHashtagUrl = '/hashtags/{hashtag}';
  private readonly deleteBoardUrl = '/boards/{boardId}';
  private readonly createBoardUrl = '/boards';
  private readonly updateBoardUrl = '/boards';
  constructor(axiosClient: IAxiosClient) {
    this.axiosClient = axiosClient;
  }
  createBoard(data: IBoardRequest): Promise<number> {
    return this.axiosClient.post(this.createBoardUrl, data);
  }

  deleteBoard(data: { boardId: string }): Promise<void> {
    return this.axiosClient.delete(this.deleteBoardUrl.replace('{boardId}', data.boardId.toString()));
  }

  getBestBoardList(data: { boardType?: string }): Promise<IBestBoard[]> {
    return this.axiosClient.get(this.getBestBoardListUrl.replace('{boardType}', data.boardType || ''));
  }

  getBoardCountByHashtag(data: { hashtag: string }): Promise<number> {
    return this.axiosClient.get(this.getBoardCountByHashtagUrl.replace('{hashtag}', data.hashtag));
  }

  getBoardDetail(data: { boardId: string }): Promise<IBoardDetail> {
    return this.axiosClient.get(this.getBoardDetailUrl.replace('{boardId}', data.boardId));
  }

  getBoardList(data: { boardType?: string; searchType?: string; keyword?: string; page: number }): Promise<IBoardList> {
    const url = this.getBoardListUrl
      .replace('{boardType}', data.boardType || '')
      .replace('{searchType}', data.searchType || '')
      .replace('{keyword}', data.keyword || '')
      .replace('{page}', String(data.page));
    return this.axiosClient.get(url);
  }

  getHashtags(data: { hashtag: string }): Promise<IHashtag[]> {
    return this.axiosClient.get(this.getHashtagsUrl.replace('{hashtag}', data.hashtag));
  }

  getLatestBoardList(data: { boardType?: string }): Promise<IBoardList> {
    return this.axiosClient.get(this.getLatestBoardListUrl.replace('{boardType}', data.boardType || ''));
  }

  likeBoard(data: { boardId: string }): Promise<number> {
    return this.axiosClient.post(this.likeBoardUrl.replace('{boardId}', data.boardId), {});
  }

  updateBoard(data: IBoardRequest): Promise<number> {
    return this.axiosClient.put(this.updateBoardUrl, data);
  }
}

export interface IBoardRequest {
  id?: string;
  boardType: string;
  boardTitle: string;
  boardContent: string;
  hashtag: IHashtagRequest[];
  boardFiles: string;
  characterId?: string;
  serverId?: string;
}

export interface IHashtagRequest {
  value: string;
  __isValid: boolean;
}
