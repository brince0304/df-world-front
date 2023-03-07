import * as React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import {useInput} from "../../../hooks/useInput";
import {ModalTitle} from "./ModalTitle";
import {ImgOpacityButton} from "./ImgOpacityButton";
import SocialLoginData from "../../../data/SocialLoginButons";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useCheckbox} from "../../../hooks/useCheckbox";

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    width:50%;
  background-color: transparent;
    @media (max-width: 768px) {
    width:100%;

    }
`

const TextFieldCustom = styled(TextField)`
&&{
    width: 80%;
    height: 100%;
    margin-top: 10px;
  //중간배치
    margin-left: 10%;
    margin-right: 10%;

}
`;




const RegisterButton = styled(Button)`
  &&{
    width: 310px;
    height: 20px;
    margin-top: 20px;
    padding: 20px 0;
    background-color: #1976d2;

  }
`;

const BodyFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
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


const SignUpFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    font-size: 14px;
    font-weight: 700;
    color: silver;
    `

const SignUpText = styled.span`
    cursor: pointer;
    color:silver;
  text-decoration-line: underline;
    &:hover {
        color: #1976d2;
        transition: 0.3s;
        }
    `

const SocialRegisterTitle = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 12px;
    margin: 8px 0px;
    //양옆에 줄
    &::before,
    &::after {
      content: "";
      flex-grow: 1;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.35);
      margin: 0px 8px;
    }
  }
    `


const SocialRegisterBox = styled.div`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 0px;
    display: none;
    @media (max-width: 768px) {
        display: flex;
    }
    `

const AgreeBoxWrapper= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  color: ${(props:{isAgree:boolean})=> props.isAgree? "#282c34":"silver"};
   `;

const SocialRegisterButtons=(props:{data:{src:string,alt:string,type:string}[]})=>{
    return(
        <>{props.data.map((item,index)=>(
            <ImgOpacityButton src={require("../../../assets/img/"+item.src)} alt={item.alt} scale={1} key={index} width={50} height={50} />
        ))}</>
    )
}


const passwordMatch = (password:string, passwordCheck:string) => {
    if(password!=='' && passwordCheck!==''){
        return password===passwordCheck;
    }
    return true;
}




const RegisterPage = (props:{handleChangeSection:()=>void}) => {
    const [email,onChangeEmail,isValidEmail,emailErrorMessage,emailPlaceholder,isValidFinalEmail]=useInput({
        placeholder:"이메일",
        regex:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
        errorMessage:"이메일 형식이 아닙니다."

    });
    const [password,onChangePassword,isValidPassword,passwordErrorMessage,passwordPlaceholder,isValidFinalPassword]=useInput({
        placeholder:"비밀번호",
        regex:/^[a-zA-Z0-9]{6,12}$/,
        errorMessage:"비밀번호는 6~12자리의 영문,숫자만 가능합니다."
    });
    const [passwordCheck,onChangePasswordCheck,isValidPasswordCheck,passwordCheckErrorMessage,passwordCheckPlaceholder,isValidFinalPasswordCheck]=useInput({
        placeholder:"비밀번호 확인",
        errorMessage:"비밀번호가 일치하지 않습니다."
    });

    const [isAgree,onChangeAgree,label]=useCheckbox(
        {
            initialValue:false,
            label:"이용약관 동의",
        }
    );
    return (
        <FormControl>
            <ModalTitle title={"이메일 회원가입"}/>
            <div>
                <TextFieldCustom error={!isValidEmail} type="email" placeholder={emailPlaceholder} onChange={onChangeEmail}
                                 helperText={!isValidEmail ? emailErrorMessage:''} value={email} name="email"/>
                <TextFieldCustom error={!isValidPassword} type="password" placeholder={passwordPlaceholder} onChange={onChangePassword}
                                 helperText={!isValidPassword ? passwordErrorMessage:''} value={password} name="password"/>
                <TextFieldCustom error={!passwordMatch(password,passwordCheck)} type="password" placeholder={passwordCheckPlaceholder} onChange={onChangePasswordCheck}
                                 helperText={!passwordMatch(password,passwordCheck) ? passwordCheckErrorMessage:''} value={passwordCheck} name="password"/>
            </div>
            <BodyFooter>
            </BodyFooter>
            <LoginFooter>
                <SocialRegisterTitle>소셜 계정으로 회원가입</SocialRegisterTitle>
                <SocialRegisterBox>
                    <SocialRegisterButtons data={SocialLoginData.circleButtons}/>
                </SocialRegisterBox>
                <AgreeBoxWrapper isAgree={isAgree}>
                    <FormControlLabel
                        label={label}
                        control={<Checkbox onChange={onChangeAgree}/>}
                    />
                </AgreeBoxWrapper>
                <RegisterButton variant="contained" type="submit">회원가입</RegisterButton>
                <SignUpFooter >
                            <span style={{
                                paddingRight: "5px"
                            }}>이미 계정이 존재하나요?</span>
                    <SignUpText onClick={props.handleChangeSection}>로그인</SignUpText>
                </SignUpFooter>
            </LoginFooter>
        </FormControl>

    )
}

export default RegisterPage;

