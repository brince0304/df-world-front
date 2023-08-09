import Typography from '@mui/material/Typography';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import * as React from 'react';
import NicknameEdit from './UserNicknameEditForm';
import PasswordEdit from './UserPasswordEditForm';
import MyDialog from '../MyDialog/MyDialog';

const UserDetailEditDialog = (props: { open: boolean; onClose: () => void; refresh: () => void }) => {
  const { user } = useUserQuery();
  return (
    <MyDialog
      isOpen={props.open}
      onClose={props.onClose}
      useCloseButton
      dialogContent={
        <>
          <NicknameEdit onClose={props.onClose} />
          {(user?.oauthProvider === 'NONE' || user?.oauthProvider === null) && <PasswordEdit onClose={props.onClose} />}
        </>
      }
      dialogTitle={
        <Typography component={'span'} fontSize={'1.5rem'} fontWeight={'bold'}>
          회원정보 수정{' '}
        </Typography>
      }
    />
  );
};

export default UserDetailEditDialog;
