import { useLocation, useParams } from 'react-router';
import React, { Suspense } from 'react';
import CharacterList from '../components/CharacterList/CharacterList';
import { getServerName } from '../utils/charactersUtil';
import styled from '@emotion/styled';
import CharacterListSkeleton from '../components/Skeleton/CharacterListSkeleton/CharacterListSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../components/Fallbacks/Error';
import MyContainer from 'components/application/MyContainer';

const Characters = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterName = searchParams.get('name') || '';
  const { serverId } = useParams();
  return (
    <MyContainer>
      <ResultTitleWrapper>
        <ResultServerNameWrapper>{getServerName(serverId ? serverId : '')}</ResultServerNameWrapper>
        <ResultCharacterNameWrapper>{characterName ? characterName : ''}</ResultCharacterNameWrapper>
        <ResultTitleFooterWrapper>님의 검색결과</ResultTitleFooterWrapper>
      </ResultTitleWrapper>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<CharacterListSkeleton />}>
          <CharacterList characterName={characterName} serverId={serverId ? serverId : ''} />
        </Suspense>
      </ErrorBoundary>
    </MyContainer>
  );
};

const ResultTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: 1.4rem;
  font-weight: 600;
  color: #000;
  text-align: center;
  padding: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  grid-column: 1 / 5;
  margin-top: 20px;
  @media (max-width: 768px) {
    grid-column: 1 / 3;
  }
  @media (max-width: 425px) {
    grid-column: 1 / 3;
  }
  @media (max-width: 320px) {
    grid-column: 1 / 3;
  }
`;

const ResultServerNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ca955c;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
`;

const ResultCharacterNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #282c34;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
`;

const ResultTitleFooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ca955c;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
`;
export default Characters;
