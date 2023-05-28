import styled from "styled-components";
import {RootState, useAppSelector} from "../../redux/store";
import React from "react";
import {Avatar, Badge, Button} from "@mui/material";

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