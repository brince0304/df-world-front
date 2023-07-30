import { useNavigate } from 'react-router';
import React from 'react';
import { BOARD_LIST_URL } from '../../apis/data/urls';
import { Chip, Tooltip } from '@mui/material';
import HashtagContent from './HashtagContent';
import HashtagLoading from './HashtagLoading';
import useHashtagCount from '../../hooks/boardHooks/useHashtagCount';

export const TagChip = ({ boardType, tag} : ITagChipProps) => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const handleTagClick = (e: React.MouseEvent<HTMLElement>) => {
    const keyword = ref.current?.getAttribute('data-tag')!;
    navigate(BOARD_LIST_URL + `?boardType=${boardType}&searchType=hashtag&keyword=${keyword}`);
    e.stopPropagation();
  };
  const [isMouseOvered, setIsMouseOvered] = React.useState(false);
  const { boardCount,isHashtagLoading } = useHashtagCount(tag,isMouseOvered);
  const handleMouseOver = () => {
    setIsMouseOvered(true);
  }
  
  return (
    <Tooltip
      title={isHashtagLoading ? <HashtagLoading /> : <HashtagContent count={String(boardCount) || '0'}/>}
      placement="top"
      data-tag={tag}
      disableInteractive
      onMouseOver={handleMouseOver}
    >
      <Chip
        ref={ref}
        label={'#' + tag}
        color="default"
        clickable={true}
        sx={{ fontSize: '10px', fontWeight: 'bold' }}
        size="small"
        data-tag={tag}
        onClick={handleTagClick}
      />
    </Tooltip>
  );
};

interface ITagChipProps {
  boardType: string;
  tag: string;
}

