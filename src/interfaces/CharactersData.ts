export interface Content {

  characterImgPath: string;
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
  adventureFame: number;
  adventureName?: any;
  guildId?: any;
  guildName?: any;
  buffPower: number;
  damageIncrease: number;
  serverName: string;
}

export interface Sor {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {

  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface CharactersData {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

