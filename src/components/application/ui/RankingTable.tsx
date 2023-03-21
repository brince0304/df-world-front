import '../../../assets/css/rankingTable.scss'
import React, {useEffect, useState} from "react";
import {RankingCharacterImg} from "./RankingCharacterImg";
import styled from "styled-components";
import mainPageRankingData from "../../../data/MainPageRankingData";
import {TableCustom} from "../layout/TableCustom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {faChevronRight, faExclamationTriangle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ErrorScreen} from "./ErrorScreen";


const TableData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0;
  font-size: 16px;
  color: #000;
`


const RankingBadge = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: black;
    font-size: 14px;
    color: white;
    //영역 축소
    -webkit-border-radius: 20%;
  }
`


const TableBody = styled.div`
  display: grid;
  grid-template-rows: repeat(1, minmax(100px, auto));
  grid-template-columns: repeat(2, minmax(100px, 50%));
  @media (max-width: 768px) {
    grid-template-rows: repeat(1, minmax(100px, auto));
    grid-template-columns: repeat(1, minmax(100px, auto));
  }
  @media (max-width: 480px) {
    grid-template-rows: repeat(1, minmax(100px, auto));
    grid-template-columns: repeat(1, minmax(100px, auto));
  }
  @media (min-width: 1024px) {
    grid-template-rows: repeat(1, minmax(100px, auto));
    grid-template-columns: repeat(2, minmax(100px, 50%));
  }

  //first child's empty space remove
`;

const TableCell = styled.div`
  && {
    display: table-cell;
    vertical-align: middle;
    //구분선
  }

`;

const TableRow = styled.div`
  display: table-row;
  width: 100%;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    //랭킹 아이콘 빼고 hover 시 이펙트
    img {
      transform: translateY(0px);
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
      color: black;
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
`
const RankingDetailValueStyled = styled.span`
  font-size: 15px;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 15px;
  }
`


const RankingValue = (props: { type: string; value: number; }) => {
    return (
        <RankingDetailValue>
            {props.type === 'adventureFame' &&
                <img id="rankIcon" src={require('../../../assets/img/rankingtable/icon_status_fame.png')} alt="icon"
                     style={{width: "15px", height: "15px"}}/>}
            {props.type === 'damageIncrease' &&
                <img id="rankIcon" src={require('../../../assets/img/rankingtable/damage_increase.png')} alt="icon"
                     style={{width: "18px", height: "18px"}}/>}
            {props.type === 'buffPower' &&
                <img id="rankIcon" src={require('../../../assets/img/rankingtable/buff_power.png')} alt="icon"
                     style={{width: "18px", height: "18px"}}/>}
            <RankingDetailValueStyled style={{marginLeft: "5px"}}>{props.value}</RankingDetailValueStyled>
        </RankingDetailValue>
    );
}


const RankingDetailText = styled.span`
  color: grey;
  font-size: 14px;
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`

const RankingDetailNameText = styled.span`
  font-size: 16px;
  @media (max-width: 1024px) {
    font-size: 18px;
  }
`


interface RankingTableProps {
    data: any;
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

const AdventureCharacterWrapper = styled.div`
  width: 20%;
  height: 20%;
`
const AdventureCharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
`


const RankingTableRow = (props: { data: RankingTableData[], type: string }) => {
    let navigate = useNavigate();
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.dataset;
        navigate(`/details?serverId=${id.server}&characterId=${id.id}`);
    }
    return (
        <>{ props.data.length > 0 &&
            props.data.map((item, index: number) => (
                <TableRow key={index} id={item.characterId} onClick={onClick} data-id={item.characterId}
                          data-server={item.serverId}>
                    <p className="badge bg-black text-gray-700 font-bold text-[13px] absolute bg-black w-5 h-5 text-white opacity-75">{index + 1}</p>
                    <TableCell style={{width: "5%"}}>
                        <RankingCharacterImg serverId={item.serverId} characterId={item.characterId}/>
                    </TableCell>
                    <TableCell style={{width: "20%"}}>
                        <TableData>
                            <RankingDetailNameText>{item.characterName}</RankingDetailNameText>
                            <RankingDetailText>{item.adventureName}</RankingDetailText>
                            <RankingDetailText>{item.serverName}</RankingDetailText>
                        </TableData>
                    </TableCell>
                    <TableCell style={{width: "5%"}}>
                        <TableData>
                            <RankingValue type={props.type} value={item.adventureFame}/>
                        </TableData>
                    </TableCell>
                </TableRow>
            ))
        }</>
    )
}


export default function RankingTable(props: RankingTableProps) {
    const [isSelected, setIsSelected] = useState("adventureFame");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<RankingTableData[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios(props.url + isSelected);
                setData(result.data.content);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
        };
        fetchData();
    }, [isSelected]);

    return (
        <TableCustom title={props.title} isSelected={isSelected} setIsSelected={setIsSelected}
                     menus={mainPageRankingData.rankingType} useMenu={true} useIcon={true}
                     isLoading={isLoading}
                     onClickArrow={() => {
                     }} icon={<FontAwesomeIcon icon={faChevronRight} size="sm"/>}>
            <TableBody>
                {data.length >0 &&!isError && <RankingTableRow type={isSelected} data={data}/>}
                {data.length===0 &&!isError && <ErrorScreen icon={faXmark} size={"xl"} message={"데이터가 없습니다."}/>}
                {isError && <ErrorScreen icon={faExclamationTriangle} size={"xl"} message={"데이터를 불러오는데 실패했습니다."}/>}
            </TableBody>
        </TableCustom>
    );
}
