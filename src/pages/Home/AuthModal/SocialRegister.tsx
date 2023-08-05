import React from 'react';
import { ImgOpacityButton } from '../../../components/application/ui/ImgOpacityButton';
import { socialLoginTypes } from '../../../constants/myConstants';
import styled from '@emotion/styled';

interface LoginButtonsProps {
  data: { src: string; alt: string; type: string }[];
}

const RegisterButtons = (props: LoginButtonsProps) => {
  return (
    <>
      {props.data.map((item, index) => (
        <ImgOpacityButton src={require('../../../assets/img/' + item.src)} alt={item.alt} scale={1.5} key={index} />
      ))}
    </>
  );
};

export function SocialRegister() {
  return (
    <Container>
      <ButtonSection>
        <RegisterButtons data={socialLoginTypes.squareButtons} />
      </ButtonSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 46%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 51%;
`;
