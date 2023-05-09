import {Box, IconButton, InputBase, Tooltip, Zoom} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import {FieldError, FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import { AxiosResponse } from "axios";
import {useEffect, useRef} from "react";
import {UseFormSetFocus} from "react-hook-form/dist/types/form";

interface ValidateFormProps {
    register : UseFormRegister<any>,
    watch : UseFormWatch<any>,
    validatedMessage : string,
    inValidatedMessage : string,
    defaultTooltipMessage : string,
    formName : string,
    errors : FieldError | undefined,
    validateFunction : (value:string) =>  Promise<AxiosResponse<any,any>> ,
    width : number,
    height : number,
    placeholder : string,
    isValidated : boolean,
    setIsValidated : (value:boolean)=>void,
    isChecked : boolean,
    setIsChecked : (value:boolean)=>void,
    setFocus : UseFormSetFocus<any>,
}


export const ValidateForm = (props:ValidateFormProps) => {
    const {ref} = props.register(props.formName);
    const handleValidate = (value:string) => {
        if(props.isChecked) return;
        props.validateFunction(value).then((res) => {
            if(res.data === true){
                props.setIsValidated(true);
                props.setIsChecked(true);
            }else{
                props.setIsValidated(false);
                props.setIsChecked(true);
            }
        }).catch((err) => {
            props.setIsValidated(false);
            props.setIsChecked(true);
        })
    }
    useEffect(() => {
        props.setIsChecked(false);
        props.setIsValidated(false);
    },[props.watch(props.formName)])
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: `${props.width}px`,
            height: `${props.height}px`,
        }}>
            <InputBase placeholder={props.placeholder} {...props.register(props.formName)}
                       sx={{
                           width: "100%",
                           height: "100%",
                           fontFamily: "Core Sans",
                           fontSize: "1rem",
                           borderBottom: "2px solid #bdbdbd",
                           position: "relative",
                            "&:hover": {
                                borderBottom: "2px solid #121212",
                            },
                           transition: "all 0.3s ease-in-out",
                       }}/>
            <Tooltip title={props.isChecked ? (props.isValidated ?  props.validatedMessage : props.inValidatedMessage) : props.defaultTooltipMessage} arrow>
                <IconButton sx={{
                    position: "absolute",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    padding: "5px",
                }} disabled={!!props.errors || !props.watch(props.formName)}
                            onClick={() => handleValidate(props.watch(props.formName))}
                >
                    <CheckCircleIcon
                        sx={{
                            color: props.isChecked ? (props.isValidated ? "#4caf50" : "#f44336") : "#bdbdbd",
                            transition: "all 0.3s ease-in-out",
                        }}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
};