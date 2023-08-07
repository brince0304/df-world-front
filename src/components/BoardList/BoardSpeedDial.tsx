import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { IconButton, Slide, styled, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DragHandleRounded, HighlightOffOutlined } from '@mui/icons-material';
import { BOARD_LIST_URL, BOARD_WRITE_URL } from '../../apis/data/urls';
import SearchForm from '../SearchForm/SearchForm';
import { boardSearchTypes, getSearchType } from '../../utils/boardUtil';
import useSearchForm from '../../hooks/uiHooks/useSearchForm';
import SearchIcon from '@mui/icons-material/Search';
import ModeIcon from '@mui/icons-material/Mode';
import useError from '../../hooks/uiHooks/useError';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';

function BoardSpeedDial({ boardType, keyword, searchType }: IBoardSpeedDialProps) {
  const [searchBoxIsOpened, setSearchBoxIsOpened] = useState(false);
  const navigate = useNavigate();
  const { handleError } = useError();
  const { user } = useUserQuery();
  const handleOpenSearchBox = () => {
    setSearchBoxIsOpened(!searchBoxIsOpened);
  };
  const actions = [
    { icon: <ModeIcon />, name: '글쓰기' },
    { icon: <SearchIcon />, name: '검색' },
  ];

  const handleNavigateToSearchResult = (searchType: string, searchKeyword: string) => {
    navigate(BOARD_LIST_URL + `?searchType=${searchKeyword}&keyword=${searchType}&boardType=${boardType}`);
  };

  const searchFormProps = useSearchForm({
    initialValues: keyword,
    initialSelectedValue: {
      value: searchType || 'title',
      label: getSearchType(searchType) || '제목',
    },
  });
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = e.currentTarget.dataset.id;
    if (id === '글쓰기') {
      if (!user) {
        handleError('로그인이 필요합니다. 😤');
        return;
      }
      navigate(BOARD_WRITE_URL + `?type=${boardType}&request=add`);
    } else if (id === '검색') {
      handleOpenSearchBox();
    }
  };
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <CustomBox>
      <SpeedDialWrapper>
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
        <Slide in={searchBoxIsOpened} direction={'left'} style={{ zIndex: '1000' }}>
          <SearchboxWrapper
            sx={{
              width: isMobile ? '270px' : '350px',
              right: isMobile ? '70px' : '100px',
            }}
          >
            <SearchForm
              placeholder={'검색'}
              direction={'up'}
              filterOptions={boardSearchTypes}
              handleSubmit={handleNavigateToSearchResult}
              useSearchForms={searchFormProps}
              setIsFocus={() => {}}
            />
            <IconButton
              sx={{
                backgroundColor: 'white',
                padding: '0px',
                position: 'absolute',
                top: '-40%',
                right: '-5%',
                zIndex: 1020,
              }}
              onClick={handleOpenSearchBox}
            >
              <HighlightOffOutlined />
            </IconButton>
          </SearchboxWrapper>
        </Slide>
      </SpeedDialWrapper>
    </CustomBox>
  );
}

interface IBoardSpeedDialProps {
  boardType: string;
  keyword: string;
  searchType: string;
}

const SpeedDialWrapper = styled(Box)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 150;
  @media (min-width: 800px) {
    right: 10%;
  }
  @media (min-width: 1200px) {
    right: 23%;
  }
`;

const CustomBox = styled(Box)`
  display: block;
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 100;
`;

const SearchboxWrapper = styled(Box)`
  position: absolute;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 5%;
  right: 100px;
  z-index: 200;
  width: 350px;
  height: 40px;
`;

export default BoardSpeedDial;
