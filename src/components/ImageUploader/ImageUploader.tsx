import Box from '@mui/material/Box';
import { Avatar, Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useState } from 'react';
import putAvatar from '../../apis/myPage/putAvatar';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';

function ImageUploader(props: { handleClose: () => void }) {
  const { user } = useUserQuery();
  const [profile, setProfile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');
  useEffect(() => {
    if (user) {
      setProfileUrl(user.profileImgPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = () => {
    if (profile) {
      const formData = new FormData();
      formData.append('file', profile);
      putAvatar(formData)
        .then((res) => {
          window.alert('프로필 사진이 변경되었습니다.');
          props.handleClose();
        })
        .catch((err) => {
          window.alert('프로필 사진 변경에 실패하였습니다.');
          console.info(err);
        });
    }
  };
  const handleChange = (newValue: File | null) => {
    setProfile(newValue);
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
