import { useLocation, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { getCharacters } from '../../apis/character/getCharacters';
import { CharactersData } from '../../interfaces/CharactersData';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { Container, Pagination } from '@mui/material';
import { CHARACTER_SEARCH_URL } from '../../apis/data/urls';
import CharacterList from '../../components/CharactersList';

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
export const getServerName=(serverId: string) => {
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
         case "cain":
                return "카인";
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


 const Characters = () => {
    let {serverId} = useParams();
    const [data, setData] = useState<CharactersData>({} as CharactersData );
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    const characterName = searchParams.get('name');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
        navigate(`/characters/${serverId}?page=${newPage-1}&name=${characterName?characterName:""}`);
    };
    const onClickHandler = (e: React.MouseEvent) => {
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if(characterId && serverId) {
            navigate(`/details/?serverId=${serverId}&characterId=${characterId}`);
        }
    }
    useEffect(() => {
         dispatch(getCharacters( CHARACTER_SEARCH_URL+`?characterName=${characterName?characterName:""}&serverId=${serverId?serverId:""}&page=${page?page:"0"}`, setData));
    }, [characterName, serverId,page ]);
    return (
        <Container maxWidth={"lg"}>
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
                <Pagination count={data.totalPages} page={data.number+1} onChange={handleChangePage} color="primary" />
            </ResultTitleWrapper>
            {data.content&& <CharacterList data={data.content} onClick={onClickHandler}/>}
        </Container>
    );
}

export default Characters;