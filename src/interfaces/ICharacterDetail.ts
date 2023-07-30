export interface ICharacterDetail {
  characterPercent: string;
  boardCount: number;
  characterCountByJobName: number;
  characterEntityDto: CharacterDetailCharacterEntityDto;
  characterEquipment: CharacterDetailCharacterEquipment;
  characterAbility: CharacterDetailCharacterAbility;
  characterEquipmentDetails: CharacterDetailCharacterEquipmentDetails[];
  buffStatus: string[];
  characterPercentByJobName: string;
  lastUpdated: string;
  characterRankByJobName: number;
  characterCount: number;
  characterRank: number;
}
export interface CharacterDetailCharacterEntityDto {
  createdAt?: any;
  createdBy?: any;
  modifiedAt?: any;
  modifiedBy?: any;
  characterId: string;
  characterName: string;
  serverId: string;
  level: number;
  jobId: string;
  jobGrowId: string;
  jobName: string;
  jobGrowName: string;
  adventureFame?: any;
  adventureName: string;
  guildId: string;
  guildName: string;
  buffPower: number;
  damageIncrease: number;
  characterImgPath: string;
  serverName: string;
}
export interface CharacterDetailCharacterEquipmentEquipmentEnchantStatus {
  name: string;
  value: string;
}
export interface CharacterDetailCharacterEquipmentEquipmentEnchant {
  status: CharacterDetailCharacterEquipmentEquipmentEnchantStatus[];
  explain?: any;
}
export interface CharacterDetailCharacterEquipmentEquipmentBakalInfoOptions {
  buff: number;
  explain: string;
  explainDetail: string;
}
export interface CharacterDetailCharacterEquipmentEquipmentBakalInfo {
  options: CharacterDetailCharacterEquipmentEquipmentBakalInfoOptions[];
}
export interface CharacterDetailCharacterEquipmentEquipmentUpgradeInfo {
  itemId: string;
  itemName: string;
}
export interface CharacterDetailCharacterEquipmentEquipmentGrowInfoTotal {
  damage: number;
  buff: number;
  level: number;
}
export interface CharacterDetailCharacterEquipmentEquipmentGrowInfoOptionsDefault {
  damage: number;
  buff: number;
}
export interface CharacterDetailCharacterEquipmentEquipmentGrowInfoOptions {
  level: number;
  expRate: number;
  explain: string;
  explainDetail: string;
  damage: number;
  buff: number;
  transfer?: any;
  default: CharacterDetailCharacterEquipmentEquipmentGrowInfoOptionsDefault;
}
export interface CharacterDetailCharacterEquipmentEquipmentGrowInfo {
  total: CharacterDetailCharacterEquipmentEquipmentGrowInfoTotal;
  options: CharacterDetailCharacterEquipmentEquipmentGrowInfoOptions[];
  transfer?: any;
}
export interface CharacterDetailCharacterEquipmentEquipment {
  slotId: string;
  slotName: string;
  itemId: string;
  itemName: string;
  itemTypeId: string;
  itemType: string;
  itemTypeDetailId: string;
  itemTypeDetail: string;
  itemAvailableLevel: number;
  itemRarity: string;
  setItemId?: any;
  setItemName?: any;
  reinforce: number;
  itemGradeName: string;
  enchant: CharacterDetailCharacterEquipmentEquipmentEnchant;
  amplificationName?: any;
  refine: number;
  bakalInfo: CharacterDetailCharacterEquipmentEquipmentBakalInfo;
  upgradeInfo: CharacterDetailCharacterEquipmentEquipmentUpgradeInfo;
  growInfo: CharacterDetailCharacterEquipmentEquipmentGrowInfo;
  engraveName: boolean;
  machineRevolutionInfo?: any;
  ispinsInfo?: any;
  dimensionCloisterInfo?: any;
}
export interface CharacterDetailCharacterEquipment {
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
  equipment: CharacterDetailCharacterEquipmentEquipment[];
  setItemInfo: any[];
}
export interface CharacterDetailCharacterAbilityStatus {
  name: string;
  value: string;
}
export interface CharacterDetailCharacterAbility {
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
  characterImgPath?: any;
  status: CharacterDetailCharacterAbilityStatus[];
}
export interface CharacterDetailCharacterEquipmentDetailsItemStatus {
  name: string;
  value: string;
}
export interface CharacterDetailCharacterEquipmentDetailsGrowInfoTotal {
  damage: number;
  buff: number;
  level: number;
}
export interface CharacterDetailCharacterEquipmentDetailsGrowInfoOptions {
  level: number;
  expRate: number;
  explain: string;
  explainDetail: string;
  damage: number;
  buff: number;
}
export interface CharacterDetailCharacterEquipmentDetailsGrowInfo {
  total: CharacterDetailCharacterEquipmentDetailsGrowInfoTotal;
  options: CharacterDetailCharacterEquipmentDetailsGrowInfoOptions[];
}
export interface CharacterDetailCharacterEquipmentDetails {
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
  itemStatus: CharacterDetailCharacterEquipmentDetailsItemStatus[];
  growInfo: CharacterDetailCharacterEquipmentDetailsGrowInfo;
  itemBuff?: any;
  hashtag: string[];
}
