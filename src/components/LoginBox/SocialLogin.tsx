import React from 'react';
import { ImgOpacityButton } from '../application/ui/ImgOpacityButton';
import { socialLoginTypes } from '../../constants/myConstants';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { getGoogleLoginUrl, getKakaoLoginUrl } from '../../utils/userUtil';
import Typography from '@mui/material/Typography';

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  gap: 20px;
`;

interface LoginButtonsProps {
  data: { src: string; alt: string; type: string }[];
}

const LoginButtons = (props: LoginButtonsProps) => {
  const onClick = (type: string) => {
    switch (type) {
      case 'KAKAO':
        window.location.href = getKakaoLoginUrl();
        break;
      case 'GOOGLE' :
        window.location.href= getGoogleLoginUrl();
        break;
      default:
        break;
    }
  };
  return (
    <>
      {props.data.map((item, index) => (
        <Tooltip title={item.type} key={index}>
          <ImgOpacityButton
            onClick={() => onClick(item.type)}
            src={item.src}
            alt={item.alt}
            key={index}
          />
        </Tooltip>
      ))}
    </>
  );
};

export function SocialLogin() {
  return (
    <ButtonSection>
      <Typography variant="body2" color="text.secondary">
        소셜 계정으로 간편 로그인
      </Typography>
      <LoginButtons data={socialLoginTypes.squareButtons} />
    </ButtonSection>
  );
}
