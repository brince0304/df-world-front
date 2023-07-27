import createInstance from '../axiosClient';

export const postCharacterToUserAccount = async (url: string) => {
  try {
    return await createInstance.post(url);
  } catch (e) {
    throw e;
  }
};
