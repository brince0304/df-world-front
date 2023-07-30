import { IMyPageResponse } from '../../interfaces/IMyPageResponse';
import createInstance from '../axiosClient';

export default async function getMyPageResponse() {
  return await createInstance.get<IMyPageResponse>('/users/');
}
