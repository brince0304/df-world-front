import { List } from '@mui/material';
import CharacterFastSearchItemButton from './CharacterFastSearchItemButton';
import useSearchForm from 'hooks/uiHooks/useSearchForm';
import useFastCharacterSearchQuery from 'hooks/characterHooks/queries/useDebouncedFastSearchQuery';
import styled from '@emotion/styled';

const CharacterFastSearchList = ({ searchCallback, searchFormProps }: ICharacterFastSearchListProps) => {
  const fastResult = useFastCharacterSearchQuery(searchFormProps);
  return (
    <Container>
      {fastResult?.map((item, index) => {
        return <CharacterFastSearchItemButton {...item} mouseDownHandler={searchCallback} />;
      })}
    </Container>
  );
};

interface ICharacterFastSearchListProps {
  searchCallback: (...args: any[]) => void;
  searchFormProps: ReturnType<typeof useSearchForm>;
}

const Container = styled(List)`
  width: 100%;
`;

export default CharacterFastSearchList;
