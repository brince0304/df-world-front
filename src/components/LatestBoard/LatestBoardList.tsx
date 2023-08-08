import LatestBoardListItem from './LatestBoardListItem';
import useLatestBoardQuery from 'hooks/boardHooks/queries/useLatestBoardQuery';
import { List } from '@mui/material';

const LatestBoardList = (props: { isSelected: string }) => {
  const data = useLatestBoardQuery(props.isSelected);

  return (
    <List
      sx={{
        width: '100%',
      }}
    >
      {data && data.content.map((item, index: number) => <LatestBoardListItem key={index} {...item} />)}
    </List>
  );
};

export default LatestBoardList;
