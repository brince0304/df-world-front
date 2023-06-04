import * as React from "react";
import {useCallback, useState} from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {RootState} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setLoginModalOpened} from "../../../redux";
import {Dialog, DialogContent, Divider} from "@mui/material";
import RegisterPage from "./RegisterPage";
import {SocialLogin} from "./SocialLogin";
import LoginPage from "./LoginPage";


const RegisterContainer = styled.div`
          display: ${(props: { isloginpage: boolean }) => props.isloginpage ? "none" : "flex"};
          width: 100%;
          height: 100%;
          //넘치면 스크롤바
          @media (max-width: 768px) {
            width: 100%;
          }
    `
;

const LoginContainer = styled.div`
  display: ${(props: { isloginpage: boolean }) => props.isloginpage ? "flex" : "none"};
  height: 100%;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;


function LoginModal () {
    const [isloginpage, setIsloginpage] = useState<boolean>(true);
    const handleChangeSection = useCallback(
        () => {
            setIsloginpage(!isloginpage);
        },
        [isloginpage]);
    const dispatch = useDispatch();
    const isOpened = useSelector((state:RootState) => state.modal.loginModalOpened);
    const handleClose = useCallback((e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(setLoginModalOpened(false));
    }, [dispatch]);
    return (
        <Dialog
            open={isOpened}
            onClose={handleClose}
        >
                <DialogContent>
                    <RegisterContainer isloginpage={isloginpage.valueOf()} id={"register-part"}>
                        <RegisterPage handleChangeSection={handleChangeSection}/>
                    </RegisterContainer>
                    <LoginContainer isloginpage={isloginpage.valueOf()} id={"postSignIn-part"}>
                        <SocialLogin/>
                        <Divider orientation={"vertical"} flexItem={true} sx={{
                            "@media (max-width: 768px)": {
                                display: "none",
                            }
                        }}/>
                        <LoginPage handleChangeSection={handleChangeSection}/>
                    </LoginContainer>
                </DialogContent>
        </Dialog>
    );
}

export default LoginModal;
