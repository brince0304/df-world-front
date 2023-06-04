import styled from "styled-components";
import React from "react";
import CharacterRanking from "./Tables/CharacterRanking";
import MainPageRankingData from "../../data/MainPageRankingData";
import BoardData from "../../data/BoardData";
import {Container} from "@mui/material";
import {CHARACTER_MAINPAGE_RANKING_URL, LATEST_BOARD_URL} from "../../apis/data/urls";
import LatestBoard from "./Tables/LatestBoard";


const LatestBoardContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, minmax(100px, auto));
  grid-template-columns: repeat(2, minmax(100px, 48%));
  grid-column-gap: 4%;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(100px, auto));
    grid-template-rows: repeat(1, minmax(100px, auto));
  }
  @media (max-width: 1024px) {
    grid-template-rows: repeat(1, minmax(100px, auto));
    grid-template-columns: repeat(1, minmax(100px, auto));
  }

`;


const Main = () => {
    return (
        <Container maxWidth={"md"}>
            <LatestBoardContainer>
                <LatestBoard title={"공지사항"} url={LATEST_BOARD_URL}/>
                <LatestBoard title={"통합 게시판"} boardTypes={BoardData.boardTypes} url={LATEST_BOARD_URL}/>
            </LatestBoardContainer>
            <CharacterRanking data={MainPageRankingData} title={"캐릭터 랭킹"} url={CHARACTER_MAINPAGE_RANKING_URL}/>
        </Container>
    );
};

export default Main;
