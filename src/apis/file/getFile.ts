import createInstance from '../axiosClient';

export default async function getFile(url: string) {
  return await createInstance.get(url);
}
