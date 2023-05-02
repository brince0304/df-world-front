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
import {RootState, useAppDispatch, UserDetail} from "../../../redux/store";
import {useSelector} from "react-redux";
import {ErrorScreen} from "../ui/ErrorScreen";
import {BadRequest} from "../error/BadRequest";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from '@mui/icons-material/Public';
import {ReactNode, useCallback, useEffect, useState} from "react";
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
import {getCharacterList} from "../../../api/board/getCharacterList";
import {getCharacters} from "../../../api/character/getCharacters";
import {BOARD_GET_CHARACTERS_URL, USER_CHARACTERS_POST_URL, USER_CHARACTERS_SEARCH_URL} from "../../../data/ApiUrl";
import {removeCharacterHistory} from "../../../api/character/getCharacterDetail";
import {postCharacterToUserAccount} from "../../../api/myPage/postCharacterToUserAccount";
import deleteCharacterFromUserAccount from "../../../api/myPage/deleteCharacterFromUserAccount";
import ProfileIconChangeModal from "../auth/ProfileIconChangeModal";

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
    const userData = useSelector((state: RootState) => state.auth.userDetail);
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

const UserProfileMenuList = (props:{refresh:()=>void}) => {

    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [openLinkCharacterModal, setOpenLinkCharacterModal] = useState(false);
    const [openActivityHistoryModal, setOpenActivityHistoryModal] = useState(false);
    const [openProfileIconChangeModal, setOpenProfileIconChangeModal] = useState(false);
    const user = useSelector((state: RootState) => state.auth.userDetail);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const handleRemoveSearchOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.attributes.getNamedItem("data-id")?.value;
        if (targetId) {
            dispatch(removeCharacterHistory(targetId));
        }
    };

    const handleCloseCharacterLinkModal = useCallback(() => {
        setOpenLinkCharacterModal(false);
    }, []);
    const handlePostCharacter = (characterId:string,serverId:string,characterName:string) => {
        if (characterId && serverId && window.confirm(`${characterName} 캐릭터를 등록하시겠습니까?`) ) {
            postCharacterToUserAccount(USER_CHARACTERS_POST_URL.replace("{characterId}",characterId).replace("{serverId}",serverId)).then((response) => {
                    window.alert("캐릭터가 등록되었습니다.");
                    handleCloseCharacterLinkModal();
                    window.location.reload();
            }).catch((error) => {
                window.alert(error.response.data);
            });
        }
    };
    const handleProfileChangeModalOpen = useCallback(
        () => {
            setOpenProfileIconChangeModal(true);
        }, [setOpenEditProfileModal]);
    const handleProfileChangeModalClose = useCallback(
        () => {
            setOpenProfileIconChangeModal(false);
        }, [setOpenEditProfileModal]);

    const handleSetCharacterDetails = (characterId: string, serverId: string, characterName: string) => {
        handlePostCharacter(characterId,serverId,characterName);
    };



    const handleOpenCharacterLinkModal = useCallback(() => {
        setOpenLinkCharacterModal(true);
    }, []);
    const handleOptionMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        const serverId = event.currentTarget.getAttribute("data-option");
        const characterId = event.currentTarget.getAttribute("data-id");
        const characterName = event.currentTarget.getAttribute("data-title");
        if (serverId && characterId && characterName) {
            handleSetCharacterDetails(characterId, serverId, characterName);
        }
    };
    const profileMenuList = [
        {
            label: "정보 수정",
            onClick: () => {
            },
            icon: <EditIcon/>
        },
        {
            label: "캐릭터 등록",
            onClick: handleOpenCharacterLinkModal,
            icon: <AttachFileIcon/>
        },
        {
            label: "활동내역",
            onClick: () => {
            },
            icon: <AccountCircleIcon/>
        }
    ];
    return (
        <ProfileMenuList>
            {isAuthenticated && <ProfileIconChangeModal isOpened={openProfileIconChangeModal}
                                                        handleClose={handleProfileChangeModalClose}/>}
            {profileMenuList.map((menu, index) => {
                return (
                    <ProfileMenuButton key={index} onClick={menu.onClick}>
                        {menu.icon}
                        <Typography component={"span"} fontSize={"0.8rem"}>{menu.label}</Typography>
                    </ProfileMenuButton>
                );
            })}
            <ProfileMenuButton onClick={handleProfileChangeModalOpen}>
                <Avatar sx={{width: "20px", height: "20px"}} src={user.profileImgPath}/>
                <Typography component={"span"} fontSize={"0.8rem"}>프로필 변경</Typography>
            </ProfileMenuButton>
            {!user.adventureName && <ProfileMenuButton>
                <PublicIcon/>
                <Typography component={"span"} fontSize={"0.8rem"}>모험단 등록</Typography>
            </ProfileMenuButton>
            }
            <CharacterLinkModal isOpened={openLinkCharacterModal} handleClose={handleCloseCharacterLinkModal} handleOptionMouseDown={handleOptionMouseDown} handleRemoveSearchOptions={handleRemoveSearchOptions} handleSetCharacterDetails={handleSetCharacterDetails}/>
        </ProfileMenuList>
    );
};


