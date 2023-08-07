import styled from '@emotion/styled';
import { Avatar, Box, Tooltip, TooltipProps, Zoom, tooltipClasses } from '@mui/material';
import { HeaderProfileContent } from './HeaderProfileContent';
import React from 'react';
import HeaderProfileMenuContainer from './HeaderProfileMenuContainer';
import { ILoginResponse } from 'services/userService';

const HeaderProfileContainer = ({ user, handleClickProfile }: IHeaderProfileContainer) => {
  return (
    <ProfileContainer>
      {user && (
        <HtmlTooltip
          title={
            <React.Fragment>
              <Box>
                <ProfileNicknameWrapper>
                  <Avatar
                    alt={user.nickname}
                    src={user.profileImgPath}
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: 'white',
                      border: '1px solid #2e2e2e',
                    }}
                  />
                  {user.nickname}
                </ProfileNicknameWrapper>
                <HeaderProfileMenuContainer />
              </Box>
            </React.Fragment>
          }
          placement={'bottom'}
          TransitionComponent={Zoom}
        >
          <ProfileWrapper>
            <HeaderProfileContent onClick={handleClickProfile} />
          </ProfileWrapper>
        </HtmlTooltip>
      )}
    </ProfileContainer>
  );
};

interface IHeaderProfileContainer {
  user: ILoginResponse | null;
  handleClickProfile: () => void;
}

export default HeaderProfileContainer;

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

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F8F8F8',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '200px',
    height: '100%',
    border: '1px solid #dadde9',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
  },
}));

const ProfileNicknameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  gap: 10px;
  padding: 10px 0px;
`;
