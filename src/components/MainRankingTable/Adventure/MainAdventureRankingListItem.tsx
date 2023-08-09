import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Grid } from '@mui/material';
import RankingValue from '../Character/RankingValue';
import { MainAdventureFameResponseChild } from '../../../interfaces/IMainAdventureRankingResponse';
import styled from '@emotion/styled';
import MainAdventureAvatars from './MainAdventureAvatars';

const MainAdventureRankingListItem = ({ item, index, type }: IMainAdventureRankingListItemProps) => {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/characters/${'adventure'}?name=${item.adventureName}`);
  };
  const rankValue = type === 'adventureFame' ? item.adventureFame : item.adventureDamageIncreaseAndBuffPower;
  return (
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
      <TableRow onClick={onClick}>
        <p
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#121212',
            color: 'white',
          }}
        >
          {index + 1}
        </p>
        <div style={{ height: '100%' }}>
          <MainAdventureAvatars characters={item.characters} />
        </div>
        <div>
          <TableData>
            <RankingDetailNameText>{`<${item.adventureName}>`}</RankingDetailNameText>
            <RankingDetailText>{item.serverName}</RankingDetailText>
            <RankingDetailText>{item.representCharacterName}</RankingDetailText>
          </TableData>
        </div>
        <div>
          <TableData>
            <RankingValue type={'adventureFame'} value={rankValue} />
          </TableData>
        </div>
      </TableRow>
    </Grid>
  );
};

export default MainAdventureRankingListItem;

interface IMainAdventureRankingListItemProps {
  item: MainAdventureFameResponseChild;
  index: number;
  type: string;
}

const RankingDetailText = styled.p`
  color: grey;
`;

const RankingDetailNameText = styled.p`
  color: #121212;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  position: relative;
  padding: 0px 30px 0px 30px;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;
  overflow: hidden;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    //랭킹 아이콘 빼고 hover 시 이펙트
    img {
      opacity: 1;
      transition: all 0.7s ease;
      transform: scale(1.5);
    }
    #rankIcon {
      transform: scale(1);
    }
  }
`;

const TableData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0;
  color: #000;
`;
