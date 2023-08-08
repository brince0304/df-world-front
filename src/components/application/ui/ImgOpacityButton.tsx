import React from 'react';
import styled from '@emotion/styled';
import { Button, useMediaQuery } from '@mui/material';

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
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <Button
      onClick={props.onClick}
      sx={{
        padding: '0px',
      }}
    >
      <Image
        src={props.src}
        alt={props.alt}
        scale={props.scale}
        width={isMobile ? (props.width ? props.width / 1.5 : undefined) : props.width}
      />
    </Button>
  );
}
