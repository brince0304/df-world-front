import MyChip from './MyChip';
import { boardCategories, getBoardType } from '../../utils/boardUtil';
import { useNavigate } from 'react-router-dom';
import { List, styled } from '@mui/material';

const BoardTypeChips = ({ boardType }: { boardType: string }) => {
  const navigate = useNavigate();
  const handleTypeTagClick = (type: string) => {
    navigate(`/boards?boardType=${type}`);
  };
  return (
    <ListContainer>
      {boardCategories.map((boardCategory, index) => (
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

const ListContainer = styled(List)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;
