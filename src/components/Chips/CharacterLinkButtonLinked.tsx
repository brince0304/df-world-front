import { Avatar, Chip } from '@mui/material';
import { HighlightOffOutlined } from '@mui/icons-material';
import * as React from 'react';
import { ForwardedRef, forwardRef } from 'react';

const CharacterLinkButtonLinked = ({ characterName, characterImgUrl, handleDeleteCharacter }: ICharacterLinkButtonLinkedProps,ref:ForwardedRef<HTMLDivElement>) => {
  const imgStyle = {
    '& > img': {
      objectFit: 'cover',
      objectPosition: 'center',
      width: '100%',
      height: '400%',
    },
  };
  return (
    // TODO: speed dial 로 바꾸기
    <Chip
      ref={ref}
      avatar={
        <Avatar
          src={characterImgUrl}
          sx={imgStyle}
        />
      }
      color={'primary'}
      label={characterName}
      size='medium'
      sx={{ fontWeight: 'bold' }}
      clickable={!!handleDeleteCharacter}
      deleteIcon={<HighlightOffOutlined />}
      onDelete={handleDeleteCharacter}
    />
  )
}

interface ICharacterLinkButtonLinkedProps {
  characterName: string;
  characterImgUrl: string;
  handleDeleteCharacter ?: (...args:any[]) => void;
}

export default forwardRef(CharacterLinkButtonLinked);