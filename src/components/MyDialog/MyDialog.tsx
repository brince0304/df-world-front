import { Box, Dialog, DialogContent, DialogTitle, styled } from '@mui/material';
import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const MyDialog = ({ isOpen, onClose, dialogContent, dialogTitle, useCloseButton }: MyDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: '400px',
          height: '500px',
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '10px',
          overflowY: 'hidden',
          position: 'relative',
        },
      }}
    >
      {useCloseButton && (
        <CloseButtonWrapper onClick={onClose}>
          <CloseIcon />
        </CloseButtonWrapper>
      )}
      {dialogTitle && <DialogTitle component="div">{dialogTitle}</DialogTitle>}
      <DialogContent>{dialogContent}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;

interface MyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogContent: ReactNode;
  dialogTitle?: ReactNode;
  useCloseButton?: boolean;
}

const CloseButtonWrapper = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  cursor: pointer;
`;
