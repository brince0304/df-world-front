import { Typography } from '@mui/material';
import BestBoardListItem from './BestBoardListItem';
import { IBestBoard } from 'interfaces/IBestBoard';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_URL } from 'apis/data/urls';

const BestBoardList = ({ data, index }: IBestBoardListProps) => {
  const navigate = useNavigate();
  const handleBestArticleNavigate = (id: number) => {
    navigate(BOARD_DETAIL_URL + `${id}`);
  };
  return (
    <>
      {data?.length !== 0 &&
        data.map((item, chipIndex) => (
          <BestBoardListItem
            key={chipIndex}
            item={item}
            chipIndex={chipIndex}
            index={index}
            handleNavigate={handleBestArticleNavigate}
          />
        ))}
      {data?.length === 0 && (
        <Typography fontSize={'1.1rem'} fontWeight={'bold'}>
          베스트 게시글이 없습니다.
        </Typography>
      )}
    </>
  );
};

export default BestBoardList;

interface IBestBoardListProps {
  data: IBestBoard[];
  index: number;
}
