import useError from 'hooks/uiHooks/useError';

const useMyPageError = () => {
  const { handleError } = useError();
  const handleUpdateError = () => {
    handleError('회원정보 수정에 실패했습니다. 😭');
  };

  const handleAddCharacterError = () => {
    handleError('캐릭터 추가에 실패했습니다. 😭');
  };

  const handleDeleteCharacterError = () => {
    handleError('캐릭터 삭제에 실패했습니다. 😭');
  };

  const handleChangeAvatarError = () => {
    handleError('프로필 이미지 변경에 실패했습니다. 😭');
  };

  return {
    handleUpdateError,
    handleAddCharacterError,
    handleDeleteCharacterError,
    handleChangeAvatarError,
  };
};

export default useMyPageError;
