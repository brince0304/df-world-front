import { useNavigate } from 'react-router-dom';
import useNavBar from '../../hooks/useNavBar';
import React, { useCallback, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { removeCharacterHistory, setLoginModalOpened } from '../../redux';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import CustomSearchBox from '../CustomSearchBox';
import { HeaderData } from '../../data/HeaderData';
import { getCharactersAutoComplete } from '../../apis/character/getCharactersAutoComplete';
import { Avatar, Badge, Box, Button, IconButton, Tooltip, tooltipClasses, TooltipProps, Zoom } from '@mui/material';
import { HeaderProfile } from './HeaderProfile';
import LoginModal from '../../pages/Home/AuthModal';
import MobileHeader from '../MobileHeader';
import styled from 'styled-components';
import { useUser } from '../../hooks/authHooks/useUser';
import { useLogout } from '../../hooks/authHooks/useLogout';

const HeaderProfileMenuBox = () => {
  const notificationCount = useSelector((state: RootState) => state.notification.notificationCount);
  const navigate = useNavigate();
  const handleNavigateToMypage = () => {
    navigate('/mypage/');
  };

  return (
    <ProfileMenu>
      <Tooltip title={'마이페이지'} placement={'bottom'} onClick={handleNavigateToMypage}>
        <MenuIconWrapper>
          <IconButton>
            <FontAwesomeIcon icon={faUser} size="sm" />
          </IconButton>
        </MenuIconWrapper>
      </Tooltip>
      <Tooltip title={'알림'} placement={'bottom'}>
        <MenuIconWrapper>
          <IconButton>
            {notificationCount === 0 ? (
              <FontAwesomeIcon icon={faBell} size="sm" />
            ) : (
              <Badge badgeContent={notificationCount} color="primary">
                <FontAwesomeIcon icon={faBell} size="sm" />
              </Badge>
            )}
          </IconButton>
        </MenuIconWrapper>
      </Tooltip>
    </ProfileMenu>
  );
};
const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const handleCharacterSearchNavigate = (characterName: string, serverId: string) => {
    navigate(`/characters/${serverId}?name=${characterName}`);
  };
  const [isNavbarOpened, openNavbar, closeNavbar] = useNavBar();

  const handleOptionMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    navigate(
      '/details/?characterId=' +
        e.currentTarget.attributes.getNamedItem('data-id')?.value +
        '&serverId=' +
        e.currentTarget.attributes.getNamedItem('data-option')?.value,
    );
  };
  const dispatch = useAppDispatch();

  const handleModalOpen = useCallback(() => {
    dispatch(setLoginModalOpened(true));
  }, [dispatch]);

  const [profileIsOpened, setProfileIsOpened] = useState(false);
  const searchHistory = useSelector((state: RootState) => state.history.characterHistory);
  const handleRemoveSearchOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetId = e.currentTarget.attributes.getNamedItem('data-id')?.value;
    if (targetId) {
      dispatch(removeCharacterHistory(targetId));
    }
  };
  const { user } = useUser();
  const handleLogout = useLogout();
  const handleClickProfile = useCallback(() => {
    setProfileIsOpened(!profileIsOpened);
  }, [profileIsOpened, setProfileIsOpened]);
  return (
    <Container>
      <HeaderTop>
        <MobileNavButton onClick={openNavbar}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </MobileNavButton>
        <Logo
          onClick={(e) => {
            navigate('/');
          }}
        >
          {props.title}
        </Logo>
        <SelectSearchWrapper>
          <CustomSearchBox
            placeholder={'캐릭터 검색'}
            direction={'down'}
            handleNavigate={handleCharacterSearchNavigate}
            filterOptions={HeaderData.serverList}
            searchHistoryMouseDown={handleOptionMouseDown}
            removeSearchHistory={handleRemoveSearchOptions}
            useSearchOption={true}
            searchHistory={searchHistory}
            autoCompleteHandler={getCharactersAutoComplete}
            autoCompleteUrl={'/characters/autoComplete?name={searchValue}&serverId={selectValue}'}
          />
        </SelectSearchWrapper>
      </HeaderTop>
      <HeaderBottom>
        <HeaderMenuWrapper>
          {HeaderData.menuList.map((item, index) => {
            return (
              <HeaderMenu
                key={index}
                onClick={(e) => {
                  navigate(item.link);
                }}
              >
                {item.name}
              </HeaderMenu>
            );
          })}
          {user ? (
            <HeaderMenu onClick={handleLogout}>로그아웃</HeaderMenu>
          ) : (
            <HeaderMenu onClick={handleModalOpen}>로그인</HeaderMenu>
          )}
        </HeaderMenuWrapper>
        <ProfileContainer>
          {user && (
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Box>
                    <ProfileNicknameWrapper>
                      <Avatar
                        alt={user.nickname}
                        src={user.profileImgPath}
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: 'white',
                          border: '1px solid #2e2e2e',
                        }}
                      />
                      {user.nickname}
                    </ProfileNicknameWrapper>
                    <HeaderProfileMenuBox />
                  </Box>
                </React.Fragment>
              }
              placement={'bottom'}
              TransitionComponent={Zoom}
            >
              <ProfileWrapper>
                <HeaderProfile onClick={handleClickProfile} />
              </ProfileWrapper>
            </HtmlTooltip>
          )}
        </ProfileContainer>
      </HeaderBottom>
      {!user && <LoginModal />}
      <React.Fragment>
        <MobileHeader isOpened={isNavbarOpened} menuList={HeaderData.menuList} handleClose={closeNavbar} />
      </React.Fragment>
      <NavBackground isOpened={isNavbarOpened} onClick={closeNavbar} />
    </Container>
  );
};

