import React, {useCallback, useEffect} from "react";
import styled from "styled-components";
import {TextField, FormControl, Button, Select, MenuItem} from "@mui/material";
import {useState} from "react";
import '../../../assets/css/header.scss'
import SearchBox from "./SearchBox";
import {HeaderData} from "../../../data/HeaderData";
import LoginPage from "../ui/LoginPage";
import MobileNav from "./MobileNav";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomModal from "../ui/LoginModal";
import useModal from "../../../hooks/useModal";
import useNavBar from "../../../hooks/useNavBar";
import {SocialLogin} from "../ui/SocialLogin";
import RegisterPage from "../ui/RegisterPage";
import {SocialRegister} from "../ui/SocialRegister";
import LoginModal from "../ui/LoginModal";
import LatestSearchData from "../../../data/LatestSearchData";
import useSelectSearch from "../../../hooks/useSelectSearch";
import {useNavigate} from "react-router-dom";




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
  width: 400px;
  position: absolute;
  top: 5%;
  right:17%;
  @media (min-width: 1024px) and (max-width: 1280px) {
    right : 10%;
  }
  @media (max-width: 768px) {
    padding-right: 40px;
    padding-left: 5px;
    position: relative;
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






const RegisterContainer= styled.div`
  display: ${(props : { isLoginPage: boolean }) => props.isLoginPage ? 'none' : 'flex'};
  width: 100%;
  height: 100%;
  //넘치면 스크롤바
  @media (max-width: 768px) {
      width: 100%;  }
    `
;

const LoginContainer= styled.div`
    display: ${(props : { isLoginPage: boolean }) => props.isLoginPage ? 'flex' : 'none'};
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



interface SearchOption {
    id: string;
    title: string;
    content:string;
    footer: string;
    optionValue: string|"";
    type: "board" | "character";
}



const searchType = {
    type : "character",
    url:"/characters/?characterName=<characterName>&serverId=<serverId>"
}

interface HeaderProps {
    title: string;
    isLogin: boolean;
    userId?: string;
}

interface UserDetail {
    userId: string;
    userAuthority: [string];
}




const Header = (props: HeaderProps) => {
    const [searchValue,selectValue,handleSearchOnChange,handleSelectOnChange]= useSelectSearch({
        initialSearchValue: "",
        placeholder: "캐릭터 이름",
        initialSelectValue:"all",
    })
    let navigate = useNavigate();
    const handleCharacterSearchNavigate = (url:string,type:string,characterName:string,serverId:string) =>{
        navigate(url.replace("<characterName>",characterName).replace("<serverId>",serverId));
    }
    const [searchOption, setSearchOption] = useState<SearchOption[]>([{
id: "1",
        title: "전체1",
        content: "전체1",
        footer: "전체1",
        optionValue: "1",
        type: "character"
}, {
        id: "2",
        title: "전체2",
        content: "전체2",
        footer: "전체2",
        optionValue: "2",
        type: "character"
    },
        {
            id: "3",
            title: "전체3",
            content: "전체3",
            footer: "전체3",
            optionValue: "3",
            type: "character"
        }]);
    const [isModalOpened, openModal,closeModal] = useModal();
    const [isNavbarOpened, openNavbar,closeNavbar] =  useNavBar(isModalOpened);
    const [isLoginPage, setIsLoginPage] = useState(true);
    const handleChangeSection= useCallback(
        () => {
            setIsLoginPage(!isLoginPage);
        },
        [isLoginPage]);
    const handleOptionMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate("/character/?characterId="+e.currentTarget.attributes.getNamedItem("data-id")?.value+"&serverId="+e.currentTarget.attributes.getNamedItem("data-option")?.value);
    }
    return (
        <Container>
            <HeaderTop>
                <MobileNavButton onClick={openNavbar}>
                    <FontAwesomeIcon icon={faBars} size="lg"/>
                </MobileNavButton>
                <Logo onClick={(e)=>{navigate("/")}}>{props.title}</Logo>
                <SelectSearchWrapper>
                <SearchBox selectOptions={HeaderData.serverList} placeholder={"캐릭터 이름"} useSearchOption={true}
                           selectLoading={false} searchType={searchType}
                           searchOptions={searchOption} searchValue={searchValue} selectValue={selectValue} handleSelectValueChange={handleSelectOnChange}
                           handleSearchValueChange={handleSearchOnChange} handleNavigate={handleCharacterSearchNavigate} handleOptionMouseDown={handleOptionMouseDown}
                />
                </SelectSearchWrapper>
            </HeaderTop>
            <HeaderBottom>
                {HeaderData.menuList.map((item, index) => {
                    return (
                        <HeaderMenu key={index} onClick={item.name==='로그인'? openModal:()=>{} }>{item.name}</HeaderMenu>
                    )
                })
                }
            </HeaderBottom>
            {!props.isLogin && <LoginModal open={isModalOpened} handleClose={closeModal} isLoginPage={isLoginPage}>
                <RegisterContainer isLoginPage={isLoginPage} id={"register-part"}>
                    <RegisterPage handleChangeSection={handleChangeSection}/>
                </RegisterContainer>
                <LoginContainer isLoginPage={isLoginPage} id={"login-part"}>
                    <SocialLogin />
                    <LoginPage handleChangeSection={handleChangeSection}/>
                </LoginContainer>
            </LoginModal>}
            <MobileNav isOpened={isNavbarOpened} menuList={HeaderData.menuList} handleClose={closeNavbar} handleModalOpen={openModal}/>
            <NavBackground isOpened={isNavbarOpened} onClick={closeNavbar}/>
        </Container>
    );
}

export default Header;
