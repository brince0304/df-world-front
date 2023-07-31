import useSuccess from '../uiHooks/useSuccess';

const useMyPageSuccess = () => {
  const { handleSuccess } = useSuccess();

  const handleAddCharacterSuccess = () => {
    handleSuccess('캐릭터가 성공적으로 추가되었습니다. 🥳');
  };

  const handleDeleteCharacterSuccess = () => {
    handleSuccess('캐릭터가 성공적으로 삭제되었습니다. 🥳');
  };

  return {
    handleAddCharacterSuccess,
    handleDeleteCharacterSuccess,
  };
};

export default useMyPageSuccess;
