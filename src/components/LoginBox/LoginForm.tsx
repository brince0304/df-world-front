import useLoginForm from '../../hooks/uiHooks/useLoginForm';
import * as React from 'react';
import * as S from './LoginForm.style';
import { TextField } from '@mui/material';

const LoginForm = ({ useLoginFormProps }: ILoginFormProps) => {
  const { register, errors } = useLoginFormProps;
  return (
    <S.InputBox

    >
      <TextField
        error={!!errors.username}
        type="text"
        label={'아이디'}
        fullWidth
        helperText={errors.username?.message}
        {...register('username')}
      />
      <TextField
        error={!!errors.password}
        type="password"
        label={'비밀번호'}
        fullWidth
        helperText={errors.password?.message}
        {...register('password')}
      />
      <S.LoginFormFooter>
        <S.MissingPassword onClick={() => {}}>회원가입</S.MissingPassword>
        <S.MissingPassword onClick={() => {}}>비밀번호를 잊으셨나요?</S.MissingPassword>
      </S.LoginFormFooter>
    </S.InputBox>
  );
};

export default LoginForm;

interface ILoginFormProps {
  useLoginFormProps: ReturnType<typeof useLoginForm>;
}
