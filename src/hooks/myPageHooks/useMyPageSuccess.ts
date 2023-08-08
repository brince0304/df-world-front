import useSuccess from '../uiHooks/useSuccess';

const useMyPageSuccess = () => {
  const { handleSuccess } = useSuccess();

  const handleAddCharacterSuccess = () => {
    handleSuccess('캐릭터가 성공적으로 추가되었습니다. 🥳');
  };

  const handleDeleteCharacterSuccess = () => {
    handleSuccess('캐릭터가 성공적으로 삭제되었습니다. 🥳');
  };
  const handleChangeAvatarSuccess = () => {
    handleSuccess('프로필 이미지가 성공적으로 변경되었습니다. 🥳');
  };

  const handleChangeUserNicknameSuccess = () => {
    handleSuccess('닉네임이 성공적으로 변경되었습니다. 🥳');
  }

  const handleChangeUserPasswordSuccess = () => {
    handleSuccess('비밀번호가 성공적으로 변경되었습니다. 🥳' +
      '다시 로그인해주세요.');
  }


  return {
    handleAddCharacterSuccess,
    handleDeleteCharacterSuccess,
    handleChangeAvatarSuccess,
    handleChangeUserNicknameSuccess,
    handleChangeUserPasswordSuccess,
  };
};

export default useMyPageSuccess;
