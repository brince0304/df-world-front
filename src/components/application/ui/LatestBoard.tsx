import react from "react";
import styled from "styled-components";
import {TableCustom} from "./TableCustom";
import BoardData from "../../../data/BoardData";
import React from "react";
import boardData from "../../../data/BoardData";

const BoardBody = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    color: #000;
    `

const BoardCell = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2px 15px;
  border-bottom: 1px solid #e5e5e5;
   width: 100%;
  color: gray;
cursor: pointer;
  &:hover {
    color: black;
transition: 0.5s ease;
  }
    `

const BoardTitle = styled.div`
    display: -webkit-box;
    flex-direction: row;
  //맨왼쪽부터
    justify-content: flex-start;
    font-size: 18px;
  //줄 넘으면 ... 으로 나타나게
    overflow: hidden;
     > span {

white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
       
     }
    `

const BoardFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    `

interface BoardListProps{
data: {          id:number,
    title:string,
    createdAt : string,
    userNickname:string,
    userImg:string,
    commentCount:number, }[]
}
const BoardList =(props:BoardListProps)=>{
 return (
     <>{props.data.map((item,index:number)=>(
         <BoardCell key={index}>
             <BoardTitle>
                 <span>{item.title}</span>
             </BoardTitle>
             <BoardFooter>
                    <span>{item.userNickname}</span>
                 <span>{item.createdAt}</span>
             </BoardFooter>
         </BoardCell>
     )
 )}</>
 )


}




const LatestBoard = (props:{title:string, boardTypes:{name:string, id:number}[]}) => {
    const [isSelected, setIsSelected] = react.useState(0);
    return (
        <TableCustom menus={props.boardTypes} title={props.title} isSelected={isSelected} setIsSelected={setIsSelected} >
            <BoardBody>
                <BoardList data={boardData.noticeList}/>
            </BoardBody>
        </TableCustom>
    )
}

export default LatestBoard;

