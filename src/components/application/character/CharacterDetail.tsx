import {useLocation, useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {getCharacterDetail} from "../../../api/character/getCharacterDetail";
import {
    CharacterDetails,
    CharacterEquipment,
    CharacterEquipmentDetails,
    Equipment
} from "../../../interfaces/CharacterDetails";
import store, {RootState, useAppDispatch} from "../../../redux/store";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight, faSkullCrossbones} from "@fortawesome/free-solid-svg-icons";
import {ErrorScreen} from "../ui/ErrorScreen";
import {Avatar, Button, Container, IconButton, Paper, Tab, Tabs, Tooltip} from "@mui/material";
import {CHARACTER_DETAIL_URL} from "../../../data/ApiUrl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {faHandFist} from "@fortawesome/free-solid-svg-icons";
import {CharacterDetailSkeleton} from "../loading/CharacterDetailSkeleton";
import {useSelector} from "react-redux";

const CharacterImgWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  background-image: url("/images/icon_char/bg_char.jpg");
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 230px;
  //이미지 왼쪽 정렬
`;

const CharacterDetailsContainer = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  border-radius: 10px;
  color: black;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 0;
`;

const CharacterTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  color: #000;
`;

const CharacterServerNameJobNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 15px;
`;

const ServerNameBadgeWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 1px 4px;
  margin-right: 10px;
`;

const AdventureNameGuildNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-size: 15px;
`;

const AdventureNameGuildNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: gray;
`;

const CharacterRankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-size: 15px;
  gap: 1px;
`;

const CharacterRankingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffc107;
  border-radius: 10px;
  font-weight: bold;
  color: black;
  padding: 0px 3px;
  font-size: 10px;
`;

const CharacterRankingCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

//mui style
const refreshButtonStyle = {
    position: "absolute" as "absolute",
    top: "5px",
    right: "5px",
    color: "black",
    "&:hover": {
        transform: "rotate(360deg)",
        transition: "transform 0.5s",
    }
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case "에픽":
            return "#FFB400";
        case "유니크":
            return "#FF00FF";
        case "레어":
            return "#B36BFF";
        case "언커먼":
            return "#68D5ED";
        default:
            return "gray";
    }
};


const CharacterEquipmentDetail = (props: Equipment) => {
    const [rarityColor, setRarityColor] = useState<string>("gray");
    const [enforceColor, setEnforceColor] = useState<string>(getRarityColor("언커먼"));
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: "10px",
            padding: "10px"
        }
        }>
            <Box sx={{
                position:"relative"
            }}>
            <Avatar variant={"rounded"} src={`https://img-api.neople.co.kr/df/items/${props.itemId}`} sx={
                {width: "40px", height: "40px",}
            }/>
            {props.upgradeInfo && <img style={{position:"absolute",top:0,left:0,opacity:"0.7"}} src={"/images/icons/siroco.gif"} width={40} height={40} />}
                {props.itemRarity ==="신화" && <img style={{position:"absolute",top:0,left:0,opacity:"0.7"}} src={"/images/icons/ora_myth.png"} width={40} height={40}/>}
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                   justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
                gap: "5px",
                padding: "10px",
                textAlign:"start"

            }}>
                <Typography  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: getRarityColor(props.itemRarity)
                }}>{props.itemName}</Typography>
                <Typography sx={{
                    fontSize: "10px",
                    color: "gray"
                }}>{props.itemRarity}</Typography>
            </Box>
        </Box>
    );
};


