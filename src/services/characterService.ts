import { ICharactersData } from '../interfaces/ICharactersData';
import { IAxiosClient } from '../axiosClient/axiosClient';
import { ICharacterDetail } from '../interfaces/ICharacterDetail';

export interface ICharacterService {
  getCharacterList(data: { characterName: string; serverId: string; page: number }): Promise<ICharactersData>;
  getCharacterDetail(data: { characterId: string; serverId: string }): Promise<ICharacterDetail>;
  getMainCharacterRanking(data: { searchType: string }): Promise<ICharactersData>;
}

export default class CharacterService implements ICharacterService {
  private axiosClient: IAxiosClient;
  private readonly getCharacterListUrl = '/characters/?characterName={characterName}&serverId={serverId}&page={page}';
  private readonly getCharacterDetailUrl = '/characters/detail?characterId={characterId}&serverId={serverId}';
  private readonly getMainCharacterRankingUrl = '/characters/mainRank?searchType={searchType}';
  constructor(axiosClient: IAxiosClient) {
    this.axiosClient = axiosClient;
  }

  getCharacterList(data: { characterName: string; serverId: string; page: number }) {
    const url = this.getCharacterListUrl
      .replace('{characterName}', data.characterName)
      .replace('{serverId}', data.serverId)
      .replace('{page}', String(data.page));
    return this.axiosClient.get(url);
  }

  getCharacterDetail(data: { characterId: string; serverId: string }) {
    const url = this.getCharacterDetailUrl
      .replace('{characterId}', data.characterId)
      .replace('{serverId}', data.serverId);
    return this.axiosClient.get(url);
  }

  getMainCharacterRanking(data: { searchType: string }) {
    const url = this.getMainCharacterRankingUrl
      .replace('{searchType}', data.searchType);
    return this.axiosClient.get(url);
  }
}
