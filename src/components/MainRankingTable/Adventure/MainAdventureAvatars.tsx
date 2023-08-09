import { MainAdventureFameResponseChildCharacters } from '../../../interfaces/IMainAdventureRankingResponse';
import React from 'react';
import { Avatar, Grid } from '@mui/material';
import styled from '@emotion/styled';

const MainAdventureAvatars = ({ characters }: { characters: MainAdventureFameResponseChildCharacters[] }) => {
  return (
    <Container container spacing={2}>
      {characters.map((character, index) => {
        return (
          <Grid key={index} item xs={6} >
            <Avatar
              src={character.characterImageUrl}
              sx={{
                width: '40px',
                height: '40px',
                marginRight: '5px',
                '> img': {
                  objectFit: 'contain',
                  scale: '2',
                },
              }}
            />
          </Grid>
        );
      })}
    </Container>
  );
};

const Container = styled(Grid)`

  width: 100px;
`;

export default MainAdventureAvatars;
