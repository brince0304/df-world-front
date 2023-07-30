export const QUERY_KEY = {
  user: 'user',
  mypage: 'mypage',
  characters: 'characters',
  fastSearchCharacters: 'fastSearchCharacters',
  characterDetail: 'characterDetail',
  boards: 'boards',
  boardDetail: 'boardDetail',
  bestBoardList: 'bestBoardList',
  boardCountByHashtag: 'boardCountByHashtag',
  isBoardLiked: 'isBoardLiked',
  boardLikeCount: 'boardLikeCount',
  latestBoardList: 'latestBoardList',
};

export const headerMenu= [
  {
    name: '랭킹',
    link: '/ranking',
  },
  {
    name: '게시판',
    link: '/boards',
  }
]

export const profileIcons = [
  {
    name: 'icon_char_0.png',
    url: '/users?profileIcon=icon_char_0.png',
  },
  {
    name: 'icon_char_1.png',
    url: '/users?profileIcon=icon_char_1.png',
  },
  {
    name: 'icon_char_2.png',
    url: '/users?profileIcon=icon_char_2.png',
  },
  {
    name: 'icon_char_3.png',
    url: '/users?profileIcon=icon_char_3.png',
  },
  {
    name: 'icon_char_4.png',
    url: '/users?profileIcon=icon_char_4.png',
  },
  {
    name: 'icon_char_5.png',
    url: '/users?profileIcon=icon_char_5.png',
  },
  {
    name: 'icon_char_6.png',
    url: '/users?profileIcon=icon_char_6.png',
  },
  {
    name: 'icon_char_7.png',
    url: '/users?profileIcon=icon_char_7.png',
  },
  {
    name: 'icon_char_8.png',
    url: '/users?profileIcon=icon_char_8.png',
  },
  {
    name: 'icon_char_9.png',
    url: '/users?profileIcon=icon_char_9.png',
  },
  {
    name: 'icon_char_10.png',
    url: '/users?profileIcon=icon_char_10.png',
  },
  {
    name: 'icon_char_11.png',
    url: '/users?profileIcon=icon_char_11.png',
  },
  {
    name: 'icon_char_12.png',
    url: '/users?profileIcon=icon_char_12.png',
  },
  {
    name: 'icon_char_13.png',
    url: '/users?profileIcon=icon_char_13.png',
  },
  {
    name: 'icon_char_14.png',
    url: '/users?profileIcon=icon_char_14.png',
  },
  {
    name: 'icon_char_15.png',
    url: '/users?profileIcon=icon_char_15.png',
  },
];

export const socialLoginTypes = {
  squareButtons: [
    {
      src: 'kakao_login.png',
      type: 'kakao',
      alt: 'kakao',
    },
    {
      src: 'google_login.png',
      type: 'google',
      alt: 'google',
    },
    {
      src: 'naver_login.png',
      type: 'naver',
      alt: 'naver',
    },
  ],
  circleButtons: [
    {
      src: 'kakao_login_circle.png.webp',
      type: 'kakao',
      alt: 'kakao',
    },
    {
      src: 'google_login_circle.png',
      type: 'google',
      alt: 'google',
    },
    {
      src: 'naver_login_circle.png',
      type: 'naver',
      alt: 'naver',
    },
  ],
};

export const boardCategory = [
  {
    name: '자유',
    id: 'FREE',
  },
  {
    name: '구인',
    id: 'RECRUITMENT',
  },
  {
    name: '거래',
    id: 'MARKET',
  },
  {
    name: '질문/답변',
    id: 'QUESTION',
  },
  {
    name: '사건/사고',
    id: 'REPORT',
  },
  {
    name: '공지',
    id: 'NOTICE',
  },
];
export const boardToolbarItems = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr'],
  ['ul', 'ol', 'task'],
  ['table', 'link'],
  ['image'],
  ['code'],
  ['scrollSync'],
];