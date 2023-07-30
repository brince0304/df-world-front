import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import * as React from 'react';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { LinearProgress, styled } from '@mui/material';


const SearchCharacterModal = (props: {
  isOpened: boolean;
  handleClose: () => void;
  children: ReactNode;
  serachBox: ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <Modal open={props.isOpened} onClose={props.handleClose}>
      <Fade in={props.isOpened} unmountOnExit={true}>
        <Box sx={style}>
          {props.isLoading && (
            <LinearProgress
              sx={{
                position: 'absolute',
                top: '0',
                zIndex: 1020,
                width: '100%',
              }}
            />
          )}
          <ModalBody>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '52px',
                position: 'fixed',
                left: '0',
                top: '0',
                zIndex: 1000,
                backgroundColor: 'white',
                padding: '10px 10px',
              }}
            >
              {props.serachBox}
            </Box>
            {props.children}
          </ModalBody>
        </Box>
      </Fade>
    </Modal>
  );
};


const style = {
  display: 'flex' as 'flex',
  alignItems: 'flex-start' as 'flex-start',
  position: 'relative' as 'relative',
  overflow: 'scroll' as 'scroll',
  flexDirection: 'column' as 'column',
  //스크롤바 숨기기
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //props width
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  height: '600px',
  width: '400px',
};
const ModalBody = styled(Box)`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
`;

export default SearchCharacterModal;
