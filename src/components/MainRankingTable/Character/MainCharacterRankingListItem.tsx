import { Content } from '../../../interfaces/ICharactersData';
import { Grid } from '@mui/material';
import { RankingCharacterImg } from '../../application/character/RankingCharacterImg';
import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import RankingValue from './RankingValue';
import { useRef } from 'react';

const MainCharacterRankingListItem = ({ item, index, type }: { item: Content; index: number; type: string }) => {
  let navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = ref.current?.dataset;
    navigate(`/details?serverId=${id?.server}&characterId=${id?.id}`);
  };
  return (
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
      <TableRow
        ref={ref}
        id={item.characterId}
        onClick={onClick}
        data-id={item.characterId}
        data-server={item.serverId}
      >
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
        <div style={{ width: '23%', height: '100%' }}>
          <RankingCharacterImg serverId={item.serverId} characterId={item.characterId} />
        </div>
        <div>
          <TableData>
            <RankingDetailNameText>{item.characterName}</RankingDetailNameText>
            <RankingDetailText>{item.adventureName}</RankingDetailText>
            <RankingDetailText>{item.serverName}</RankingDetailText>
          </TableData>
        </div>
        <div>
          <TableData>
            <RankingValue type={type} value={item.adventureFame} />
          </TableData>
        </div>
      </TableRow>
    </Grid>
  );
};

export default MainCharacterRankingListItem;

const RankingDetailText = styled.p`
  color: grey;
`;

const RankingDetailNameText = styled.p`
  color: #121212;
  font-weight: 600;
  fontsize: 1.2rem;
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

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    //랭킹 아이콘 빼고 hover 시 이펙트
    img {
      transform: translateY(-3px);
      opacity: 1;
      transition: all 0.7s ease;
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
