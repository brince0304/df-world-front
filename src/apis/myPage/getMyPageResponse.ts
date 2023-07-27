import { MyPageResponse } from '../../interfaces/MyPageResponse';
import createInstance from '../axiosClient';

export default async function getMyPageResponse() {
  return await createInstance.get<MyPageResponse>('/users/');
}
