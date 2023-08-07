import React, { ReactNode } from 'react';
import { Box, Button, Card } from '@mui/material';
import styled from '@emotion/styled';

interface TableMenuProps {
  isSelected?: string;
  menus: { name: string; id: string }[];
  setIsSelected?: (value: string) => void;
}

const TableMenu = (props: TableMenuProps) => {
  return (
    <TableButton>
      {props.menus.map((item: { name: string; id: string }, index: number) => (
        //선택된 버튼
        <Button
          key={index}
          color={props.isSelected === item.id ? 'primary' : 'inherit'}
          sx={{ padding: '2px 5px', borderRight: '1px solid #e5e5e5' }}
          onClick={() => props.setIsSelected?.(item.id)}
        >
          {item.name}{' '}
        </Button>
      ))}
    </TableButton>
  );
};

interface TableCustomProps {
  title: ReactNode;
  isSelected?: string;
  setIsSelected?: (value: string) => void;
  menus?: { name: string; id: string }[];
  useMenu: boolean;
  useIcon: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function MyTable(props: TableCustomProps) {
  return (
    <TableContainer>
      <TableHeader>
        <TableTitleWrapper>
          <Box>{props.title}</Box>
        </TableTitleWrapper>
        {props.useIcon && props.icon}
      </TableHeader>
      {props.useMenu && props.menus && (
        <TableMenu isSelected={props.isSelected} menus={props.menus} setIsSelected={props.setIsSelected} />
      )}
      {props.children}
    </TableContainer>
  );
}

export default MyTable;

const TableContainer = styled(Card)`
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-size: 22px;
  color: #000;
  border-bottom: 1px solid #e5e5e5;
`;

const TableButton = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: silver;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e5e5e5;
  overflow-x: auto;
  scroll-behavior: smooth;

  span {
    cursor: pointer;

    &:hover {
      color: black;
      font-size: 16px;
      transition: 0.3s;
    }
  }
`;

const TableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
