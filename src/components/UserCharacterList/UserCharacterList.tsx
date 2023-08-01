import { Content } from '../../interfaces/ICharactersData';
import React from 'react';
import { Grid } from '@mui/material';
import CharacterCard from '../CharacterList/CharacterCard';
import useDeleteCharacterMutation from '../../hooks/myPageHooks/mutations/useDeleteCharacterMutation';

const UserCharactersList = (props: { data: Content[]; adventure: string }) => {
  const deleteCharacter = useDeleteCharacterMutation();
  return (
    <Grid container spacing={3}>
      {props.data.map((character, index: number) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
            <CharacterCard
              character={character}
              deletable={true}
              adventure={props.adventure}
              onClickDeleteButton={deleteCharacter}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserCharactersList;