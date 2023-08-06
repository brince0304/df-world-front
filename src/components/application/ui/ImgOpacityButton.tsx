import React from 'react';
import { IconButton } from '@mui/material';
import styled from '@emotion/styled';

const Image = styled.img`
  padding: 0px;
  scale: ${(props: { scale: number | undefined }) => (props.scale ? props.scale : 1)};
`;

interface ImgOpacityButtonProps {
  src: string;
  alt: string;
  scale?: number;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export function ImgOpacityButton(props: ImgOpacityButtonProps) {
  return (
    <IconButton
      onClick={props.onClick}
      sx={{
        padding: '0px',
      }}
    >
      <Image src={props.src} alt={props.alt} scale={props.scale} width={props.width} height={props.height} />
    </IconButton>
  );
}
