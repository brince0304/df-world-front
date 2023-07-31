import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { headerMenu } from "constants/myConstants";
import { useLogoutMutation } from "hooks/authHooks/mutations/useLogoutMutation";
import { useNavigate } from "react-router-dom";
import { ILoginResponse } from "services/userService";

const HeaderMenus =({user, handleOpenModal}: IHederMenus) => {
    const navigate = useNavigate();
    const logoutMutation = useLogoutMutation();
    const handleLogout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) {
            logoutMutation();
        }
    }
    return (
        <HeaderMenuWrapper>
        {headerMenu.map((menu, index) => {
          return (
            <HeaderMenu
              key={index}
              onClick={(e) => {
                navigate(menu.link);
              }}
            >
              {menu.name}
            </HeaderMenu>
          );
        })}
        {user ? (
          <HeaderMenu onClick={handleLogout}>로그아웃</HeaderMenu>
        ) : (
          <HeaderMenu onClick={handleOpenModal}>로그인</HeaderMenu>
        )}
      </HeaderMenuWrapper>
    )
}

interface IHederMenus {
    user: ILoginResponse | null;
    handleOpenModal: () => void;
}

export default HeaderMenus;

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

const HeaderMenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;