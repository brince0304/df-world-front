import createInstance from '../axiosClient';

export const getBoardList = async (url: string) => {
  return await createInstance.get(url);
};