export const CharacterDetail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const characterId = searchParams.get("characterId");
    const serverId = searchParams.get("serverId");
    const [data, setData] = useState<CharacterDetails>({} as CharacterDetails);
    const dispatch = useAppDispatch();
    const [selectedTab, setSelectedTab] = useState(0);
    const isLoading = useSelector((state: RootState) => state.app.isLoading);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };
    useEffect(() => {
        if (characterId && serverId) {
            dispatch(getCharacterDetail(CHARACTER_DETAIL_URL + `?characterId=${characterId ? characterId : ""}&serverId=${serverId ? serverId : ""}`, setData));
        }
    }, [characterId, serverId]);
    const handleRefresh = useCallback(() => {
        if (characterId && serverId) {
            dispatch(getCharacterDetail(CHARACTER_DETAIL_URL + `?characterId=${characterId ? characterId : ""}&serverId=${serverId ? serverId : ""}`, setData));
        }
    }, [characterId, serverId]);
    return (
        <Container maxWidth={"md"} sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative" as "relative",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            padding: "20px 10px",
        }}>
            {isLoading && <CharacterDetailSkeleton/>}
            {!isLoading && <Paper elevation={3} sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative" as "relative",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                padding: "10px",
            }}>
                <Tooltip title="새로고침" placement="bottom">
                    <IconButton aria-label="refresh" onClick={handleRefresh} sx={refreshButtonStyle}>
                        <FontAwesomeIcon icon={faRotateRight}/>
                    </IconButton>
                </Tooltip>
                <Box>
                    <Tooltip title={
                        <Box>
                            <Typography fontSize={"14px"} sx={{paddingLeft: "5px"}} fontFamily={"Core Sans"}>
                                {data?.buffStatus?.[0]} {data?.buffStatus?.[1]}렙 +{data?.buffStatus?.[2]}
                            </Typography>
                        </Box>
                    } placement="bottom">
                        <Button sx={{
                            position: "absolute" as "absolute",
                            bottom: "10px",
                            right: "10px",
                            color: "black",
                        }}>
                            <FontAwesomeIcon icon={faHandFist}/>
                            <Typography fontSize={"12px"} sx={{paddingLeft: "5px"}}>
                                버프강화
                            </Typography>
                        </Button>
                    </Tooltip>
                    {data && data.characterEntityDto &&
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            width: "100%",
                            height: "100%",
                            padding: "0px 0px",
                            gap: "10px",
                            position: "relative" as "relative",
                        }
                        }>

                            <CharacterImgWrapper>
                                <img src={data?.characterEntityDto?.characterImgPath} alt="characterImg"/>
                            </CharacterImgWrapper>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                paddingLeft: "10px",
                                gap: "10px",
                                position: "relative" as "relative",
                                height: "100%",
                            }}>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                    position: "relative" as "relative",
                                    height: "100%",
                                }}>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={14}
                                                sx={{color: "gray"}}>
                                        {data?.characterEntityDto?.serverName}
                                    </Typography>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={14}
                                                sx={{color: "gray"}}>
                                        {data?.characterEntityDto?.jobGrowName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={25}
                                                sx={{color: "black"}}>
                                        {data?.characterEntityDto?.characterName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={14}
                                                sx={{color: "gray"}}>
                                        모험단 : {data?.characterEntityDto?.adventureName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={14}
                                                sx={{color: "gray"}}>
                                        길드 : {data?.characterEntityDto?.guildName}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                    position: "relative" as "relative",
                                    height: "100%",
                                }}>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={10}
                                                sx={{color: "black"}}>
                                        전체 명성 랭킹 : {data?.characterRank}위 / {data?.characterCount}명
                                    </Typography>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={10}
                                                sx={{color: "darkred"}}>
                                        상위 {data?.characterPercent}%
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                    position: "relative" as "relative",
                                    height: "100%",
                                }}>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={10}
                                                sx={{color: "black"}}>
                                        직업 명성 랭킹 : {data?.characterRankByJobName}위 / {data?.characterCountByJobName}명
                                    </Typography>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={10}
                                                sx={{color: "darkred"}}>
                                        상위 {data?.characterPercentByJobName}%
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={"Core Sans"} fontWeight={700} fontSize={14}
                                                sx={{color: "gray"}}>
                                        명성 :{" "}
                                        <Typography
                                            fontFamily={"Core Sans"} fontWeight={700} fontSize={14}
                                            sx={{color: "black", display: "inline-block"}}>
                                            {data?.characterEntityDto?.adventureFame}
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    }
                    {!data && !isLoading &&
                        <ErrorScreen message={"캐릭터의 데이터를 불러오는데 실패했습니다."} icon={faSkullCrossbones}/>}
                </Box>
            </Paper>}
            <Paper elevation={3} sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative" as "relative",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
            }}>
                <Box sx={{borderBottom: 1, borderColor: "divider", width: "100%", display: "flex"}}>
                    <Tabs value={selectedTab} onChange={handleChange} aria-label="character detail tab"
                          variant="scrollable" scrollButtons="auto">
                        <Tab label="장비"/>
                        <Tab label="스탯"/>
                        <Tab label="버프 강화"/>
                        <Tab label="아바타"/>
                        <Tab label="스킬"/>
                        <Tab label="gdgd"/>
                        <Tab label="버프 강화"/>
                    </Tabs>
                </Box>
                <Box>
                    <TabPanel index={0} value={0}>
                        {data?.characterEquipment?.equipment?.map((equipment, index) => {
                            return <CharacterEquipmentDetail {...equipment} key={index}/>;
                        })}
                    </TabPanel>
                </Box>
            </Paper>
        </Container>
    );
};