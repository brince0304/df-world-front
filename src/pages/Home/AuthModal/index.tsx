import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, Divider } from '@mui/material';
import RegisterPage from './RegisterPage';
import { SocialLogin } from './SocialLogin';
import LoginPage from './LoginPage';

function LoginModal({ isOpened, setIsOpened }: LoginModalProps) {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const handleChangeSection = () => {
    setIsLoginPage(!isLoginPage);
  };
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    //TODO : 로그인 페이지, 회원가입 페이지 분리해서 애니메이션 없이 바꾸
    <Dialog
      open={isOpened}
      onClose={handleClose}
      sx={{
        '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          maxWidth: '800px',
        },
      }}
    >
      <DialogContent>
        <RegisterContainer isLoginPage={isLoginPage} id={'register-part'}>
          <RegisterPage handleChangeSection={handleChangeSection} />
        </RegisterContainer>
        <LoginContainer isLoginPage={isLoginPage} id={'postSignIn-part'}>
          <SocialLogin />
          <Divider
            orientation={'vertical'}
            flexItem={true}
            sx={{
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          />
          <LoginPage handleChangeSection={handleChangeSection} />
        </LoginContainer>
      </DialogContent>
    </Dialog>
  );
}

interface LoginModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterContainer = styled.div`
  display: ${(props: { isLoginPage: boolean }) => (props.isLoginPage ? 'none' : 'flex')};
  width: 100%;
  height: 100%;
  //넘치면 스크롤바
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoginContainer = styled.div`
  display: ${(props: { isLoginPage: boolean }) => (props.isLoginPage ? 'flex' : 'none')};
  height: 100%;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default LoginModal;
