import { Box, Button, TextField, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as React from 'react';
import { useEffect } from 'react';
import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { UseFormSetFocus } from 'react-hook-form/dist/types/form';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

interface ValidateFormProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  validatedMessage: string;
  inValidatedMessage: string;
  defaultTooltipMessage: string;
  formName: string;
  errors: FieldError | undefined;
  validateFunction: (value: string) => Promise<AxiosResponse<any, any>>;
  width?: number;
  height?: number;
  placeholder: string;
  isValidated: boolean;
  setIsValidated: (value: boolean) => void;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  helperText: string;
  setFocus: UseFormSetFocus<any>;
}

const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 10px;
  min-width: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ValidateForm = (props: ValidateFormProps) => {
  const validateValue = (value: string) => {
    if (props.isChecked) return;
    props
      .validateFunction(value)
      .then((res) => {
        props.setFocus(props.formName);
        // Response is must be boolean type.
        if (res.data === true) {
          props.setIsValidated(true);
          props.setIsChecked(true);
        } else {
          props.setIsValidated(false);
          props.setIsChecked(true);
        }
      })
      .catch((err) => {
        props.setIsValidated(false);
        props.setIsChecked(true);
      });
  };

  useEffect(() => {
    // Change to default status if value is changed.
    props.setIsChecked(false);
    props.setIsValidated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.watch(props.formName)]);

  const boxStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: props.width ? `${props.width}px` : '100%',
    height: props.height ? `${props.height}px` : '100%',
    justifyContent: 'center',
  };

  return (
    <Box sx={boxStyleObject}>
      <TextField
        {...props.register(props.formName)}
        color={props.isValidated ? 'success' : props.isChecked ? 'error' : 'primary'}
        error={!!props.errors}
        variant={'standard'}
        label={<Typography component={'span'}>{props.placeholder}</Typography>}
        helperText={props.errors?.message || props.helperText}
      />
      <StyledButton
        disabled={!!props.errors || !props.watch(props.formName)}
        onClick={() => validateValue(props.watch(props.formName))}
      >
        <Tooltip
          placement={'top-end'}
          title={
            props.isChecked
              ? props.isValidated
                ? props.validatedMessage
                : props.inValidatedMessage
              : props.defaultTooltipMessage
          }
          arrow
        >
          <CheckCircleIcon
            sx={{
              color: props.isChecked ? (props.isValidated ? '#00B890' : '#F64668') : '#939191',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        </Tooltip>
      </StyledButton>
    </Box>
  );
};

export default ValidateForm;
