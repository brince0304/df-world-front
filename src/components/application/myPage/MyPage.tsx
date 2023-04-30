import {
    Avatar,
    Box,
    Card,
    Container,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemButton,
    styled
} from "@mui/material";
import {RootState, UserDetail} from "../../../redux/store";
import {useSelector} from "react-redux";
import {ErrorScreen} from "../ui/ErrorScreen";
import {BadRequest} from "../error/BadRequest";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from '@mui/icons-material/Public';
import {useCallback, useEffect, useState} from "react";
import {Content} from "../../../interfaces/CharactersData";
import {CharacterList} from "../character/Characters";
import {useNavigate} from "react-router-dom";
import {MyPageResponse} from "../../../interfaces/MyPageResponse";
import getMyPageResponse from "../../../api/myPage/getMyPageResponse";
import {NewSearchBox} from "../ui/NewSearchBox";
import {HeaderData} from "../../../data/HeaderData";
import {getCharactersAutoComplete} from "../../../api/character/getCharactersAutoComplete";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {CharacterSearchModal} from "../character/CharacterSearchModal";
import * as React from "react";
import {CharactersListForModal} from "../board/WriteBoard";
import {getBoardCharacterSearch} from "../../../api/board/getBoardCharacterSearch";
import {getCharacters} from "../../../api/character/getCharacters";

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

const ProfileMenuList = styled(List)`
    display: block;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
       width: 100%;
`;

const ProfileMenuButton = styled(ListItemButton)`
    display: flex;
  gap: 5px;
  width: 130px;
  height: 100%;
    border-radius: 10px;
  float: left;
  
`;


const UserProfile = () => {
    const userData = useSelector((state: RootState) => state.login.user);
    return (
        <UserProfileImgWrapper>
            <UserProfileAvatar src={userData.profileImgPath} variant={"circular"} alt={"프로필 이미지"}/>
            <UserNicknameAndEmailWrapper>
                <UserNicknameWrapper>
                    <Typography component={"strong"} fontFamily={"Core Sans"} fontSize={"1.2rem"}
                                fontWeight={"bold"}>{userData.nickname}</Typography>
                    <Typography component={"span"} fontSize={"1rem"} fontFamily={"Core Sans"} color={"gray"}>({userData.userId})</Typography>
                </UserNicknameWrapper>
                <UserEmailAndAdventuerNameWrapper>
                    <Typography component={"span"} fontSize={"1rem"} fontFamily={"Core Sans"} color={"gray"}>{userData.email}</Typography>
                    {!userData.adventureName &&
                        <Typography component={"span"} fontWeight={"bold"} fontFamily={"Core Sans"} fontSize={"1rem"} color={"gray"}>모험단 등록
                            안됨</Typography>}
                </UserEmailAndAdventuerNameWrapper>
            </UserNicknameAndEmailWrapper>
        </UserProfileImgWrapper>
    );
};

const UserProfileMenuList = () => {
    const profileMenuList = [
        {
            label: "정보 수정",
            onClick: () => {
            },
            icon: <EditIcon/>
        },
        {
            label: "캐릭터 등록",
            onClick: () => {
            },
            icon: <AttachFileIcon/>
        },
        {
            label: "활동내역",
            onClick: () => {
            },
            icon: <AccountCircleIcon/>
        }
    ];
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [openLinkCharacterModal, setOpenLinkCharacterModal] = useState(false);
    const [openActivityHistoryModal, setOpenActivityHistoryModal] = useState(false);
    const user = useSelector((state: RootState) => state.login.user);
    return (
        <ProfileMenuList>
            {profileMenuList.map((menu, index) => {
                return (
                    <ProfileMenuButton key={index} onClick={menu.onClick}>
                        {menu.icon}
                        <Typography component={"span"} fontSize={"0.8rem"}>{menu.label}</Typography>
                    </ProfileMenuButton>
                );
            })}
            <ProfileMenuButton>
                <Avatar sx={{width: "20px", height: "20px"}} src={user.profileImgPath}/>
                <Typography component={"span"} fontSize={"0.8rem"}>프로필 변경</Typography>
            </ProfileMenuButton>
            {!user.adventureName && <ProfileMenuButton>
                <PublicIcon/>
                <Typography component={"span"} fontSize={"0.8rem"}>모험단 등록</Typography>
            </ProfileMenuButton>
            }
        </ProfileMenuList>
    );
};


