import {Box, Button, Collapse, FormControl} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ValidateTextField from "../../../../../components/ValidateTextField";
import * as React from "react";
import {useEffect, useState} from "react";
import getValidateNickname from "../../../../../apis/myPage/getValidateNickname";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import putChangeNickname from "../../../../../apis/myPage/putChangeNickname";
import CollapseButton from "../../../../../components/CollapseButton";
import {useAppDispatch} from "../../../../../redux/store";
import {getUserDetails} from "../../../../../apis/auth/getUserDetails";


interface FormProps {
    nickname: string;
}

const NicknameEdit = (props: { onClose: () => void}) => {
    const schema = yup.object().shape({
        nickname: yup.string().min(2, "닉네임은 2자리 이상이어야 합니다.").max(8, "닉네임은 8자리 이하여야 합니다."),
    });

    const [isNicknameValidated, setIsNicknameValidated] = useState<boolean>(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {
        register,
        watch,
        formState: {errors,},
        setFocus,
        handleSubmit
    } = useForm<FormProps>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

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

    useEffect(() => {
        setIsNicknameValidated(false);
        setIsNicknameChecked(false);
    }, [watch("nickname")]);
    const onValid = (data: FormProps) => {
        if (window.confirm("닉네임을 변경하시겠습니까?")) {
            putChangeNickname(data.nickname).then((res) => {
                alert("닉네임이 변경되었습니다.");
                dispatch(getUserDetails());
                props.onClose();
            }).catch((err) => {
                console.log(err);
            });
        }    };

    return (
        <CollapseButton label={"닉네임 변경"}>
            <FormControl style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }} fullWidth component={"form"} onSubmit={handleSubmit(onValid)}>
                <ValidateTextField {...nicknameFormProps} />
                <Button variant={"contained"}
                        sx={{
                            width: "100%",
                        }}
                        disabled={!!errors.nickname || !watch("nickname") || !isNicknameValidated}
                        type={"submit"}
                >변경</Button>
            </FormControl>
        </CollapseButton>
    );
};

export default NicknameEdit;
