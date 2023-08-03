import useRecentSearchedQuery from 'hooks/recoilHooks/useRecentSearchedQuery';
import RecentSearchedItemButton from './RecentSearchedItemButton';
import { List } from '@mui/material';
import styled from '@emotion/styled';

const RecentSearchedList = ({ searchCallback }: IRecentSearchedListProps) => {
  const { recentSearchedQuery, handleRemoveRecentSearchedQuery } = useRecentSearchedQuery();
  return (
    <Container>
      {recentSearchedQuery.map((data, index) => {
        return (
          <RecentSearchedItemButton
            {...data}
            key={index}
            removeHandler={handleRemoveRecentSearchedQuery}
            mouseDownHandler={searchCallback}
          />
        );
      })}
    </Container>
  );
};

export default RecentSearchedList;

const Container = styled(List)`
  width: 100%;
`;

interface IRecentSearchedListProps {
  searchCallback: (...args: any[]) => void;
}
