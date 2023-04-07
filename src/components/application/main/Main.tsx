import styled from "styled-components";
import React from "react";
import RankingTable from "../character/RankingTable";
import MainPageRankingData from "../../../data/MainPageRankingData";
import LatestBoard from "../board/LatestBoard";
import BoardData from "../../../data/BoardData";
import axios from "axios";
import {Container, Divider, IconButton, InputBase, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {NewSearchBox} from "../ui/NewSearchBox";
import Board from "../board/Board";
import {HeaderData} from "../../../data/HeaderData";
import {CHARACTER_MAINPAGE_RANKING_URL, LATEST_BOARD_URL} from "../../../data/ApiUrl";

const Container0 = styled.div`
  //container
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 0 17%;
  width: 100%;

  grid-column-gap: 1%;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(100px, auto));
    grid-template-rows: repeat(1, minmax(100px, auto));
    padding: 0 1%;
  }
  @media (max-width: 1024px) {
    grid-template-rows: repeat(1, minmax(100px, auto));
    grid-template-columns: repeat(2, minmax(100px, auto));
    padding: 0 5%;
  }
`;

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
            <RankingTable data={MainPageRankingData} title={"캐릭터 랭킹"} url={CHARACTER_MAINPAGE_RANKING_URL}/>
        </Container>
    );
};

export default Main;
