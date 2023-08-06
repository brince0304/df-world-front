import useMainCharacterRanking from '../../hooks/characterHooks/queries/useMainCharacterRanking';
import MainCharacterRankingListItem from './MainCharacterRankingListItem';
import React from 'react';

const MainCharacterRankingList = (props: { type: string }) => {
  const data = useMainCharacterRanking(props.type);
  return (
    <>
      {data?.content.map((item, index: number) => (
        <MainCharacterRankingListItem item={item} index={index} type={props.type}/>
      ))}
    </>
  );
};

export default MainCharacterRankingList;