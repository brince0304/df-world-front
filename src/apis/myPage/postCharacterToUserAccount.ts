import createInstance from '../axiosClient';

export const postCharacterToUserAccount = async (url: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await createInstance.post(url);
  } catch (e) {
    throw e;
  }
};
