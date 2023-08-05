import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginRequest } from '../../services/userService';
import { useLoginMutation } from '../authHooks/mutations/useLoginMutation';


const useLoginForm = () => {
  const schema = yup.object().shape({
    username: yup.string().required('아이디를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const watchUsername = watch('username');
  const watchPassword = watch('password');
  const watchValues = {
    watchUsername,
    watchPassword,
  };

  const setValues = {
    setUsername: (value: string) => setValue('username', value),
    setPassword: (value: string) => setValue('password', value),
  };

  const login = useLoginMutation();
  const onValid = (data: ILoginRequest) => {
    login({ username: data.username, password: data.password });
  };

  return {
    register,
    handleSubmit,
    watchValues,
    setValues,
    onValid,
    errors
  }

}

export default useLoginForm;
