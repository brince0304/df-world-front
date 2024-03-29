import { useLocation } from 'react-router';
import React, { ReactNode, Suspense, SyntheticEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Divider, List, ListItemButton, Paper, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarsIcon from '@mui/icons-material/Stars';
import CharacterEquipmentModal from '../components/CharacterDetail/CharacterEquipmentModal';
import { BadRequest } from '../components/application/error/BadRequest';
import {
  CharacterDetailCharacterEquipmentDetails,
  CharacterDetailCharacterEquipmentEquipment,
  CharacterDetailCharacterEquipmentEquipmentBakalInfo,
  CharacterDetailCharacterEquipmentEquipmentGrowInfoOptions,
} from '../interfaces/ICharacterDetail';
import CharacterProfile from '../components/CharacterDetail/CharacterDetailProfile';
import { dontNeedList, getRarityColor } from '../utils/charactersUtil';
import CharacterDetailSkeleton from '../components/Skeleton/CharacterDetailSkeleton/CharacterDetailSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import useCharacterDetailQuery from '../hooks/characterHooks/queries/useCharacterDetailQuery';
import Loading from '../components/Fallbacks/Loading';
import MyContainer from '../components/application/MyContainer';

const CharacterDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get('characterId') as string;
  const serverId = searchParams.get('serverId') as string;
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <MyContainer>
      <ErrorBoundary fallback={<BadRequest />}>
        <Suspense fallback={<CharacterDetailSkeleton />}>
          <CharacterProfile characterId={characterId} serverId={serverId} />
        </Suspense>
      </ErrorBoundary>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative' as 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          padding: '10px',
          marginTop: '20px',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="character detail tab"
            variant="scrollable"
            scrollButtons
          >
            <Tab label="장비" sx={typographyProps} />
            <Tab label="스탯" sx={typographyProps} />
            <Tab label="버프 강화" sx={typographyProps} />
            <Tab label="아바타" sx={typographyProps} />
            <Tab label="스킬" sx={typographyProps} />
            <Tab label="gdgd" sx={typographyProps} />
            <Tab label="버프 강화" sx={typographyProps} />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '0px 0px',
          }}
        >
          <TabPanel index={0} value={selectedTab}>
            <Suspense fallback={<Loading />}>
              <CharacterEquipmentList characterId={characterId} serverId={serverId} />
            </Suspense>
          </TabPanel>
          <TabPanel index={1} value={selectedTab}></TabPanel>
        </Box>
      </Paper>
    </MyContainer>
  );
};

