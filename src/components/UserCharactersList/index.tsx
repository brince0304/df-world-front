import { Content } from '../../interfaces/ICharactersData';
import React from 'react';
import { Grid } from '@mui/material';
import CharacterCard from '../CharacterCard';
import useDeleteCharacter from '../../hooks/myPageHooks/useDeleteCharacter';

const UserCharactersList = (props: { data: Content[]; adventure: string }) => {
  const deleteCharacter = useDeleteCharacter();
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={4} md={3} lg={3}>
        {props.data.map((character, index: number) => {
          return (
            <CharacterCard
              key={index}
              character={character}
              deletable={true}
              adventure={props.adventure}
              onClickDeleteButton={deleteCharacter}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default UserCharactersList;
