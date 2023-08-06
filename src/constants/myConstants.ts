import KakaoCircleButtonImg from 'assets/img/kakao_login_circle.png.webp';
import KakaoSquareButtonImg from 'assets/img/kakao_login.png';

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
  boardComments: 'boardComments',
  boardCommentCount: 'boardCommentCount',
  isBoardCommentLiked: 'isBoardCommentLiked',
  boardCommentChildrenCount: 'boardCommentChildrenCount',
  boardCommentLikeCount: 'boardCommentLikeCount',
  childrenComments: 'childrenComments',
};

export const imageData = [
  {
    label: 'Image 1',
    alt: 'image1',
    url: 'https://bbscdn.df.nexon.com/data6/commu/202307/121742_64c090567f47d.jpg',
  },

  {
    label: 'Image 2',
    alt: 'image2',
    url: 'https://bbscdn.df.nexon.com/data6/commu/202307/214025_64be71394c077.jpg',
  },

  {
    label: 'Image 3',
    alt: 'image3',
    url: 'https://bbscdn.df.nexon.com/data6/commu/202307/213828_64be70c47cb30.jpg',
  },

  {
    label: 'Image 4',
    alt: 'image4',
    url: 'https://bbscdn.df.nexon.com/data6/commu/202306/172803_649a9d93bb07d.jpg',
  },

  {
    label: 'Image 5',
    alt: 'image5',
    url: 'https://bbscdn.df.nexon.com/data6/commu/202307/182425_64abce49c2c6a.jpg',
  },
];

export const headerMenu = [
  {
    name: '랭킹',
    link: '/ranking',
  },
  {
    name: '게시판',
    link: '/boards',
  },
];

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
      src: KakaoSquareButtonImg,
      type: 'KAKAO',
      alt: 'kakao',
    },
  ],
  circleButtons: [
    {
      src: KakaoCircleButtonImg,
      type: 'KAKAO',
      alt: 'kakao',
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
