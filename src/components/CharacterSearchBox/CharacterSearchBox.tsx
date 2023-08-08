import SearchForm from '../SearchForm/SearchForm';
import { serverList } from '../../utils/charactersUtil';
import CharacterSearchBoxChild from './CharacterSearchBoxChild/CharacterSearchBoxChild';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useChildBox from '../../hooks/uiHooks/useChildBox';
import useSearchForm from 'hooks/uiHooks/useSearchForm';
import useDebounce from 'hooks/uiHooks/useDebounce';

const CharacterSearchBox = ({ searchHandler, clickHandler }: ISearchFormProps) => {
  const searchFormProps = useSearchForm({
    initialValues: '',
    initialSelectedValue: {
      value: 'ALL',
      label: '전체',
    },
  });
  const [newParams, setNewParams] = useState('');
  const debouncedSetNewParams = useDebounce(setNewParams, 300);
  useEffect(() => {
    debouncedSetNewParams(searchFormProps.value);
  }, [searchFormProps.value, debouncedSetNewParams]);
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
        <CharacterSearchBoxChild
          direction={'down'}
          clickHandler={clickHandler}
          characterName={newParams}
          serverId={searchFormProps.selectedValue.value}
        />
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
