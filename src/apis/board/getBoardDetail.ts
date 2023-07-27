import createInstance from '../axiosClient';

export const getBoardDetail = async (url: string) => {
  return await createInstance.get(url);
};
