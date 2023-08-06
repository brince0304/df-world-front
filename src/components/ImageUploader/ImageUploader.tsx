import Box from '@mui/material/Box';
import { Avatar, Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useRef, useState } from 'react';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import useChangeProfileIconMutation from '../../hooks/myPageHooks/mutations/useChangeProfileIconMutationByFile';

function ImageUploader(props: { handleClose: () => void }) {
  const { user } = useUserQuery();
  const [profile, setProfile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const formData = useRef<FormData | null>(new FormData());
  useEffect(() => {
    if (user) {
      setProfileUrl(user.profileImgPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeProfileIcon = useChangeProfileIconMutation();
  const handleUpload = () => {
    if (profile) {
      formData.current?.append('file', profile);
      console.info(formData);
      if (formData.current) {
        changeProfileIcon(formData.current);
        props.handleClose();
      }
    }
  };
  const handleChange = (newValue: File | null) => {
    setProfile(newValue);
    console.info(newValue);
    if (!newValue) {
      setProfileUrl(user?.profileImgPath || '');
    } else {
      setProfileUrl(URL.createObjectURL(newValue));
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        padding: 2,
      }}
    >
      <Avatar src={profileUrl} sx={{ width: 50, height: 50, position: 'relative' }} />
      <MuiFileInput
        value={profile}
        onChange={handleChange}
        inputProps={{
          accept: 'image/*',
          id: 'icon-button-file',
        }}
      />
      <Button variant="contained" onClick={handleUpload}>
        변경
      </Button>
    </Box>
  );
}

export default ImageUploader;
