import './rankingTable.scss'
import React, {useState} from "react";
import MainPageRankingData from "./data/MainPageRankingData";
import {RankingCharacterImg} from "./RankingCharacterImg";
import styled from "styled-components";
import mainPageRankingData from "./data/MainPageRankingData";
import tw from "tailwind-styled-components"
import Grid2 from "@mui/material/Grid";
import GridCell from "@mui/material/Grid";
import GridRow from "@mui/material/Grid";
import {TableCustom} from "./TableCustom";






const TableData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 700;
    color: #000;
   `


const RankingBadge = styled.div`
&&{
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
    font-weight: 700;
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
          transform: scale(1.3);
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
  font-size: 10px;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 10px;
  }
`



const RankingValue = (props:{type:string; value:string;}) => {
    return(
        <RankingDetailValue>
            {props.type === 'adventureFame'&&<img id="rankIcon" src={require('./resources/img/rankingtable/icon_status_fame.png')} alt="icon" style={{width:"15px",height:"15px"}}/>}
            {props.type === 'damage'&&<img id="rankIcon" src={require('./resources/img/rankingtable/damage_increase.png')} alt="icon" style={{width:"18px",height:"18px"}}/>}
            {props.type === 'buff'&&<img id="rankIcon" src={require('./resources/img/rankingtable/buff_power.png')} alt="icon" style={{width:"18px",height:"18px"}}/>}
            <RankingDetailValueStyled style={{marginLeft:"5px"}}>{props.value}</RankingDetailValueStyled>
        </RankingDetailValue>
    );
}

const RankingDetailText = styled.span`
  color: grey;

  font-size: 10px;
    @media (max-width: 1024px) {
    font-size: 14px;
    }
    `

const RankingDetailNameText= styled.span`
    font-size: 13px;
    @media (max-width: 1024px) {
    font-size: 16px;
    }
    `


interface Props {
    data: any;
    title:string;
}

interface RankingTableProps{
  data: {
      characterId:string;
      characterName:string;
      adventureName:string;
      serverId:string;
      serverName:string;
      adventureFame:string;
      rankingType:string;
  }[];
}



const RankingTableRow = (props: RankingTableProps) => {
    return (
        <>{
        props.data.map((item,index:number) => (
                <TableRow  key={index} id={item.characterId} >
                    <p className="badge bg-black text-gray-700 font-bold text-[13px] absolute bg-black w-5 h-5 text-white opacity-75"  >{index+1}</p>
                    <TableCell  style={{width:"5%"}} >
                        <RankingCharacterImg  serverId={item.serverId} characterId={item.characterId}/>
                    </TableCell>
                    <TableCell  style={{width:"10%"}}>
                        <TableData>
                            <RankingDetailNameText >{item.characterName}</RankingDetailNameText>
                            <RankingDetailText >{item.adventureName}</RankingDetailText>
                            <RankingDetailText >{item.serverName}</RankingDetailText>
                        </TableData>
                    </TableCell>
                    <TableCell style={{width:"5%"}} >
                        <TableData>
                            <RankingValue type={item.rankingType} value={item.adventureFame} />
                        </TableData>
                    </TableCell>
                </TableRow>
            ))
        }</>

    )
}


export default function RankingTable(props:Props) {
    const[isSelected,setIsSelected] = useState(0);
    return (
     <TableCustom title={props.title} isSelected={isSelected} setIsSelected={setIsSelected} menus={mainPageRankingData.rankingType}>
         <TableBody>
             {isSelected === 0 && <RankingTableRow data={props.data.adventureFame}/>}
             {isSelected === 1 && <RankingTableRow data={props.data.damage}/>}
             {isSelected === 2 && <RankingTableRow data={props.data.buff}/>}
         </TableBody>
     </TableCustom>
    );
}
