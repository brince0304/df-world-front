import styled from "styled-components";
import React, {ReactNode, useState} from "react";
import mainPageRankingData from "../../../data/MainPageRankingData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import {Button, Card, IconButton, ListItemButton} from "@mui/material";
import Typography from "@mui/material/Typography";

const TableContainer = styled(Card)`
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
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
  padding: 5px 15px;
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

const IconWrapper = styled.div`
  color: silver;
  cursor: pointer;

  &:hover {
    color: #282c34;
    transition: 0.3s ease-in-out;
  }
`;


const SelectedButton = styled(ListItemButton)`
  &&{  
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    font-size: 14px;
    color: black;
    cursor: pointer;
    background-color: #f2f2f2;
    border-right: 1px solid #e5e5e5;}

`;

const NotSelectedButton = styled(ListItemButton)`
  &&{  list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    font-size: 14px;
    color: silver;
    font-weight: 0;
    cursor: pointer;
    background-color: white;
    border-right: 1px solid #e5e5e5;}

`;

const TableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

`

interface TableMenuProps {
    isSelected?: string,
    menus: { name: string, id: string }[],
    setIsSelected?: (value: string) => void
}

const TableMenu = (props: TableMenuProps) => {
    return (
        <TableButton>
            {props.menus.map((item: { name: string, id: string; }, index: number) => (
                //선택된 버튼
                    <Button key={index} color={props.isSelected === item.id ? "warning" : "inherit"}
                            sx={{padding:"2px 5px"}}
                                    onClick={() => props.setIsSelected?.(item.id)}>{item.name} </Button>
            ))}
        </TableButton>
    );
}


interface TableCustomProps {
    title: ReactNode;
    isSelected?: string;
    setIsSelected?: (value: string) => void;
    menus?: { name: string, id: string }[];
    useMenu: boolean;
    isLoading: boolean;
    useIcon: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export function TableCustom(props: TableCustomProps) {
    return (
        <TableContainer>
            <TableHeader>
                <TableTitleWrapper>
                    <Typography fontFamily={"Core Sans"}>{props.title}</Typography>
                    {props.isLoading &&
                        <ReactLoading type={"spinningBubbles"} color={"gray"} width={"25px"} height={"25px"}/>}
                </TableTitleWrapper>
                {props.useIcon && props.icon}
            </TableHeader>
            {props.useMenu && props.menus &&
                <TableMenu isSelected={props.isSelected} menus={props.menus} setIsSelected={props.setIsSelected}/>}
            {props.children}
        </TableContainer>

    );
}
