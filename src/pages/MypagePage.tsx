import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useUserQuery } from '../hooks/authHooks/queries/useUserQuery';
import { Suspense } from 'react';
import Loading from '../components/Fallbacks/Loading';
import UserProfileCard from '../components/MyPage/UserProfileCard';
import UserCharactersList from '../components/UserCharacterList/UserCharacterList';

const MyPage = () => {
  const { user } = useUserQuery();
  return (
    <Suspense fallback={<Loading />}>
      <Container maxWidth={'md'}>
        {user && (
          <Box>
            <UserProfileCard refresh={() => {}} />
            <Box sx={{ marginTop: '20px' }}>
              <Typography
                component={'h1'}
                color={'#565360'}
                fontSize={'1.5rem'}
                fontWeight={'bold'}
                sx={{
                  textAlign: 'left',
                  marginBottom: '10px',
                }}
              >
                내 캐릭터{' '}
              </Typography>
              <UserCharactersList />
            </Box>
          </Box>
        )}
      </Container>
    </Suspense>
  );
};

export default MyPage;
