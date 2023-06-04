import { AxiosResponse } from "axios";
import createInstance from "../index";
import {USER_CHARACTERS_DELETE_URL} from "../data/urls";

export default async function deleteCharacterFromUserAccount(characterId: string, serverId: string)  {
  return await createInstance.delete(`${USER_CHARACTERS_DELETE_URL}`.replace("{characterId}",characterId).replace("{serverId}",serverId));
}