import Typography from '@mui/material/Typography';
import { Card, Divider, styled } from '@mui/material';
import UserProfileSection from './UserProfileSection';
import * as React from 'react';
import UserProfileMenus from './UserProfileMenus';

const UserProfileCard = (props: { refresh: () => void }) => {
  return (
    <UserProfileCardStyled>
      <Typography component={'h1'} fontSize={'1.2rem'} fontWeight={'bold'} sx={{ textAlign: 'left' }}>
        마이페이지
      </Typography>
      <Divider flexItem sx={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }} />
      <UserProfileSection />
      <Divider flexItem sx={{ width: '100%', marginTop: '0.5rem' }} />
      <UserProfileMenus refresh={props.refresh} />
    </UserProfileCardStyled>
  );
};

export default UserProfileCard;

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
