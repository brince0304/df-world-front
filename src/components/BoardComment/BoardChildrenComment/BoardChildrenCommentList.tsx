import BoardCommentItem from '../BoardCommentItem';
import { CommentListDataComments } from 'interfaces/CommentListData';

const BoardChildrenCommentList = ({ childrenComments }: IBoardCommentListProps) => {
  return (
    <>
      {childrenComments.map((reply: CommentListDataComments) => {
        return <BoardCommentItem key={reply.id} boardId={reply.boardId} comment={reply} />;
      })}
    </>
  );
};

export default BoardChildrenCommentList;

interface IBoardCommentListProps {
  childrenComments: CommentListDataComments[];
}
