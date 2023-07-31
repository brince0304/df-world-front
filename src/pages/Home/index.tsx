import styled from 'styled-components';
import React from 'react';
import CharacterRanking from './Tables/CharacterRanking';
import { Container } from '@mui/material';
import { CHARACTER_MAINPAGE_RANKING_URL } from '../../apis/data/urls';
import MainCarousel from '../../components/MainCarousel/Carousel';
import LatestBoard from '../../components/LatestBoard/LatestBoard';

const Main = () => {
  return (
    <Container
      maxWidth={'md'}
      sx={{
        marginTop: '20px',
      }}
    >
      <MainCarousel />
      <LatestBoardContainer>
        <LatestBoard />
      </LatestBoardContainer>
      <CharacterRanking title={'캐릭터 랭킹'} url={CHARACTER_MAINPAGE_RANKING_URL} />
    </Container>
  );
};

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

export default Main;
