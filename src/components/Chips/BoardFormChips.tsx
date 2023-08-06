import MyChip from './MyChip';
import { boardTypesForForm, getBoardType } from '../../utils/boardUtil';
import { List, styled } from '@mui/material';

const BoardFormChips = ({ boardType, setBoardType }: { boardType: string; setBoardType: (value: string) => void }) => {
  return (
    <ListContainer>
      {boardTypesForForm.map((boardCategory, index) => (
        <MyChip
          key={index}
          label={getBoardType(boardCategory.id)}
          color={boardType === boardCategory.id ? 'info' : 'default'}
          variant={boardType === boardCategory.id ? 'filled' : 'outlined'}
          clickable={true}
          sx={{ fontSize: '13px', fontWeight: 'bold' }}
          size="medium"
          data-type={getBoardType(boardCategory.id)}
          onClick={() => setBoardType(boardCategory.id)}
        />
      ))}
    </ListContainer>
  );
};

export default BoardFormChips;

const ListContainer = styled(List)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;
