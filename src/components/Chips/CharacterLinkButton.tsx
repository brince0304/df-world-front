import { Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { ForwardedRef } from 'react';

const CharacterLinkButton = ({ characterLinkModalOpen }: ICharacterLinkButtonProps,ref:ForwardedRef<HTMLDivElement>) => {
  return (
    <Chip
      ref={ref}
      icon={<FontAwesomeIcon icon={faXmark} style={{ padding: '5px' }} />}
      color={'default'}
      label={'캐릭터를 링크해보세요!'}
      size='medium'
      sx={{ fontWeight: 'bold' }}
      clickable
      onClick={characterLinkModalOpen}
    />
  )
}

interface ICharacterLinkButtonProps {
  characterLinkModalOpen: (...args:any[]) => void;
}

export default React.forwardRef(CharacterLinkButton);