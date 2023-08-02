import styled from '@emotion/styled';
import { Box } from '@mui/material';
import BoardTagChips from './BoardTagChips';
import { getBoardType } from 'utils/boardUtil';
import { BoardContent } from 'interfaces/IBoardList';
import { useNavigate } from 'react-router-dom';
import MyChip from 'components/Chips/MyChip';
import CharacterChip from 'components/Chips/CharacterChip/CharacterChip';

const BoardChips = ({ data }: IBoardChipsProps) => {
  const navigate = useNavigate();
  const handleTypeTagClick = () => {
    navigate(`/boards?boardType=${data.boardType}`);
  };
  return (
    <BoardTagContainer>
      <MyChip
        label={getBoardType(data.boardType)}
        color="info"
        clickable={true}
        sx={{ fontSize: '10px', fontWeight: 'bold' }}
        size="small"
        data-type={data.boardType}
        onClick={handleTypeTagClick}
      />
      <BoardTagChips tags={data.hashtags} boardType={data.boardType} />
      {data.character && (
        <CharacterChip
          characterName={data.character.characterName}
          characterImgUrl={data.character.characterImageUrl}
          adventureName={data.character.adventureName}
          serverId={data.character.serverId}
          characterId={data.character.characterId}
        />
      )}
    </BoardTagContainer>
  );
};

export default BoardChips;

interface IBoardChipsProps {
  data: BoardContent;
}

const BoardTagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
  padding-top: 20px;
  padding-bottom: 5px;
`;
