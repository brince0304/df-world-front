import { Paper, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

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

const CharacterImgWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  width: 200px;
  height: 230px;
  //이미지 왼쪽 정렬
`;

const CharacterDetailSkeleton = () => {
  return (
    <>
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
        <Box>
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
              <Skeleton variant="rounded" width={200} height={230} />
            </CharacterImgWrapper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: '10px',
                gap: '10px',
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
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={14} sx={{ color: 'gray' }}>
                  <Skeleton variant="rounded" animation={'wave'} width={50} height={20} />
                </Typography>
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={14} sx={{ color: 'gray' }}>
                  <Skeleton variant="rounded" animation={'wave'} width={70} height={20} />
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={25} sx={{ color: 'black' }}>
                  <Skeleton variant="rounded" animation={'wave'} width={100} height={30} />
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={14} sx={{ color: 'gray' }}>
                  <Skeleton variant="rounded" animation={'wave'} width={120} height={20} />
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={14} sx={{ color: 'gray' }}>
                  <Skeleton variant="text" animation={'wave'} width={80} height={20} />
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
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={10} sx={{ color: 'black' }}>
                  <Skeleton variant="text" animation={'wave'} width={130} />
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
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={10} sx={{ color: 'black' }}>
                  <Skeleton variant="text" animation={'wave'} width={150} />
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily={'Core Sans'} fontWeight={700} fontSize={14} sx={{ color: 'gray' }}>
                  <Skeleton variant="rounded" animation={'wave'} width={100} height={30} />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default CharacterDetailSkeleton;
