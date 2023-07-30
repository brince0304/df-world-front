import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { IconButton, Slide, styled } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { DragHandleRounded, HighlightOffOutlined } from '@mui/icons-material';
import { BOARD_WRITE_URL } from '../../../apis/data/urls';

const actions = [
  { icon: <ModeIcon />, name: '글쓰기' },
  { icon: <SearchIcon />, name: '검색' },
];

function BoardSpeedDial(props: { boardType: string }) {
  const [searchBoxIsOpened, setSearchBoxIsOpened] = useState(false);
  const navigate = useNavigate();
  const handleOpenSearchBox = () => {
    setSearchBoxIsOpened(!searchBoxIsOpened);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e.currentTarget.dataset.id;
    if (id === '글쓰기') {
      navigate(BOARD_WRITE_URL + `?type=${props.boardType}&request=add`);
    } else if (id === '검색') {
      handleOpenSearchBox();
    }
  };
  return (
    <CustomBox>
      <Slide in={searchBoxIsOpened} direction={'left'}>
        <SearchboxWrapper>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              zIndex: 1000,
            }}
            onClick={handleOpenSearchBox}
          >
            <HighlightOffOutlined />
          </IconButton>
        </SearchboxWrapper>
      </Slide>
      <SpeedDial direction={'up'} ariaLabel="SpeedDial basic example" sx={{}} icon={<DragHandleRounded />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            data-id={action.name}
            onClick={handleClick}
          />
        ))}
      </SpeedDial>
    </CustomBox>
  );
}

const CustomBox = styled(Box)`
  display: none;
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const SearchboxWrapper = styled(Box)`
  position: fixed;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 40px;
  right: 100px;
  z-index: 1000;
  width: 350px;
  height: 40px;
`;

export default BoardSpeedDial;
