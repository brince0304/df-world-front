import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import Typography from '@mui/material/Typography';
import { getOauthProvider } from '../../utils/userUtil';
import * as React from 'react';
import { Avatar, Box, styled } from '@mui/material';

const UserProfileSection = () => {
  const { user } = useUserQuery();
  return (
    <UserProfileImgWrapper>
      <UserProfileAvatar src={user?.profileImgPath} variant={'circular'} alt={'프로필 이미지'} />
      <UserNicknameAndEmailWrapper>
        <UserNicknameWrapper>
          <Typography component={'strong'} fontSize={'1.2rem'} fontWeight={'bold'}>
            {user?.nickname}
          </Typography>
          <Typography component={'span'} fontSize={'1rem'} color={'gray'}>
            ({user?.oauthProvider !== 'NULL' ? getOauthProvider(user?.oauthProvider) : user?.userId})
          </Typography>
        </UserNicknameWrapper>
        <UserEmailAndAdventuerNameWrapper>
          {!user?.adventureName && (
            <Typography component={'span'} fontWeight={'bold'} fontSize={'1rem'} color={'gray'}>
              모험단 등록 안됨
            </Typography>
          )}
        </UserEmailAndAdventuerNameWrapper>
      </UserNicknameAndEmailWrapper>
    </UserProfileImgWrapper>
  );
};

export default UserProfileSection;

const UserProfileAvatar = styled(Avatar)`
  && {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 10px;
  }
`;

const UserProfileImgWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const UserNicknameAndEmailWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const UserNicknameWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const UserEmailAndAdventuerNameWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;
