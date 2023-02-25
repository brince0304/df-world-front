import styled from "styled-components";
import React, {useState} from "react";
import mainPageRankingData from "../../data/MainPageRankingData";

const TableContainer = styled.div`
    border: 1px solid #e5e5e5;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
   width: 100%;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
    }

`

const TableHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    font-size: 22px;
    font-weight: 700;
    color: #000;
    border-bottom: 1px solid #e5e5e5;
    `

const TableBtn = styled.div`
    padding: 0px 5px;
    font-size: 14px;
    font-weight: 0;
    color: silver;
    span {
    cursor: pointer;
      &:hover {
        color: black;
        font-size: 16px;
        transition: 0.3s;
      }
    }

`


const SelectedButton = styled.span`
    padding: 0px 5px;
    font-size: 16px;
    color: black;
    font-weight: 700;
    cursor: pointer;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  `;

const NotSelectedButton = styled.span`
    padding: 0px 5px;
    font-size: 14px;
    color: silver;
    font-weight: 0;
    cursor: pointer;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
    `;


const TableMenu = (props:{isSelected:number, menus:{name:string,id:number}[],setIsSelected:(value:number)=>void}) => {
    return(
        <TableBtn>
            {props.menus.map((item:{name:string,id:number;}, index:number) => (
                //선택된 버튼
                props.isSelected === item.id ?
                    <SelectedButton key={index} onClick={() => props.setIsSelected(item.id)}>{item.name} </SelectedButton>
                    :
                    <NotSelectedButton key={index} onClick={() => props.setIsSelected(item.id)}>{item.name} </NotSelectedButton>
            ))}
        </TableBtn>
    );
}




export function TableCustom(props: { title: string; isSelected:number; setIsSelected:(value:number)=>void; menus:{name:string,id:number}[]; children: React.ReactNode; }) {
    return (
        <TableContainer >
            <TableHeader>
                <span>{props.title}</span>
                <TableMenu isSelected={props.isSelected} menus={props.menus} setIsSelected={props.setIsSelected}/>
            </TableHeader>
            {props.children}
        </TableContainer>

    );
}