import { enqueueSnackbar } from 'notistack';

const useSuccess = () => {
  const autoHideDuration = 3000;
  const handleSuccess = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration,
    });
  };

  return {
    handleSuccess,
  };
};

export default useSuccess;
