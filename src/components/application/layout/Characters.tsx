import {useLocation, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {getCharacters} from "../../../api/character/getCharacters";
import {CharactersData} from "../../../interfaces/CharactersData";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../../redux/store";
import {Card, Container, Grid} from "@mui/material";



const CharacterCard = styled(Card)`
    display: flex;
  overflow: hidden;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
  &:hover{
    cursor: pointer;
    background-color: #f7f8fd;
    transition: 0.5s;
  }
  @media (max-width:1024px){
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
    img{
      &:hover{
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
    color:#CA955C;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    padding: 5px;
    margin: 5px;
  @media (max-width: 768px) {
    font-size: 5px;
    width: 40%;
  }
  @media(max-width:1024px){
    width: 60%;
    font-size: 5px;
  }
  
`;

const CharacterJobNameBadgeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#f7f8fd;
  width:50%;
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
  @media(max-width:1024px){
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
   color: #4E8D7C;
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
  width:85%;
  background-color:#f7f8fd;
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

const ResultTitleWrapper = styled.div`
    display: flex;
    justify-content: center;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
    align-items: center;
    width: 100%;
    height: 20%;
    font-size: 21px;
    font-weight: 600;
    color: #000;
    text-align: center;
    padding: 5px;
   margin-bottom: 20px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  grid-column: 1 / 5;
  @media (max-width: 768px) {
    grid-column: 1 / 3;
  }
  @media (max-width: 425px) {
    grid-column: 1 / 3;
  }
  @media (max-width: 320px) {
    grid-column: 1 / 3;
  }

`;





const getServerName=(serverId: string) => {
     switch (serverId) {
            case "all":
                return "전체";
            case "bakal":
                return "바칼";
            case "hilder":
                return "힐더";
            case "prey":
                return "프레이";
            case "anton":
                return "안톤";
            case "kasillas":
                return "카시야스";
         case "adventure":
                return "모험단";
                case "diregie":
                return "디레지에";
                case "siroco":
                return "시로코";
     }
}

const ResultServerNameWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color:#CA955C;
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    margin: 5px;
`;

const ResultCharacterNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color:#282c34;
  font-size: 22px;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
  `;

const ResultTitleFooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color:#CA955C;
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    margin: 5px;
  `;

export const Characters = () => {
    let {serverId} = useParams();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<CharactersData>({} as CharactersData );
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const characterName = searchParams.get('name');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onClickHandler = (e: React.MouseEvent) => {
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if(characterId && serverId) {
            navigate(`/details/?serverId=${serverId}&characterId=${characterId}`);
        }
    }
    useEffect(() => {
         dispatch(getCharacters(setIsError, setIsLoading, `http://localhost:8080/characters/?characterName=${characterName?characterName:""}&serverId=${serverId?serverId:""}&page=${page?page:"0"}`, setData));
    }, [characterName, serverId,page ]);
    return (
        <Container>
            <ResultTitleWrapper>
                <ResultServerNameWrapper>
                    {getServerName(serverId?serverId:"")}
                </ResultServerNameWrapper>
                <ResultCharacterNameWrapper>
                    {characterName?characterName:""}
                </ResultCharacterNameWrapper>
                <ResultTitleFooterWrapper>
                    님의 검색결과
                </ResultTitleFooterWrapper>

            </ResultTitleWrapper>
            <Grid container spacing={3}>
            {data.content?.map((character,index:number) => {
                return (
                    <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                    <CharacterCard key={index} data-id={character.characterId} data-server={character.serverId} onClick={onClickHandler} >
                        <CharacterCardHeader>
                            <CharacterJobNameBadgeWrapper>
                                {character.jobGrowName}
                            </CharacterJobNameBadgeWrapper>
                            <CharacterServerNameBadgeWrapper>
                                {character.serverName}
                            </CharacterServerNameBadgeWrapper>
                        </CharacterCardHeader>
                        <CharacterImgWrapper>
                        <img src={character.characterImgPath} alt={character.characterName}/>
                    </CharacterImgWrapper>
                        <CharacterDetailsContainer>
                            <CharacterAdventureFameWrapper>
                                <img id="rankIcon" src={require('../../../assets/img/rankingtable/icon_status_fame.png')} alt="icon"
                                     style={{width: "15px", height: "15px", marginRight:"5px"}}/>
                                <span style={{  color: "#CA955C"}}>{character.adventureFame}</span>
                            </CharacterAdventureFameWrapper>
                            <CharacterNameWrapper>
                               {character.characterName}
                            </CharacterNameWrapper>
                            <CharacterAdventureNameWrapper>
                                {character.adventureName?character.adventureName:" \u00A0"}
                            </CharacterAdventureNameWrapper>
                            <CharacterStatContainer>
                                <CharacterStatWrapper>
                                    <StatTitleBadgeWrapper>
                                        버프력
                                    </StatTitleBadgeWrapper>
                                    <StatValueWrapper>
                                        {character.buffPower? character.buffPower:"\u00A0"}
                                    </StatValueWrapper>
                                </CharacterStatWrapper>
                                <CharacterStatWrapper>
                                    <StatTitleBadgeWrapper style={{color:"darkred"}}>
                                        피해증가
                                    </StatTitleBadgeWrapper>
                                    <StatValueWrapper>
                                    {character.damageIncrease ? character.damageIncrease:"\u00A0"}
                                    </StatValueWrapper>
                                </CharacterStatWrapper>
                            </CharacterStatContainer>
                        </CharacterDetailsContainer>
                    </CharacterCard>
                    </Grid>
                )
            })}
            </Grid>
        </Container>
    );
}