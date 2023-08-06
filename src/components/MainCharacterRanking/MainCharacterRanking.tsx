import '../../assets/css/rankingTable.scss';
import React, { Suspense, useState } from 'react';
import MyTable from '../MyTable/MyTable';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import { rankingType } from '../../utils/charactersUtil';
import { Grid } from '@mui/material';
import Loading from '../Fallbacks/Loading';
import MainCharacterRankingList from './MainCharacterRankingList';

function CharacterRanking() {
  const [isSelected, setIsSelected] = useState('adventureFame')
  return (
    <MyTable
      title={'캐릭터 랭킹'}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      menus={rankingType}
      useMenu={true}
      useIcon={true}
      icon={
        <IconButton>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </IconButton>
      }
    >
      <Grid container>
        <Suspense fallback={<Loading/>}>
        <MainCharacterRankingList type={isSelected} />
        </Suspense>
      </Grid>
    </MyTable>
  );
}

export default CharacterRanking;
