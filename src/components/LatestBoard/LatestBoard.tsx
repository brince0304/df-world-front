import react, { Suspense } from 'react';
import React from 'react';
import MyTable from '../MyTable/MyTable';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import { boardCategoriesWithoutNotice } from 'utils/boardUtil';
import Loading from '../Fallbacks/Loading';
import LatestBoardList from './LatestBoardList';
import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../Fallbacks/Error';

const LatestBoard = () => {
  const [isSelected, setIsSelected] = react.useState('FREE');
  const navigate = useNavigate();
  const handleTypeTagClick = () => {
    navigate(`/boards?boardType=${isSelected}`);
  };
  return (
    <MyTable
      menus={boardCategoriesWithoutNotice}
      title={'통합 게시판'}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      useMenu={true}
      useIcon={true}
      icon={
        <IconButton onClick={handleTypeTagClick}>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </IconButton>
      }
    >
      <BoardBody>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <LatestBoardList isSelected={isSelected} />
          </Suspense>
        </ErrorBoundary>
      </BoardBody>
    </MyTable>
  );
};

export default LatestBoard;

const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #000;
`;