const UserProfileCard = () => {
    return (
        <UserProfileCardStyled>
            <Typography component={"h1"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"} sx={{textAlign:"left"}}>마이페이지</Typography>
            <Divider flexItem sx={{width: "100%", marginTop:"10px", marginBottom:"10px"}}/>
            <UserProfile/>
            <Divider flexItem sx={{width: "100%", marginTop:"10px"}}/>
            <UserProfileMenuList/>
        </UserProfileCardStyled>
    );
};
const SearchBoxWrapper = styled(Box)`
  width: 100%;
  height: 36px;
  display: flex;
  position: sticky;
  top: 16px;
  z-index: 1000;
  justify-content: center;
  align-items: center;
`;

const CharacterLinkModal = (props:{isOpened:boolean, handleClose : ()=>void})=> {
    const [isLoading, setIsLoading] = useState(false);
    const searchHistory = useSelector((state: RootState) => state.searchHistory.searchHistory.searchHistory);
    const [data, setData] = useState<Content[]>([]);
    const handleSearch = (searchValue: string, selectValue: string) => {
        setIsLoading(true);
    }
    return (
        <CharacterSearchModal isOpened={props.isOpened} handleClose={props.handleClose}>
            {isLoading && <LinearProgress sx={{width: "100%", position: "absolute", top: 5}}/>}
            <SearchBoxWrapper>
                <NewSearchBox placeholder={"캐릭터 닉네임"}
                              direction={"down"} handleNavigate={handleSearch}
                              filterOptions={HeaderData.serverList}
                              searchHistoryMouseDown={handleOptionMouseDown}
                              removeSearchHistory={handleRemoveSearchOptions} useSearchOption={true}
                              searchHistory={searchHistory}
                              autoCompleteHandler={getCharactersAutoComplete}
                              autoCompleteUrl={"/characters/autoComplete?name={searchValue}&serverId={selectValue}"}
                />
            </SearchBoxWrapper>
            {data?.length > 0 && <CharactersListForModal handleClick={handleSetCharacterDetails} data={data}/>}
            {data?.length === 0 && !isLoading &&
                <ErrorScreen icon={faExclamationCircle} message={"검색 결과가 없습니다."}/>}
        </CharacterSearchModal>
    )
}

const UserCharacterCard = (props:{data:Content[]}) => {
    let navigate = useNavigate();
    const onClick = (e:React.MouseEvent) => {
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if(characterId && serverId) {
            navigate(`/details/?serverId=${serverId}&characterId=${characterId}`);
        }
    }
return (
    <CharacterList data={props.data} onClick={onClick}/>
)
}

export const MyPage = () => {
    const userData = useSelector((state: RootState) => state.login.user);
    const [myPageResponse, setMyPageResponse] = useState<MyPageResponse>({} as MyPageResponse);

    const handleSetMyPageResponse = useCallback((response:MyPageResponse) => {
        setMyPageResponse(response);
    }, []);
    useEffect(() => {
           if (userData) {
                getMyPageResponse().then((response) => {
                    handleSetMyPageResponse(response.data);
                }).catch((error) => {
                    console.log(error);
                });
            }
           console.log(myPageResponse);
    }, []);
    return (
        <Container maxWidth={"md"}>
            {!userData && <BadRequest/>}
            {userData && <Box>
                <UserProfileCard/>
                <Typography component={"h1"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"} sx={{textAlign:"left"}}>내 캐릭터 {userData.characterCount}개</Typography>
                <CharacterList data={myPageResponse.userDetail.characters} onClick={(e)=>{}} />

            </Box>
            }
        </Container>

    );
};