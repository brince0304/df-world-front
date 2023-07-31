import react, { Suspense } from 'react';
import React from 'react';
import styled from 'styled-components';
import CustomTable from '../CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import { boardCategories } from 'utils/boardUtil';
import Loading from 'components/Loading/Loading';
import LatestBoardList from './LatestBoardList';

const LatestBoard = () => {
  const [isSelected, setIsSelected] = react.useState('FREE');
  const navigate = useNavigate();
  const handleTypeTagClick = () => {
    navigate(`/boards?boardType=${isSelected}`);
  };
  return (
    <CustomTable
      menus={boardCategories}
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
        <Suspense fallback={<Loading />}>
          <LatestBoardList isSelected={isSelected} />
        </Suspense>
      </BoardBody>
    </CustomTable>
  );
};

export default LatestBoard;

const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  color: #000;
`;