const Container = styled.header`
  //헤더 그림자
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

const Logo = styled(Button)`
  && {
    padding-top: 15px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    padding-right: 0;
    font-family: 'Core Sans';

    &:hover {
      color: cornflowerblue;
      background-color: transparent;
    }
  }

  @media (max-width: 768px) {
    grid-column-start: 3;
    grid-column-end: 5;
    //맨왼쪽 배치
    padding-left: 0;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const SelectSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 25%;
  margin-top: 15px;
  width: 350px;
  height: 36px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
    //그리드 두번째줄 혼자 사용
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`;

const HeaderMenu = styled(Button)`
  && {
    color: white;
    background-color: transparent;
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Core Sans';

    &:hover {
      color: cornflowerblue;
      background: transparent;
    }
  }
`;

//헤더의 한줄 div 스타일 양 옆에 왼쪽은 로고 오른쪽엔 검색창 배치해둘것임
const HeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  @media (max-width: 768px) {
    padding: 0 1%;
    //위에 2개 아래에 하나 그리드
    display: grid;
    grid-template-columns: 20% 50% 30%;
    grid-template-rows: 100%;
    height: 50%;
  }
`;
const MobileNavButton = styled(Button)`
  && {
    display: none;
    padding-top: 15px;
    @media (max-width: 768px) {
      color: white;
      display: flex;
      grid-column-start: 1;
      grid-column-end: 2;
      margin-right: 10px;
    }

    &:hover {
      color: cornflowerblue;
      background-color: transparent;
      cursor: pointer;
    }
  }
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

interface HeaderProps {
  title: string;

  userId?: string;
}

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1200px) {
    width: 200px;
    margin-right: 15px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 230px;
  padding-right: 15px;
  @media (max-width: 1300px) {
    padding-right: 0;
  }
`;

const HeaderMenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileMenu = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuIconWrapper = styled.div`
  color: #181818;
`;

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F8F8F8',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '300px',
    height: '100%',
    border: '1px solid #dadde9',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
    fontSize: '0.9rem',
  },
}));

const ProfileNicknameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  gap: 10px;
  padding: 10px 0px;
`;

export default Header;
