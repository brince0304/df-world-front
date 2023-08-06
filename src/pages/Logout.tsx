import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../hooks/authHooks/mutations/useLogoutMutation';
import { useEffect } from 'react';

const Logout = () => {
  const logout = useLogoutMutation();
  const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <div>
        </div>
    );
    };

export default Logout;