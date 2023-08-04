import '../../../../assets/css/rankingTable.scss';
import React, { useEffect, useState } from 'react';
import { RankingCharacterImg } from '../../../../components/application/character/RankingCharacterImg';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import { useNavigate } from 'react-router-dom';
import { faChevronRight, faExclamationTriangle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorScreen } from '../../../../components/ErrorScreen/ErrorScreen';
import IconButton from '@mui/material/IconButton';
import axiosClient from '../../../../apis/customAxios';
import { rankingType } from '../../../../utils/charactersUtil';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const TableData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0;
  font-size: 16px;
  color: #000;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  position: relative;
  padding: 0px 30px 0px 30px;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    //랭킹 아이콘 빼고 hover 시 이펙트
    img {
      transform: translateY(-3px);
      opacity: 1;
      transition: all 0.7s ease;
    }

    #rankIcon {
      transform: scale(1);
    }

    p {
      opacity: 1;
      transition: all 0.7s ease;
      background-color: transparent;
      color: white;
    }

    span {
      color: black;
      transition: all 0.7s ease;
    }
  }
`;

const RankingDetailValue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const RankingDetailValueStyled = styled.span`
  font-size: 15px;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 15px;
  }
`;

const RankingValue = (props: { type: string; value: number }) => {
  return (
    <RankingDetailValue>
      {props.type === 'adventureFame' && (
        <img
          id="rankIcon"
          src={require('../../../../assets/img/rankingtable/icon_status_fame.png')}
          alt="icon"
          style={{ width: '15px', height: '15px' }}
        />
      )}
      {props.type === 'damageIncrease' && (
        <img
          id="rankIcon"
          src={require('../../../../assets/img/rankingtable/damage_increase.png')}
          alt="icon"
          style={{ width: '18px', height: '18px' }}
        />
      )}
      {props.type === 'buffPower' && (
        <img
          id="rankIcon"
          src={require('../../../../assets/img/rankingtable/buff_power.png')}
          alt="icon"
          style={{ width: '18px', height: '18px' }}
        />
      )}
      <RankingDetailValueStyled style={{ marginLeft: '5px' }}>{props.value}</RankingDetailValueStyled>
    </RankingDetailValue>
  );
};

const RankingDetailText = styled.span`
  color: grey;
  font-size: 14px;
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const RankingDetailNameText = styled.span`
  font-size: 16px;
  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;

interface RankingTableProps {
  title: string;
  url: string;
}

interface RankingTableData {
  modifiedAt: string;
  characterId: string;
  characterName: string;

  serverId: string;

  serverName: string;

  jobName: string;

  jobGrowName: string;

  adventureFame: number;
  adventureName: string;

  imgStyleClassName: string;

  damageIncrease: number;

  buffPower: number;
  characterImgUrl: string;
}

// TODO : props 내리지 말고 리액트쿼리로 데이터 받아오기
const RankingTableRow = (props: { data: RankingTableData[]; type: string }) => {
  let navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset;
    navigate(`/details?serverId=${id.server}&characterId=${id.id}`);
  };
  return (
    <>
      {props.data.length > 0 &&
        props.data.map((item, index: number) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
            <TableRow
              key={index}
              id={item.characterId}
              onClick={onClick}
              data-id={item.characterId}
              data-server={item.serverId}
            >
              <p
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#121212',
                  color: 'white',
                  fontSize: '12px',
                }}
              >
                {index + 1}
              </p>
              <div style={{ width: '23%', height: '100%' }}>
                <RankingCharacterImg serverId={item.serverId} characterId={item.characterId} />
              </div>
              <div>
                <TableData>
                  <RankingDetailNameText>{item.characterName}</RankingDetailNameText>
                  <RankingDetailText>{item.adventureName}</RankingDetailText>
                  <RankingDetailText>{item.serverName}</RankingDetailText>
                </TableData>
              </div>
              <div>
                <TableData>
                  <RankingValue type={props.type} value={item.adventureFame} />
                </TableData>
              </div>
            </TableRow>
          </Grid>
        ))}
    </>
  );
};

function CharacterRanking(props: RankingTableProps) {
  const [isSelected, setIsSelected] = useState('adventureFame');
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<RankingTableData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axiosClient.get(props.url + isSelected);
        setData(result.data.content);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  return (
    <CustomTable
      title={props.title}
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
        {data.length > 0 && !isError && <RankingTableRow type={isSelected} data={data} />}

        {data.length === 0 && !isError && <ErrorScreen icon={faXmark} message={'데이터가 없습니다.'} />}
        {isError && <ErrorScreen icon={faExclamationTriangle} message={'데이터를 불러오는데 실패했습니다.'} />}
      </Grid>
    </CustomTable>
  );
}

export default CharacterRanking;
