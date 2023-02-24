import styled from 'styled-components';
import React from "react";
import RankingTable from "./RankingTable";
import MainPageRankingData from "./data/MainPageRankingData";
import LatestBoard from "./LatestBoard";
import BoardData from "./data/BoardData";
const Container = styled.div`
    //container
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
  padding: 0 17%;
  width: 100%;

  grid-column-gap:  1%;
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
  grid-column-gap:  4%;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(100px, auto));
    grid-template-rows: repeat(1, minmax(100px, auto));
  }
  @media (max-width: 1024px) {
    grid-template-rows: repeat(1, minmax(100px, auto));
    grid-template-columns: repeat(1, minmax(100px, auto));
  }

`;

const RankingTableContainer = styled.div`
`;



const Body = () =>{
    return(
        <Container>
            <LatestBoardContainer>
                <LatestBoard title={"공지사항"} boardTypes={BoardData.noticeTypes}/>
                <LatestBoard title={"전체"} boardTypes={BoardData.boardTypes}/>
            </LatestBoardContainer>
            <RankingTableContainer>
                <RankingTable data={MainPageRankingData} title={"캐릭터 랭킹"}/>
                <RankingTable data={MainPageRankingData} title={"모험단 랭킹"}/>
            </RankingTableContainer>

        </Container>
    );
}

export default Body;