import React, {useEffect} from "react";
import styled from "styled-components";
import {TextField, FormControl, Button, Select, MenuItem} from "@mui/material";
import {useState} from "react";
import './header.scss'
import HeaderSearchBox from "./HeaderSearchBox";
import {HeaderData} from "./data/HeaderData";
import LoginModal from "./LoginModal";
import MobileNav from "./MobileNav";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

const HeaderSection = styled.div`
  //헤더 그림자
  position: sticky;
  top: 0;
  height: 120px;
  background-color: black;
  padding: 0 15%;
  z-index: 999;
  @media (max-width: 768px) {
    padding: 0 2%;
  }
  @media (max-width: 1024px) {
    padding: 0 5%;
  }
`;

//헤더의 한줄 div 스타일 양 옆에 왼쪽은 로고 오른쪽엔 검색창 배치해둘것임
const HeaderHeader = styled.div`
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


const HeaderFooter = styled.div`
  //그림자
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  padding-top: 10px;
  background-color: black;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    display: none;
  }
`;



const Logo = styled(Button)`
  && {
    padding-top: 15px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: white;
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



const Header = (props: { title: string; }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleNavbarOpen = () => setNavbarOpen(true);
    const handleNavbarClose = () => setNavbarOpen(false);
    useEffect(() => {
       handleNavbarClose();
    }, [modalOpen]);
    return (
        <HeaderSection>
            <HeaderHeader>
                <MobileNavButton onClick={handleNavbarOpen}>
                    <FontAwesomeIcon icon={faBars} size="lg"/>
                </MobileNavButton>
                <Logo>{props.title}</Logo>
                <HeaderSearchBox data={HeaderData.serverList} title={"서버"}></HeaderSearchBox>
            </HeaderHeader>
            <HeaderFooter>
                {HeaderData.menuList.map((item, index) => {
                    return (
                        <HeaderButton key={index} onClick={item.name==='로그인'? handleModalOpen:()=>{} }>{item.name}</HeaderButton>
                    )
                })
                }
            </HeaderFooter>
            <LoginModal open={modalOpen} handleClose={handleModalClose} ></LoginModal>
            <MobileNav isOpened={navbarOpen} menuList={HeaderData.menuList} handleClose={handleNavbarClose} handleModalOpen={handleModalOpen}/>
            <NavBackground isOpened={navbarOpen} onClick={handleNavbarClose}/>
        </HeaderSection>
    );
}

export default Header;
