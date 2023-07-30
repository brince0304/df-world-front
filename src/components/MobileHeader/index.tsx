import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderProfile } from '../Header/HeaderProfile';
import { Badge, Button, IconButton, Tooltip, Zoom } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../hooks/authHooks/useUser';

const Container = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    padding: 0rem 1rem;
    visibility: ${({ isOpened }: { isOpened: boolean }) => (isOpened ? 'visible' : 'hidden')};
    background-color: #212124;
    height: 100vh;
    width: 45%;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpened }: { isOpened: boolean }) => (isOpened ? '100%' : '0')};
    left: ${({ isOpened }: { isOpened: boolean }) => (isOpened ? '0' : '-100%')};
    backdrop-filter: blur(2px);
    z-index: 1;
  }
`;

const NavItem = styled.a`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  padding: 10px 0;
  &:hover {
    color: cornflowerblue;
  }

  cursor: pointer;
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const Division = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin: 10px 0;
  opacity: 0.5;
`;

const ProfileWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

//네비바 바깥 누르면 닫히는 함수

interface NavProps {
  isLoginOpen: boolean;
  handleModalOpen: () => void;
  isOpened: boolean;
  menuList: { name: string; link: string }[];
  handleClose: () => void;
}

const Logo = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10%;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    padding-right: 0;

    &:hover {
      color: cornflowerblue;
      background-color: transparent;
    }
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  left: 100%;
  top: 2px;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  @media (max-width: 1200px) {
    position: absolute;
    right: 20%;
    width: 140px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 70%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: white;
    border-left: 0;
    margin-top: -20px;
    margin-left: -8px;
  }
`;

const ProfileMenuList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #121212;
`;

const MobileHeader = (props: NavProps) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const notificationCount = user?.notificationCount;
  const [profileIsOpened, setProfileIsOpened] = useState(false);
  const handleProfileOpen = () => {
    setProfileIsOpened(!profileIsOpened);
  };
  const handleNavigateToMyPage = () => {
    navigate('/mypage/');
    setProfileIsOpened(false);
    props.handleClose();
  };
  return (
    <Container isOpened={props.isOpened}>
      <NavMenu>
        <Logo
          onClick={(e) => {
            navigate('/');
            props.handleClose();
            setProfileIsOpened(false);
          }}
        >
          커뮤니티
        </Logo>
        {user && (
          <ProfileWrapper>
            <HeaderProfile onClick={handleProfileOpen} />
            {user && (
              <Zoom in={profileIsOpened}>
                <ProfileMenu>
                  <ProfileMenuList>
                    <Tooltip title={'마이페이지'} placement={'bottom'}>
                      <IconButton onClick={handleNavigateToMyPage}>
                        <MenuIconWrapper>
                          <FontAwesomeIcon icon={faUser} size="sm" />
                        </MenuIconWrapper>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'알림'} placement={'bottom'}>
                      <IconButton>
                        {notificationCount === 0 && (
                          <MenuIconWrapper>
                            <FontAwesomeIcon icon={faBell} size="sm" />
                          </MenuIconWrapper>
                        )}
                        {notificationCount !== 0 && (
                          <Badge badgeContent={notificationCount} color="primary">
                            <MenuIconWrapper>
                              <FontAwesomeIcon icon={faBell} size="sm" />
                            </MenuIconWrapper>
                          </Badge>
                        )}
                      </IconButton>
                    </Tooltip>
                  </ProfileMenuList>
                </ProfileMenu>
              </Zoom>
            )}
          </ProfileWrapper>
        )}
        {user && <Division />}
        {user && <NavItem onClick={() => {}}>로그아웃</NavItem>}
        {!user && <NavItem onClick={props.handleModalOpen}>로그인</NavItem>}
        {props.menuList.map((item, index) => {
          return (
            <NavItem
              key={index}
              onClick={(e) => {
                navigate(item.link);
                props.handleClose();
                setProfileIsOpened(false);
              }}
            >
              {item.name}
            </NavItem>
          );
        })}
      </NavMenu>
    </Container>
  );
};

export default MobileHeader;
