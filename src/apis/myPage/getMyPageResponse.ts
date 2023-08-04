import { IMyPageResponse } from '../../interfaces/IMyPageResponse';
import createInstance from '../customAxios';

export default async function getMyPageResponse() {
  return await createInstance.get<IMyPageResponse>('/users/');
}
