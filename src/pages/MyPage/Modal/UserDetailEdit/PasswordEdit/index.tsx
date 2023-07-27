import CollapseButton from '../../../../../components/CollapseButton';
import { Button, FormControl, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import putChangePassword from '../../../../../apis/myPage/putChangePassword';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

interface FormProps {
  password: string;
  passwordValidate: string;
  passwordConfirm: string;
}

const PasswordEdit = (props: { onClose: () => void }) => {
  const passwordMatch = (password: string, passwordCheck: string) => {
    if (password !== '' && passwordCheck !== '') {
      return password === passwordCheck;
    }
    return true;
  };

  const schema = yup.object().shape({
    passwordValidate: yup.string(),
    password: yup
      .string()
      .min(8, '비밀번호는 8자리 이상이어야 합니다.')
      .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/, '영문, 숫자, 특수문자를 포함한 8~20자리'),
    passwordConfirm: yup.string().test('password', '비밀번호가 일치하지 않습니다.', function (value) {
      return passwordMatch(this.parent.password, this.parent.passwordConfirm);
    }),
  });

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onValid = (data: FormProps) => {
    handleUpdatePassword(data.passwordValidate, data.password);
  };

  const handleUpdatePassword = (passwordValidate: string, password: string) => {
    putChangePassword(passwordValidate, password)
      .then((res) => {
        alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요');
        props.onClose();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <CollapseButton label={'비밀번호 변경'}>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
        component={'form'}
        onSubmit={handleSubmit(onValid)}
      >
        <TextField
          fullWidth
          variant={'standard'}
          margin={'normal'}
          {...register('passwordValidate')}
          label={
            <Typography component={'span'} fontFamily={'Core Sans'} fontSize={'1rem'} fontWeight={'bold'}>
              현재 비밀번호
            </Typography>
          }
          type={'password'}
        />
        <TextField
          fullWidth
          variant={'standard'}
          margin={'normal'}
          helperText={
            <Typography component={'span'} fontFamily={'Core Sans'} fontSize={'0.75rem'}>
              {errors.password?.message}
            </Typography>
          }
          {...register('password')}
          error={!!errors.password}
          label={
            <Typography component={'span'} fontFamily={'Core Sans'} fontSize={'1rem'} fontWeight={'bold'}>
              변경할 비밀번호
            </Typography>
          }
          type={'password'}
        />
        <TextField
          fullWidth
          variant={'standard'}
          margin={'normal'}
          helperText={
            <Typography component={'span'} fontFamily={'Core Sans'} fontSize={'0.75rem'}>
              {errors.passwordConfirm?.message}
            </Typography>
          }
          {...register('passwordConfirm')}
          error={!!errors.passwordConfirm}
          label={
            <Typography component={'span'} fontFamily={'Core Sans'} fontSize={'1rem'} fontWeight={'bold'}>
              비밀번호 확인
            </Typography>
          }
          type={'password'}
        />
        <Button
          variant={'contained'}
          color={'primary'}
          disabled={
            !!errors.password ||
            !!errors.passwordConfirm ||
            !watch('password') ||
            !watch('passwordConfirm') ||
            !watch('passwordValidate')
          }
          sx={{ width: '100%' }}
          type={'submit'}
        >
          변경
        </Button>
      </FormControl>
    </CollapseButton>
  );
};

export default PasswordEdit;
