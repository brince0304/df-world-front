import * as React from 'react';
import { CharactersListForModal } from './CharactersListForModal';
import CharacterSearchBox from '../CharacterSearchBox/CharacterSearchBox';
import { Suspense } from 'react';
import Loading from '../Fallbacks/Loading';
import MyDialog from '../MyDialog/MyDialog';
import { Box, styled } from '@mui/material';

const CharacterLinkModal = (props: {
  isOpened: boolean;
  handleClose: () => void;
  handleSetCharacterDetails: (...args: any[]) => void;
}) => {
  const [characterName, setCharacterName] = React.useState('');
  const [serverId, setServerId] = React.useState('ALL');
  const searchHandler = (characterName: string, serverId: string) => {
    setCharacterName(characterName);
    setServerId(serverId);
  };
  const clickHandler = (characterId: string, characterServerId: string, characterName: string) => {
    props.handleSetCharacterDetails(characterId, characterServerId, characterName);
    props.handleClose();
  };
  return (
    <MyDialog
      isOpen={props.isOpened}
      onClose={props.handleClose}
      dialogContent={
      <ContentContainer>
        <SearchBoxWrapper>
        <CharacterSearchBox searchHandler={searchHandler} clickHandler={clickHandler} />
        </SearchBoxWrapper>
        <Suspense fallback={<Loading />}>
          <CharactersListForModal
            characterName={characterName}
            serverId={serverId}
            handleClick={props.handleSetCharacterDetails}
          />
        </Suspense>
      </ContentContainer>
      }
    />
  );
};

const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`

const SearchBoxWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export default CharacterLinkModal;
