import { styled, Tooltip, Zoom } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BestArticles } from '../../interfaces/ArticleType';
import BestBoardContent from './BestBoardContent';
import BoardUserAvatar from '../BoardUserAvatar/BoardUserAvatar';

const BestBoardListItem = ({ item, chipColor, chipIndex, index, handleNavigate }: IBestListProps) => {
  return (
    <TabPanel value={index} index={chipIndex + 1} key={chipIndex}>
      <Tooltip
        placement={'bottom'}
        title={
          <BestBoardContent
            likeCount={item.boardLikeCount}
            commentCount={item.commentCount}
            boardType={item.boardType}
          />
        }
        key={chipIndex}
        arrow
        id={'chip-item-' + item.id.toString()}
      >
        <Zoom in={index === chipIndex + 1} timeout={200} onClick={(e) => handleNavigate(item.id)}>
          <ChipWrapper>
            <BoardUserAvatar src={item.userProfileImgUrl} nickname={item.userNickname} />
            <TitleWrapper>{item.boardTitle}</TitleWrapper>
          </ChipWrapper>
        </Zoom>
      </Tooltip>
    </TabPanel>
  );
};

export default BestBoardListItem;

export interface IBestListProps {
  item: BestArticles;
  chipColor?: 'primary' | 'secondary';
  chipIndex: number;
  index: number;
  handleNavigate: (...args: any[]) => void;
}

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value === index && <div>{children}</div>}</div>;
}

const ChipWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  width: 100%;
`;

const TitleWrapper = styled(Typography)`
  display: inline-block;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000000;
`;
