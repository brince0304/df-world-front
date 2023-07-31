import styled from "@emotion/styled";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, IconButton, Badge, Zoom } from "@mui/material";

const HeaderMobileProfileMenuContainer = ({isProfileOpened: profileIsOpened, notificationCount, handleNavigateToMyPage}: IHeaderMobileProfileMenuContainer) => {
    return (
        <Zoom in={profileIsOpened}>
        <ProfileMenu>
          <ProfileMenuList>
            <Tooltip title={'마이페이지'} placement={'bottom'}>
              <IconButton onClick={handleNavigateToMyPage}>
                <MenuIconWrapper>
                  <FontAwesomeIcon icon={faUser} size="sm" />
                </MenuIconWrapper>
              </IconButton>
            </Tooltip>
            <Tooltip title={'알림'} placement={'bottom'}>
              <IconButton>
                {notificationCount === 0 && (
                  <MenuIconWrapper>
                    <FontAwesomeIcon icon={faBell} size="sm" />
                  </MenuIconWrapper>
                )}
                {notificationCount !== 0 && (
                  <Badge badgeContent={notificationCount} color="primary">
                    <MenuIconWrapper>
                      <FontAwesomeIcon icon={faBell} size="sm" />
                    </MenuIconWrapper>
                  </Badge>
                )}
              </IconButton>
            </Tooltip>
          </ProfileMenuList>
        </ProfileMenu>
      </Zoom>
    );

}

interface IHeaderMobileProfileMenuContainer {
    isProfileOpened: boolean;
    notificationCount: number;
    handleNavigateToMyPage: () => void;
}

export default HeaderMobileProfileMenuContainer;

const ProfileMenuList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #121212;
`;

const ProfileMenu = styled.div`
  position: absolute;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  left: 100%;
  top: 2px;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  @media (max-width: 1200px) {
    position: absolute;
    right: 20%;
    width: 140px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 70%;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: white;
    border-left: 0;
    margin-top: -20px;
    margin-left: -8px;
  }
`;

