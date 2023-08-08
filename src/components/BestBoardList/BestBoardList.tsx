import { Box, Typography } from '@mui/material';
import BestBoardListItem from './BestBoardListItem';
import { IBestBoard } from 'interfaces/IBestBoard';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_URL } from 'apis/data/urls';

const BestBoardList = ({ data, index }: IBestBoardListProps) => {
  const navigate = useNavigate();
  const handleBestArticleNavigate = (id: number) => {
    navigate(BOARD_DETAIL_URL + `${id}`);
  };
  return (
    <Box>
      {data?.length !== 0 &&
        data.map((item, chipIndex) => (
          <BestBoardListItem
            key={chipIndex}
            item={item}
            chipIndex={chipIndex}
            index={index}
            handleNavigate={handleBestArticleNavigate}
          />
        ))}
      {data?.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: '10px',
          }}
        >
          <Typography fontSize={'1.1rem'} fontWeight={'bold'}>
            베스트 게시글이 없습니다.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BestBoardList;

interface IBestBoardListProps {
  data: IBestBoard[];
  index: number;
}
