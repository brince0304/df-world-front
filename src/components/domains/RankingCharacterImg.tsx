import React from 'react';
import '../../assets/css/rankingTable.scss'
import styled from "styled-components";


interface Props {
serverId:string,characterId:string;
}

const CharacterImg = styled.img`
  position: absolute;
  top: -950%;
  bottom: -1020%;
  margin: auto;
  min-height: 100%;
  min-width: 100%;
  opacity: 0.7;
  scale:4;

  `;

const ImgSection = styled.div`
  width: 70px;
  height: 70px;
  overflow: hidden;
  position: relative;
  display: inline-block;
`

function characterUrl (props:Props){
    return `https://img-api.neople.co.kr/df/servers/${props.serverId}/characters/${props.characterId}?zoom=3`;
}
export function RankingCharacterImg(props:Props) {
    return (
        <ImgSection>
            <CharacterImg id="characterImg" src={characterUrl(props)} alt="캐릭터 이미지"/>
        </ImgSection>
    );
}