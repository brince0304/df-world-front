import { Box } from "@mui/material";
import BoardCommentForm from "./BoardCommentForm";
import useCreateChildrenComment from "hooks/boardCommentHooks/mutations/useCreateChildrenComment";
import useChildrenComments from "hooks/boardCommentHooks/queries/useChildrenComments";
import { CommentListDataComments } from "interfaces/CommentListData";
import BoardCommentItem from "./BoardCommentItem";
import { IBoardCommentUpdateChildrenRequest } from "services/boardCommentService";
import { ForwardedRef, forwardRef } from "react";

const BoardChildrenComments = ({boardId, commentId}: IBoardCommentListProps,ref:ForwardedRef<HTMLDivElement>) => {
    const childrenComments = useChildrenComments(boardId,commentId);
    const createChildrenComment = useCreateChildrenComment(boardId);
    const handleCreateChildrenComment = (data: IBoardCommentUpdateChildrenRequest) => {
        createChildrenComment({
            boardId: Number(boardId),
            commentId: Number(commentId),
            commentContent: data.commentContent,
        });
    };
    return (
        <Box ref={ref}>
        <BoardCommentForm
          boardId={boardId}
          onSubmit={handleCreateChildrenComment}
        />
        <Box>
          {childrenComments?.map((reply: CommentListDataComments) => {
            return (
              <BoardCommentItem
                key={reply.id}
                boardId={boardId}
                comment={reply}
              />
            );
          })}
        </Box>
      </Box>
    );
}

interface IBoardCommentListProps {
    boardId: string;
    commentId: string;
}

export default forwardRef(BoardChildrenComments);