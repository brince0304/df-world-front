import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux/store";
import {useEffect, useState} from "react";
import getValidateNickname from "../../../../apis/myPage/getValidateNickname";
import putChangeNickname from "../../../../apis/myPage/putChangeNickname";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import putChangePassword from "../../../../apis/myPage/putChangePassword";
import {getSignOut} from "../../../../apis/auth/getSignOut";
import {Box, Button, Collapse, Dialog, DialogContent, DialogTitle, FormControl, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ValidateTextField from "../../../../components/ValidateTextField";

interface IForm {
    nickname: string;
    password: string;
    passwordValidate: string;
    passwordConfirm: string;
}


const UserDetailEditModal = (props: { open: boolean, onClose: () => void, refresh: () => void }) => {
    const passwordMatch = (password: string, passwordCheck: string) => {
        if (password !== "" && passwordCheck !== "") {
            return password === passwordCheck;
        }
        return true;
    };
    const schema = yup.object().shape({
        nickname: yup.string().min(2, "닉네임은 2자리 이상이어야 합니다.").max(8, "닉네임은 8자리 이하여야 합니다."),
        passwordValidate: yup.string(),
        password: yup.string().min(8, "비밀번호는 8자리 이상이어야 합니다.").matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/, "영문, 숫자, 특수문자를 포함한 8~20자리"),
        passwordConfirm: yup
            .string()
            .test("password", "비밀번호가 일치하지 않습니다.", function (value) {
                    return passwordMatch(this.parent.password, this.parent.passwordConfirm);
                }
            ),
    });
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: {errors,},
        setFocus
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const userDetails = useSelector((state: RootState) => state.auth.userDetail);
    const dispatch = useAppDispatch();
    const [isNicknameValidated, setIsNicknameValidated] = useState<boolean>(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
    const nicknameFormProps = {
        register: register,
        watch: watch,
        validatedMessage: "사용 가능한 닉네임입니다.",
        inValidatedMessage: "이미 사용중인 닉네임입니다.",
        defaultTooltipMessage: "중복 확인",
        formName: "nickname",
        errors: errors.nickname,
        validateFunction: getValidateNickname,
        placeholder: "변경할 닉네임",
        isChecked: isNicknameChecked,
        setIsChecked: setIsNicknameChecked,
        setIsValidated: setIsNicknameValidated,
        isValidated: isNicknameValidated,
        helperText: "한글, 영문, 숫자를 포함한 2~8자리",
        fontFamily: "Core Sans",
        setFocus: setFocus,
    };


    const handleUpdateNickname = (nickname: string) => {
        if (window.confirm("닉네임을 변경하시겠습니까?")) {
            putChangeNickname(nickname).then((res) => {
                alert("닉네임이 변경되었습니다.");
                props.onClose();
                props.refresh();
            }).catch((err) => {
                console.log(err);
            });
        }
        ;
    };
    const [openPasswordEditSection, setOpenPasswordEditSection] = useState<boolean>(false);
    const [openNicknameEditSection, setOpenNicknameEditSection] = useState<boolean>(false);
    const handleTogglePasswordEditSection = () => {
        setOpenPasswordEditSection(!openPasswordEditSection);
    };
    const navigate = useNavigate();
    const handleToggleNicknameEditSection = () => {
        setOpenNicknameEditSection(!openNicknameEditSection);
    };
    useEffect(() => {
        setIsNicknameValidated(false);
        setIsNicknameChecked(false);
    }, [watch("nickname")]);
    const arrowDropIconStyleNickname = {
        color: openNicknameEditSection ? "#121212" : "#9e9e9e",
        "&:hover": {
            color: openNicknameEditSection ? "#121212" : "#9e9e9e",
        },
        transform: openNicknameEditSection ? "rotate(180deg)" : "rotate(0deg)",
        transition: "all 0.3s ease-in-out",
    }

    const arrowDropIconStylePassword = {
        color: openPasswordEditSection ? "#121212" : "#9e9e9e",
        "&:hover": {
            color: openPasswordEditSection ? "#121212" : "#9e9e9e",
        },
        transform: openPasswordEditSection ? "rotate(180deg)" : "rotate(0deg)",
        transition: "all 0.3s ease-in-out",

    }

    const handleUpdatePassword =(e:React.MouseEvent) => {
        e.preventDefault();
        const data = {
            password: watch("passwordValidate"),
            passwordValidate: watch("password"),
        }
        putChangePassword(data.passwordValidate,data.password).then((res)=>{
            alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
            dispatch(getSignOut());
            navigate("/");
        }).catch((err)=>{
            alert(err.response.data);
        })
    };
    return (
        <Dialog open={props.open} onClose={props.onClose}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "400px",
                        height: "500px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}}>
            <DialogTitle>
                <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"}>회원정보
                    수정 </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Button sx={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }} onClick={handleToggleNicknameEditSection}>
                        <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"} color={"#121212"}
                                    fontWeight={"bold"}>닉네임 변경</Typography>
                        <ArrowDropDownIcon sx={arrowDropIconStyleNickname}/>
                    </Button>
                </Box>
                <Collapse orientation={"vertical"} in={openNicknameEditSection} mountOnEnter unmountOnExit>
                    <FormControl style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <ValidateTextField {...nicknameFormProps} />
                        <Button variant={"contained"}
                                sx={{
                                    width: "100%",
                                }}
                                disabled={!!errors.nickname || !watch("nickname") || !isNicknameValidated}
                                onClick={(e) => {
                                    handleUpdateNickname(watch("nickname"));
                                }}>변경</Button>
                    </FormControl>
                </Collapse>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Button sx={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }} onClick={handleTogglePasswordEditSection}>
                        <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"} color={"#121212"}
                                    fontWeight={"bold"}>비밀번호 변경</Typography>
                        <ArrowDropDownIcon sx={arrowDropIconStylePassword}/>
                    </Button>
                </Box>
                <Collapse orientation={"vertical"} in={openPasswordEditSection} mountOnEnter unmountOnExit>
                    <FormControl sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <TextField fullWidth variant={"standard"} margin={"normal"}
                                   {...register("passwordValidate")}
                                   label={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                                   fontWeight={"bold"}>현재 비밀번호</Typography>
                                   } type={"password"}/>
                        <TextField fullWidth variant={"standard"} margin={"normal"}
                                   helperText={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"0.75rem"}>
                                           {errors.password?.message}</Typography>
                                   }
                                   {...register("password")} error={!!errors.password}
                                   label={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                                   fontWeight={"bold"}>변경할 비밀번호</Typography>
                                   } type={"password"}/>
                        <TextField fullWidth variant={"standard"} margin={"normal"}
                                   helperText={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"0.75rem"}
                                       >{errors.passwordConfirm?.message}</Typography>
                                   }
                                   {...register("passwordConfirm")} error={!!errors.passwordConfirm}
                                   label={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                                   fontWeight={"bold"}>비밀번호 확인</Typography>
                                   } type={"password"}/>
                        <Button variant={"contained"} color={"primary"} disabled={!!errors.password || !!errors.passwordConfirm || !watch("password") || !watch("passwordConfirm")
                            || !watch("passwordValidate")} sx={{width: "100%"}} onClick={handleUpdatePassword} >변경</Button>
                    </FormControl>
                </Collapse>
            </DialogContent>
        </Dialog>
    );

};

export default UserDetailEditModal;
