import styled from "styled-components";
import React, {useState} from "react";
import mainPageRankingData from "../../../data/MainPageRankingData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";

const TableContainer = styled.div`
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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
  color: #000;
  border-bottom: 1px solid #e5e5e5;
`

const TableButton = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: silver;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e5e5e5;

  span {
    cursor: pointer;

    &:hover {
      color: black;
      font-size: 16px;
      transition: 0.3s;
    }
  }
`

const ArrowWrapper = styled.div`
  color: silver;
  cursor: pointer;

  &:hover {
    color: #282c34;
    transition: 0.3s ease-in-out;
  }
`;


const SelectedButton = styled.div`
  padding: 5px 10px;
  font-size: 14px;
  color: black;
  cursor: pointer;
  background-color: #f2f2f2;
  border-right: 1px solid #e5e5e5;
`;

const NotSelectedButton = styled.div`
  padding: 5px 10px;
  font-size: 14px;
  color: silver;
  font-weight: 0;
  cursor: pointer;
  background-color: white;
  border-right: 1px solid #e5e5e5;

  &:hover {
    color: black;
    background-color: #f2f2f2;
  }
`;

const TableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

`

interface TableMenuProps {
    isSelected: string,
    menus: { name: string, id: string }[],
    setIsSelected: (value: string) => void
}

const TableMenu = (props: TableMenuProps) => {
    return (
        <TableButton>
            {props.menus.map((item: { name: string, id: string; }, index: number) => (
                //선택된 버튼
                props.isSelected === item.id ?
                    <SelectedButton key={index}
                                    onClick={() => props.setIsSelected(item.id)}>{item.name} </SelectedButton>
                    :
                    <NotSelectedButton key={index}
                                       onClick={() => props.setIsSelected(item.id)}>{item.name} </NotSelectedButton>
            ))}
        </TableButton>
    );
}


interface TableCustomProps {
    title: string;
    isSelected: string;
    setIsSelected: (value: string) => void;
    menus?: { name: string, id: string }[];
    useMenu: boolean;
    isLoading: boolean;
    useArrow: boolean;
    onClickArrow?: () => void;
    children: React.ReactNode;
}

export function TableCustom(props: TableCustomProps) {
    return (
        <TableContainer>
            <TableHeader>
                <TableTitleWrapper>
                    <span>{props.title}</span>
                    {props.isLoading &&
                        <ReactLoading type={"spinningBubbles"} color={"lightgray"} width={"25px"} height={"25px"}/>}
                </TableTitleWrapper>
                {props.useArrow &&
                    <ArrowWrapper onClick={props.onClickArrow}>
                        <FontAwesomeIcon icon={faChevronRight} size="sm"/>
                    </ArrowWrapper>}
            </TableHeader>
            {props.useMenu && props.menus &&
                <TableMenu isSelected={props.isSelected} menus={props.menus} setIsSelected={props.setIsSelected}/>}
            {props.children}
        </TableContainer>

    );
}
