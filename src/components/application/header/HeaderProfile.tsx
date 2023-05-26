import styled from 'styled-components';
import {RootState, useAppDispatch, useAppSelector} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useState} from "react";
import {toggleProfileOpened} from "../../../redux";
import {Avatar, Badge, Button, ListItemButton} from "@mui/material";

const Container = styled.div`
  display: flex;
  width:100%;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 5px 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  transition: border-radius 0.3s ease-in-out;
`;

const ProfileImgWrapper = styled.div`
    display: flex;
  border-radius: 50%;
    overflow: hidden;
    width: 37px;
    height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
    img {
        width: 100%;
        height: 100%;
    }
  `

const ProfileNicknameWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 10px;
    font-size: 14px;
    color: #f5f5f5;
    font-weight: 600;
  width: 100%;
    `


const ProfileDetailsWrapper = styled.div`
    transform: translate(-50%, -50%);
    width: 100%;
   height: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props: { isOpened: boolean }) => props.isOpened ? 'block' : 'none'};
    opacity : ${(props: { isOpened: boolean }) => props.isOpened ? '100%' : '0'};
  pointer-events: ${(props: { isOpened: boolean }) => props.isOpened ? 'all' : 'none'};
    transition: all 0.3s ease;
    `

export const HeaderProfile = (props:{onClick:()=>void}) => {
    const userData = useAppSelector((state: RootState) => state.auth.userDetail);
    const notification = useAppSelector((state: RootState) => state.notification);
    return (
        <Button onClick={props.onClick}>
            <Badge color="primary" badgeContent={notification.notificationCount}>
            <Avatar src={userData?.profileImgPath} alt="profile" sx={{ width: 30, height: 30 ,backgroundColor:"white",border:"1px solid #f5f5f5"}}/>
            </Badge>
            <ProfileNicknameWrapper>
                <span style={{marginLeft: '10px'}}>{userData?.nickname}</span>
            </ProfileNicknameWrapper>
        </Button>

    );
}