import React from 'react';
import { ImgOpacityButton } from '../application/ui/ImgOpacityButton';
import { socialLoginTypes } from '../../constants/myConstants';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { getKakaoLoginUrl } from '../../utils/userUtil';

const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
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
            width={45}
            height={45}
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
      <LoginButtons data={socialLoginTypes.circleButtons} />
    </ButtonSection>
  );
}
