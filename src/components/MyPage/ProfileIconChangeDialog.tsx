import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material';
import ImageUploader from '../ImageUploader/ImageUploader';
import { profileIcons } from '../../constants/myConstants';
import styled from '@emotion/styled';
import React from 'react';
import useChangeProfileIconByURLMutation from '../../hooks/myPageHooks/mutations/useChangeProfileIconByURLMutation';

export default function ProfileIconChangeDialog(props: ProfileIconChangeModalProps) {
  const data = profileIcons;
  const changeProfileIcon = useChangeProfileIconByURLMutation();
  const handleChangeIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm('아이콘을 변경하시겠습니까?')) {
      const url = e.currentTarget.dataset.id;
      if (url === undefined) {
        alert('아이콘 변경에 실패하였습니다.');
        return;
      } else if (url) {
        changeProfileIcon(url);
        props.handleClose();
      }
    }
  };
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <Dialog open={props.isOpened} onClose={props.handleClose}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontSize: '1rem',
        }}
      >
        프로필 아이콘을 변경합니다!
      </DialogTitle>
      <DialogContent
        sx={{
          width: isMobile ? '100%' : 'auto',
          height: '450px',
          scrollBehavior: 'smooth',
          overflowY: 'hidden',
        }}
      >
        <ImageUploader handleClose={props.handleClose} />
        <IconSelectorWrapper>
          <p>혹은 기본 아이콘을 선택해주세요!</p>
        </IconSelectorWrapper>
        <ProfileIconChangeContainer>
          {data.map((icon, index) => (
            <IconButton data-id={icon.url} onClick={handleChangeIcon} key={index}>
              <Avatar
                src={'https://api.df-world.kr/files/?name=' + icon.name}
                sx={{ width: 30, height: 30, margin: 1 }}
              />
            </IconButton>
          ))}
        </ProfileIconChangeContainer>
      </DialogContent>
    </Dialog>
  );
}

interface ProfileIconChangeModalProps {
  isOpened: boolean;
  handleClose: () => void;
}

const ProfileIconChangeContainer = styled.div`
  display: block;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  height: 100%;
`;

const IconSelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 0.8rem;
  font-weight: 500;
  width: 100%;
`;
