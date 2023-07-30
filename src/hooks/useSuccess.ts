import { enqueueSnackbar } from 'notistack';

const useSuccess = () => {
  const autoHideDuration = 1000;
  const handleSuccess = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration,
    });
  }

  return {
    handleSuccess
  }
}

export default useSuccess;