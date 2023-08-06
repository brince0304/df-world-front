import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ILoginResponse } from 'services/userService';
import HeaderMoctileUserProfile from './HeaderMobileUserProfile';
import HeaderMobileMenus from './HeaderMobileMenus';
import styled from '@emotion/styled';

const HeaderMobile = ({ user, ...props }: IHeaderMobileProps) => {
  const navigate = useNavigate();
  const notificationCount = user?.notificationCount;
  const [profileIsOpened, setProfileIsOpened] = useState(false);
  const handleProfileOpen = () => {
    setProfileIsOpened(!profileIsOpened);
  };
  const handleNavigateToMyPage = () => {
    navigateCallback('/mypage');
  };
  const handleNavigateToMain = () => {
    navigateCallback('/');
  };

  const navigateCallback = (url: string) => {
    navigate(url);
    setProfileIsOpened(false);
    props.handleClose();
  };
  return (
    <Container isOpened={props.isOpened}>
      <NavMenu>
        <Logo onClick={handleNavigateToMain}>커뮤니티</Logo>
        {user && (
          <HeaderMoctileUserProfile
            user={user}
            notificationCount={notificationCount || 0}
            isProfileOpened={profileIsOpened}
            handleProfileOpen={handleProfileOpen}
            handleNavigateToMyPage={handleNavigateToMyPage}
          />
        )}
        {user && <Division />}
        <HeaderMobileMenus
          user={user}
          handleClose={props.handleClose}
          handleModalOpen={props.handleModalOpen}
          menuList={props.menuList}
          navigateCallback={navigateCallback}
        />
      </NavMenu>
    </Container>
  );
};

export default HeaderMobile;

interface IHeaderMobileProps {
  user: ILoginResponse | null;
  isLoginOpen: boolean;
  handleModalOpen: () => void;
  isOpened: boolean;
  menuList: { name: string; link: string }[];
  handleClose: () => void;
}

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