const UserProfileCard = (props:{refresh:()=>void}) => {
    return (
        <UserProfileCardStyled>
            <Typography component={"h1"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"} sx={{textAlign:"left"}}>마이페이지</Typography>
            <Divider flexItem sx={{width: "100%", marginTop:"10px", marginBottom:"10px"}}/>
            <UserProfile/>
            <Divider flexItem sx={{width: "100%", marginTop:"10px"}}/>
            <UserProfileMenuList refresh={props.refresh}/>
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

const CharacterLinkModal = (props:{isOpened:boolean, handleClose : ()=>void, handleOptionMouseDown :(e:React.MouseEvent)=>void,
handleRemoveSearchOptions:(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void,handleSetCharacterDetails:(characterId:string,serverId:string,characterName:string)=>void})=> {
    const [isLoading, setIsLoading] = useState(false);
    const searchHistory = useSelector((state: RootState) => state.searchHistory.searchHistory.searchHistory);
    const [data, setData] = useState<Content[]>([]);
    const handleSearch = (searchValue: string, selectValue: string) => {
        setIsLoading(true);
        getCharacterList(USER_CHARACTERS_SEARCH_URL.replace("{serverId}", selectValue).replace("{characterName}", searchValue)).then((res) => {
            setData(res.data);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            console.log(err);
        });
    };
    return (
        <CharacterSearchModal isOpened={props.isOpened} handleClose={props.handleClose}>
            {isLoading && <LinearProgress sx={{width: "100%", position: "absolute", top: 5}}/>}
            <SearchBoxWrapper>
                <NewSearchBox placeholder={"캐릭터 닉네임"}
                              direction={"down"} handleNavigate={handleSearch}
                              filterOptions={HeaderData.serverList}
                              searchHistoryMouseDown={props.handleOptionMouseDown}
                              removeSearchHistory={props.handleRemoveSearchOptions} useSearchOption={true}
                              searchHistory={searchHistory}
                              autoCompleteHandler={getCharactersAutoComplete}
                              autoCompleteUrl={"/characters/autoComplete?name={searchValue}&serverId={selectValue}"}
                />
            </SearchBoxWrapper>
            {data?.length > 0 && <CharactersListForModal handleClick={props.handleSetCharacterDetails} data={data}/>}
            {data?.length === 0 && !isLoading &&
                <ErrorScreen icon={faExclamationCircle} message={"검색 결과가 없습니다."}/>}
        </CharacterSearchModal>
    )
}

const UserCharacterCard = (props:{data:Content[]}) => {
    let navigate = useNavigate();

    const onClickDeleteButton = (e:React.MouseEvent) => {
        e.stopPropagation();
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if(characterId && serverId && window.confirm("삭제하시겠습니까?")) {
            deleteCharacterFromUserAccount(characterId, serverId).then((res)=>{
                window.alert("삭제되었습니다.");
                window.location.reload();
            }).catch((err)=>{
                window.alert(err.response.data);
            })
        }
    }
    const onClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if(characterId && serverId) {
            navigate(`/details/?serverId=${serverId}&characterId=${characterId}`);
        }
    }
return (
    <CharacterList data={props.data} onClick={onClick} deletable onClickDeleteButton={onClickDeleteButton}/>
)
}

interface CharacterRequest {
    characterId: string;
    serverId: string;
    characterName: string;
}

export const MyPage = () => {
    const userData = useSelector((state: RootState) => state.auth.userDetail);

    const [myPageResponse, setMyPageResponse] = useState<MyPageResponse>({} as MyPageResponse);
    const handleSetMyPageResponse = useCallback((response:MyPageResponse) => {
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
        if(!userData){
            window.alert("로그인이 필요합니다.");
            window.location.href = "/";
        }
        handleGetMyPageResponse();
    }, []);
    const dispatch = useAppDispatch();
    return (
        <Container maxWidth={"md"}>
            {!userData && <BadRequest/>}
            {userData && <Box>
                <UserProfileCard refresh={handleGetMyPageResponse}/>
                <Box sx={{marginTop : "20px"}}>
                    <Typography component={"h1"} color={userData.characterCount===0 ? "#908E9B" : "#565360"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"} sx={{textAlign:"left",marginBottom:"10px"}}>{userData.characterCount === 0 ? "캐릭터가 등록되지 않았습니다." : `내 캐릭터 ${userData.characterCount}개`}</Typography>
                    {myPageResponse?.userDetail?.characters.length > 0 && <UserCharacterCard data={myPageResponse.userDetail.characters}/>}
                </Box>

            </Box>
            }
        </Container>

    );
};