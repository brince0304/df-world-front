import React from 'react';
import '../../../assets/css/rankingTable.scss'
import styled from "styled-components";


interface Props {
serverId:string,characterId:string;
}

const CharacterImg = styled.img`
  scale:2;
  `;

const ImgWrapper = styled.div`
  width: 50px;
  height: 100px;
  overflow: hidden;
  position: relative;
  display: inline-block;
`

function characterUrl (props:Props){
    return `https://img-api.neople.co.kr/df/servers/${props.serverId}/characters/${props.characterId}?zoom=3`;
}
export function RankingCharacterImg(props:Props) {
    return (
        <ImgWrapper>
            <CharacterImg id="characterImg" src={characterUrl(props)} alt="캐릭터 이미지"/>
        </ImgWrapper>
    );
}