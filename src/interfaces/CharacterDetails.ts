export interface Statu {
  name: string;
  value: string;
}

export interface Enchant {
  status: Statu[];
  reinforceSkill: any[];
}

export interface Total {
  damage: number;
  buff: number;
  level: number;
}

export interface Options {
  level: number;
  expRate: number;
  explain: string;
  explainDetail: string;
  damage: number;
  buff: number;
  transfer?: any;
}

export interface GrowInfo {
  total: Total;
  options: Options[];
  transfer?: any;
}

export interface UpgradeInfo {
  itemId: string;
  itemName: string;
}

export interface Equipment {
  slotId: string;
  slotName: string;
  itemId: string;
  itemName: string;
  itemType: string;
  itemTypeDetail: string;
  itemAvailableLevel: number;
  itemRarity: string;
  setItemId?: any;
  setItemName?: any;
  reinforce: number;
  itemGradeName: string;
  enchant: Enchant;
  amplificationName: string;
  refine: number;
  growInfo: GrowInfo;
  machineRevolutionInfo?: any;
  upgradeInfo: UpgradeInfo;
  ispinsInfo?: any;
}

export interface CharacterEquipment {
  characterId: string;
  characterName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  adventureName: string;
  guildId: string;
  guildName: string;
  equipment: Equipment[];
  setItemInfo: any[];
}

export interface Statu {
  name: string;
  value: string;
}

export interface CharacterAbility {
  createdAt?: any;
  modifiedAt?: any;
  characterId: string;
  characterName: string;
  serverId: string;
  serverName: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  adventureFame: number;
  adventureName: string;
  guildId: string;
  guildName: string;
  buffPower?: any;
  damageIncrease?: any;
  characterImgPath?: string;
  status: Statu[];
}

export interface ItemStatu {
  name: string;
  value: string;
}

export interface Options {
  level: number;
  expRate: number;
  explain: string;
  explainDetail: string;
  damage: number;
  buff: number;
}

export interface GrowInfo {
  total: Total;
  options: Options[];
}

export interface ItemBuff {
  explain: string;
  explainDetail: string;
  reinforceSkill: any[];
}

export interface CharacterEquipmentDetails {
  itemId: string;
  itemName: string;
  itemRarity: string;
  itemType: string;
  itemTypeDetail: string;
  itemAvailableLevel: number;
  itemObtainInfo: string;
  itemExplain: string;
  itemExplainDetail: string;
  itemFlavorText: string;
  setItemId?: any;
  setItemName?: any;
  itemStatus: ItemStatu[];
  growInfo: GrowInfo;
  itemBuff: ItemBuff;
  hashtag: any[];
}
export interface CharacterEntityDto {
  createdAt: any
  createdBy: any
  modifiedAt: any
  modifiedBy: any
  characterId: string
  characterName: string
  serverId: string
  level: number
  jobId: string
  jobGrowId: string
  jobName: string
  jobGrowName: string
  adventureFame: any
  adventureName: string
  guildId: string
  guildName: string
  buffPower: number
  damageIncrease: number
  characterImgPath: string
  serverName: string
}


export interface  CharacterDetails{
  characterPercentByJobName: string;
  lastUpdated: string;
  characterPercent: string;
  boardCount: number;
  characterCountByJobName: number;
  characterEquipment: CharacterEquipment;
  characterAbility: CharacterAbility;
  characterRankByJobName: number;
  characterCount: number;
  characterRank: number;
  characterEquipmentDetails: CharacterEquipmentDetails[];
  buffStatus: string[];
  characterEntityDto: CharacterEntityDto;
}