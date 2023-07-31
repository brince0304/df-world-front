import { ILoginResponse } from "services/userService";
import { HeaderProfileContent } from "../HeaderProfileContent";
import HeaderMobileProfileMenuContainer from "./HeaderMobileProfileMenuContainer";
import styled from "@emotion/styled";

const HeaderMoctileUserProfile = ({user, isProfileOpened: profileIsOpened, notificationCount, handleProfileOpen, handleNavigateToMyPage}: IHeaderMoctileUserProfile) => {
    return (
        <ProfileWrapper>
        <HeaderProfileContent onClick={handleProfileOpen} />
        {user && (
            <HeaderMobileProfileMenuContainer isProfileOpened={profileIsOpened} notificationCount={notificationCount || 0} handleNavigateToMyPage={handleNavigateToMyPage} />
        )}
      </ProfileWrapper>
    );
}

interface IHeaderMoctileUserProfile {
    user: ILoginResponse | null;
    isProfileOpened: boolean;
    notificationCount: number;
    handleProfileOpen: () => void;
    handleNavigateToMyPage: () => void;
}

export default HeaderMoctileUserProfile;

const ProfileWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
`;