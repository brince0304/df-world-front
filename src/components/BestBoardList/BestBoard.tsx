import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import useBestBoardList from '../../hooks/boardHooks/queries/useBestBoardListQuery';
import StarIcon from '@mui/icons-material/Star';
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
          <StarIcon /> <Typography fontWeight={500}>인기글</Typography>
        </BestArticleTitle>
        {data?.length !== 0 && (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton onClick={handleLeftClick} disabled={index === 1}>
              <KeyboardDoubleArrowLeft />
            </IconButton>
            <Typography variant={'body2'}>
              {index}/{data?.length}
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
