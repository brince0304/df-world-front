import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {ReactNode, useState} from "react";
import Box from "@mui/material/Box";
import {LinearProgress, styled} from "@mui/material";

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
    height:'600px',
    width:'400px',

};

 const CloseButtonWrapper = styled(Box)`
  //우측 끝에 배치
   display: flex;
  font-size: 25px;
  color:silver;
  cursor: pointer;
  &:hover {
    color: #282c34;
    transition: 0.3s;
  }
`



const SearchBoxWrapper = styled(Box)`
  justify-content: space-between;
  width: 100%;
  height: 20%;
  display: flex;
  position: fixed;
  left: 0;
  z-index: 1000;
  align-items: center;
  padding : 20px 10px;
  background-color: white;
`;

const ModalBody = styled(Box)`
    display: flex;
  position: relative;
  height: 100%;
  width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    `



export const CharacterSearchModal = (props:{isOpened:boolean , handleClose:()=>void, children:ReactNode ,
serachBox:ReactNode,isLoading:boolean}) => {
    return (
        <Modal
            open={props.isOpened}
            onClose={props.handleClose}
        >
            <Fade in={props.isOpened} unmountOnExit={true}>
                <Box sx={style} >
                    <ModalBody>
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            height: '52px',
                            position: 'fixed',
                            left: '0',
                            top: '0',
                            zIndex: 1000,
                            backgroundColor: 'white',
                           padding : '10px 10px',
                        }}>
                            {props.serachBox}
                        </Box>
                        {props.children}
                    </ModalBody>
                </Box>
            </Fade>
        </Modal>
    );
};