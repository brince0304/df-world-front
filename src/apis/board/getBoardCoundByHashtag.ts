import createInstance from '../axiosClient';

export const getBoardCoundByHashtag = async (tag: string) => {
  return await createInstance.get(`/hashtags/${tag}`);
};
