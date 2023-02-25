import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 0px;
    padding-top: 0px;
    font-size: 22px;
    font-weight: 700;
    color: #000;
    `

const ModalCustom = styled(Box)`
    &&{
      display: grid; 
        flex-direction: column;
      padding-top: 10px;
    }
`

const CloseButton = styled.span`
  //우측 끝에 배치
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 20px;
    font-size: 20px;
    color:silver;
    cursor: pointer;
    &:hover {
        color: black;
        transition: 0.3s;
        }
    `


const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    font-size: 14px;
    font-weight: 700;
    color: #000;
    `


export default function CustomModal (props:{open:boolean,handleClose:()=>void, children:React.ReactNode}) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}

        >
            <Fade in={props.open}>
                <ModalCustom sx={style}>
                    <ModalHeader>
                        <CloseButton onClick={props.handleClose}>
                            X
                        </CloseButton>
                    </ModalHeader>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalCustom>
            </Fade>
        </Modal>

    );
}