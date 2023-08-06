import { CommentListDataComments } from 'interfaces/CommentListData';
import useChildrenCommentsQuery from '../../../hooks/boardCommentHooks/queries/useChildrenCommentsQuery';
import BoardChildrenCommentListItem from './BoardChildrenCommentListItem';

const BoardChildrenCommentList = ({ boardId, parentId }: IBoardCommentListProps) => {
  const childrenComments = useChildrenCommentsQuery(boardId, parentId);
  return (
    <>
      {childrenComments?.map((reply: CommentListDataComments) => {
        return <BoardChildrenCommentListItem key={reply.id} boardId={boardId} comment={reply} />;
      })}
    </>
  );
};

export default BoardChildrenCommentList;

interface IBoardCommentListProps {
  boardId: string;
  parentId: string;
}
