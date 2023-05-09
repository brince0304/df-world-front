import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactEventHandler, useCallback} from "react";
import store, {RootState} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setLoginModalOpened} from "../../../redux";


const style = {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    position: 'absolute' as 'absolute',
    overflow: 'scroll' as 'scroll',
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
      height: ${(props:{isloginpage:string}) => props.isloginpage ? '450px' : '550px'};
      @media (max-width: 768px) {
        width: 400px;
        height : 630px;
      }
    }
`



export const CloseButtonWrapper = styled.div`
  //우측 끝에 배치
  position: sticky;
  margin-left: auto;
    margin-right: 0px;
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
    padding: 20px 20px;
    `

interface LoginModalProps {
    children:React.ReactNode, isloginpage:boolean
}


export default function LoginModal (props:LoginModalProps) {
    const dispatch = useDispatch();
    const isOpened = useSelector((state:RootState) => state.modal.loginModalOpened);
    const handleClose = useCallback((e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(setLoginModalOpened(false));
    }, [dispatch]);
    return (
        <Modal
            open={isOpened}
            onClose={handleClose}
        >
            <Fade in={isOpened} unmountOnExit={true}>
                <ModalBox sx={style} isloginpage={props.isloginpage.toString()}>
                    <CloseButtonWrapper onClick={handleClose}>
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
}