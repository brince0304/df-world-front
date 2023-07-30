import { Content, ICharactersData } from '../interfaces/ICharactersData';
import { IRecentSearchedQuery } from '../storage/searchQueryLocalStorage';
import { ICharacterDetail } from '../interfaces/ICharacterDetail';

export const getFastSearchListsFromCharactersData = (data:ICharactersData) => {
  if(!data) return ([] as IRecentSearchedQuery[]);
  const list = [] as IRecentSearchedQuery[];
  const splicedData =  data.content.length > 5 ? data.content.slice(0,5) : data.content;
  splicedData.forEach((character) => {
    const item = getRecentSearchedQueryFromCharacter(character);
    list.push(item);
  }
  );
  return list;
}
export const getRecentSearchedQueryFromCharacter = (character: Content) => {
  const {characterName, serverName, serverId, level, characterId,jobGrowName} = character;
  const item = {
    characterName,
    characterServerName:serverName,
    characterJob:jobGrowName,
    characterLevel:level,
    characterId,
    characterServerId:serverId,
  } as IRecentSearchedQuery;

  return item;
}

export const getRecentSearchedQueryFromCharacterDetail = (character: ICharacterDetail) => {
  const {characterName, serverName, serverId, level, characterId,jobGrowName} = character.characterEntityDto;
  const item = {
    characterName,
    characterServerName:serverName,
    characterJob:jobGrowName,
    characterLevel:level,
    characterId,
    characterServerId:serverId,
  } as IRecentSearchedQuery;

  return item;
  }

export const getServerName = (serverId: string) => {
  switch (serverId) {
    case 'all':
      return '전체';
    case 'bakal':
      return '바칼';
    case 'hilder':
      return '힐더';
    case 'prey':
      return '프레이';
    case 'anton':
      return '안톤';
    case 'kasillas':
      return '카시야스';
    case 'adventure':
      return '모험단';
    case 'diregie':
      return '디레지에';
    case 'siroco':
      return '시로코';
    case 'cain':
      return '카인';
  }
};
export const serverList = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '모험단',
    value: 'adventure',
  },
  {
    label: '바칼',
    value: 'bakal',
  },
  {
    label: '카시야스',
    value: 'casillas',
  },
  {
    label: '힐더',
    value: 'hilder',
  },
  {
    label: '카인',
    value: 'cain',
  },
  {
    label: '디레지에',
    value: 'diregie',
  },
  {
    label: '프레이',
    value: 'prey',
  },
  {
    label: '시로코',
    value: 'siroco',
  },
  {
    label: '안톤',
    value: 'anton',
  },
];

export const getServerId = (serverName:string) => {
  switch(serverName) {
    case '바칼':
      return 'bakal';
    case '카인':
      return 'cain';
    case '디레지에':
      return 'diregie';
    case '힐더':
      return 'hilder';
    case '프레이':
      return 'prey';
    case '시로코':
      return 'siroco';
    case '안톤':
      return 'anton';
    case '카시야스':
      return 'casillas';
  }
}

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case '에픽':
      return '#FFB400';
    case '신화':
      return '#cc70db';
    case '유니크':
      return '#FF00FF';
    case '레어':
      return '#B36BFF';
    case '언커먼':
      return '#68D5ED';
    default:
      return 'gray';
  }
};

export const dontNeedList = [
  '물리 방어력',
  '마법 방어력',
  '내구도',
  '공격속도',
  '캐스트속도',
  '이동속도',
  '인벤토리 무게 한도',
  'HP MAX',
  'MP MAX',
  '적중률',
  '물리 크리티컬 히트',
  '마을 이동 속도 증가',
  '마법 크리티컬 히트',
  '체력',
  '모든 속성 저항',
  '히트리커버리',
  'MP 1분당 회복',
  'HP 1분당 회복',
  '모든 상태변화 내성',
];

export const rankingType=[
  {
    name: '모험가명성',
    id: 'adventureFame',
  },
  {
    name: '피해증가',
    id: 'damageIncrease',
  },
  {
    name: '버프력',
    id: 'buffPower',
  },
]