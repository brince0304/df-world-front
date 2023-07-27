import Box from '@mui/material/Box';
import { Button, Container, styled } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
    &&{
        width: 150px;
        height: 50px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 16px;
    }
`;

export const BadRequest = () => {
    let navigate = useNavigate();
    const handleGetBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
      <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh',marginTop:'5%',marginBottom:'5%'}}>
          <Box>
              <FontAwesomeIcon icon={faTriangleExclamation} style={{fontSize: '100px',color:"gray"}}/>
                <Typography fontSize={20} fontWeight={600} color="gray" style={{marginTop: '10px'}}>잘못된 요청입니다.</Typography>
              <ButtonBox>
                  <StyledButton color="inherit" onClick={handleGetBack}> 뒤로가기</StyledButton>
                    <StyledButton color="inherit" onClick={handleGoHome}> 홈으로</StyledButton>
              </ButtonBox>
          </Box>
      </Container>

    );
};