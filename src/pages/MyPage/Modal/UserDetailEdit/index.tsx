import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';
import NicknameEdit from './NicknameEdit';
import PasswordEdit from './PasswordEdit';

const UserDetailEditModal = (props: { open: boolean; onClose: () => void; refresh: () => void }) => {
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
        <Typography component={'span'} fontFamily={'Core Sans'} fontSize={'1.5rem'} fontWeight={'bold'}>
          회원정보 수정{' '}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <NicknameEdit onClose={props.onClose} />
        <PasswordEdit onClose={props.onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailEditModal;
