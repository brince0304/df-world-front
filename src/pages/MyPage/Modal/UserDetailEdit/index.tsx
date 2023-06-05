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
import NicknameEdit from "./NicknameEdit";
import PasswordEdit from "./PasswordEdit";



const UserDetailEditModal = (props: { open: boolean, onClose: () => void, refresh: () => void }) => {
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
            <NicknameEdit onClose={props.onClose}/>
                <PasswordEdit onClose={props.onClose}/>
            </DialogContent>
        </Dialog>
    );

};

export default UserDetailEditModal;
