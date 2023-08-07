import React from 'react';
import CharacterRanking from '../components/MainCharacterRanking/MainCharacterRanking';
import { Container } from '@mui/material';
import MainCarousel from '../components/MainCarousel/Carousel';
import LatestBoard from '../components/LatestBoard/LatestBoard';
import styled from '@emotion/styled';

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
      <CharacterRanking />
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