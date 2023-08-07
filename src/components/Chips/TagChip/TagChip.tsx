import { useNavigate } from 'react-router';
import React from 'react';
import { Tooltip } from '@mui/material';
import HashtagContent from './TagChipContent';
import HashtagLoading from './TagChipLoading';
import { BOARD_LIST_URL } from 'apis/data/urls';
import MyChip from '../MyChip';
import useHashtagCountQuery from '../../../hooks/boardHooks/queries/useHashtagCountQuery';

export const TagChip = ({ boardType, tag }: ITagChipProps) => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const handleTagClick = (e: React.MouseEvent<HTMLElement>) => {
    const keyword = ref.current?.getAttribute('data-tag')!;
    navigate(BOARD_LIST_URL + `?boardType=${boardType}&searchType=hashtag&keyword=${keyword}`);
    e.stopPropagation();
  };
  const [isMouseOvered, setIsMouseOvered] = React.useState(false);
  const { boardCount, isHashtagLoading } = useHashtagCountQuery(tag, isMouseOvered);
  const handleMouseOver = () => {
    setIsMouseOvered(true);
  };

  return (
    <Tooltip
      title={isHashtagLoading ? <HashtagLoading /> : <HashtagContent count={String(boardCount) || '0'} />}
      placement="top"
      data-tag={tag}
      disableInteractive
      arrow
      onMouseOver={handleMouseOver}
    >
      <MyChip
        ref={ref}
        label={'#' + tag}
        color="default"
        clickable={true}
        size="medium"
        variant={'outlined'}
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
