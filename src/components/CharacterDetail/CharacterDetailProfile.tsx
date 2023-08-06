import { Button, IconButton, Paper, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandFist, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import useCharacterDetailQuery from '../../hooks/characterHooks/queries/useCharacterDetailQuery';

const CharacterProfile = ({ characterId, serverId }: { characterId: string; serverId: string }) => {
  const { data, refetch } = useCharacterDetailQuery(characterId, serverId);
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative' as 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <Tooltip title="새로고침" placement="bottom">
        <IconButton aria-label="refresh" onClick={()=>refetch()} sx={refreshButtonStyle}>
          <FontAwesomeIcon icon={faRotateRight} />
        </IconButton>
      </Tooltip>
      <Box>
        <Tooltip
          title={
            <Box>
              <Typography {...typographyProps} sx={{ paddingLeft: '5px' }}>
                {data?.buffStatus?.[0]} {data?.buffStatus?.[1]}렙 +{data?.buffStatus?.[2]}
              </Typography>
            </Box>
          }
          placement="bottom"
        >
          <Button
            sx={{
              position: 'absolute' as 'absolute',
              bottom: '10px',
              right: '10px',
              color: 'black',
            }}
          >
            <FontAwesomeIcon icon={faHandFist} />
            <Typography fontSize={'12px'} sx={{ paddingLeft: '5px' }}>
              버프강화
            </Typography>
          </Button>
        </Tooltip>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            padding: '0px 0px',
            gap: '10px',
            position: 'relative' as 'relative',
          }}
        >
          <CharacterImgWrapper>
            <img src={data?.characterEntityDto?.characterImgPath} alt="characterImg" />
          </CharacterImgWrapper>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingLeft: '10px',
              gap: '5px',
              position: 'relative' as 'relative',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                position: 'relative' as 'relative',
                height: '100%',
              }}
            >
              <Typography {...typographyProps} fontSize={14} sx={{ color: 'gray' }}>
                {data?.characterEntityDto?.serverName}
              </Typography>
              <Typography {...typographyProps} fontSize={14} sx={{ color: 'gray' }}>
                {data?.characterEntityDto?.jobGrowName}
              </Typography>
            </Box>
            <Box>
              <Typography {...typographyProps} fontSize={25} sx={{ color: 'black' }}>
                {data?.characterEntityDto?.characterName}
              </Typography>
            </Box>
            <Box>
              <Typography {...typographyProps} fontSize={14} sx={{ color: 'gray' }}>
                모험단 : {data?.characterEntityDto?.adventureName}
              </Typography>
            </Box>
            <Box>
              <Typography {...typographyProps} fontSize={14} sx={{ color: 'gray' }}>
                길드 : {data?.characterEntityDto?.guildName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                position: 'relative' as 'relative',
                height: '100%',
              }}
            >
              <Typography {...typographyProps} fontSize={10} sx={{ color: 'black' }}>
                전체 명성 랭킹 : {data?.characterRank}위 / {data?.characterCount}명
              </Typography>
              <Typography {...typographyProps} fontSize={10} sx={{ color: 'darkred' }}>
                상위 {data?.characterPercent}%
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                position: 'relative' as 'relative',
                height: '100%',
              }}
            >
              <Typography {...typographyProps} fontSize={10} sx={{ color: 'black' }}>
                직업 명성 랭킹 : {data?.characterRankByJobName}위 / {data?.characterCountByJobName}명
              </Typography>
              <Typography {...typographyProps} fontSize={10} sx={{ color: 'darkred' }}>
                상위 {data?.characterPercentByJobName}%
              </Typography>
            </Box>
            <Box>
              <Typography {...typographyProps} fontSize={14} sx={{ color: 'gray' }}>
                명성 :{' '}
                <Typography {...typographyProps} fontSize={14} sx={{ color: 'black', display: 'inline-block' }}>
                  {data?.characterEntityDto?.adventureFame}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CharacterProfile;


const typographyProps = {
  component: 'span',
  fontWeight: '700',
};

const CharacterImgWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  background-image: url('/images/icon_char/bg_char.jpg');
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 230px;
  //이미지 왼쪽 정렬
  @media (max-width: 768px) {
    width: 150px;
    height: 180px;
  }
  @media (max-width: 425px) {
    width: 130px;
    height: 150px;
  }
`;

const refreshButtonStyle = {
  position: 'absolute' as 'absolute',
  top: '5px',
  right: '5px',
  color: 'black',
  '&:hover': {
    transform: 'rotate(360deg)',
    transition: 'transform 0.5s',
  },
};

