import * as React from 'react';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../redux/store';
import { removeCharacterHistory } from '../../../redux';
import { postCharacterToUserAccount } from '../../../apis/myPage/postCharacterToUserAccount';
import { USER_CHARACTERS_POST_URL } from '../../../apis/data/urls';
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileIconChangeModal from '../../Home/AuthModal/ProfileIconChangeModal';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, List, ListItemButton, styled } from '@mui/material';
import MyActivitiesModal from '../Modal/MyActivities';
import UserDetailEditModal from '../Modal/UserDetailEdit';
import PublicIcon from '@mui/icons-material/Public';
import CharacterLinkModal from '../Modal/CharacterLink';
import { useUser } from '../../../hooks/authHooks/useUser';

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


const ProfileMenus = (props: { refresh: () => void }) => {
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [openLinkCharacterModal, setOpenLinkCharacterModal] = useState(false);
    const [openActivityHistoryModal, setOpenActivityHistoryModal] = useState(false);
    const [openProfileIconChangeModal, setOpenProfileIconChangeModal] = useState(false);
    const { user } = useUser();
    const dispatch = useAppDispatch();
    const handleRemoveSearchOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.attributes.getNamedItem("data-id")?.value;
        if (targetId) {
            dispatch(removeCharacterHistory(targetId));
        }
    };

    const handleCloseCharacterLinkModal = () => {
        setOpenLinkCharacterModal(false);
    }

    const handlePostCharacter = (characterId: string, serverId: string, characterName: string) => {
        if (characterId && serverId && window.confirm(`${characterName} 캐릭터를 등록하시겠습니까?`)) {
            postCharacterToUserAccount(USER_CHARACTERS_POST_URL.replace("{characterId}", characterId).replace("{serverId}", serverId)).then((response) => {
                window.alert("캐릭터가 등록되었습니다.");
                props.refresh();
                handleCloseCharacterLinkModal();
            }).catch((error) => {
                window.alert(error.response.data);
            });
        }
    };

    const handleProfileChangeModalOpen =
        () => {
            setOpenProfileIconChangeModal(true);
        }

    const handleProfileChangeModalClose =
        () => {
            setOpenProfileIconChangeModal(false);
        }

    const handleSetCharacterDetails = (characterId: string, serverId: string, characterName: string) => {
        handlePostCharacter(characterId, serverId, characterName);
    };


    const handleOpenCharacterLinkModal = useCallback(() => {
        setOpenLinkCharacterModal(true);
    }, []);
    const handleOptionMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        const serverId = event.currentTarget.getAttribute("data-option");
        const characterId = event.currentTarget.getAttribute("data-id");
        const characterName = event.currentTarget.getAttribute("data-title");
        if (serverId && characterId && characterName) {
            handleSetCharacterDetails(characterId, serverId, characterName);
        }
    };
    const handleOpenActivityHistoryModal = () => {
        setOpenActivityHistoryModal(true);
    }
    const handleCloseActivityHistoryModal = () => {
        setOpenActivityHistoryModal(false);
    }

    const handleOpenEditProfileModal =() => {
        setOpenEditProfileModal(true);
    }

    const handleCloseEditProfileModal = () => {
        setOpenEditProfileModal(false);
    }

    const profileMenuList = [
        {
            label: "정보 수정",
            onClick: handleOpenEditProfileModal,
            icon: <EditIcon/>
        },
        {
            label: "캐릭터 링크",
            onClick: handleOpenCharacterLinkModal,
            icon: <AttachFileIcon/>
        },
        {
            label: "활동내역",
            onClick: handleOpenActivityHistoryModal,
            icon: <AccountCircleIcon/>
        }
    ];
    return (
        <ProfileMenuList>
            {user && <ProfileIconChangeModal isOpened={openProfileIconChangeModal}
                                                        handleClose={handleProfileChangeModalClose}
                                                        />}
            {profileMenuList.map((menu, index) => {
                return (
                    <ProfileMenuButton key={index} onClick={menu.onClick}>
                        {menu.icon}
                        <Typography component={"span"} fontSize={"0.8rem"}>{menu.label}</Typography>
                        {menu.label === '활동내역' && <Badge sx={{
                            marginLeft: "10px"
                        }} color={"primary"}
                                                         badgeContent={user?.notificationCount} />}
                    </ProfileMenuButton>
                );
            })}
            <MyActivitiesModal activitiesModalOpened={openActivityHistoryModal}
                               handleClose={handleCloseActivityHistoryModal}/>
            <UserDetailEditModal open={openEditProfileModal} onClose={handleCloseEditProfileModal}
                                 refresh={props.refresh}/>
            <ProfileMenuButton onClick={handleProfileChangeModalOpen}>
                <Avatar sx={{width: "20px", height: "20px"}} src={user?.profileImgPath}/>
                <Typography component={"span"} fontSize={"0.8rem"}>프로필 변경</Typography>
            </ProfileMenuButton>
            {!user?.adventureName && <ProfileMenuButton>
                <PublicIcon/>
                <Typography component={"span"} fontSize={"0.8rem"}>모험단 등록</Typography>
            </ProfileMenuButton>
            }
            <CharacterLinkModal isOpened={openLinkCharacterModal} handleClose={handleCloseCharacterLinkModal}
                                handleOptionMouseDown={handleOptionMouseDown}
                                handleRemoveSearchOptions={handleRemoveSearchOptions}
                                handleSetCharacterDetails={handleSetCharacterDetails}/>
        </ProfileMenuList>
    );
};

export default ProfileMenus;
