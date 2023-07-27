import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Content } from '../../../../interfaces/CharactersData';
import { getCharacterList } from '../../../../apis/board/getCharacterList';
import { USER_CHARACTERS_SEARCH_URL } from '../../../../apis/data/urls';
import SearchCharacterModal from '../../../../components/SearchCharacterModal';
import CustomSearchBox from '../../../../components/CustomSearchBox';
import { HeaderData } from '../../../../data/HeaderData';
import { getCharactersAutoComplete } from '../../../../apis/character/getCharactersAutoComplete';
import { CharactersListForModal } from '../../../Board/Write';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ErrorScreen from '../../../../components/ErrorScreen';

const CharacterLinkModal = (props: {
  isOpened: boolean;
  handleClose: () => void;
  handleOptionMouseDown: (e: React.MouseEvent) => void;
  handleRemoveSearchOptions: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleSetCharacterDetails: (characterId: string, serverId: string, characterName: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchHistory = useSelector((state: RootState) => state.history.characterHistory);
  const [data, setData] = useState<Content[]>([]);
  const handleSearch = (searchValue: string, selectValue: string) => {
    setIsLoading(true);
    getCharacterList(
      USER_CHARACTERS_SEARCH_URL.replace('{serverId}', selectValue).replace('{characterName}', searchValue),
    )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <SearchCharacterModal
      isOpened={props.isOpened}
      handleClose={props.handleClose}
      serachBox={
        <CustomSearchBox
          placeholder={'캐릭터 닉네임'}
          direction={'down'}
          handleNavigate={handleSearch}
          filterOptions={HeaderData.serverList}
          searchHistoryMouseDown={props.handleOptionMouseDown}
          removeSearchHistory={props.handleRemoveSearchOptions}
          useSearchOption={true}
          searchHistory={searchHistory}
          autoCompleteHandler={getCharactersAutoComplete}
          autoCompleteUrl={'/characters/autoComplete?name={searchValue}&serverId={selectValue}'}
        />
      }
      isLoading={isLoading}
    >
      {data?.length > 0 && <CharactersListForModal handleClick={props.handleSetCharacterDetails} data={data} />}
      {data?.length === 0 && !isLoading && <ErrorScreen icon={faExclamationCircle} message={'검색 결과가 없습니다.'} />}
    </SearchCharacterModal>
  );
};

export default CharacterLinkModal;
