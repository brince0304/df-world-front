import React from 'react';
import { Avatar, Badge, Button } from '@mui/material';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import styled from '@emotion/styled';

export const HeaderProfileContent = (props: { onClick: () => void }) => {
  const { user } = useUserQuery();
  return (
    <Button onClick={props.onClick}>
      <Badge color="primary" badgeContent={user?.notificationCount}>
        <Avatar
          src={user?.profileImgPath}
          alt="profile"
          sx={{ width: '1.2rem', height: '1.2rem', backgroundColor: 'white', border: '1px solid #f5f5f5' }}
        />
      </Badge>
      <ProfileNicknameWrapper>
        <p style={{ fontSize:'0.8rem' }}>{user?.nickname}</p>
      </ProfileNicknameWrapper>
    </Button>
  );
};

const ProfileNicknameWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
  color: #f5f5f5;
  font-weight: 600;
  width: 100%;
`;
