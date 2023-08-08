import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import * as React from 'react';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { LinearProgress, styled, useMediaQuery } from '@mui/material';

const SearchCharacterModal = (props: {
  isOpened: boolean;
  handleClose: () => void;
  children: ReactNode;
  serachBox: ReactNode;
  isLoading?: boolean;
}) => {
  const isMobile = useMediaQuery('(max-width:480px)');
  return (
    <Modal open={props.isOpened} onClose={props.handleClose}>
      <Fade in={props.isOpened} unmountOnExit={true}>
        <ModalContainer
          height={isMobile ? '80%' : '600px'}
          width={isMobile ? '90%' : '400px'}
        >
          {props.isLoading && (
            <LinearProgressWrapper/>
          )}
          <ModalBody>
            <SearchBoxWrapper>
              {props.serachBox}
            </SearchBoxWrapper>
            {props.children}
          </ModalBody>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

const SearchBoxWrapper = styled(Box)`
display: flex;
  width : 100%;
  height : 52px;
  position : fixed;
  left : 0;
  top : 0;
  z-index : 1000;
  background-color : white;
  padding : 10px 10px;
  `;

const LinearProgressWrapper = styled(LinearProgress)`
  position: absolute;
  top: 0;
  z-index: 1020;
  width: 100%;
`;

const ModalContainer = styled(Box)`
  display: flex;
  position: relative;
  align-items: flex-start;
  overflow: scroll;
  flex-direction: column;
  //스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //props width
  background-color: white;
  border-radius: 2px;
  height: ${(props: { height: string, width:string }) => props.height};
  width: ${(props: { height: string, width:string }) => props.width};
`;


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
