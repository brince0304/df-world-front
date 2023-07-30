import { IBoardService } from '../service/boardService';
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';

const boardServiceContext = createContext<IBoardService>({} as IBoardService);
export const useBoardService = () => useContext(boardServiceContext);

const BoardServiceProvider = ({ children, boardService }: { children: ReactNode; boardService: IBoardService }) => {
  const getBoardList = boardService.getBoardList.bind(boardService);
  const getBestBoardList = boardService.getBestBoardList.bind(boardService);
  const getLatestBoardList = boardService.getLatestBoardList.bind(boardService);
  const likeBoard = boardService.likeBoard.bind(boardService);
  const getBoardDetail = boardService.getBoardDetail.bind(boardService);
  const getHashtags = boardService.getHashtags.bind(boardService);
  const getBoardCountByHashtag = boardService.getBoardCountByHashtag.bind(boardService);
  const deleteBoard = boardService.deleteBoard.bind(boardService);
  const createBoard = boardService.createBoard.bind(boardService);
  const updateBoard = boardService.updateBoard.bind(boardService);

  return (
    <boardServiceContext.Provider
      value={{
        getBoardList,
        getBestBoardList,
        getLatestBoardList,
        likeBoard,
        getBoardDetail,
        getHashtags,
        getBoardCountByHashtag,
        deleteBoard,
        createBoard,
        updateBoard,
      }}
    >
      {children}
    </boardServiceContext.Provider>
  );
};

export default BoardServiceProvider;
