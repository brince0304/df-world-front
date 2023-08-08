import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import useBestBoardList from '../../hooks/boardHooks/queries/useBestBoardListQuery';
import useBestBoardStates from 'hooks/boardHooks/useBestBoardStates';
import { BestArticleTitle } from '../../pages/BoardListPage';
import BestBoardList from './BestBoardList';

const BestBoard = (props: { boardType: string }) => {
  const { data } = useBestBoardList(props.boardType);
  const listLength = data?.length;
  const { index, handleLeftClick, handleRightClick } = useBestBoardStates(listLength || 0);
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <BestArticleTitle>
          <Typography fontWeight={500}>베스트</Typography>
        </BestArticleTitle>
        {data?.length !== 0 && (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton onClick={handleLeftClick} disabled={index === 1}>
              <KeyboardDoubleArrowLeft />
            </IconButton>
            <Typography fontWeight={'500'} fontSize={'1rem'}>
              {index}위
            </Typography>
            <IconButton onClick={handleRightClick} disabled={index === data?.length}>
              <KeyboardDoubleArrowRight />
            </IconButton>
          </div>
        )}
      </Box>
      <BestBoardList data={data || []} index={index} />
    </Box>
  );
};

export default BestBoard;
