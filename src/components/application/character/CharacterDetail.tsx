import {useLocation} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {getCharacterDetail} from "../../../api/character/getCharacterDetail";
import {RootState, useAppDispatch} from "../../../redux/store";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight, faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";
import {ErrorScreen} from "../ui/ErrorScreen";
import {Avatar, Button, Container, Divider, IconButton, ListItemButton, Paper, Tab, Tabs, Tooltip} from "@mui/material";
import {CHARACTER_DETAIL_URL} from "../../../data/ApiUrl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {faHandFist} from "@fortawesome/free-solid-svg-icons";
import {CharacterDetailSkeleton} from "../loading/CharacterDetailSkeleton";
import {useSelector} from "react-redux";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import StarsIcon from "@mui/icons-material/Stars";
import CharacterEquipmentModal from "./CharacterEquipmentModal";
import {setIsError} from "../../../redux";
import {BadRequest} from "../error/BadRequest";
import {
    CharacterDetailJson,
    CharacterDetailCharacterEquipmentDetails,
    CharacterDetailCharacterEquipmentEquipment,
    CharacterDetailCharacterEquipmentEquipmentGrowInfoOptions,
    CharacterDetailCharacterEquipmentEquipmentBakalInfo, CharacterDetailCharacterAbilityStatus
} from "../../../interfaces/CharacterDetailJson";

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

