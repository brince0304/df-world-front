import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {ReactNode, useState} from "react";
import {CloseButtonWrapper, ModalBody, ModalHeader} from "../auth/LoginModal";
import Box from "@mui/material/Box";
import {styled} from "@mui/material";

const style = {
    display: 'flex' as 'flex',
    alignItems: 'flex-start' as 'flex-start',
    position: 'absolute' as 'absolute',
    overflow: 'scroll' as 'scroll',
    flexDirection: 'column' as 'column',
    scrollBehavior: 'smooth' as 'smooth',
    //스크롤바 숨기기
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //props width
    width: 800,
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const ModalBox = styled(Box)`
    &&{
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        height:100%;
        width:400px;
      scroll-behavior: smooth;
    }
`;


export const CharacterSearchModal = (props:{isOpened:boolean , handleClose:()=>void, children:ReactNode }) => {
    return (
        <Modal
            open={props.isOpened}
            onClose={props.handleClose}
        >
            <Fade in={props.isOpened} unmountOnExit={true}>
                <ModalBox sx={style}  >
                    <CloseButtonWrapper onClick={props.handleClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </CloseButtonWrapper>
                    <ModalHeader>
                    </ModalHeader>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalBox>
            </Fade>
        </Modal>
    );
};