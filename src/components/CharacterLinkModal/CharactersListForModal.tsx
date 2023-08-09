import { Avatar, Grid, List, ListItemButton, ListItemText, styled, useMediaQuery } from '@mui/material';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import useCharactersQuery from '../../hooks/characterHooks/queries/useCharactersQuery';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const CharactersListForModal = (props: {
  characterName: string;
  serverId: string;
  handleClick: (characterId: string, serverId: string, characterName: string) => void;
}) => {
  const { data } = useCharactersQuery(props.characterName, props.serverId);
  const isMobile = useMediaQuery('(max-width:480px)');
  return (
    <List
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '40px',
        maxHeight: '100%',
        overflowY: 'scroll',
      }}
    >
      {data?.pages[0].content.map((character, index) => {
        return (
          <ListItemButton
            key={index}
            sx={{ width: '100%', position: 'relative', padding: '10px 15px' }}
            onClick={(e) => props.handleClick(character.characterId, character.serverId, character.characterName)}
          >
            <Avatar
              sx={{
                width: isMobile? '35px' : '50px',
                height: isMobile? '35px' : '50px',
                position: 'absolute',
                left: '3%',
                backgroundColor: 'white',
                border: '1px solid lightgray',
                boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
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
              sx={{ paddingLeft: '20%', }}
              primary={
              <Typography sx={{ fontWeight: 700, fontSize: isMobile? '0.8rem' : '1rem'
              }}>
                {character.characterName}
              </Typography>
            }
              secondary={
                <CharacterDetailContainer container spacing={1}>
                  <Grid item xs={3}>
                    <FontWrapper
                      sx={{
                        fontSize: isMobile? '0.6rem' : '0.7rem',
                      }}
                    >{character.serverName}</FontWrapper>
                  </Grid>
                  <Grid item xs={3}>
                    <FontWrapper
                      sx={{
                        fontSize: isMobile? '0.6rem' : '0.7rem',
                      }}
                    >{'레벨 ' + character.level}</FontWrapper>
                  </Grid>
                  <Grid item xs={5}>
                    <FontWrapper
                      sx={{
                        fontSize: isMobile? '0.6rem' : '0.7rem',
                      }}
                    >{character.jobGrowName}</FontWrapper>
                  </Grid>
                </CharacterDetailContainer>
              }
            />
          </ListItemButton>
        );
      })}
      {data?.pages[0].content.length === 0 && (
        <ErrorScreen icon={faExclamationCircle} message={'검색 결과가 없습니다.'} />
      )}
    </List>
  );
};

const FontWrapper = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
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
