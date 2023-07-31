import * as React from 'react';
import SearchCharacterModal from '../SearchCharacterModal';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import { CharactersListForModal } from './CharactersListForModal';
import CharacterSearchBox from '../CharacterSearchBox/CharacterSearchBox';
import useCharactersQuery from 'hooks/characterHooks/queries/useCharactersQuery';

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
  const { data } = useCharactersQuery(characterName, serverId);
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
      <CharactersListForModal handleClick={props.handleSetCharacterDetails} data={data?.pages[0].content || []} />
      {data?.pages[0].content.length === 0 && (
        <ErrorScreen icon={faExclamationCircle} message={'검색 결과가 없습니다.'} />
      )}
    </SearchCharacterModal>
  );
};

export default CharacterLinkModal;
