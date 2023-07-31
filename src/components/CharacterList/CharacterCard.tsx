import { Card, IconButton, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React from 'react';
import styled from '@emotion/styled';
import { Content } from '../../interfaces/ICharactersData';
import { useNavigate } from 'react-router-dom';
const CharacterCard = ({ character, ...props }: ICharacterCardProps) => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const onClickHandler = () => {
    const characterId = ref.current?.getAttribute('data-id');
    const serverId = ref.current?.getAttribute('data-server');
    if (characterId && serverId) {
      navigate(`/details/?serverId=${serverId}&characterId=${characterId}`);
    }
  };
  const onClickDeleteButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    const characterId = ref.current?.getAttribute('data-id');
    const serverId = ref.current?.getAttribute('data-server');
    if (characterId && serverId && props.onClickDeleteButton) {
      props.onClickDeleteButton({ serverId, characterId });
    }
  };

  return (
    <Container ref={ref} data-id={character.characterId} data-server={character.serverId} onClick={onClickHandler}>
      {props.deletable && props.onClickDeleteButton && (
        <Tooltip title={'캐릭터 삭제'} placement="top">
          <IconButton
            style={{ position: 'absolute', right: '-10px', top: '-10px', zIndex: 100, color: '#FF4949' }}
            onClick={onClickDeleteButton}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
      )}
      <CharacterCardHeader>
        <CharacterJobNameBadgeWrapper>{character.jobGrowName}</CharacterJobNameBadgeWrapper>
        <CharacterServerNameBadgeWrapper>{character.serverName}</CharacterServerNameBadgeWrapper>
      </CharacterCardHeader>
      <CharacterImgWrapper>
        <img src={character.characterImgPath} alt={character.characterName} />
      </CharacterImgWrapper>
      <CharacterDetailsContainer>
        <CharacterAdventureFameWrapper>
          <img
            id="rankIcon"
            src={require('../../assets/img/rankingtable/icon_status_fame.png')}
            alt="icon"
            style={{ width: '15px', height: '15px', marginRight: '5px' }}
          />
          <span style={{ color: '#CA955C' }}>{character.adventureFame}</span>
        </CharacterAdventureFameWrapper>
        <CharacterNameWrapper>{character.characterName}</CharacterNameWrapper>
        <CharacterAdventureNameWrapper>
          {props.adventure && character.adventureName ? `내 모험단 (${character.adventureName})` : ' \u00A0'}
          {!props.adventure && character.adventureName ? `${character.adventureName}` : ' \u00A0'}
        </CharacterAdventureNameWrapper>
        <CharacterStatContainer>
          <CharacterStatWrapper>
            <StatTitleBadgeWrapper>버프력</StatTitleBadgeWrapper>
            <StatValueWrapper>{character.buffPower ? character.buffPower : '\u00A0'}</StatValueWrapper>
          </CharacterStatWrapper>
          <CharacterStatWrapper>
            <StatTitleBadgeWrapper style={{ color: 'darkred' }}>피해증가</StatTitleBadgeWrapper>
            <StatValueWrapper>{character.damageIncrease ? character.damageIncrease : '\u00A0'}</StatValueWrapper>
          </CharacterStatWrapper>
        </CharacterStatContainer>
      </CharacterDetailsContainer>
    </Container>
  );
};

interface ICharacterCardProps {
  character: Content;
  deletable?: boolean;
  adventure?: string;
  onClickDeleteButton?: (...args: any[]) => void;
}

const Container = styled(Card)`
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f7f8fd;
    transition: 0.5s;
  }

  @media (max-width: 1024px) {
    padding: 0px;
  }
  @media (max-width: 768px) {
    padding: 0px;
  }
  @media (max-width: 480px) {
    padding: 0px;
  }
`;

const CharacterImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;

  img {
    &:hover {
      scale: 1.1;
      transition: 0.5s;
    }
  }
`;

const CharacterNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  font-size: 21px;
  font-weight: 600;
  color: #000;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CharacterDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const CharacterCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CharacterServerNameBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ca955c;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 5px;
    width: 40%;
  }
  @media (max-width: 1024px) {
    width: 60%;
    font-size: 5px;
  }
`;

const CharacterJobNameBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fd;
  width: 50%;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
  z-index: 1;
  @media (max-width: 768px) {
    width: 60%;
    font-size: 5px;
  }
  @media (max-width: 1024px) {
    width: 60%;
    font-size: 5px;
  }
`;

const CharacterAdventureFameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const CharacterAdventureNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: #4e8d7c;
  font-size: 14px;
`;

const CharacterStatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
`;

const CharacterStatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StatTitleBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: cornflowerblue;
  width: 85%;
  background-color: #f7f8fd;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
`;

const StatValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: dimgrey;
  font-size: 14px;
  font-weight: 600;
`;

export default CharacterCard;
