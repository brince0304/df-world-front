import {Avatar, Box, Card, Container, Divider, styled} from "@mui/material";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import {BadRequest} from "../../components/application/error/BadRequest";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MyPageResponse} from "../../interfaces/MyPageResponse";
import getMyPageResponse from "../../apis/myPage/getMyPageResponse";
import {getUser} from "../../apis/auth/getUser";
import ProfileMenus from "./ProfileMenus";
import UserCharacters from "./UserCharacters";
import {setHasNotification, setIsAuthenticated, setNotificationCount, setUserDetails} from "../../redux";
import {getUserDetails} from "../../apis/auth/getUserDetails";

const UserProfileCardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
`;
const UserProfileAvatar = styled(Avatar)`
  && {
    width: 50px;
    height: 50px;
    border: 2px solid black;
    margin-right: 10px;
  }
`;

const UserProfileImgWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const UserNicknameAndEmailWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const UserNicknameWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const UserEmailAndAdventuerNameWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;


`;


const UserProfile = () => {
    const userData = useSelector((state: RootState) => state.auth.userDetail);
    return (
        <UserProfileImgWrapper>
            <UserProfileAvatar src={userData.profileImgPath} variant={"circular"} alt={"프로필 이미지"}/>
            <UserNicknameAndEmailWrapper>
                <UserNicknameWrapper>
                    <Typography component={"strong"} fontFamily={"Core Sans"} fontSize={"1.2rem"}
                                fontWeight={"bold"}>{userData.nickname}</Typography>
                    <Typography component={"span"} fontSize={"1rem"} fontFamily={"Core Sans"}
                                color={"gray"}>({userData.userId})</Typography>
                </UserNicknameWrapper>
                <UserEmailAndAdventuerNameWrapper>
                    <Typography component={"span"} fontSize={"1rem"} fontFamily={"Core Sans"}
                                color={"gray"}>{userData.email}</Typography>
                    {!userData.adventureName &&
                        <Typography component={"span"} fontWeight={"bold"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                    color={"gray"}>모험단 등록
                            안됨</Typography>}
                </UserEmailAndAdventuerNameWrapper>
            </UserNicknameAndEmailWrapper>
        </UserProfileImgWrapper>
    );
};

const UserProfileCard = (props: { refresh: () => void }) => {
    return (
        <UserProfileCardStyled>
            <Typography component={"h1"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"}
                        sx={{textAlign: "left"}}>마이페이지</Typography>
            <Divider flexItem sx={{width: "100%", marginTop: "10px", marginBottom: "10px"}}/>
            <UserProfile/>
            <Divider flexItem sx={{width: "100%", marginTop: "10px"}}/>
            <ProfileMenus refresh={props.refresh}/>
        </UserProfileCardStyled>
    );
};



const MyPage = () => {
    const userData = useSelector((state: RootState) => state.auth.userDetail);
    const [myPageResponse, setMyPageResponse] = useState<MyPageResponse>({} as MyPageResponse);
    const handleSetMyPageResponse = useCallback((response: MyPageResponse) => {
        setMyPageResponse(response);
    }, []);
    const handleGetMyPageResponse = useCallback(() => {
        if (userData) {
            getMyPageResponse().then((response) => {
                handleSetMyPageResponse(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [userData, handleSetMyPageResponse]);
    useEffect(() => {
        handleGetMyPageResponse();
    }, []);
    return (
        <Container maxWidth={"md"}>
            {!userData && <BadRequest/>}
            {userData && <Box>
                <UserProfileCard refresh={handleGetMyPageResponse}/>
                <Box sx={{marginTop: "20px"}}>
                    <Typography component={"h1"} color={userData.characterCount === 0 ? "#908E9B" : "#565360"}
                                fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"} sx={{
                        textAlign: "left",
                        marginBottom: "10px"
                    }}>{userData.characterCount === 0 ? "링크된 캐릭터가 존재하지 않습니다." : `내 캐릭터 ${userData.characterCount}개`}</Typography>
                    {myPageResponse?.userDetail?.characters.length > 0 &&
                        <UserCharacters data={myPageResponse.userDetail.characters}
                                           refresh={handleGetMyPageResponse}/>}
                </Box>

            </Box>
            }
        </Container>

    );
};

export default MyPage;
