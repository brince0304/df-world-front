import React from 'react';
import styled from 'styled-components';
import { ImgOpacityButton } from '../../../components/application/ui/ImgOpacityButton';
import { Divider } from '@mui/material';
import { socialLoginTypes } from '../../../constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
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
  width: 50%;
`;

interface LoginButtonsProps {
  data: { src: string; alt: string; type: string }[];
}

const LoginButtons = (props: LoginButtonsProps) => {
  return (
    <>
      {props.data.map((item, index) => (
        <ImgOpacityButton src={require('../../../assets/img/' + item.src)} alt={item.alt} scale={1.5} key={index} />
      ))}
    </>
  );
};

export function SocialLogin() {
  return (
    <Container>
      <Divider orientation="vertical" flexItem={true}>
        소셜 아이디로 로그인
      </Divider>
      <ButtonSection>
        <LoginButtons data={socialLoginTypes.squareButtons}/>
      </ButtonSection>
    </Container>
  );
}
