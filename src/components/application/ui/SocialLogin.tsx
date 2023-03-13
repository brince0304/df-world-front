import React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import {ModalTitle} from "./ModalTitle";
import {ImgOpacityButton} from "../layout/ImgOpacityButton";
import SocialLoginData from "../../../data/SocialLoginButons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 50%;

`

interface LoginButtonsProps {
    data: { src: string, alt: string, type: string }[]
}

const LoginButtons = (props: LoginButtonsProps) => {
    return (
        <>{props.data.map((item, index) => (
            <ImgOpacityButton src={require("../../../assets/img/" + item.src)} alt={item.alt} scale={1.5} key={index}/>
        ))}</>
    )
}


export function SocialLogin() {
    return (
        <Container>
            <ModalTitle title={"소셜 로그인"}/>
            <ButtonSection>
                <LoginButtons data={SocialLoginData.squareButtons}/>
            </ButtonSection>
        </Container>
    );
}
