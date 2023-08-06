import * as React from 'react';
import SearchCharacterModal from '../SearchCharacterModal';
import { CharactersListForModal } from './CharactersListForModal';
import CharacterSearchBox from '../CharacterSearchBox/CharacterSearchBox';
import { Suspense } from 'react';
import Loading from '../Fallbacks/Loading';

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
    <SearchCharacterModal
      isOpened={props.isOpened}
      handleClose={props.handleClose}
      serachBox={<CharacterSearchBox searchHandler={searchHandler} clickHandler={clickHandler} />}
    >
      <Suspense fallback={<Loading />}>
        <CharactersListForModal
          characterName={characterName}
          serverId={serverId}
          handleClick={props.handleSetCharacterDetails}
        />
      </Suspense>
    </SearchCharacterModal>
  );
};

export default CharacterLinkModal;
