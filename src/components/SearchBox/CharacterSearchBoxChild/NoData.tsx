import * as S from './CharacterSearchBoxChild.style';
import React from 'react';

const NoData = (props: { content: string }) => {
  return (
    <S.OptionRow>
      <S.NoDataWrapper>검색 기록이 없습니다.</S.NoDataWrapper>
    </S.OptionRow>
  );
};

export default NoData;
