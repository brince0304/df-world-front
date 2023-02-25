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
import {useInput} from "../../hooks/useInput";



const TextFieldCustom = styled(TextField)`
&&{
    width: 100%;
    height: 20px;
   padding: 35px 0;
}
`;




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
    padding: 20px 0;
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









const LoginSection = () => {
    const [email,onChangeEmail,isValidEmail,emailErrorMessage,emailPlaceholder]=useInput({
        placeholder:"이메일",
    });
    const [password,onChangePassword,isValidPassword,passwordErrorMessage,passwordPlaceholder]=useInput({
        placeholder:"비밀번호",
    });
    return (
                <form>
                    <div>
                        <Typography variant="h6" component="div" style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }} >
                            로그인
                        </Typography>
                    </div>
                    <div>
                        <TextFieldCustom error={!isValidEmail} type="email" placeholder={emailPlaceholder} onChange={onChangeEmail}
                        helperText={isValidEmail ? emailErrorMessage:''} value={email} name="email"/>
                        <TextFieldCustom error={!isValidPassword} type="password" placeholder={passwordPlaceholder} onChange={onChangePassword}
                        helperText={isValidPassword ? passwordErrorMessage:''} value={password} name="password"/>
                    </div>
                    <BodyFooter>
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

export default LoginSection;


