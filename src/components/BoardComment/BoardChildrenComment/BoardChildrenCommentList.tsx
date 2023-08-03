import useChildrenComments from 'hooks/boardCommentHooks/queries/useChildrenComments';
import BoardCommentItem from '../BoardCommentItem';
import { CommentListDataComments } from 'interfaces/CommentListData';

const BoardChildrenCommentList = ({ boardId, commentId }: IBoardCommentListProps) => {
  const childrenComments = useChildrenComments(boardId, commentId);
  return (
    <>
      {childrenComments?.map((reply: CommentListDataComments) => {
        return <BoardCommentItem key={reply.id} boardId={boardId} comment={reply} />;
      })}
    </>
  );
};

export default BoardChildrenCommentList;

interface IBoardCommentListProps {
  boardId: string;
  commentId: string;
}
