import React from 'react';
import styled from '@emotion/styled';
import AdventureFame from '../../../assets/img/rankingtable/icon_status_fame.png';
import DamageIncrease from '../../../assets/img/rankingtable/damage_increase.png';
import BuffPower from '../../../assets/img/rankingtable/buff_power.png';

const RankingValue = (props: { type: string; value: number }) => {
  return (
    <RankingDetailValue>
      {props.type === 'adventureFame' && (
        <img id="rankIcon" src={AdventureFame} alt="icon" style={{ width: '15px', height: '15px' }} />
      )}
      {props.type === 'damageIncrease' && (
        <img id="rankIcon" src={DamageIncrease} alt="icon" style={{ width: '18px', height: '18px' }} />
      )}
      {props.type === 'buffPower' && (
        <img id="rankIcon" src={BuffPower} alt="icon" style={{ width: '18px', height: '18px' }} />
      )}

      <RankingDetailValueStyled style={{ marginLeft: '5px' }}>{props.value}</RankingDetailValueStyled>
    </RankingDetailValue>
  );
};

export default RankingValue;

const RankingDetailValue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80px;
`;
const RankingDetailValueStyled = styled.span`
  font-size: 15px;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 15px;
  }
`;
