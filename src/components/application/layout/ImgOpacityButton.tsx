import React from 'react';
import styled from 'styled-components';

const Button = styled.img`
  padding: 10px 0px;
  margin: 0px 10px;
  scale: ${(props: { scale: number | undefined }) => props.scale ? props.scale : 1};
  opacity: 0.7;

  &:hover {
    opacity: 1.0;
    transition: 0.3s;
    cursor: pointer;
  }
`;


interface ImgOpacityButtonProps {
    src: string;
    alt: string;
    scale?: number;
    width?: number;
    height?: number;
}

export function ImgOpacityButton(props: ImgOpacityButtonProps) {
    return <Button src={props.src} alt={props.alt} scale={props.scale} width={props.width} height={props.height}/>;
}