export type IMainAdventureRankingResponse = MainAdventureFameResponseChild[];
export interface MainAdventureFameResponseChildCharacters {
  characterId: string;
  characterName: string;
  serverId: string;
  characterImageUrl: string;
  imgStyleClassName: string;
  jobName: string;
  adventureName: string;
  adventureFame: number;
}
export interface MainAdventureFameResponseChild {
  adventureName: string;
  serverId: string;
  adventureFame: number;
  adventureDamageIncreaseAndBuffPower: number;
  serverName: string;
  characterCount: number;
  representCharacterName?: string;
  characters: MainAdventureFameResponseChildCharacters[];
}
