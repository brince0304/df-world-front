import Box from "@mui/material/Box";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useCallback} from "react";
import {setLoginModalIsOpened} from "../../../redux";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const style = {
    display: 'flex' as 'flex',
    alignItems: 'flex-start' as 'flex-start',
    justifyContent: 'flex-start' as 'flex-start',
    position: 'absolute' as 'absolute',
    overflow: 'scroll' as 'scroll',
    scrollBehavior: 'smooth' as 'smooth',
    flexDirection: 'column' as 'column',
    //스크롤바 숨기기
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //props width
    width: '300px',
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 1,
};


export const ModalHeader = styled.div`
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
        display: flex;
        flex-direction: column;
        padding-top: 10px;
       height:450px;
    }
`



export const CloseButtonWrapper = styled.div`
  //우측 끝에 배치
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 25px;
  color:silver;
  cursor: pointer;
  &:hover {
    color: #282c34;
    transition: 0.3s;
  }
`


export const ModalBody = styled.div`
    display: flex;
  position: relative;
  height: 100%;
  width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    `

interface LoginModalProps {
    children:React.ReactNode,
    isOpened:boolean,
    setIsOpened:(bool:boolean)=>void,
}


export default function CharacterEquipmentModal (props:LoginModalProps) {
    const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        props.setIsOpened(false);
    }, [props.setIsOpened]);
    return (
        <Modal
            open={props.isOpened}
            onClose={handleClose}
        >
            <Fade in={props.isOpened} unmountOnExit mountOnEnter>
                <ModalBox sx={style}>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalBox>
            </Fade>
        </Modal>
    );
}