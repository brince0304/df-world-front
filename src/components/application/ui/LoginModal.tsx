import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //props width
    width: 800,
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
    font-size: 22px;
    font-weight: 700;
    color: #000;
    `

const ModalBox = styled(Box)`
    &&{
      display: grid; 
        flex-direction: column;
      padding-top: 10px;
      height : ${(props:{isLoginPage:boolean}) => props.isLoginPage ? '450px' : '500px'};
      transition: height 0.3s ease-in-out;
      @media (max-width: 768px) {
        width: 400px;
        height : 600px;
      }
    }
`

const CloseButtonWrapper = styled.div`
  //우측 끝에 배치
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 20px;
    font-size: 25px;
    color:silver;
    cursor: pointer;
    &:hover {
        color: #282c34;
        transition: 0.3s;
        }
    `


const ModalBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0;
    `


export default function LoginModal (props:{open:boolean,handleClose:()=>void, children:React.ReactNode, isLoginPage:boolean}) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Fade in={props.open}>
                <ModalBox sx={style} isLoginPage={props.isLoginPage}   >
                    <ModalHeader>
                        <CloseButtonWrapper onClick={props.handleClose}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </CloseButtonWrapper>
                    </ModalHeader>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalBox>
            </Fade>
        </Modal>

    );
}