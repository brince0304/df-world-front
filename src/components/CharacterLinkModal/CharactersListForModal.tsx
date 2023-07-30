import { Content } from '../../interfaces/ICharactersData';
import { Avatar, Grid, List, ListItemButton, ListItemText, styled } from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';

export const CharactersListForModal = (props: {
  data: Content[];
  handleClick: (characterId: string, serverId: string, characterName: string) => void;
}) => {
  return (
    <List
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        maxHeight: '100%',
        overflowY: 'scroll',
      }}
    >
      {props.data.map((character, index) => {
        return (
          <ListItemButton
            key={index}
            sx={{ width: '100%', position: 'relative', padding: '10px 15px' }}
            onClick={(e) => props.handleClick(character.characterId, character.serverId, character.characterName)}
          >
            <Avatar
              sx={{
                width: '50px',
                height: '50px',
                position: 'absolute',
                left: '3%',
                backgroundColor: 'white',
                border: '1px solid lightgray',
                '& > img': {
                  height: '400%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                },
              }}
              src={character.characterImgPath}
              variant={'rounded'}
            />
            <ListItemText
              sx={{ paddingLeft: '20%' }}
              primary={character.characterName}
              secondary={
                <CharacterDetailContainer container spacing={1}>
                  <Grid item xs={3}>
                    <FontWrapper>{character.serverName}</FontWrapper>
                  </Grid>
                  <Grid item xs={3}>
                    <FontWrapper>{'레벨 ' + character.level}</FontWrapper>
                  </Grid>
                  <Grid item xs={5}>
                    <FontWrapper>{character.jobGrowName}</FontWrapper>
                  </Grid>
                </CharacterDetailContainer>
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

const FontWrapper = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
  color: gray;
`;

const CharacterDetailContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 5px;
`;
