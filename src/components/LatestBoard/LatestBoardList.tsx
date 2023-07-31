import { Suspense } from 'react';
import Loading from 'react-loading';
import LatestBoardListItem from './LatestBoardListItem';
import useLatestBoardQuery from 'hooks/boardHooks/queries/useLatestBoardQuery';

const LatestBoardList = (props: { isSelected: string }) => {
  const data = useLatestBoardQuery(props.isSelected);

  return (
    <Suspense fallback={<Loading />}>
      {data && data.content.map((item, index: number) => <LatestBoardListItem key={index} {...item} />)}
    </Suspense>
  );
};

export default LatestBoardList;
