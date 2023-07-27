import * as React from 'react';
import styled from '@emotion/styled';
import { Dialog, DialogContent } from '@mui/material';

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  color: #121212;
`;

export const ModalBody = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: transparent;
`;

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
