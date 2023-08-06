export const getOauthProvider = (provider?: string) => {
  switch (provider) {
    case 'kakao':
      return '카카오';
    case 'google':
      return '구글';
    case 'naver':
      return '네이버';
    default:
      return '소셜 로그인';
  }
};

export const getKakaoLoginUrl = () => {
  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  return `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUrl}&response_type=code`;
};

export const getGoogleLoginUrl = () => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUrl}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
}