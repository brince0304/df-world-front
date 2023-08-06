import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import LoginForm from './LoginForm';
import useLoginForm from '../../hooks/uiHooks/useLoginForm';
import * as S from './LoginBox.style';
import { SocialLogin } from './SocialLogin';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import { useCallback, useEffect } from 'react';

const LoginBox = ({ isOpened, setIsOpened }: ILoginBoxProps) => {
  const useLoginFormProps = useLoginForm();
  const { handleSubmit, onValid, setValues } = useLoginFormProps;
  const handleClose = useCallback(() => {
    setIsOpened(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dialogSx = {
    '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      maxWidth: '400px',
      width: '400px',
      height: '488px',
      padding: '20px',
    },
  };
  const { user } = useUserQuery();
  const handleSubmitCallback = handleSubmit(onValid);

  useEffect(() => {
    if (user) {
      handleClose();
      setValues.setPassword('');
      setValues.setUsername('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Dialog keepMounted={false} open={isOpened} onClose={handleClose} sx={dialogSx}>
      <DialogTitle>
        <S.Title>로그인</S.Title>
        <S.SubTitle>로그인 하고 더 많은 서비스를 이용해보세요!</S.SubTitle>
      </DialogTitle>
      <DialogContent>
        <S.Container onSubmit={handleSubmitCallback}>
          <LoginForm useLoginFormProps={useLoginFormProps} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            로그인
          </Button>
          <SocialLogin />
        </S.Container>
      </DialogContent>
    </Dialog>
  );
};

interface ILoginBoxProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

export default LoginBox;
