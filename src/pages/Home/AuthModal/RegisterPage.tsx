import * as React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import {ModalTitle} from "../../../components/application/ui/ModalTitle";
import {ImgOpacityButton} from "../../../components/application/ui/ImgOpacityButton";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {RegisterFormProps, registerUser} from "../../../apis/auth/registerUser";

const FormControl = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10%;
  width: 100%;
  background-color: transparent;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

const TextFieldCustom = styled(TextField)`
  && {
    display: flex;
    margin-top: 10px;
    background-color: transparent;
    //중간배치
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;


const EmailFieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 100%;
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
const MissingPassword = styled.span`
  cursor: pointer;
  padding: 20px 0;
  color: silver;

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 700;
  color: silver;
`

const SignUpText = styled.span`
  cursor: pointer;
  color: silver;
  text-decoration-line: underline;

  &:hover {
    color: #1976d2;
    transition: 0.3s;
  }
`




const SocialRegisterBox = styled.div`
    display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 0px;
`

const AgreeBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props: { isAgree: boolean }) => props.isAgree ? "#282c34" : "silver"};
`;

const SocialRegisterButtons = (props: { data: { src: string, alt: string, type: string }[] }) => {
    return (
        <>{props.data.map((item, index) => (
            <ImgOpacityButton src={require("../../../assets/img/" + item.src)} alt={item.alt} scale={1} key={index}
                              width={50} height={50}/>
        ))}</>
    )
}


const passwordMatch = (password: string, passwordCheck: string) => {
    if (password !== '' && passwordCheck !== '') {
        return password === passwordCheck;
    }
    return true;
}







const LoginWrapper = styled.div`
    display: flex;
    flex-direction: row;
     padding: 10px 0px;
    `;

const DivisionLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.35);
    margin: 0px 8px;
    `;



const RegisterPage = (props: { handleChangeSection: () => void }) => {
    const schema = yup
        .object({
            userId: yup
                .string()
                .required("아이디를 입력해주세요.")
                .matches(/^[a-zA-Z0-9]{8,20}$/, "영문, 숫자를 포함한 8~20자리"),
            email: yup
                .string()
                .required("이메일을 입력해주세요.")
                .email("이메일 형식이 아닙니다."),
            nickname: yup
                .string()
                .required("닉네임을 입력해주세요.")
                .matches(/^[a-zA-Z0-9가-힣]{2,8}$/, "한글, 영문, 숫자를 포함한 2~8자리"),
            password: yup
                .string()
                .required("비밀번호를 입력해주세요.")
                .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/, "영문, 숫자, 특수문자를 포함한 8~20자리"),
            passwordCheck: yup
                .string()
                .required("비밀번호를 확인해주세요.")
                .test("password", "비밀번호가 일치하지 않습니다.", function (value) {
                        return passwordMatch(this.parent.password, this.parent.passwordCheck);
                    }
                ),
            isAgree: yup
                .boolean()
                .required("약관에 동의해주세요.")
                .oneOf([true], "약관에 동의해주세요.")
        })
        .required();

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors },
    } = useForm<RegisterFormProps>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const onValid = (data: RegisterFormProps) => {
              registerUser(data,setError);
    };





    return (
        <div>
        <ModalTitle title={"회원가입"}/>
    <FormControl onSubmit={handleSubmit(onValid)}>
        <TextFieldCustom label={"아이디"} error={!!errors.userId} type="text" helperText={errors.userId?.message}
                         {...register("userId")}>
        </TextFieldCustom>
        <TextFieldCustom label={"닉네임"} error={!!errors.nickname} type="text" helperText={errors.nickname?.message}
                         {...register("nickname")}>
        </TextFieldCustom>
                <TextFieldCustom label={"이메일"} error={!!errors.email} type="email" helperText={errors.email?.message}
                                 {...register("email")}>
                </TextFieldCustom>
            <TextFieldCustom label={"비밀번호"} error={!!errors.password} type="password" placeholder={"xxxxxxx"} helperText={errors.password?.message}
                             {...register("password")}/>
            <TextFieldCustom label={"비밀번호 확인"} error={!!errors.passwordCheck} type="password" helperText={errors.passwordCheck?.message}
                             {...register("passwordCheck")}/>

        <BodyFooter>
        </BodyFooter>

                <FormControlLabel
                    label="이용약관 및 개인정보 수집 및 이용에 동의합니다."
                    style={{
                        color: "#282c34",
                        fontWeight: "bold",
                    }}
                    control={<Checkbox {...register("isAgree")}/>}
                />

            <RegisterButton variant="contained" type="submit">회원가입</RegisterButton>
    </FormControl>
            <SignUpFooter>
                <LoginWrapper>
                                                <span style={{
                                                    paddingRight: "5px"
                                                }}>이미 계정이 존재하나요?</span>
                    <SignUpText onClick={props.handleChangeSection}>로그인</SignUpText>
                </LoginWrapper>
            </SignUpFooter>
        </div>
);

}

export default RegisterPage;

