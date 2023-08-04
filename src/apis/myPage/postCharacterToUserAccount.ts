import createInstance from '../customAxios';

export const postCharacterToUserAccount = async (url: string) => {
  // eslint-disable-next-line
  try {
    return await createInstance.post(url);
  } catch (e) {
    throw e;
  }
};
