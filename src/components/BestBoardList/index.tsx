import { IconButton, ListItemButton } from '@mui/material';
import React  from 'react';
import Typography from '@mui/material/Typography';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import BestBoardListItem from './BestBoardListItem';
import useBestBoardList from '../../hooks/boardHooks/useBestBoardList';
import StarIcon from '@mui/icons-material/Star';
import { BestArticleTitle } from '../../pages/Board';
import { BOARD_DETAIL_URL } from '../../apis/data/urls';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useBestBoardStates from '../../hooks/useBestBoardStates';

const BestBoardList = (props:{boardType:string}) => {
  const {data} = useBestBoardList(props.boardType);
  const listLength = data?.length;
  const {index,handleLeftClick,handleRightClick} = useBestBoardStates(listLength || 0);
  const navigate = useNavigate();
  const handleBestArticleNavigate = (id: number) => {
    navigate(BOARD_DETAIL_URL + `${id}`);
  };
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <BestArticleTitle>
          <StarIcon /> <Typography fontFamily={'Core Sans'}>인기글</Typography>
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
      </div>
      {data?.length !== 0 && (
        <ListItemButton
          id={'chip-container'}
          sx={{ padding: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'auto' }}
        >
          {data?.map((item, chipIndex) => (
            <BestBoardListItem item={item} chipIndex={chipIndex} index={index} handleNavigate={handleBestArticleNavigate} />
          ))}
        </ListItemButton>
      )}
      {data?.length === 0 &&
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
      }
    </div>
  );
};

export default BestBoardList;
