import MyChip from './MyChip';
import { boardCategoriesWithoutNotice, getBoardType } from '../../utils/boardUtil';
import { useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';

const BoardTypeChips = ({ boardType }: { boardType: string }) => {
  const navigate = useNavigate();
  const handleTypeTagClick = (type: string) => {
    navigate(`/boards?boardType=${type}`);
  };
  return (
    <ListContainer>
      {boardCategoriesWithoutNotice.map((boardCategory, index) => (
        <MyChip
          key={index}
          label={getBoardType(boardCategory.id)}
          color={boardType === boardCategory.id ? 'info' : 'default'}
          variant={boardType === boardCategory.id ? 'filled' : 'outlined'}
          clickable={true}
          sx={{ fontSize: '13px', fontWeight: 'bold' }}
          size="medium"
          data-type={getBoardType(boardCategory.id)}
          onClick={() => handleTypeTagClick(boardCategory.id)}
        />
      ))}
    </ListContainer>
  );
};

export default BoardTypeChips;

const ListContainer = styled(Box)`
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
  padding-bottom: 5px;
  scroll-behavior: smooth;
`;
