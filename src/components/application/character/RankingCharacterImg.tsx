import React from 'react';
import '../../../assets/css/rankingTable.scss';
import styled from '@emotion/styled';

interface CharacterImgProps {
  serverId: string;
  characterId: string;
}

const CharacterImg = styled.img`
  scale: 3;
  transform: translateY(2px);
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  margin-left: 20px;
`;

function characterUrl(props: CharacterImgProps) {
  return `https://img-api.neople.co.kr/df/servers/${props.serverId}/characters/${props.characterId}?zoom=3`;
}

export function RankingCharacterImg(props: CharacterImgProps) {
  return (
    <ImgWrapper>
      <CharacterImg id="characterImg" src={characterUrl(props)} alt="캐릭터 이미지" />
    </ImgWrapper>
  );
}
