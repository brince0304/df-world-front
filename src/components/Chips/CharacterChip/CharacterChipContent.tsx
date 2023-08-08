import { Box, Tooltip, IconButton, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { getServerName } from 'utils/charactersUtil';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

export const CharacterContent = (props: {
  characterName: string;
  serverId: string;
  characterImgUrl: string;
  adventureName: string;
  characterId: string;
}) => {
  const navigate = useNavigate();
  const handleNavigateToCharacterDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/details/?characterId=${props.characterId}&serverId=${props.serverId}`);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: '2px',
      }}
    >
      <Tooltip title={'클릭하여 캐릭터 상세 정보를 확인하세요.'} placement="top" arrow>
        <IconButton
          sx={{ position: 'absolute', top: '-5px', right: '-5px', zIndex: '100', color: 'white' }}
          onClick={handleNavigateToCharacterDetail}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Avatar src={props.characterImgUrl} sx={{ width: '100px', height: '100px' }} variant="rounded" />
      <Typography  fontSize={'0.9rem'} fontWeight={'bold'}>
        {props.characterName}
      </Typography>
      <Typography fontSize={'0.8rem'}>
        {props.adventureName}
      </Typography>
      <Typography  fontSize={'0.8rem'}>
        {getServerName(props.serverId)}
      </Typography>
    </Box>
  );
};
