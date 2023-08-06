import { useKaKaoLoginMutation } from '../hooks/authHooks/mutations/useKakaoLoginMutaion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KaKaoCallback = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code')?.toString() || '';
  const kakaoLogin = useKaKaoLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (code) {
      kakaoLogin(code);
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return <div></div>;
};

export default KaKaoCallback;