const typographyProps = {
  component: 'span',
  fontWeight: '700',
};

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {value === index && (
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const EquipmentGrowInfoDetail = (props: { data: CharacterDetailCharacterEquipmentEquipmentGrowInfoOptions[] }) => {
  return (
    <Box>
      <Typography fontSize={'12px'} color={'#4AA356'}>
        성장&변환 옵션
      </Typography>
      {props.data.map((growInfo, index) => {
        return (
          <Box key={index}>
            <Typography fontSize={'12px'} color={'#C1A437'}>
              {index + 1}옵션 - Lv{growInfo.level}
            </Typography>
            <Typography fontSize={'12px'} color={'#8F8356'}>
              피해증가 +{growInfo.damage} 버프력 +{growInfo.buff}
            </Typography>
            <Typography fontSize={'12px'} color={'#BAB290'} sx={{ whiteSpace: 'pre-wrap' }}>
              {growInfo.explainDetail}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const EquipmentBaklInfoDetail = (props: { data: CharacterDetailCharacterEquipmentEquipmentBakalInfo }) => {
  return (
    <Box>
      <Typography fontSize={'12px'} color={'#4AA356'}>
        바칼 융합 옵션
      </Typography>
      {props.data.options.map((bakalInfo, index) => {
        return (
          <Box key={index}>
            <Typography fontSize={'12px'} color={'#4AA356'}>
              {index + 1}옵션
            </Typography>
            <Typography fontSize={'12px'} color={'#BAB290'} sx={{ whiteSpace: 'pre-wrap' }}>
              {bakalInfo.explainDetail}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const TypeBadge = (props: { type: string }) => {
  return (
    <Box
      id={'type-badge'}
      sx={{
        display: 'flex',
        backgroundColor: '#252525',
        borderRadius: '5px',
        padding: '1px 0px',
        opacity: '0.8',
        fontSize: '8px',
        position: 'absolute',
        top: '0',
        left: '0',
        color: 'white',
      }}
    >
      {props.type}
    </Box>
  );
};

const CharacterEquipmentModalDetail = (props: {
  detail: CharacterDetailCharacterEquipmentDetails;
  equipment: CharacterDetailCharacterEquipmentEquipment;
}) => {
  const dividerStyle = { width: '100%', marginTop: '10px', marginBottom: '10px' };
  //증가 단어마다 줄바꿈
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
          }}
        >
          <Avatar
            alt={props.detail.itemName}
            variant={'rounded'}
            src={`https://img-api.neople.co.kr/df/items/${props.detail.itemId}`}
            sx={{ width: '40px', height: '40px' }}
          />
          {props.equipment.upgradeInfo && (
            <img
              alt={'시로코'}
              style={{ position: 'absolute', top: 0, left: 0, opacity: '0.7' }}
              src={apiUrl + 'images/icons/siroco.gif'}
              width={40}
              height={40}
            />
          )}
          {props.detail.itemRarity === '신화' && (
            <img
              alt={'신화'}
              style={{ position: 'absolute', top: 0, left: 0, opacity: '0.7' }}
              src={apiUrl + 'images/icons/ora_myth.png'}
              width={40}
              height={40}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            marginLeft: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: getRarityColor(props.detail.itemRarity),
              background:
                props.detail.itemRarity === '신화'
                  ? '-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255));'
                  : '',
              backgroundClip: props.detail.itemRarity === '신화' ? 'text' : '',
              textFillColor: props.detail.itemRarity === '신화' ? 'transparent' : '',
            }}
          >
            {props.equipment.reinforce ? '+' + props.equipment.reinforce : ''} {props.detail.itemName}
          </Typography>
          {props.equipment.upgradeInfo && (
            <Typography fontSize={'12px'} color={'#4c9d17'}>
              <FontAwesomeIcon
                icon={faLevelUpAlt}
                fontSize={'small'}
                style={{ transform: 'rotate(90deg)', paddingRight: '5px' }}
              />
              {props.equipment.upgradeInfo.itemName}
            </Typography>
          )}
        </Box>
      </Box>
      <Divider sx={dividerStyle} color={'gray'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography fontSize={'12px'} color={getRarityColor(props.detail.itemRarity)}>
          {props.equipment.itemGradeName}
        </Typography>
        <Typography fontSize={'12px'} color={getRarityColor(props.detail.itemRarity)}>
          {props.detail.itemRarity}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'right',
          width: '100%',
        }}
      >
        <Typography fontSize={'12px'} color={'#937739'}>
          레벨제한 {props.detail.itemAvailableLevel}
        </Typography>
        <Typography fontSize={'12px'} color={'#c1a437'}>
          {props.detail.itemTypeDetail}
        </Typography>
      </Box>
      <Divider sx={dividerStyle} color={'gray'} />
      <Box>
        {props.equipment.reinforce !== 0 && (
          <Typography fontSize={'12px'} color={getRarityColor('언커먼')}>
            +{props.equipment.reinforce} 강화
          </Typography>
        )}
      </Box>
      <Box>
        {props.detail.itemStatus &&
          props.detail.itemStatus.map((status, index) => {
            return (
              dontNeedList.filter((name: string) => name === status.name).length === 0 && (
                <Typography key={index} fontSize={'12px'} color={'#8F8356'}>
                  {status.name} {status.value}
                </Typography>
              )
            );
          })}
      </Box>
      {props.equipment.enchant && props.equipment.enchant.status !== null && (
        <Divider sx={dividerStyle} color={'gray'} />
      )}
      <Box>
        {props.equipment.enchant &&
          props.equipment.enchant.status !== null &&
          props.equipment.enchant.status.map((enchant, index) => {
            return (
              <Typography key={index} fontSize={'12px'} color={'#84F0A8'}>
                {enchant.name} +{enchant.value}
              </Typography>
            );
          })}
      </Box>
      {props.detail.itemExplainDetail && <Divider sx={dividerStyle} color={'gray'} />}
      <Box>
        <Typography fontSize={'12px'} sx={{ whiteSpace: 'pre-wrap' }} color={'#8F8356'}>
          {props.detail.itemExplainDetail}
        </Typography>
      </Box>
      {props.equipment.bakalInfo && <Divider sx={dividerStyle} color={'gray'} />}
      {props.equipment.bakalInfo && <EquipmentBaklInfoDetail data={props.equipment.bakalInfo} />}
      {props.equipment.growInfo && <Divider sx={dividerStyle} color={'gray'} />}
      {props.equipment.growInfo && <EquipmentGrowInfoDetail data={props.equipment.growInfo.options} />}
    </Box>
  );
};

const CharacterEquipmentDetail = (props: {
  equipment: CharacterDetailCharacterEquipmentEquipment;
  detail: CharacterDetailCharacterEquipmentDetails | undefined;
}) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const handleModalOpen = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsModalOpened(true);
  };
  const handleModalClose = () => {
    setIsModalOpened(false);
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  return (
    <Box>
      <CharacterEquipmentModal isOpened={isModalOpened} setIsOpened={handleModalClose}>
        {props.detail && <CharacterEquipmentModalDetail detail={props.detail} equipment={props.equipment} />}
      </CharacterEquipmentModal>
      <ListItemButton
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          padding: '10px',
          gap: '10px',
        }}
        onClick={handleModalOpen}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            width: '40px',
            height: '40px',
          }}
        >
          <Avatar
            alt={props.equipment.itemName}
            variant={'rounded'}
            src={`https://img-api.neople.co.kr/df/items/${props.equipment.itemId}`}
            sx={{ width: '40px', height: '40px' }}
          />
          <TypeBadge type={props.equipment.slotName} />
          {props.equipment.upgradeInfo && (
            <img
              style={{ position: 'absolute', top: 0, left: 0, opacity: '0.7' }}
              src={apiUrl + 'images/icons/siroco.gif'}
              width={40}
              height={40}
              alt={'시로코'}
            />
          )}
          {props.equipment.itemRarity === '신화' && (
            <img
              alt={'신화'}
              style={{ position: 'absolute', top: 0, left: 0, opacity: '0.7' }}
              src={apiUrl + 'images/icons/ora_myth.png'}
              width={40}
              height={40}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              //줄바꿈 되지 않도록
            }}
          >
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: getRarityColor(props.equipment.itemRarity),
                background:
                  props.equipment.itemRarity === '신화'
                    ? '-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255));'
                    : '',
                backgroundClip: props.equipment.itemRarity === '신화' ? 'text' : '',
                textFillColor: props.equipment.itemRarity === '신화' ? 'transparent' : '',
              }}
            >
              {props.equipment.itemName}
            </Typography>
            {props.equipment.reinforce !== 0 && (
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: props.equipment.amplificationName ? getRarityColor('유니크') : getRarityColor('언커먼'),
                }}
              >
                {' '}
                +{props.equipment.reinforce}
                {props.equipment.amplificationName ? '증폭' : '강화'}{' '}
                {props.equipment.refine !== 0 ? `(${props.equipment.refine})` : ''}
              </Typography>
            )}
          </Box>
          {props.equipment.upgradeInfo && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography fontSize={'12px'} color={'#4c9d17'}>
                <FontAwesomeIcon
                  icon={faLevelUpAlt}
                  fontSize={'small'}
                  style={{ transform: 'rotate(90deg)', marginRight: '5px' }}
                />
                {props.equipment.upgradeInfo.itemName}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '5px',
            }}
          >
            {props.equipment.enchant &&
              props.equipment.enchant.status !== null &&
              props.equipment.enchant.status.map((status, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: '11px',
                      display: 'flex',
                    }}
                  >
                    {status.name} +{status.value}
                  </Typography>
                );
              })}
          </Box>
          {props.equipment.growInfo && (
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#f5f5f5',
                padding: '1px 3px',
              }}
            >
              <StarsIcon
                sx={{
                  fontSize: '10px',
                  color: '#FFB400',
                }}
              />
              {props.equipment?.growInfo?.options?.map((option, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: '11px',
                      display: 'flex',
                    }}
                  >
                    {' '}
                    {option.level}
                    {index + 1 !== props.equipment.growInfo.options.length && ' ·'}
                  </Typography>
                );
              })}
              <Typography
                sx={{
                  fontSize: '11px',
                  display: 'flex',
                  fontWeight: 'bold',
                }}
              >
                {' '}
                ({props.equipment.growInfo?.total?.level})
              </Typography>
            </Box>
          )}
        </Box>
      </ListItemButton>
    </Box>
  );
};

const CharacterEquipmentList = ({ characterId, serverId }: { characterId: string; serverId: string }) => {
  const { data } = useCharacterDetailQuery(characterId, serverId);
  return (
    <List sx={{ width: '100%' }}>
      {data?.characterEquipment.equipment.map((equipment, index) => {
        return (
          <CharacterEquipmentDetail
            equipment={equipment}
            detail={data?.characterEquipmentDetails?.find((o) => {
              return o.itemId === equipment.itemId;
            })}
            key={index}
          />
        );
      })}
    </List>
  );
};

export default CharacterDetail;
