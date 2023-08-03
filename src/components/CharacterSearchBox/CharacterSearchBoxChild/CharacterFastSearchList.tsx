import { List } from '@mui/material';
import CharacterFastSearchItemButton from './CharacterFastSearchItemButton';
import styled from '@emotion/styled';
import useFastCharactersQuery from 'hooks/characterHooks/queries/useFastCharactersQuery';

const CharacterFastSearchList = ({ searchCallback, characterName, serverId }: ICharacterFastSearchListProps) => {
  const fastResult = useFastCharactersQuery(characterName, serverId);
  return (
    <Container>
      {fastResult?.map((item, index) => {
        return <CharacterFastSearchItemButton key={index} {...item} mouseDownHandler={searchCallback} />;
      })}
    </Container>
  );
};

interface ICharacterFastSearchListProps {
  searchCallback: (...args: any[]) => void;
  characterName: string;
  serverId: string;
}

const Container = styled(List)`
  width: 100%;
`;

export default CharacterFastSearchList;