const typographyProps = {
    component: "span",
    fontFamily: "Core Sans",
    fontWeight: "700"
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
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",

            }}
        >
            {value === index && (
                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case "에픽":
            return "#FFB400";
        case "신화":
            return "#cc70db";
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


const EquipmentGrowInfoDetail = (props : {data: CharacterDetailCharacterEquipmentEquipmentGrowInfoOptions[]})=>{
    return (
        <Box>
            <Typography fontSize={"12px"} color={"#4AA356"}>성장&변환 옵션</Typography>
            {props.data.map((growInfo, index) => {
               return (<Box key={index}>
                    <Typography fontSize={"12px"} color={"#C1A437"}>{index+1}옵션 - Lv{growInfo.level}</Typography>
                    <Typography fontSize={"12px"} color={"#8F8356"}>피해증가 +{growInfo.damage} 버프력 +{growInfo.buff}</Typography>
                    <Typography fontSize={"12px"} color={"#BAB290"}
                                sx={{whiteSpace: "pre-wrap"}}>{growInfo.explainDetail}</Typography>
                </Box>)
            })}
        </Box>
    )
}


const EquipmentBaklInfoDetail = (props : {data: CharacterDetailCharacterEquipmentEquipmentBakalInfo})=>{
    return (
        <Box>
            <Typography fontSize={"12px"} color={"#4AA356"}>바칼 융합 옵션</Typography>
            {props.data.options.map((bakalInfo, index) => {
                return(
                    <Box key={index}>
                        <Typography fontSize={"12px"} color={"#4AA356"}>{index+1}옵션</Typography>
                        <Typography fontSize={"12px"} color={"#BAB290"}
                                    sx={{whiteSpace: "pre-wrap"}}>{bakalInfo.explainDetail}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}

const CharacterStatDetail = (props: {data:CharacterDetailCharacterAbilityStatus[]}) => {
    return (
        <Box>
            {props.data.map((stat, index) => {
                return (
                    <Box key={index}>
                        <Typography fontSize={"12px"} color={"#4AA356"}>{stat.name}</Typography>
                        <Typography fontSize={"12px"} color={"#8F8356"}>{stat.value}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}

const TypeBadge = (props:{type:string})=>{
    return(
        <Box id={"type-badge"} sx={{
            display: "flex",
            backgroundColor: "#252525",
            borderRadius: "5px",
            padding: "1px 0px",
            opacity: "0.8",
            fontSize: "8px",
            position: "absolute",
            top: "0",
            left: "0",
            color: "white",

        }
        }>
            {props.type}
        </Box>
    )
}

const CharacterEquipmentModalDetail = (props: {
    detail: CharacterDetailCharacterEquipmentDetails,
    equipment: CharacterDetailCharacterEquipmentEquipment
}) => {
    const dontNeedList = ["물리 방어력", "마법 방어력", "내구도", "공격속도", "캐스트속도", "이동속도", "인벤토리 무게 한도", "HP MAX", "MP MAX", "적중률",
        "물리 크리티컬 히트", "마을 이동 속도 증가", "마법 크리티컬 히트","체력","모든 속성 저항","히트리커버리","MP 1분당 회복","HP 1분당 회복","모든 상태변화 내성"];
    const dividerStyle = {width: "100%", marginTop: "10px", marginBottom: "10px"};
    //증가 단어마다 줄바꿈
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
            }}>
                <Box sx={{
                    position: "relative",
                    display: "flex",
                }}>
                    <Avatar variant={"rounded"} src={`https://img-api.neople.co.kr/df/items/${props.detail.itemId}`}
                            sx={
                                {width: "40px", height: "40px",}
                            }/>
                    {props.equipment.upgradeInfo && <img style={{position: "absolute", top: 0, left: 0, opacity: "0.7"}}
                                                         src={"/images/icons/siroco.gif"} width={40} height={40}/>}
                    {props.detail.itemRarity === "신화" &&
                        <img style={{position: "absolute", top: 0, left: 0, opacity: "0.7"}}
                             src={"/images/icons/ora_myth.png"} width={40} height={40}/>}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                    height: "100%",
                    marginLeft: "10px",
                }}>
                    <Typography sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: getRarityColor(props.detail.itemRarity),
                        background: props.detail.itemRarity === "신화" ? "-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255));" : "",
                        backgroundClip: props.detail.itemRarity === "신화" ? "text" : "",
                        textFillColor: props.detail.itemRarity === "신화" ? "transparent" : "",
                    }}>{props.equipment.reinforce ? "+" + props.equipment.reinforce : ""} {props.detail.itemName}</Typography>
                    {props.equipment.upgradeInfo && <Typography fontSize={"12px"} color={"#4c9d17"}>
                        <FontAwesomeIcon icon={faLevelUpAlt} fontSize={"small"} style={{transform:'rotate(90deg)',paddingRight:'5px'}}/>{props.equipment.upgradeInfo.itemName}
                    </Typography>}
                </Box>
            </Box>
            <Divider sx={dividerStyle} color={"gray"}/>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
            }}>
                <Typography fontSize={"12px"}
                            color={getRarityColor(props.detail.itemRarity)}>{props.equipment.itemGradeName}</Typography>
                <Typography fontSize={"12px"}
                            color={getRarityColor(props.detail.itemRarity)}>{props.detail.itemRarity}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
                width: "100%",
            }}>
                <Typography fontSize={"12px"} color={"#937739"}>레벨제한 {props.detail.itemAvailableLevel}</Typography>
                <Typography fontSize={"12px"} color={"#c1a437"}>{props.detail.itemTypeDetail}</Typography>
            </Box>
            <Divider sx={dividerStyle} color={"gray"}/>
            <Box>
                {props.equipment.reinforce !== 0 && <Typography fontSize={"12px"}
                                                                color={getRarityColor("언커먼")}>+{props.equipment.reinforce} 강화</Typography>}
            </Box>
            <Box>
                {props.detail.itemStatus && props.detail.itemStatus.map((status, index) => {
                    return (dontNeedList.filter((name: string) => name === status.name).length === 0 &&
                        <Typography key={index} fontSize={"12px"}
                                    color={"#8F8356"}>{status.name} {status.value}</Typography>);
                })}
            </Box>
            {props.equipment.enchant  && <Divider sx={dividerStyle} color={"gray"}/> }
            <Box>
                {props.equipment.enchant && props.equipment.enchant.status.map((enchant, index) => {
                    return (<Typography key={index} fontSize={"12px"}
                                        color={"#84F0A8"}>{enchant.name} +{enchant.value}</Typography>);
                })}
            </Box>
            {props.detail.itemExplainDetail && <Divider sx={dividerStyle} color={"gray"}/> }
            <Box>
                <Typography fontSize={"12px"} sx={{whiteSpace: "pre-wrap"}}
                            color={"#8F8356"}>{props.detail.itemExplainDetail}</Typography>
            </Box>
            {props.equipment.bakalInfo &&<Divider sx={dividerStyle} color={"gray"}/>}
            {props.equipment.bakalInfo && <EquipmentBaklInfoDetail data={props.equipment.bakalInfo}/>}
            {props.equipment.growInfo && <Divider sx={dividerStyle} color={"gray"}/>}
            {props.equipment.growInfo &&
                    <EquipmentGrowInfoDetail data={props.equipment.growInfo.options}/>}


        </Box>
    );
};

const CharacterEquipmentDetail = (props: {
    equipment: CharacterDetailCharacterEquipmentEquipment,
    detail: CharacterDetailCharacterEquipmentDetails | undefined
}) => {
    const [rarityColor, setRarityColor] = useState<string>("gray");
    const [enforceColor, setEnforceColor] = useState<string>(getRarityColor("언커먼"));
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const handleModalOpen = useCallback(() => {
        setIsModalOpened(true);
    }, []);
    const handleModalClose = useCallback(() => {
        setIsModalOpened(false);
    }, []);
    return (
        <ListItemButton sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            padding: "10px",
            gap: "10px",
        }}
                        onClick={handleModalOpen}
        >
            <CharacterEquipmentModal isOpened={isModalOpened} setIsOpened={handleModalClose}>
                {props.detail && <CharacterEquipmentModalDetail detail={props.detail}
                                                                equipment={props.equipment}/>}
            </CharacterEquipmentModal>

            <Box sx={{
                position: "relative",
                display: "flex",
                width: "40px",
                height: "40px",
            }}>
                <Avatar variant={"rounded"} src={`https://img-api.neople.co.kr/df/items/${props.equipment.itemId}`} sx={
                    {width: "40px", height: "40px",}
                }/>
                <TypeBadge type={props.equipment.slotName}/>
                {props.equipment.upgradeInfo && <img style={{position: "absolute", top: 0, left: 0, opacity: "0.7"}}
                                                     src={"/images/icons/siroco.gif"} width={40} height={40}/>}
                {props.equipment.itemRarity === "신화" &&
                    <img style={{position: "absolute", top: 0, left: 0, opacity: "0.7"}}
                         src={"/images/icons/ora_myth.png"} width={40} height={40}/>}
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    //줄바꿈 되지 않도록
                }}>
                    <Typography sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: getRarityColor(props.equipment.itemRarity),
                        background: props.equipment.itemRarity === "신화" ? "-webkit-linear-gradient(top, rgb(255, 180, 0), rgb(255, 0, 255));" : "",
                        backgroundClip: props.equipment.itemRarity === "신화" ? "text" : "",
                        textFillColor: props.equipment.itemRarity === "신화" ? "transparent" : "",
                    }}>{props.equipment.itemName}</Typography>
                    {props.equipment.reinforce !== 0 && <Typography sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: props.equipment.amplificationName ? getRarityColor("유니크") : getRarityColor("언커먼")
                    }}> +{props.equipment.reinforce}{props.equipment.amplificationName ? "증폭" : "강화"} {props.equipment.refine !== 0 ? `(${props.equipment.refine})` : ""}</Typography>}
                </Box>
                {props.equipment.upgradeInfo &&
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                    >
                        <Typography fontSize={"12px"} color={"#4c9d17"}>
                            <FontAwesomeIcon icon={faLevelUpAlt} fontSize={"small"} style={{transform:'rotate(90deg)',marginRight:"5px"}}/>{props.equipment.upgradeInfo.itemName}
                        </Typography>
                    </Box>
                }
                <Box sx={{
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "5px",
                }}>
                    {props.equipment.enchant &&props.equipment.enchant.status.map((status, index) => {
                        return (
                            <Typography key={index} sx={{
                                fontSize: "11px",
                                display: "flex"
                            }}>{status.name} +{status.value}</Typography>
                        );
                    })}
                </Box>
                {props.equipment.growInfo &&
                    <Box sx={{
                        display: "inline-flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "5px",
                        backgroundColor: "#f5f5f5",
                        padding: "1px 3px",
                    }}>
                        <StarsIcon sx={{
                            fontSize: "10px",
                            color: "#FFB400",

                        }}/>
                        {props.equipment?.growInfo?.options?.map((option, index) => {
                            return (
                                <Typography key={index} sx={{
                                    fontSize: "11px",
                                    display: "flex"
                                }}> {option.level}{index + 1 !== props.equipment.growInfo.options.length && " ·"}</Typography>
                            );
                        })}
                        <Typography sx={{
                            fontSize: "11px",
                            display: "flex",
                            fontWeight: "bold"
                        }}> ({props.equipment.growInfo?.total?.level})</Typography>
                    </Box>
                }


            </Box>
        </ListItemButton>
    );
};


