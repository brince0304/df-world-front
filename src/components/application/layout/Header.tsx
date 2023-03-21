import React, {useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import {Button} from "@mui/material";
import {useState} from "react";
import '../../../assets/css/header.scss'
import SearchBox from "./SearchBox";
import {HeaderData} from "../../../data/HeaderData";
import LoginPage from "../ui/LoginPage";
import MobileNav from "./MobileNav";
import {faBars, faBell, faCog, faRing, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useNavBar from "../../../hooks/useNavBar";
import {SocialLogin} from "../ui/SocialLogin";
import RegisterPage from "../ui/RegisterPage";
import LoginModal from "../ui/LoginModal";
import useSelectSearch from "../../../hooks/useSelectSearch";
import {useNavigate} from "react-router-dom";
import store, {
    useAppDispatch,
    useAppSelector
} from "../../../redux/store";

import {RootState} from "../../../redux/store";
import {logout} from "../../../api/auth/logout";
import {HeaderProfile} from "../ui/HeaderProfile";
import {getCharactersAutoComplete} from "../../../api/character/getCharactersAutoComplete";
import {setLoginModalIsOpened, setSearchHistory} from "../../../redux";
import {useSelector} from "react-redux";
import {removeCharacterHistory} from "../../../api/character/getCharacterDetail";


const Container = styled.div`
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
  margin-top:15px;
  width: 350px;

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
`


const HeaderMenu = styled(Button)`
  && {
    color: white;
    background-color: transparent;
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      color: cornflowerblue;
      background: transparent;
    }
  }
`

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
          display: ${(props: { isLoginPage: boolean }) => props.isLoginPage ? 'none' : 'flex'};
          width: 100%;
          height: 100%;
          //넘치면 스크롤바
          @media (max-width: 768px) {
            width: 100%;
          }
    `
;

const LoginContainer = styled.div`
  display: ${(props: { isLoginPage: boolean }) => props.isLoginPage ? 'flex' : 'none'};
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
    visibility: ${(props: { isOpened: boolean }) => props.isOpened ? 'visible' : 'hidden'};
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


interface SearchOption {
    id: string;
    title: string;
    content: string;
    footer: string;
    optionValue: string | "";
    type: "board" | "character";
}


const searchType = {
    type: "character",
    url: "/characters/<serverId>?name=<characterName>"
}

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

`

const ProfileMenu = styled.ul`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  opacity: ${(props: { isOpened: boolean }) => props.isOpened ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
  @media (max-width: 768px) {
    display: none;
  }
    @media (max-width: 1200px) {
    position: absolute;
    right: 20%;
    width: 200px;
    }
`

const ProfileMenuList = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
     height: 100%;
`

const MenuIconWrapper = styled.div`
    display: flex;
  position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 10px;
  color : white;
        &:hover {
        color : cornflowerblue;
        cursor: pointer;
        transition: color 0.3s ease-in-out;
    }
`

const NotificationWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  background-color: red;
  color: white;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    z-index: 1; 
    `;






const Header = (props: HeaderProps) => {
    const [searchValue, selectValue, handleSearchOnChange, handleSelectOnChange] = useSelectSearch({
        initialSearchValue: "",
        placeholder: "캐릭터 이름",
        initialSelectValue: "all",
    })

    let navigate = useNavigate();
    const handleCharacterSearchNavigate = (url: string, type: string, characterName: string, serverId: string) => {
        navigate(url.replace("<characterName>", characterName).replace("<serverId>", serverId));
    }
    const [isNavbarOpened, openNavbar, closeNavbar] = useNavBar();
    const [isLoginPage, setIsLoginPage] = useState(true);
    const handleChangeSection = useCallback(
        () => {
            setIsLoginPage(!isLoginPage);
        },
        [isLoginPage]);
    const handleOptionMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate("/details/?characterId=" + e.currentTarget.attributes.getNamedItem("data-id")?.value + "&serverId=" + e.currentTarget.attributes.getNamedItem("data-option")?.value);
    }
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
   const hasNotification = useAppSelector((state: RootState) => state.login.hasNotification);
   const searchHistory = useSelector((state: RootState) => state.searchHistory.searchHistory.searchHistory);
    const handleRemoveSearchOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.attributes.getNamedItem("data-id")?.value;
        if(targetId){
            dispatch(removeCharacterHistory(targetId));
        }
    }
    return (
        <Container>
            <HeaderTop>
                <MobileNavButton onClick={openNavbar}>
                    <FontAwesomeIcon icon={faBars} size="lg"/>
                </MobileNavButton>
                <Logo onClick={(e) => {
                    navigate("/")
                }}>{props.title}</Logo>
                <SelectSearchWrapper>
                    <SearchBox selectOptions={HeaderData.serverList} placeholder={"캐릭터 이름"} useSearchOption={true}
                               selectLoading={false} searchType={searchType} color="cornflowerblue"
                               searchOptions={searchHistory} searchValue={searchValue} selectValue={selectValue}
                               handleSelectValueChange={handleSelectOnChange}
                               handleSearchValueChange={handleSearchOnChange}
                               handleNavigate={handleCharacterSearchNavigate}
                               handleOptionMouseDown={handleOptionMouseDown}
                               useAutoComplete={true}
                               autoCompleteUrl={"/characters/autoComplete?name={searchValue}&serverId={selectValue}"}
                               autoCompleteHandler={getCharactersAutoComplete}
                               handleOptionRemove={handleRemoveSearchOptions}
                    />
                </SelectSearchWrapper>
            </HeaderTop>
            <HeaderBottom>
                <HeaderMenuWrapper>
                    {HeaderData.menuList.map((item, index) => {
                        return <HeaderMenu key={index} onClick={(e) => {
                            navigate(item.link)
                        }}>{item.name}</HeaderMenu>
                    })}
                    {isLogin ? <HeaderMenu onClick={handleLogout}>로그아웃</HeaderMenu> :
                        <HeaderMenu onClick={handleModalOpen}>로그인</HeaderMenu>}
                </HeaderMenuWrapper>
                <ProfileContainer>
                    {isLogin &&
                        <ProfileMenu isOpened={profileIsOpened}>
                           <ProfileMenuList>
                               <MenuIconWrapper>
                                      <FontAwesomeIcon icon={faUser} size="lg"/>
                               </MenuIconWrapper>
                               <MenuIconWrapper>
                                   <FontAwesomeIcon icon={faCog} size="lg"/>
                               </MenuIconWrapper>
                               <MenuIconWrapper>
                                   <FontAwesomeIcon icon={faSignOutAlt} size="lg"/>
                               </MenuIconWrapper>
                               <MenuIconWrapper>
                                   <FontAwesomeIcon icon={faBell} size="lg"/>
                                   {hasNotification && <NotificationWrapper/> }
                               </MenuIconWrapper>
                           </ProfileMenuList>
                        </ProfileMenu>
                    }
                    {isLogin &&
                        <ProfileWrapper>
                            <HeaderProfile/>
                        </ProfileWrapper>}
                </ProfileContainer>
            </HeaderBottom>
            {!isLogin && <LoginModal isLoginPage={isLoginPage}>
                <RegisterContainer isLoginPage={isLoginPage} id={"register-part"}>
                    <RegisterPage handleChangeSection={handleChangeSection}/>
                </RegisterContainer>
                <LoginContainer isLoginPage={isLoginPage} id={"login-part"}>
                    <SocialLogin/>
                    <LoginPage handleChangeSection={handleChangeSection}/>
                </LoginContainer>
            </LoginModal>}
            <MobileNav isOpened={isNavbarOpened} menuList={HeaderData.menuList} handleClose={closeNavbar}/>
            <NavBackground isOpened={isNavbarOpened} onClick={closeNavbar}/>
        </Container>
    );
}

export default Header;
