import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return (
    <Box
      component={'footer'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100px',
        backgroundColor: '#212124',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'Nanum Gothic',
        letterSpacing: '0.1rem',
        textAlign: 'center',
        position: 'relative',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '100',
        marginTop: '20px',
      }}
    >
      <Typography variant="h6" component="div" sx={{ marginBottom: '10px', fontFamily: 'Core Sans' }}>
        © 2023. All rights reserved.
      </Typography>
    </Box>
  );
};