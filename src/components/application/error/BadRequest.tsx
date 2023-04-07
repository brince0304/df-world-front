import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";

export const BadRequest = () => {
    return (
      <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>
          <Box>
              <FontAwesomeIcon icon={faSkullCrossbones} style={{fontSize: '100px',color:"gray"}}/>
                <Typography fontSize={20} fontWeight={600} color="gray" style={{marginTop: '10px'}}>잘못된 요청입니다.</Typography>
          </Box>
      </Container>

    );
};