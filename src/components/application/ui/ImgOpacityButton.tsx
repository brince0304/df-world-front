import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const Image = styled.img`
  padding: 10px 0px;
  margin: 0px 10px;
  scale: ${(props: { scale: number | undefined }) => (props.scale ? props.scale : 1)};
`;

interface ImgOpacityButtonProps {
  src: string;
  alt: string;
  scale?: number;
  width?: number;
  height?: number;
}

export function ImgOpacityButton(props: ImgOpacityButtonProps) {
  return (
    <Button>
      <Image src={props.src} alt={props.alt} scale={props.scale} width={props.width} height={props.height} />
    </Button>
  );
}
