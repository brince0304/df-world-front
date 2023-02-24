import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import {Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import Grid2 from "@mui/material/Grid";
import {SetStateAction, useEffect} from "react";
import {useLogin} from "./LoginModalCustomHook";
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
const TextFieldEmail = styled(TextField)`
&&{
    width: 100%;
    height: 20px;
   padding: 35px 0;
}
`;

const TextFieldPassword = styled(TextField)`
&&{
    width: 100%;
    height: 20px;
    padding: 35px 0;
}
`;

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

const CustomButton = styled(Button)`
&&{
    width: 100%;
    height: 20px;
    margin-top: 20px;
    padding: 20px 0;
  background-color: silver;
  
}
`;

const BodyFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 14px;
    font-weight: 700;
    color: #000;
    `
const MissingPassword= styled.span`
    cursor: pointer;
    margin-top : 10px;
  color:silver;
    &:hover {
        color: #1976d2;
        transition: 0.3s;
        }
    `

const LoginFooter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 0;
`;

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







const LoginSection = (props:{handleChangeId:(email:string)=>void,
    handleChangePassword:(password:string)=>void,
    isEmptyId:boolean,
    isEmptyPassword:boolean,
    handleLogin:(e: React.FormEvent<HTMLFormElement>) => void,
    handleRememberChange:(check:string)=>void,
}) => {
    return (

                <form onSubmit={props.handleLogin}>
                    <div>
                        <Typography variant="h6" component="div" style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }} >
                            로그인
                        </Typography>
                    </div>
                    <div>
                        <TextFieldEmail error={props.isEmptyId} type="email" placeholder="이메일" onChange={(e)=>{props.handleChangeId(e.target.value)}} required/>
                        <TextFieldPassword error={props.isEmptyId} type="password" placeholder="비밀번호" onChange={(e)=>{props.handleChangePassword(e.target.value)}} required/>
                    </div>
                    <BodyFooter>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox onChange={(e)=>{props.handleRememberChange(e.target.value)}} />}
                            label="로그인 상태 유지"
                            labelPlacement="end"
                        />
                        <MissingPassword>
                            비밀번호를 잊으셨나요?
                        </MissingPassword>
                    </BodyFooter>
                    <LoginFooter>
                        <CustomButton variant="contained" type="submit">로그인</CustomButton>
                        <CustomButton variant="contained">회원가입</CustomButton>
                    </LoginFooter>
                </form>

    )
}


export default function TransitionsModal(props:{open:boolean,handleClose:()=>void}) {
    const {
        isEmptyId,
        isEmptyPassword,
        handleLogin,
        handleChangePassword,
        handleChangeId,
    isRemember,
    handleChangeRemember} = useLogin();
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
                            <LoginSection isEmptyId={isEmptyId} isEmptyPassword={isEmptyPassword} handleChangePassword={handleChangePassword} handleChangeId={handleChangeId} handleLogin={handleLogin} handleRememberChange={handleChangeRemember}/>
                        </ModalBody>
                    </ModalCustom>
                </Fade>
            </Modal>

    );
}