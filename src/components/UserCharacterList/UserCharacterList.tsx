import React from 'react';
import { Grid } from '@mui/material';
import CharacterCard from '../CharacterList/CharacterCard';
import useDeleteCharacterMutation from '../../hooks/myPageHooks/mutations/useDeleteCharacterMutation';
import useMyPageQuery from '../../hooks/myPageHooks/queries/useMyPageQuery';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';

const UserCharactersList = () => {
  const { data } = useMyPageQuery();
  const { user } = useUserQuery();
  const deleteCharacter = useDeleteCharacterMutation();
  return (
    <Grid container spacing={3}>
      {data?.userDetail.characters.map((character, index: number) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
            <CharacterCard
              character={character}
              deletable={true}
              adventure={user?.adventureName}
              onClickDeleteButton={deleteCharacter}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserCharactersList;
