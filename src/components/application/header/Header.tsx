import React, {useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import {Avatar, Badge, Button, Divider, IconButton, Tooltip, tooltipClasses, TooltipProps, Zoom} from "@mui/material";
import {Collapse} from "@mui/material";
import {useState} from "react";
import "../../../assets/css/header.scss";
import {HeaderData} from "../../../data/HeaderData";
import LoginPage from "../auth/LoginPage";
import MobileNav from "./MobileNav";
import {faBars, faBell, faCog, faRing, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useNavBar from "../../../hooks/useNavBar";
import {SocialLogin} from "../auth/SocialLogin";
import RegisterPage from "../auth/RegisterPage";
import LoginModal from "../auth/LoginModal";
import useSelectSearch from "../../../hooks/useSelectSearch";
import {useNavigate} from "react-router-dom";
import store, {
    useAppDispatch,
    useAppSelector
} from "../../../redux/store";

import {RootState} from "../../../redux/store";
import {logout} from "../../../api/auth/logout";
import {HeaderProfile} from "./HeaderProfile";
import {getCharactersAutoComplete} from "../../../api/character/getCharactersAutoComplete";
import {setLoginModalIsOpened, setSearchHistory, toggleProfileOpened} from "../../../redux";
import {useSelector} from "react-redux";
import {removeCharacterHistory} from "../../../api/character/getCharacterDetail";
import Typography from "@mui/material/Typography";
import ProfileIconChangeModal from "../auth/ProfileIconChangeModal";
import Fade from "@mui/material/Fade";
import {NewSearchBox} from "../ui/NewSearchBox";


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
  font-family: 'Core Sans'
`;

const Logo = styled(Button)`
  && {
    padding-top: 15px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
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


const RegisterContainer = styled.div`
          display: ${(props: { isloginpage: boolean }) => props.isloginpage ? "none" : "flex"};
          width: 100%;
          height: 100%;
          //넘치면 스크롤바
          @media (max-width: 768px) {
            width: 100%;
          }
    `
;

const LoginContainer = styled.div`
  display: ${(props: { isloginpage: boolean }) => props.isloginpage ? "flex" : "none"};
  height: 100%;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
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
    opacity: ${(props: { isOpened: boolean }) => props.isOpened ? 1 : 0};
    visibility: ${(props: { isOpened: boolean }) => props.isOpened ? "visible" : "hidden"};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

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

const ProfileMenu = styled.ul`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  right: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1200px) {
  }
`;

const ProfileMenuList = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  color: white;

  &:hover {
    color: cornflowerblue;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }
`;

const profileMenuList = [
    {
        name: "마이페이지",
        link: "/mypage/",
        icon: <FontAwesomeIcon icon={faUser} size="sm"/>
    },
    {

    }
];

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: "100%",
        width: "300px",
        height: "auto",
        border: "2px solid #dadde9",
        boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.1)",
        fontSize: "0.9rem",
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
`;

export const HeaderProfileMenuBox = () => {
    const profileIsOpened = useSelector((state:RootState) => state.login.profileOpened);
    const notificationCount = useSelector((state: RootState) => state.notification.notificationCount);
    const hasNotification = useSelector((state: RootState) => state.notification.hasNotification);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleNavigateToMypage =()=>{
        navigate("/mypage/");
        dispatch(toggleProfileOpened)
    };

    return (
        <Zoom in={profileIsOpened} unmountOnExit mountOnEnter>
            <ProfileMenu>
                <ProfileMenuList>
                    <Tooltip title={"마이페이지"}  placement={"bottom"} onClick={handleNavigateToMypage}>
                        <IconButton>
                            <MenuIconWrapper>
                                <FontAwesomeIcon icon={faUser} size="sm"/>
                            </MenuIconWrapper>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"알림"} placement={"bottom"}>
                        <IconButton>
                            <Badge color="primary" badgeContent={notificationCount}
                                   invisible={!hasNotification}>
                                <MenuIconWrapper>
                                    <FontAwesomeIcon icon={faBell} size="sm"/>
                                </MenuIconWrapper>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </ProfileMenuList>
            </ProfileMenu>
        </Zoom>
    )
}


const Header = (props: HeaderProps) => {
    let navigate = useNavigate();
    const handleCharacterSearchNavigate = (characterName: string, serverId: string) => {
        navigate(`/characters/${serverId}?name=${characterName}`);
    };
    const [isNavbarOpened, openNavbar, closeNavbar] = useNavBar();
    const [isloginpage, setIsloginpage] = useState<boolean>(true);
    const handleChangeSection = useCallback(
        () => {
            setIsloginpage(!isloginpage);
        },
        [isloginpage]);
    const handleOptionMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate("/details/?characterId=" + e.currentTarget.attributes.getNamedItem("data-id")?.value + "&serverId=" + e.currentTarget.attributes.getNamedItem("data-option")?.value);
    };
    const isLogin = useAppSelector((state: RootState) => state.login.isLogin);

    const dispatch = useAppDispatch();

    const handleModalOpen = useCallback(
        () => {
            dispatch(setLoginModalIsOpened(true));
        }, [dispatch, setLoginModalIsOpened]);

    const handleLogout = useCallback(
        () => {
            dispatch(logout());
        }, [dispatch, navigate, logout]);
    const profileIsOpened = useAppSelector((state: RootState) => state.login.profileOpened);
    const hasNotification = useAppSelector((state: RootState) => state.notification.hasNotification);
    const searchHistory = useSelector((state: RootState) => state.searchHistory.searchHistory.searchHistory);
    const notificationCount = useSelector((state: RootState) => state.notification.notificationCount);
    const handleRemoveSearchOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.attributes.getNamedItem("data-id")?.value;
        if (targetId) {
            dispatch(removeCharacterHistory(targetId));
        }
    };
    const user = useAppSelector((state: RootState) => state.login.user);
    const [profileChangeModalIsOpened, setProfileChangeModalIsOpened] = useState(false);
    const handleProfileChangeModalOpen = useCallback(
        () => {
            setProfileChangeModalIsOpened(true);
        }, [setProfileChangeModalIsOpened]);
    const handleProfileChangeModalClose = useCallback(
        () => {
            setProfileChangeModalIsOpened(false);
        }, [setProfileChangeModalIsOpened]);

    return (
        <Container>
            <HeaderTop>
                <MobileNavButton onClick={openNavbar}>
                    <FontAwesomeIcon icon={faBars} size="lg"/>
                </MobileNavButton>
                <Logo onClick={(e) => {
                    navigate("/");
                }}>{props.title}</Logo>
                <SelectSearchWrapper>
                    <NewSearchBox placeholder={"캐릭터 검색"}
                                  direction={"down"} handleNavigate={handleCharacterSearchNavigate}
                                  filterOptions={HeaderData.serverList}
                                  searchHistoryMouseDown={handleOptionMouseDown}
                                  removeSearchHistory={handleRemoveSearchOptions} useSearchOption={true}
                                  searchHistory={searchHistory}
                                  autoCompleteHandler={getCharactersAutoComplete}
                                  autoCompleteUrl={"/characters/autoComplete?name={searchValue}&serverId={selectValue}"}
                    />

                </SelectSearchWrapper>
            </HeaderTop>
            <HeaderBottom>
                <HeaderMenuWrapper>
                    {HeaderData.menuList.map((item, index) => {
                        return <HeaderMenu key={index} onClick={(e) => {
                            navigate(item.link);
                        }}>{item.name}</HeaderMenu>;
                    })}
                    {isLogin ? <HeaderMenu onClick={handleLogout}>로그아웃</HeaderMenu> :
                        <HeaderMenu onClick={handleModalOpen}>로그인</HeaderMenu>}
                </HeaderMenuWrapper>
                <ProfileContainer>
                    {isLogin && <HeaderProfileMenuBox/>}
                    {isLogin &&
                        <HtmlTooltip title={
                            <React.Fragment>
                                <ProfileNicknameWrapper>
                                    <IconButton onClick={handleProfileChangeModalOpen}>
                                        <Avatar alt={user.nickname} src={user.profileImgPath} sx={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: "white",
                                            border: "1px solid #2e2e2e"
                                        }}/>
                                    </IconButton>
                                    {user.nickname}
                                </ProfileNicknameWrapper>
                            </React.Fragment>} placement={"bottom"} TransitionComponent={Zoom}>
                            <Badge color="primary" badgeContent={notificationCount} invisible={profileIsOpened}>
                                <ProfileWrapper>
                                    <HeaderProfile/>
                                </ProfileWrapper>
                            </Badge>
                        </HtmlTooltip>}
                </ProfileContainer>
            </HeaderBottom>
            {!isLogin && <LoginModal isloginpage={isloginpage}>
                <RegisterContainer isloginpage={isloginpage.valueOf()} id={"register-part"}>
                    <RegisterPage handleChangeSection={handleChangeSection}/>
                </RegisterContainer>
                <LoginContainer isloginpage={isloginpage.valueOf()} id={"login-part"}>
                    <SocialLogin/>
                    <Divider orientation={"vertical"} flexItem={true} sx={{
                        "@media (max-width: 768px)": {
                            display: "none",
                        }
                    }}/>
                    <LoginPage handleChangeSection={handleChangeSection}/>
                </LoginContainer>
            </LoginModal>}
            {isLogin && <ProfileIconChangeModal isOpened={profileChangeModalIsOpened}
                                                handleClose={handleProfileChangeModalClose}/>}
            <MobileNav isOpened={isNavbarOpened} menuList={HeaderData.menuList} handleClose={closeNavbar}/>
            <NavBackground isOpened={isNavbarOpened} onClick={closeNavbar}/>
        </Container>
    );
};

export default Header;
