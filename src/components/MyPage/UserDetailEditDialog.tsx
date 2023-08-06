import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import * as React from 'react';
import NicknameEdit from './UserNicknameEditForm';
import PasswordEdit from './UserPasswordEditForm';

const UserDetailEditDialog = (props: { open: boolean; onClose: () => void; refresh: () => void }) => {
  const {user} = useUserQuery();
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '400px',
          height: '500px',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}
    >
      <DialogTitle>
        <Typography component={'span'}  fontSize={'1.5rem'} fontWeight={'bold'}>
          회원정보 수정{' '}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <NicknameEdit onClose={props.onClose} />
        {user?.oauthProvider === 'NONE' && <PasswordEdit onClose={props.onClose} />}
      </DialogContent>
    </Dialog>
  );
};


export default UserDetailEditDialog;