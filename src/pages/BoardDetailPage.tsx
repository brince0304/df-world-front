import { Button, Container, Divider, Paper } from '@mui/material';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import BoardComments from 'components/BoardComment/BoardComments';
import BoardViewer from 'components/BoardViewer/BoardViewer';
import BestBoard from 'components/BestBoardList/BestBoard';
import BoardDetailSkeleton from '../components/Skeleton/BoardDetailSkeleton/BoardDetailSkeleton';

const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  let navigate = useNavigate();

  const handleNavigateToBoardList = () => {
    navigate(-1);
  };
  return (
    <Container maxWidth={'md'} sx={{ paddingTop: '20px' }}>
      <Paper sx={{ padding: '10px 20px 20px 20px' }}>
        <Suspense fallback={<div>로딩중...</div>}>
        <BestBoard boardType="ALL" />
        </Suspense>
        <Suspense fallback={<BoardDetailSkeleton/>}>
        <BoardViewer boardId={boardId || ''} />
        </Suspense>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
          <Button sx={{ marginRight: '10px' }} onClick={handleNavigateToBoardList}>
            <Typography
              sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Core Sans' }}
              color={'black'}
              component={'span'}
            >
              돌아가기
            </Typography>
          </Button>
          <Button onClick={() => {}}>
            <Typography
              sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Core Sans' }}
              color={'black'}
              component={'span'}
            >
              글쓰기
            </Typography>
          </Button>
        </Box>
        <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
        <BoardComments boardId={String(boardId)} />
      </Paper>
    </Container>
  );
};

export default BoardDetailPage;
