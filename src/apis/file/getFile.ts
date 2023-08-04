import createInstance from '../customAxios';

export default async function getFile(url: string) {
  return await createInstance.get(url);
}
