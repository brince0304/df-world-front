import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactEventHandler, useCallback} from "react";
import {Avatar, Divider, IconButton} from "@mui/material";
import {profileIconData} from "../../../data/ProfileIconData";
import axios from "../../../common/axiosInstance";
import ImageUploader from "../../../components/ImageUploader";


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
    height: 600,
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
      display: flex;
        flex-direction: column;
      padding-top: 20px;
      height: 450px;
      width: 500px;
    }
`


const CloseButtonWrapper = styled.div`
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


const ModalBody = styled.div`
    display: flex;
  height: 100%;
  width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    `

interface ProfileIconChangeModalProps {
    isOpened:boolean,
    handleClose: ()=>void,
    refresh : () => void;
}

const ProfileIconChangeContainer = styled.div`
    display: block;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: auto;
    height: 100%;
 
    `

const IconSelectorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: gray;
    font-size: 18px;
    font-weight: 500;
  width: 100%;
    `;



export default function ProfileIconChangeModal (props:ProfileIconChangeModalProps) {
    const data = profileIconData;
    const handleChangeIcon = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(window.confirm("아이콘을 변경하시겠습니까?")){
            const url = e.currentTarget.dataset.id;
            if(url === undefined){
                alert("아이콘 변경에 실패하였습니다.");
                return;
            }else if(url){
                axios().put(url)
                    .then((res) => {
                        if(res.status === 200){
                            alert("변경되었습니다.");
                            props.handleClose();
                            props.refresh();
                        }else{
                            alert("아이콘 변경에 실패하였습니다.");
                        }
                    }).catch((err) => {
                    alert("아이콘 변경에 실패하였습니다.");
                })
            }
        }
    }
    return (
        <Modal
            open={props.isOpened}
            onClose={props.handleClose}
        >
            <Fade in={props.isOpened} unmountOnExit={true}>
                <ModalBox sx={style} >
                    <CloseButtonWrapper onClick={props.handleClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </CloseButtonWrapper>

                    <ModalHeader>
                        프로필 아이콘을 변경합니다!
                    </ModalHeader>
                    <ImageUploader refresh={props.refresh} handleClose={props.handleClose}/>
                    <Divider variant="middle" />
                    <ModalBody>
                        <IconSelectorWrapper>
                            <span>혹은 기본 아이콘을 선택해주세요!</span>
                        </IconSelectorWrapper>
                        <ProfileIconChangeContainer>
                            {data.map((datum,index) => (
                                <IconButton data-id={datum.url} onClick={handleChangeIcon} key={index}>
                                <Avatar src={"/images/icon_char/"+datum.name} sx={{width: 30, height: 30, margin: 1}}/>
                                </IconButton>
                            ))}
                        </ProfileIconChangeContainer>
                    </ModalBody>
                </ModalBox>
            </Fade>
        </Modal>
    );
}