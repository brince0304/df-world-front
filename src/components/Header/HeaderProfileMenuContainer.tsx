import styled from '@emotion/styled';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, IconButton, Badge, Box } from '@mui/material';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import { useNavigate } from 'react-router';

const HeaderProfileMenuContainer = () => {
  const { user } = useUserQuery();
  const navigate = useNavigate();
  const handleNavigateToMypage = () => {
    navigate('/mypage/');
  };

  return (
    <ProfileMenu>
      <Tooltip title={'마이페이지'} placement={'bottom'} onClick={handleNavigateToMypage}>
        <MenuIconWrapper>
          <IconButton>
            <FontAwesomeIcon icon={faUser} size="sm" />
          </IconButton>
        </MenuIconWrapper>
      </Tooltip>
      <Tooltip title={'알림'} placement={'bottom'}>
        <MenuIconWrapper>
          <IconButton>
            {user?.notificationCount === 0 ? (
              <FontAwesomeIcon icon={faBell} size="sm" />
            ) : (
              <Badge badgeContent={user?.notificationCount} color="primary">
                <FontAwesomeIcon icon={faBell} size="sm" />
              </Badge>
            )}
          </IconButton>
        </MenuIconWrapper>
      </Tooltip>
    </ProfileMenu>
  );
};

export default HeaderProfileMenuContainer;

const ProfileMenu = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuIconWrapper = styled.div`
  color: #181818;
`;
