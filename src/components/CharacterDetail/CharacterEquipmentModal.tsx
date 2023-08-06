import * as React from 'react';
import { Dialog, DialogContent } from '@mui/material';

interface LoginModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: () => void;
}

function CharacterEquipmentModal(props: LoginModalProps) {
  return (
    <Dialog
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={props.isOpened}
      onClose={props.setIsOpened}
    >
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '330px',
          padding: '10px',
          height: '440px',
          backgroundColor: '#252627',
        }}
      >
        {props.children}
      </DialogContent>
    </Dialog>
  );
}

export default CharacterEquipmentModal;
