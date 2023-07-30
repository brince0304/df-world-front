import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Chip, styled } from '@mui/material';
import Box from '@mui/material/Box';

const BestBoardContent = (props: { likeCount: number; commentCount: string; boardType: string }) => {
  return (
    <Container>
      <FontWrapper>
        <FavoriteIcon sx={{ fontSize: 12 }} />
        {props.likeCount}
      </FontWrapper>
      <FontWrapper>
        <FontAwesomeIcon icon={faMessage} />
        {props.commentCount}
      </FontWrapper>
      <FontWrapper>
        <Chip size={'small'} variant={'filled'} label={props.boardType} sx={{ fontSize: 12 }} color={'primary'} />
      </FontWrapper>
    </Container>
  );
};

export default BestBoardContent;

const FontWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;