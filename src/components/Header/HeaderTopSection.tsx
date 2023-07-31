import styled from "@emotion/styled";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import CharacterSearchBox from "components/CharacterSearchBox/CharacterSearchBox";
import { useNavigate } from "react-router-dom";

const HeaderTopSection = ({handleOpenNavbar, characterSearchHandler, characterDetailHandler}: IHeaderTopSection) => {
    const navigate = useNavigate();
    const handleNavigateToMain = () => {
        navigate('/');
    }
    return (
        <HeaderTop>
        <MobileNavButton onClick={handleOpenNavbar}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </MobileNavButton>
        <Logo onClick={handleNavigateToMain} >
          {'커뮤니티'}
        </Logo>
        <SelectSearchWrapper>
          <CharacterSearchBox searchHandler={characterSearchHandler} clickHandler={characterDetailHandler} />
        </SelectSearchWrapper>
      </HeaderTop>
    );
}

export default HeaderTopSection;

interface IHeaderTopSection {
    handleOpenNavbar: () => void;
    characterSearchHandler: (...args:any[]) => void;
    characterDetailHandler: (...args:any[]) => void;
};


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