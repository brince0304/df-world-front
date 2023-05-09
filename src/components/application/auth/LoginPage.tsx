import * as React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import {useInput} from "../../../hooks/useInput";
import {ModalTitle} from "../ui/ModalTitle";
import {ImgOpacityButton} from "../ui/ImgOpacityButton";
import SocialLoginData from "../../../data/SocialLoginButons";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {login} from "../../../api/auth/login";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../redux/store";
import Typography from "@mui/material/Typography";


const TextFieldCustom = styled(TextField)`
&&{
    width: 80%;
    height: 100%;
    margin-top: 20px;
  //중간배치
    margin-left: 10%;
    margin-right: 10%;
}
`;

const FormControl = styled.form`
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


const LoginButton = styled(Button)`
&&{
    width: 300px;
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

const SocialLoginTitle = styled.span`
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

const SocialLoginBox = styled.div`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 0px;
    display: none;
    @media (max-width: 768px) {
        display: flex;
    }
    `





interface SocialLoginProps {
    data:{src:string,alt:string,type:string}[]
}





const SocialLoginButtons=(props:SocialLoginProps)=>{
    return(
        <>{props.data.map((item,index)=>(
            <ImgOpacityButton src={require("../../../assets/img/"+item.src)} alt={item.alt} scale={1} key={index} width={50} height={50} />
        ))}</>
    )
}

interface LoginProps {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required('아이디를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
});



const LoginPage = (props:{handleChangeSection:()=>void}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors },
    } = useForm<LoginProps>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onValid = useCallback((data: LoginProps) => {
        dispatch(login(data,setError,navigate));
    }, [dispatch, setError]);
    return (
                <FormControl onSubmit={handleSubmit(onValid)} >
                    <ModalTitle title={"로그인"}/>
                    <div>
                        <TextFieldCustom error={!!errors.username} type="text" label={"아이디"}
                                         helperText={errors.username?.message} {...register("username")} />
                        <TextFieldCustom error={!!errors.password} type="password" label={"비밀번호"}
                                         helperText={errors.password?.message} {...register("password")} />
                    </div>
                    <BodyFooter>
                        <MissingPassword>
                            비밀번호를 잊으셨나요?
                        </MissingPassword>
                    </BodyFooter>
                    <LoginFooter>
                        <SocialLoginTitle>소셜 로그인</SocialLoginTitle>
                        <SocialLoginBox>
                            <SocialLoginButtons data={SocialLoginData.circleButtons}/>
                        </SocialLoginBox>
                        <LoginButton variant="contained" type="submit">로그인</LoginButton>
                        <SignUpFooter >
                            <span style={{
                                paddingRight: "5px"
                            }}>아직 회원이 아니신가요?</span>
                            <SignUpText onClick={props.handleChangeSection}>회원가입</SignUpText>
                        </SignUpFooter>
                    </LoginFooter>
                </FormControl>

    )
}

export default LoginPage;


