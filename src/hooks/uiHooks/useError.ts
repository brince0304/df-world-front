import { enqueueSnackbar } from 'notistack';

const useError = () => {
  const autoHideDuration = 3000;
  const handleError = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration,
    });
  };

  return {
    handleError,
  };
};

export default useError;
