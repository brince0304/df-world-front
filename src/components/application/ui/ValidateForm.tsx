import {Box, Button, IconButton, TextField, Tooltip} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import {FieldError, UseFormRegister, UseFormWatch} from "react-hook-form";
import {AxiosResponse} from "axios";
import {useEffect} from "react";
import {UseFormSetFocus} from "react-hook-form/dist/types/form";
import Typography from "@mui/material/Typography";

interface ValidateFormProps {
    register: UseFormRegister<any>,
    watch: UseFormWatch<any>,
    validatedMessage: string,
    inValidatedMessage: string,
    defaultTooltipMessage: string,
    formName: string,
    errors: FieldError | undefined,
    validateFunction: (value: string) => Promise<AxiosResponse<any, any>>,
    width ?: number,
    height ?: number,
    placeholder: string,
    isValidated: boolean,
    setIsValidated: (value: boolean) => void,
    isChecked: boolean,
    setIsChecked: (value: boolean) => void,
    setFocus: UseFormSetFocus<any>,
    helperText: string,
    fontFamily: string,
}


export const ValidateForm = (props: ValidateFormProps) => {
    const handleValidate = (value: string) => {
        if (props.isChecked) return;
        props.validateFunction(value).then((res) => {
            if (res.data === true) {
                props.setIsValidated(true);
                props.setIsChecked(true);
            } else {
                props.setIsValidated(false);
                props.setIsChecked(true);
            }
        }).catch((err) => {
            props.setIsValidated(false);
            props.setIsChecked(true);
        });
    };
    useEffect(() => {
        props.setIsChecked(false);
        props.setIsValidated(false);
    }, [props.watch(props.formName)]);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: props.width ? `${props.width}px` : "100%",
            height: props.height ? `${props.height}px` : "100%",
            justifyContent: "center",
        }}>
            <TextField {...props.register(props.formName)}
                       color={props.isValidated ? "success" : (props.isChecked ? "error" : "primary")}
                       error={!!props.errors}
                       variant={"standard"}
                       sx={{
                           "& .MuiInputBase-root": {
                               fontFamily: props.fontFamily,
                           }
                       }}
                       label={<Typography fontFamily={props.fontFamily} component={"span"}
                       > {props.placeholder}</Typography>}
                       helperText={
                <Typography  fontFamily={props.fontFamily} component={"span"}
                                       fontSize={"0.75rem"}>
                               {props.errors?.message || props.helperText}
                           </Typography>
            }

            />

                <Button

                    sx={{
                    position: "absolute",
                    right: "0",
                    top: "10px",
                    minWidth: "auto",
                    width: "40px",
height: "40px",
                    borderRadius: "50%",
                }} disabled={!!props.errors || !props.watch(props.formName)}
                            onClick={() => handleValidate(props.watch(props.formName))}>
                    <Tooltip
                        placement={"top-end"}
                        title={props.isChecked ? (props.isValidated ? props.validatedMessage : props.inValidatedMessage) : props.defaultTooltipMessage}
                        arrow>
                    <CheckCircleIcon
                        sx={{color: props.isChecked ? (props.isValidated ? "#00B890" : "#F64668") : "#939191",
                            transition: "all 0.3s ease-in-out"}}
                    />
                    </Tooltip>
                </Button>
        </Box>
    );
};