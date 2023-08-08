import { Box, Button, Collapse } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import { ReactNode, useState } from 'react';

const CollapseButton = (props: { children: ReactNode; label: string }) => {
  const [openNicknameEditSection, setOpenNicknameEditSection] = useState<boolean>(false);
  const handleToggleNicknameEditSection = () => {
    setOpenNicknameEditSection(!openNicknameEditSection);
  };
  const arrowDropIconStyleNickname = {
    color: openNicknameEditSection ? '#121212' : '#9e9e9e',
    '&:hover': {
      color: openNicknameEditSection ? '#121212' : '#9e9e9e',
    },
    transform: openNicknameEditSection ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'all 0.3s ease-in-out',
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        sx={{
          width: '100%',
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onClick={handleToggleNicknameEditSection}
      >
        <Typography component={'span'} fontSize={'1rem'} color={'#121212'} fontWeight={'bold'}>
          {props.label}
        </Typography>
        <ArrowDropDownIcon sx={arrowDropIconStyleNickname} />
      </Button>
      <Collapse orientation={'vertical'} in={openNicknameEditSection} mountOnEnter unmountOnExit sx={{ width: '100%' }}>
        {props.children}
      </Collapse>
    </Box>
  );
};

export default CollapseButton;
