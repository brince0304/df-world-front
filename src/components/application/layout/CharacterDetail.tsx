import {useLocation, useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {getCharacterDetail} from "../../../api/character/getCharacterDetail";
import {CharacterDetails} from "../../../interfaces/CharacterDetails";
import store, { useAppDispatch} from "../../../redux/store";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight,faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import {ErrorScreen} from "../ui/ErrorScreen";
import {IconButton, Tooltip} from "@mui/material";


const Container = styled.div`
    display: flex;   
  flex-direction: column;
    justify-content: center;
    align-items: center;
    width:80%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: white;
    margin : auto;
    padding: 20px 0;
   @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
     padding : 0px 0px;
   }
`

const CharacterCardContainer = styled.div`
    display: flex;
  position: relative;
  flex-direction: row;
    justify-content: center;
    align-items: center;
    width:70%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid lightgray;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    padding: 20px 20px;
    
    @media (max-width: 1024px) {
    width: 70%;
    height: 100%;
      padding: 40px 40px;
    }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
  
    @media (max-width: 480px) {
    width: 100%;
    height: 100%;
    }
`;

const CharacterImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 280px;
    border-radius: 10px;
    background-image: url("http://localhost:8080/images/icon_char/bg_char.jpg");
   background-size: cover;
    background-position: center;
    margin-right: 20px;
  
  `;

const CharacterDetailsContainer = styled.div`
    display: grid;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
      width: 70%;
    height: 100%;
    border-radius: 10px;
  color: black;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 0;
`;

const CharacterTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
     font-size: 20px;
    font-weight: 700;
    color: #000;
  `;

const CharacterServerNameJobNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 12px;
  `;

const ServerNameBadgeWrapper = styled.div`
    display: flex;
    border : 1px solid black;
  padding: 1px 4px;
  margin-right: 10px;
`;

const AdventureNameGuildNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    font-size: 12px;
    `;

const AdventureNameGuildNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    color: gray;
    `;

const CharacterRankingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    font-size: 12px;
   gap: 1px;
`;

const CharacterRankingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffc107;
      border-radius: 10px;
    font-weight: bold;
  color:black;
  padding: 0px 3px;
  font-size:10px;
`;

const CharacterRankingCountContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

//mui style
const refreshButtonStyle = {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    color: 'black',
    '&:hover': {
        transform: 'rotate(360deg)',
        transition: 'transform 0.5s',
    }
}






export const CharacterDetail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const characterId = searchParams.get('characterId');
    const serverId = searchParams.get('serverId');
    const[data, setData] = useState<CharacterDetails>({} as CharacterDetails);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (characterId && serverId) {
            dispatch(getCharacterDetail(`http://localhost:8080/characters/detail?characterId=${characterId?characterId:""}&serverId=${serverId?serverId:""}`,setData));
        }
    }, [characterId,serverId]);
    const handleRefresh= useCallback(() => {
        if (characterId && serverId) {
            dispatch(getCharacterDetail(`http://localhost:8080/characters/detail?characterId=${characterId?characterId:""}&serverId=${serverId?serverId:""}`,setData));
        }
    }, [characterId,serverId]);
    return (
        <Container>
            {data && data.characterEntityDto && <CharacterCardContainer>
                <Tooltip title="새로고침" placement="bottom">
                    <IconButton aria-label="refresh" onClick={handleRefresh} sx={refreshButtonStyle}>
                    <FontAwesomeIcon icon={faRotateRight}/>
                    </IconButton>
                </Tooltip>
                <CharacterImgWrapper>
                    <img src={data?.characterEntityDto?.characterImgPath} alt="characterImg"/>
                </CharacterImgWrapper>
                <CharacterDetailsContainer>
                    <CharacterServerNameJobNameContainer>
                        <ServerNameBadgeWrapper>
                            <span>{data?.characterEntityDto?.serverName}</span>
                        </ServerNameBadgeWrapper>
                        <ServerNameBadgeWrapper>
                            <span>{data?.characterEntityDto?.jobGrowName}</span>
                        </ServerNameBadgeWrapper>
                    </CharacterServerNameJobNameContainer>
                    <CharacterTitleWrapper>
                        <span>{data?.characterEntityDto?.characterName}</span>
                    </CharacterTitleWrapper>
                    <AdventureNameGuildNameContainer>
                        <AdventureNameGuildNameWrapper>
                            <span style={{color:"gray"}}> 모험단 : </span>
                            <span> {data?.characterEntityDto?.adventureName ? "\u00A0"+ data?.characterEntityDto?.adventureName : " 없음"}</span>
                        </AdventureNameGuildNameWrapper>
                        <AdventureNameGuildNameWrapper>
                            <span style={{color:"gray"}}> 길드 :  </span>
                            <span> {data?.characterEntityDto?.guildName ? "\u00A0"+ data?.characterEntityDto?.guildName : " 없음"}</span>
                        </AdventureNameGuildNameWrapper>
                    </AdventureNameGuildNameContainer>
                    <CharacterRankingContainer>
                        <CharacterRankingCountContainer>
                            <span>명성 랭킹 :</span>
                            <span>{"\u00A0"+ data?.characterRank}위/</span>
                            <span>{"\u00A0"+ data?.characterCount}명 {"\u00A0"}</span>
                            <CharacterRankingWrapper>
                            <span>{"상위 "+data?.characterPercent}%</span>
                        </CharacterRankingWrapper>
                    </CharacterRankingCountContainer>
                        <CharacterRankingCountContainer>
                            <span>직업 명성 랭킹 :</span>
                            <span>{"\u00A0"+ data?.characterRankByJobName}위/</span>
                            <span>{"\u00A0"+ data?.characterCountByJobName}명 {"\u00A0"}</span>
                            <CharacterRankingWrapper style={{backgroundColor:"#28a745",color:"white"}}>
                                <span>{"상위 "+data?.characterPercentByJobName}%</span>
                            </CharacterRankingWrapper>
                        </CharacterRankingCountContainer>
                    </CharacterRankingContainer>
                </CharacterDetailsContainer>
            </CharacterCardContainer>}
            {!data &&
                <ErrorScreen message={"캐릭터의 데이터를 불러오는데 실패했습니다."} icon={faSkullCrossbones}/>}
        </Container>
    );
}