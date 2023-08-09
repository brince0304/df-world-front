import useMainAdventureRankingQuery from '../../../hooks/characterHooks/queries/useMainAdventureRankingQuery';
import MainAdventureRankingListItem from './MainAdventureRankingListItem';

const MainAdventureRankingList = ({type}:{type:string}) => {
  const data = useMainAdventureRankingQuery(type);
  return (
    <>
      {data?.map((item, index) => (
        <MainAdventureRankingListItem item={item} index={index} type={type} />
      ))}
    </>
  );
}

export default MainAdventureRankingList;