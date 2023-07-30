import * as React from 'react';
import SearchCharacterModal from '../SearchCharacterModal';
import SearchForm from '../SearchBox';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ErrorScreen from '../ErrorScreen';
import useFastCharacterSearch from '../../hooks/useFastSearch';
import CharacterSearchBoxChild from '../SearchBox/CharacterSearchBoxChild';
import { serverList } from '../../utils/charactersUtil';
import { CharactersListForModal } from './CharactersListForModal';
import useCharacters from '../../hooks/characterHooks/useCharacters';

const CharacterLinkModal = (props: {
  isOpened: boolean;
  handleClose: () => void;
  handleSetCharacterDetails: (...args:any[]) => void;
}) => {
  const { setCharacterName,characterName,serverId,setServerId,fastResult } = useFastCharacterSearch();
  const searchFormProps = {
    value: characterName,
    setValue: setCharacterName,
    selectedValue: serverId,
    setSelectedValue: setServerId,
  }
  const {data} = useCharacters(characterName,serverId.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  }
  return (
    <SearchCharacterModal
      isOpened={props.isOpened}
      handleClose={props.handleClose}
      serachBox={
        <SearchForm
          useSearchForms={searchFormProps}
          placeholder={'캐릭터 닉네임'}
          direction={'down'}
          handleSubmit={handleSubmit}
          filterOptions={serverList}
          children={<CharacterSearchBoxChild  direction={'down'} searchResult={fastResult || []} searchHandler={props.handleSetCharacterDetails}/>}
        />
      }
    >
      <CharactersListForModal handleClick={props.handleSetCharacterDetails} data={data?.pages[0].content || []}/>
      {data?.pages[0].content.length===0 && <ErrorScreen icon={faExclamationCircle} message={'검색 결과가 없습니다.'} />}
    </SearchCharacterModal>
  );
};

export default CharacterLinkModal;
