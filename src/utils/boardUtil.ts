export const boardSearchTypes = [
  {
    label: '제목',
    value: 'title',
  },
  {
    label: '내용',
    value: 'content',
  },
  {
    label: '제목+내용',
    value: 'title_content',
  },
  {
    label: '닉네임',
    value: 'nickname',
  },
  {
    label: '해시태그',
    value: 'hashtag',
  },
  {
    label: '캐릭터',
    value: 'character',
  },
];

export function getBoardType(p: string | undefined) {
  switch (p) {
    case 'FREE':
      return '자유게시판';
    case 'NOTICE':
      return '공지사항';
    case 'MARKET':
      return '거래';
    case 'QUESTION':
      return '질문/답변';
    case 'REPORT':
      return '사건/사고';
    case 'RECRUITMENT':
      return '구인/홍보';
    case 'ALL':
      return '전체';
    default:
      return '전체';
  }
}

export const getSearchType = (value: string) => {
  switch (value) {
    case 'title':
      return '제목';
    case 'content':
      return '내용';
    case 'title_content':
      return '제목+내용';
    case 'nickname':
      return '닉네임';
    case 'hashtag':
      return '해시태그';
    case 'character':
      return '캐릭터';
    default:
      return '제목';
  }
};

export const boardCategories = [
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
];
