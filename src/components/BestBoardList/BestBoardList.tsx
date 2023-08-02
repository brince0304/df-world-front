import { Box, ListItemButton, Typography } from '@mui/material';
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
      {data?.length !== 0 && (
        <ListItemButton
          id={'chip-container'}
          sx={{ padding: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'auto' }}
        >
          {data?.map((item, chipIndex) => (
            <BestBoardListItem
              item={item}
              chipIndex={chipIndex}
              index={index}
              handleNavigate={handleBestArticleNavigate}
            />
          ))}
        </ListItemButton>
      )}
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
          <Typography fontFamily={'Core Sans'} fontSize={'15px'}>
            인기 게시글이 없습니다.
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
