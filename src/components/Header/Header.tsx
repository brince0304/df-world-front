import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import { headerMenu } from '../../constants/myConstants';
import useNavBar from 'hooks/uiHooks/useNavBar';
import HeaderMenus from './HeaderMenus';
import HeaderTopSection from './HeaderTopSection';
import HeaderProfileContainer from './HeaderProfileContainer';
import HeaderMobile from './HeaderMobile/HeaderMobile';
import styled from '@emotion/styled';
import LoginBox from '../LoginBox/LoginBox';

const Header = () => {
  const navigate = useNavigate();
  const [isNavbarOpened, openNavbar, closeNavbar] = useNavBar();
  const [isProfileOpened, setIsProfileOpened] = useState(false);
  const { user } = useUserQuery();
  const handleClickProfile = () => {
    setIsProfileOpened(!isProfileOpened);
  };
  const [isLoginModalOpened, setLoginModalOpened] = useState(false);
  const handleModalToggle = () => {
    setLoginModalOpened(true);
    closeNavbar();
  };
  const characterSearchHandler = (characterName: string, serverId: string) => {
    navigate(`/characters/${serverId}?name=${characterName}`);
  };
  const characterDetailHandler = (characterId: number, serverId: string) => {
    navigate(`/details/?characterId=${characterId}&serverId=${serverId}`);
  };
  const handleNavbarCloseCallback = () => {
    closeNavbar();
    setIsProfileOpened(false);
  };
  return (
    <Container>
      <HeaderTopSection
        handleOpenNavbar={openNavbar}
        characterSearchHandler={characterSearchHandler}
        characterDetailHandler={characterDetailHandler}
      />
      <HeaderBottom>
        <HeaderMenus user={user} handleOpenModal={handleModalToggle} />
        <HeaderProfileContainer user={user} handleClickProfile={handleClickProfile} />
      </HeaderBottom>
      <LoginBox isOpened={isLoginModalOpened} setIsOpened={setLoginModalOpened} />
      <React.Fragment>
        <HeaderMobile
          user={user}
          isLoginOpen={isLoginModalOpened}
          handleModalOpen={handleModalToggle}
          isOpened={isNavbarOpened}
          menuList={headerMenu}
          handleClose={closeNavbar}
        />
      </React.Fragment>
      <NavBackground isOpened={isNavbarOpened} onClick={handleNavbarCloseCallback} />
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  height: 120px;
  background-color: #212124;
  padding: 0 16%;
  z-index: 999;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    padding: 0 2%;
  }
  @media (max-width: 1024px) {
    padding: 0 4%;
  }
  font-family: 'Core Sans';
`;

const NavBackground = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${(props: { isOpened: boolean }) => (props.isOpened ? 1 : 0)};
    visibility: ${(props: { isOpened: boolean }) => (props.isOpened ? 'visible' : 'hidden')};
    transition:
      opacity 0.3s ease-in-out,
      visibility 0.3s ease-in-out;
  }
`;

const HeaderBottom = styled.div`
  //그림자
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  padding-top: 10px;
  background-color: #212124;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Header;
