import useMainCharacterRankingQuery from '../../hooks/characterHooks/queries/useMainCharacterRankingQuery';
import MainCharacterRankingListItem from './MainCharacterRankingListItem';
import React from 'react';

const MainCharacterRankingList = (props: { type: string }) => {
  const data = useMainCharacterRankingQuery(props.type);
  return (
    <>
      {data?.content.map((item, index: number) => (
        <MainCharacterRankingListItem item={item} index={index} type={props.type} />
      ))}
    </>
  );
};

export default MainCharacterRankingList;
