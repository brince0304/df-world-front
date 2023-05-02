import { AxiosResponse } from "axios";
import axiosInstance from "../../common/axiosInstance";
import {USER_CHARACTERS_DELETE_URL} from "../../data/ApiUrl";

export default async function deleteCharacterFromUserAccount(characterId: string, serverId: string)  {
  return await axiosInstance().delete(`${USER_CHARACTERS_DELETE_URL}`.replace("{characterId}",characterId).replace("{serverId}",serverId));
}