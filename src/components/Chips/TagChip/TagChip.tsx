import { useNavigate } from 'react-router';
import React from 'react';
import { Tooltip } from '@mui/material';
import HashtagContent from './TagChipContent';
import HashtagLoading from './TagChipLoading';
import { BOARD_LIST_URL } from 'apis/data/urls';
import MyChip from '../MyChip';

export const TagChip = ({ boardType, tag }: ITagChipProps) => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const handleTagClick = (e: React.MouseEvent<HTMLElement>) => {
    const keyword = ref.current?.getAttribute('data-tag')!;
    navigate(BOARD_LIST_URL + `?boardType=${boardType}&searchType=hashtag&keyword=${keyword}`);
    e.stopPropagation();
  };
  const [isMouseOvered, setIsMouseOvered] = React.useState(false);
  const { boardCount, isHashtagLoading } = useHashtagCount(tag, isMouseOvered);
  const handleMouseOver = () => {
    setIsMouseOvered(true);
  };

  return (
    <Tooltip
      title={isHashtagLoading ? <HashtagLoading /> : <HashtagContent count={String(boardCount) || '0'} />}
      placement="top"
      data-tag={tag}
      disableInteractive
      onMouseOver={handleMouseOver}
    >
      <MyChip
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
function useHashtagCount(tag: string, isMouseOvered: boolean): { boardCount: any; isHashtagLoading: any } {
  throw new Error('Function not implemented.');
}
