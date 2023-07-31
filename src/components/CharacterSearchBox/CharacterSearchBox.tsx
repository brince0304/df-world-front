import SearchForm from '../SearchForm/SearchForm';
import { serverList } from '../../utils/charactersUtil';
import CharacterSearchBoxChild from './CharacterSearchBoxChild/CharacterSearchBoxChild';
import React from 'react';
import styled from '@emotion/styled';
import useFastCharacterSearchQuery from 'hooks/characterHooks/queries/useDebouncedFastSearchQuery';
import useChildBox from 'hooks/uiHooks/useChildBox';

const CharacterSearchBox = ({ searchHandler, clickHandler }: ISearchFormProps) => {
  const { setCharacterName, characterName, serverId, setServerId, fastResult } = useFastCharacterSearchQuery();
  const searchFormProps = {
    value: characterName,
    setValue: setCharacterName,
    selectedValue: serverId,
    setSelectedValue: setServerId,
  };
  const boxRef = React.useRef<HTMLDivElement>(null);
  const { isFocus, setIsFocus } = useChildBox(boxRef);

  return (
    <SearchBoxWrapper ref={boxRef}>
      <SearchForm
        setIsFocus={setIsFocus}
        useSearchForms={searchFormProps}
        placeholder={'캐릭터 검색'}
        direction={'down'}
        handleSubmit={searchHandler}
        filterOptions={serverList}
      />
      {isFocus && (
        <CharacterSearchBoxChild direction={'down'} clickHandler={clickHandler} searchResult={fastResult || []} />
      )}
    </SearchBoxWrapper>
  );
};
const SearchBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

interface ISearchFormProps {
  searchHandler: (...args: any[]) => void;
  clickHandler: (...args: any[]) => void;
}

export default CharacterSearchBox;
