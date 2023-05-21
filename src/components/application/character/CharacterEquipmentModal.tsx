import Box from "@mui/material/Box";
import * as React from "react";
import {useCallback} from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import {Dialog, DialogContent} from "@mui/material";

const style = {
    display: "flex" as "flex",
    alignItems: "flex-start" as "flex-start",
    justifyContent: "flex-start" as "flex-start",
    position: "absolute" as "absolute",
    overflow: "scroll" as "scroll",
    scrollBehavior: "smooth" as "smooth",
    flexDirection: "column" as "column",
    //스크롤바 숨기기
    "&::-webkit-scrollbar": {
        display: "none",
    },
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //props width
    width: "400px",
    height: "auto",
    bgcolor: "#252627",
    borderRadius: 2,
    boxShadow: 24,
};


export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  color: #121212;
`;

const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 450px;
  position: relative;

`;


const CloseButtonWrapper = styled.div`
  //우측 끝에 배치
  position: fixed;
  font-size: 25px;
  color: silver;
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: #282c34;
    transition: 0.3s;
  }
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
    children: React.ReactNode,
    isOpened: boolean,
    setIsOpened: () => void,
}


export default function CharacterEquipmentModal(props: LoginModalProps) {

    return (
        <Dialog
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            open={props.isOpened}
            onClose={props.setIsOpened}
        >
            <DialogContent
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "330px",
                    padding : "10px",
                    height: "440px",
                    bgcolor: "#252627",

                }}
            >
                {props.children}
            </DialogContent>
        </Dialog>
    );
}