export const CharacterDetail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const characterId = searchParams.get("characterId");
    const serverId = searchParams.get("serverId");
    const [data, setData] = useState<CharacterDetailJson>({} as CharacterDetailJson);
    const dispatch = useAppDispatch();
    const [selectedTab, setSelectedTab] = useState(0);
    const isLoading = useSelector((state: RootState) => state.app.isLoading);
    const [isError, setIsError] = useState<boolean>(false);
    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }, []);
    useEffect(() => {
        if (characterId && serverId) {
            dispatch(getCharacterDetail(CHARACTER_DETAIL_URL + `?characterId=${characterId ? characterId : ""}&serverId=${serverId ? serverId : ""}`, setData, setIsError));
        }
    }, [characterId, serverId]);
    const handleRefresh = useCallback(() => {
        if (characterId && serverId) {
            dispatch(getCharacterDetail(CHARACTER_DETAIL_URL + `?characterId=${characterId ? characterId : ""}&serverId=${serverId ? serverId : ""}`, setData, setIsError));
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
            {!isLoading && !isError && <Paper elevation={3} sx={{
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
                    {data && data.buffStatus && data.buffStatus.length!==0 && <Tooltip title={
                        <Box>
                            <Typography {...typographyProps}
                                        sx={{paddingLeft: "5px"}}>
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
                    </Tooltip>}
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
                                    <Typography {...typographyProps}
                                                fontSize={14}
                                                sx={{color: "gray"}}>
                                        {data?.characterEntityDto?.serverName}
                                    </Typography>
                                    <Typography {...typographyProps}
                                                fontSize={14}
                                                sx={{color: "gray"}}>
                                        {data?.characterEntityDto?.jobGrowName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography {...typographyProps}
                                                fontSize={25}
                                                sx={{color: "black"}}>
                                        {data?.characterEntityDto?.characterName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography {...typographyProps}
                                                fontSize={14}
                                                sx={{color: "gray"}}>
                                        모험단 : {data?.characterEntityDto?.adventureName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography {...typographyProps}
                                                fontSize={14}
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
                                    <Typography {...typographyProps}
                                                fontSize={10}
                                                sx={{color: "black"}}>
                                        전체 명성 랭킹 : {data?.characterRank}위 / {data?.characterCount}명
                                    </Typography>
                                    <Typography {...typographyProps}
                                                fontSize={10}
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
                                    <Typography {...typographyProps}
                                                fontSize={10}
                                                sx={{color: "black"}}>
                                        직업 명성 랭킹 : {data?.characterRankByJobName}위 / {data?.characterCountByJobName}명
                                    </Typography>
                                    <Typography {...typographyProps}
                                                fontSize={10}
                                                sx={{color: "darkred"}}>
                                        상위 {data?.characterPercentByJobName}%
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography {...typographyProps}
                                                fontSize={14}
                                                sx={{color: "gray"}}>
                                        명성 :{" "}
                                        <Typography
                                            {...typographyProps}
                                            fontSize={14}
                                            sx={{color: "black", display: "inline-block"}}>
                                            {data?.characterEntityDto?.adventureFame}
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    }
                </Box>
            </Paper>}
            {isError &&
                <BadRequest/>}
            {!isError && <Paper elevation={3} sx={{
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
                          variant="scrollable" scrollButtons>
                        <Tab label="장비" sx={typographyProps}/>
                        <Tab label="스탯" sx={typographyProps}/>
                        <Tab label="버프 강화" sx={typographyProps}/>
                        <Tab label="아바타" sx={typographyProps}/>
                        <Tab label="스킬" sx={typographyProps}/>
                        <Tab label="gdgd" sx={typographyProps}/>
                        <Tab label="버프 강화" sx={typographyProps}/>
                    </Tabs>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: "0px 0px",

                }}>
                    <TabPanel index={0} value={selectedTab}>
                        {data?.characterEquipment?.equipment?.map((equipment, index) => {
                            return <CharacterEquipmentDetail equipment={equipment}
                                                             detail={data?.characterEquipmentDetails?.find((o) => {
                                                                 return o.itemId === equipment.itemId;
                                                             })} key={index}/>;
                        })}
                    </TabPanel>
                    <TabPanel index={1} value={selectedTab}>
                        {data.characterAbility && data.characterAbility.status  &&  <CharacterStatDetail data={data.characterAbility.status}/> }
                    </TabPanel>
                </Box>
            </Paper>
            }
        </Container>
    );
};