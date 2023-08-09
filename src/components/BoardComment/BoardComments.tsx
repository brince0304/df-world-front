import BoardCommentForm from './BoardCommentForm';
import useCreateBoardCommentMutation from '../../hooks/boardCommentHooks/mutations/useCreateBoardCommentMutation';
import { IBoardCommentRequest } from 'services/boardCommentService';
import BoardCommentList from './BoardCommentList';
import { Suspense } from 'react';
import { countConsecutiveNewlines } from '../../utils/boardUtil';

const BoardComments = ({ boardId }: IBoardCommentListProps) => {
  const createComment = useCreateBoardCommentMutation(boardId);
  const handleSubmit = (data: IBoardCommentRequest) => {
    const content = data.commentContent;
    const count = countConsecutiveNewlines(content);
    console.info(count);
    if (count >= 3) {
      alert('연속된 줄바꿈은 3번까지만 가능합니다.');
      return;
    }
    createComment(data);
  };
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <BoardCommentList boardId={boardId} />
      </Suspense>
      <BoardCommentForm showProfile boardId={boardId} onSubmit={handleSubmit} />
    </>
  );
};

interface IBoardCommentListProps {
  boardId: string;
}

export default BoardComments;
