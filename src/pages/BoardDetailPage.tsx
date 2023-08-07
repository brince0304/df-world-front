import { Divider, Paper } from '@mui/material';
import { useParams } from 'react-router';
import React, { Suspense } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import BoardComments from 'components/BoardComment/BoardComments';
import BoardViewer from 'components/BoardViewer/BoardViewer';
import BestBoard from 'components/BestBoardList/BestBoard';
import BoardDetailSkeleton from '../components/Skeleton/BoardDetailSkeleton/BoardDetailSkeleton';
import MyContainer from '../components/application/MyContainer';

const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  return (
    <MyContainer>
      <Paper sx={{ padding: '5px 10px 5px 10px' }}>
        <Suspense fallback={<div>로딩중...</div>}>
          <BestBoard boardType="ALL" />
        </Suspense>
        <Suspense fallback={<BoardDetailSkeleton />}>
          <BoardViewer boardId={boardId || ''} />
        </Suspense>
        <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
        <BoardComments boardId={String(boardId)} />
      </Paper>
    </MyContainer>
  );
};

export default BoardDetailPage;
