import MyTable from '../../MyTable/MyTable';
import React, { Suspense, useState } from 'react';
import { adventureRankingType } from '../../../utils/charactersUtil';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
import Loading from '../../Fallbacks/Loading';
import MainAdventureRankingList from './MainAdventureRankingList';

const MainAdventureRanking = () => {
  const [searchType, setSearchType] = useState('adventureFame');
  return (
    <MyTable
      title={'모험단 랭킹'}
      isSelected={searchType}
      setIsSelected={setSearchType}
      menus={adventureRankingType}
      useMenu={true}
      useIcon={true}
      icon={
        <IconButton>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </IconButton>
      }
    >
      <Grid container>
        <Suspense fallback={<Loading />}>
          <MainAdventureRankingList type={searchType} />
        </Suspense>
      </Grid>
    </MyTable>
  )
}

export default MainAdventureRanking