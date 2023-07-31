import { Box, Container, Typography } from "@mui/material";
import BoardUserAvatar from "components/BoardUserAvatar/BoardUserAvatar";
import { useUserQuery } from "hooks/authHooks/queries/useUserQuery";
import BoardCommentForm from "./BoardCommentForm";
import useCreateBoardComment from "hooks/boardCommentHooks/mutations/useCreateBoardComment";
import { IBoardCommentRequest } from "services/boardCommentService";
import BoardCommentList from "./BoardCommentList";

const BoardComments = ({ boardId, commentCount }: IBoardCommentListProps) => {
    const { user } = useUserQuery();
    const createComment = useCreateBoardComment(boardId);
    const handleSubmit = (data:IBoardCommentRequest)=>{
        createComment(data);
    }
    return (
        <Container>
        <Typography sx={{ fontSize: '14px', marginLeft: 0, paddingBottom: '10px' }}>
        댓글 {commentCount}개
        </Typography>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: '10px',
          }}
        >
          <BoardUserAvatar src={user?.profileImgPath || ''} nickname={user?.nickname || '게스트'} />
        </Box>
        <BoardCommentForm boardId={boardId} onSubmit={handleSubmit} />
      </Box>
      <Box>
        <BoardCommentList boardId={boardId} />
      </Box>
      </Container>
    )
}

interface IBoardCommentListProps {
    boardId: string;
    commentCount: number;
}

export default BoardComments;