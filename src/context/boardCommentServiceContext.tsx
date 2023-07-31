import { ReactNode, createContext, useContext } from "react";
import { IBoardCommentService } from "services/boardCommentService";

const BoardCommentServiceContext = createContext<IBoardCommentService>({} as IBoardCommentService);
export const useBoardCommentService = () => useContext(BoardCommentServiceContext);

const BoardCommentServiceProvider = ({ children, boardCommentService }: { children: ReactNode; boardCommentService: IBoardCommentService }) => {
    const getBoardComments = boardCommentService.getBoardComments.bind(boardCommentService);
    const createBoardComment = boardCommentService.createBoardComment.bind(boardCommentService);
    const updateBoardComment = boardCommentService.updateBoardComment.bind(boardCommentService);
    const deleteBoardComment = boardCommentService.deleteBoardComment.bind(boardCommentService);
    const getChildrenComments = boardCommentService.getChildrenComments.bind(boardCommentService);
    const createChildrenComment = boardCommentService.createChildrenComment.bind(boardCommentService);
    const likeComment = boardCommentService.likeComment.bind(boardCommentService);

    
    return (
        <BoardCommentServiceContext.Provider
        value={{
            getBoardComments,
            createBoardComment,
            updateBoardComment,
            deleteBoardComment,
            getChildrenComments,
            createChildrenComment,
            likeComment,}}>
        {children}
        </BoardCommentServiceContext.Provider>
    );
    }

export default BoardCommentServiceProvider;