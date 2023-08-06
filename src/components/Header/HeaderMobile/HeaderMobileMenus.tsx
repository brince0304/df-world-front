import styled from '@emotion/styled';
import { ILoginResponse } from 'services/userService';
import { useLogoutMutation } from '../../../hooks/authHooks/mutations/useLogoutMutation';

const HeaderMobileMenus = ({ user, menuList, navigateCallback, handleModalOpen, handleClose }: IHeaderMobileMenus) => {
  const logout = useLogoutMutation();
  const handleLogout = () => {
    logout();
    handleClose();
  }
  return (
    <>
      {user && <NavItem onClick={handleLogout}>로그아웃</NavItem>}
      {!user && <NavItem onClick={handleModalOpen}>로그인</NavItem>}
      {menuList.map((item, index) => {
        return (
          <NavItem
            key={index}
            onClick={(e) => {
              e.preventDefault();
              navigateCallback(item.link);
            }}
          >
            {item.name}
          </NavItem>
        );
      })}
    </>
  );
};

interface IHeaderMobileMenus {
  user: ILoginResponse | null;
  handleModalOpen: () => void;
  menuList: { name: string; link: string }[];
  navigateCallback: (url: string) => void;
  handleClose: () => void;
}

export default HeaderMobileMenus;

const NavItem = styled.a`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  padding: 10px 0;
  &:hover {
    color: cornflowerblue;
  }

  cursor: pointer;
`;
