import { useState } from 'react';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import useCharacterUserLink from '../../hooks/myPageHooks/useCharacterUserLink';
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileIconChangeDialog from './ProfileIconChangeDialog';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, List, ListItemButton, styled } from '@mui/material';
import MyActivitiesModal from '../../pages/MyPage/Modal/MyActivities';
import PublicIcon from '@mui/icons-material/Public';
import CharacterLinkModal from '../CharacterLinkModal/CharacterLinkModal';
import * as React from 'react';
import UserDetailEditDialog from './UserDetailEditDialog';

const UserProfileMenus = (props: { refresh: () => void }) => {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openActivityHistoryModal, setOpenActivityHistoryModal] = useState(false);
  const [openProfileIconChangeModal, setOpenProfileIconChangeModal] = useState(false);
  const { user } = useUserQuery();

  const { openLinkCharacterModal, handleCloseCharacterLinkModal, handlePostCharacter, handleOpenCharacterLinkModal } =
    useCharacterUserLink();

  const handleProfileChangeModalOpen = () => {
    setOpenProfileIconChangeModal(true);
  };

  const handleProfileChangeModalClose = () => {
    setOpenProfileIconChangeModal(false);
  };

  const handleOpenActivityHistoryModal = () => {
    setOpenActivityHistoryModal(true);
  };
  const handleCloseActivityHistoryModal = () => {
    setOpenActivityHistoryModal(false);
  };

  const handleOpenEditProfileModal = () => {
    setOpenEditProfileModal(true);
  };

  const handleCloseEditProfileModal = () => {
    setOpenEditProfileModal(false);
  };

  const profileMenuList = [
    {
      label: '정보 수정',
      onClick: handleOpenEditProfileModal,
      icon: <EditIcon />,
    },
    {
      label: '캐릭터 링크',
      onClick: handleOpenCharacterLinkModal,
      icon: <AttachFileIcon />,
    },
    {
      label: '활동내역',
      onClick: handleOpenActivityHistoryModal,
      icon: <AccountCircleIcon />,
    },
  ];
  return (
    <ProfileMenuList>
      {user && (
        <ProfileIconChangeDialog isOpened={openProfileIconChangeModal} handleClose={handleProfileChangeModalClose} />
      )}
      {profileMenuList.map((menu, index) => {
        return (
          <ProfileMenuButton key={index} onClick={menu.onClick}>
            {menu.icon}
            <Typography component={'span'} fontSize={'0.8rem'}>
              {menu.label}
            </Typography>
            {menu.label === '활동내역' && (
              <Badge
                sx={{
                  marginLeft: '10px',
                }}
                color={'primary'}
                badgeContent={user?.notificationCount}
              />
            )}
          </ProfileMenuButton>
        );
      })}
      <MyActivitiesModal
        activitiesModalOpened={openActivityHistoryModal}
        handleClose={handleCloseActivityHistoryModal}
      />
      <UserDetailEditDialog open={openEditProfileModal} onClose={handleCloseEditProfileModal} refresh={props.refresh} />
      <ProfileMenuButton onClick={handleProfileChangeModalOpen}>
        <Avatar sx={{ width: '20px', height: '20px' }} src={user?.profileImgPath} />
        <Typography component={'span'} fontSize={'0.8rem'}>
          프로필 변경
        </Typography>
      </ProfileMenuButton>
      {!user?.adventureName && (
        <ProfileMenuButton>
          <PublicIcon />
          <Typography component={'span'} fontSize={'0.8rem'}>
            모험단 등록
          </Typography>
        </ProfileMenuButton>
      )}
      <CharacterLinkModal
        isOpened={openLinkCharacterModal}
        handleClose={handleCloseCharacterLinkModal}
        handleSetCharacterDetails={handlePostCharacter}
      />
    </ProfileMenuList>
  );
};

const ProfileMenuList = styled(List)`
  display: block;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  width: 100%;
`;

const ProfileMenuButton = styled(ListItemButton)`
  display: flex;
  gap: 5px;
  width: 130px;
  height: 100%;
  border-radius: 10px;
  float: left;
`;

export default UserProfileMenus;
