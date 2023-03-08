import React, {useCallback, useEffect} from "react";
import styled from "styled-components";
import {TextField, FormControl, Button, Select, MenuItem} from "@mui/material";
import {useState} from "react";
import '../../../assets/css/header.scss'
import HeaderSearchBox from "../ui/HeaderSearchBox";
import {HeaderData} from "../../../data/HeaderData";
import LoginPage from "../ui/LoginPage";
import MobileNav from "./MobileNav";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomModal from "../ui/LoginModal";
import LoginSection from "../ui/LoginPage";
import useModal from "../../../hooks/useModal";
import useNavBar from "../../../hooks/useNavBar";
import {SocialLogin} from "../ui/SocialLogin";
import RegisterPage from "../ui/RegisterPage";
import {SocialRegister} from "../ui/SocialRegister";
import LoginModal from "../ui/LoginModal";
import LatestSearchData from "../../../data/LatestSearchData";




const Container = styled.div`
  //헤더 그림자
  position: sticky;
  top: 0;
  height: 120px;
  background-color: #212124;
  padding: 0 15%;
  z-index: 999;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    padding: 0 2%;
  }
  @media (max-width: 1024px) {
    padding: 0 4%;
  }
`;

const HeaderButton = styled(Button)`
  && {
    color: white;
    background-color: transparent;
    height: 40px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    justify-content: space-between;
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





const Logo = styled(Button)`
  && {
    padding-top: 15px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
    cursor: pointer;
   
    &:hover {
      color: cornflowerblue;
      background-color: transparent;
    }
  }

  @media (max-width: 768px) {
    grid-column-start: 3;
    grid-column-end: 4;
    //맨왼쪽 배치
    padding-left: 0;
    align-items: flex-end;
    justify-content: space-between;


  }
`;

const RegisterContainer= styled.div`
  display:  flex;
  position: absolute;
  background-color: white;
  visibility: ${(props : { isLoginPage: boolean }) => props.isLoginPage ? 'hidden' : 'visible'};
  flex-direction: row;
  align-items: center;
  transition: 0.3s ease-in-out;
  opacity: ${(props: { isLoginPage: boolean }) => props.isLoginPage ?  '0': '100%'};
  @media (max-width: 768px) {
      width: 85%;
        }
    `
;

const LoginContainer= styled.div`
  display:  flex;
  visibility: ${(props : { isLoginPage: boolean }) => props.isLoginPage ? 'visible' : 'hidden'};
  flex-direction: row;
  align-items: center;
  transition: 0.3s ease-in-out;
  opacity: ${(props: { isLoginPage: boolean }) => props.isLoginPage ?  '100%': '0'};
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
    }

    &:hover {
      color: cornflowerblue;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;

const NavBackground = styled.div`
  display:none;
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







const Header = (props: { title: string; }) => {
    const [isModalOpened, openModal,closeModal] = useModal();
    const [isNavbarOpened, openNavbar,closeNavbar] =  useNavBar(isModalOpened);
    const [isLoginPage, setIsLoginPage] = useState(true);
    const handleChangeSection= useCallback(
        () => {
            setIsLoginPage(!isLoginPage);
        },
        [isLoginPage]);
    const [isLogin, setIsLogin] = useState(false);
    return (
        <Container>
            <HeaderTop>
                <MobileNavButton onClick={openNavbar}>
                    <FontAwesomeIcon icon={faBars} size="lg"/>
                </MobileNavButton>
                <Logo>{props.title}</Logo>
                <HeaderSearchBox data={HeaderData.serverList} title={"서버"}
                latestSearchData={LatestSearchData}></HeaderSearchBox>
            </HeaderTop>
            <HeaderBottom>
                {HeaderData.menuList.map((item, index) => {
                    return (
                        <HeaderButton key={index} onClick={item.name==='로그인'? openModal:()=>{} }>{item.name}</HeaderButton>
                    )
                })
                }
            </HeaderBottom>
            {!isLogin && <LoginModal open={isModalOpened} handleClose={closeModal} isLoginPage={isLoginPage}>
                <RegisterContainer isLoginPage={isLoginPage} id={"register-part"}>
                    <SocialRegister/>
                    <RegisterPage handleChangeSection={handleChangeSection}/>
                </RegisterContainer>
                <LoginContainer isLoginPage={isLoginPage} id={"login-part"}>
                    <SocialLogin />
                    <LoginSection handleChangeSection={handleChangeSection}/>
                </LoginContainer>
            </LoginModal>}
            <MobileNav isOpened={isNavbarOpened} menuList={HeaderData.menuList} handleClose={closeNavbar} handleModalOpen={openModal}/>
            <NavBackground isOpened={isNavbarOpened} onClick={closeNavbar}/>
        </Container>
    );
}

export default Header;
