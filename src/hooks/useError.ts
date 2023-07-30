import { enqueueSnackbar } from 'notistack';

const useError = () => {
  const autoHideDuration = 1500;
   const handleError = (message:string) => {
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration,
    });
   }

   return {
      handleError
   }
}

export default useError;