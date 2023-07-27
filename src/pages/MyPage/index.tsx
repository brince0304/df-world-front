import { Avatar, Box, Card, Container, Divider, styled } from '@mui/material';
import { BadRequest } from '../../components/application/error/BadRequest';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { MyPageResponse } from '../../interfaces/MyPageResponse';
import getMyPageResponse from '../../apis/myPage/getMyPageResponse';
import ProfileMenus from './ProfileMenus';
import UserCharacters from './UserCharacters';
import { useUser } from '../../hooks/authHooks/useUser';

const UserProfile = () => {
  const { user } = useUser();
  return (
    <UserProfileImgWrapper>
      <UserProfileAvatar src={user?.profileImgPath} variant={'circular'} alt={'프로필 이미지'} />
      <UserNicknameAndEmailWrapper>
        <UserNicknameWrapper>
          <Typography component={'strong'} fontFamily={'Core Sans'} fontSize={'1.2rem'} fontWeight={'bold'}>
            {user?.nickname}
          </Typography>
          <Typography component={'span'} fontSize={'1rem'} fontFamily={'Core Sans'} color={'gray'}>
            ({user?.userId})
          </Typography>
        </UserNicknameWrapper>
        <UserEmailAndAdventuerNameWrapper>
          {!user?.adventureName && (
            <Typography
              component={'span'}
              fontWeight={'bold'}
              fontFamily={'Core Sans'}
              fontSize={'1rem'}
              color={'gray'}
            >
              모험단 등록 안됨
            </Typography>
          )}
        </UserEmailAndAdventuerNameWrapper>
      </UserNicknameAndEmailWrapper>
    </UserProfileImgWrapper>
  );
};

const UserProfileCard = (props: { refresh: () => void }) => {
  return (
    <UserProfileCardStyled>
      <Typography
        component={'h1'}
        fontFamily={'Core Sans'}
        fontSize={'1.5rem'}
        fontWeight={'bold'}
        sx={{ textAlign: 'left' }}
      >
        마이페이지
      </Typography>
      <Divider flexItem sx={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
      <UserProfile />
      <Divider flexItem sx={{ width: '100%', marginTop: '10px' }} />
      <ProfileMenus refresh={props.refresh} />
    </UserProfileCardStyled>
  );
};

const MyPage = () => {
  const { user } = useUser();
  const [myPageResponse, setMyPageResponse] = useState<MyPageResponse>({} as MyPageResponse);
  const handleSetMyPageResponse = useCallback((response: MyPageResponse) => {
    setMyPageResponse(response);
  }, []);
  const handleGetMyPageResponse = useCallback(() => {
    if (user) {
      getMyPageResponse().then((response) => {
        handleSetMyPageResponse(response.data);
      });
    }
  }, [user, handleSetMyPageResponse]);
  useEffect(() => {
    handleGetMyPageResponse();
  }, []);
  return (
    <Container maxWidth={'md'}>
      {!user && <BadRequest />}
      {user && (
        <Box>
          <UserProfileCard refresh={handleGetMyPageResponse} />
          <Box sx={{ marginTop: '20px' }}>
            <Typography
              component={'h1'}
              color={'#565360'}
              fontFamily={'Core Sans'}
              fontSize={'1.5rem'}
              fontWeight={'bold'}
              sx={{
                textAlign: 'left',
                marginBottom: '10px',
              }}
            >
              내 캐릭터{' '}
            </Typography>
            {myPageResponse?.userDetail?.characters.length > 0 && (
              <UserCharacters data={myPageResponse.userDetail.characters} refresh={handleGetMyPageResponse} />
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

const UserProfileCardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
`;
const UserProfileAvatar = styled(Avatar)`
  && {
    width: 50px;
    height: 50px;
    border: 2px solid black;
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
export default MyPage;
