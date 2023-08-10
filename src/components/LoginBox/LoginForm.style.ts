import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

export const MissingPassword = styled.span`
  font-size: 0.8rem;
  color: #787878;
  font-weight: 500;
  &:hover {
    color: cornflowerblue;
    transition: ease-in-out 0.2s;
    cursor: pointer;
  }
`;

export const LoginFormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
