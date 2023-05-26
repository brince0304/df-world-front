import {
    Avatar, Badge,
    Box, Button,
    Card, Collapse,
    Container,
    Dialog, DialogContent, DialogTitle,
    Divider, FormControl, IconButton, InputBase, LinearProgress,
    List,
    ListItemButton, ListItemText,
    styled, TextField, Tooltip
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {RootState, useAppDispatch, UserDetail} from "../../../redux/store";
import {useSelector} from "react-redux";
import {ErrorScreen} from "../ui/ErrorScreen";
import {BadRequest} from "../error/BadRequest";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PublicIcon from "@mui/icons-material/Public";
import {useCallback, useEffect, useState} from "react";
import {Content} from "../../../interfaces/CharactersData";
import {CharacterList} from "../character/Characters";
import {Form, useNavigate} from "react-router-dom";
import {MyPageResponse} from "../../../interfaces/MyPageResponse";
import getMyPageResponse from "../../../api/myPage/getMyPageResponse";
import {NewSearchBox} from "../ui/NewSearchBox";
import {HeaderData} from "../../../data/HeaderData";
import {getCharactersAutoComplete} from "../../../api/character/getCharactersAutoComplete";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {CharacterSearchModal} from "../character/CharacterSearchModal";
import * as React from "react";
import {BoardInsertDataProps, CharactersListForModal} from "../board/WriteBoard";
import {getCharacterList} from "../../../api/board/getCharacterList";
import {BOARD_GET_CHARACTERS_URL, USER_CHARACTERS_POST_URL, USER_CHARACTERS_SEARCH_URL} from "../../../data/ApiUrl";
import {postCharacterToUserAccount} from "../../../api/myPage/postCharacterToUserAccount";
import deleteCharacterFromUserAccount from "../../../api/myPage/deleteCharacterFromUserAccount";
import ProfileIconChangeModal from "../auth/ProfileIconChangeModal";
import {removeCharacterHistory, setIsAuthenticated, setUserDetails} from "../../../redux";
import ActivitiesModal from "./ActivitiesModal";
import {getUser} from "../../../api/auth/getUser";
import {FieldErrors, SubmitErrorHandler, useForm, UseFormRegister, UseFormWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import getValidateNickname from "../../../api/myPage/getValidateNickname";
import {ValidateForm} from "../ui/ValidateForm";
import putChangeNickname from "../../../api/myPage/putChangeNickname";
import putChangePassword from "../../../api/myPage/putChangePassword";
import {logout} from "../../../api/auth/logout";

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

interface IForm {
    nickname: string;
    password: string;
    passwordValidate: string;
    passwordConfirm: string;
}


const UserDetailEditModal = (props: { open: boolean, onClose: () => void, refresh: () => void }) => {
    const passwordMatch = (password: string, passwordCheck: string) => {
        if (password !== "" && passwordCheck !== "") {
            return password === passwordCheck;
        }
        return true;
    };
    const schema = yup.object().shape({
        nickname: yup.string().min(2, "닉네임은 2자리 이상이어야 합니다.").max(8, "닉네임은 8자리 이하여야 합니다."),
        passwordValidate: yup.string(),
        password: yup.string().min(8, "비밀번호는 8자리 이상이어야 합니다.").matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/, "영문, 숫자, 특수문자를 포함한 8~20자리"),
        passwordConfirm: yup
            .string()
            .test("password", "비밀번호가 일치하지 않습니다.", function (value) {
                    return passwordMatch(this.parent.password, this.parent.passwordConfirm);
                }
            ),
    });
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: {errors,},
        setFocus
    } = useForm<IForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const userDetails = useSelector((state: RootState) => state.auth.userDetail);
    const dispatch = useAppDispatch();
    const [isNicknameValidated, setIsNicknameValidated] = useState<boolean>(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
    const nicknameFormProps = {
        register: register,
        watch: watch,
        validatedMessage: "사용 가능한 닉네임입니다.",
        inValidatedMessage: "이미 사용중인 닉네임입니다.",
        defaultTooltipMessage: "중복 확인",
        formName: "nickname",
        errors: errors.nickname,
        validateFunction: getValidateNickname,
        placeholder: "변경할 닉네임",
        isChecked: isNicknameChecked,
        setIsChecked: setIsNicknameChecked,
        setIsValidated: setIsNicknameValidated,
        isValidated: isNicknameValidated,
        setFocus: setFocus,
        helperText: "한글, 영문, 숫자를 포함한 2~8자리",
        fontFamily: "Core Sans",
    };


    const handleUpdateNickname = (nickname: string) => {
        if (window.confirm("닉네임을 변경하시겠습니까?")) {
            putChangeNickname(nickname).then((res) => {
                alert("닉네임이 변경되었습니다.");
                props.onClose();
                props.refresh();
            }).catch((err) => {
                console.log(err);
            });
        }
        ;
    };
    const [openPasswordEditSection, setOpenPasswordEditSection] = useState<boolean>(false);
    const [openNicknameEditSection, setOpenNicknameEditSection] = useState<boolean>(false);
    const handleTogglePasswordEditSection = () => {
        setOpenPasswordEditSection(!openPasswordEditSection);
    };
    const navigate = useNavigate();
    const handleToggleNicknameEditSection = () => {
        setOpenNicknameEditSection(!openNicknameEditSection);
    };
    useEffect(() => {
        setIsNicknameValidated(false);
        setIsNicknameChecked(false);
    }, [watch("nickname")]);
    const arrowDropIconStyleNickname = {
        color: openNicknameEditSection ? "#121212" : "#9e9e9e",
        "&:hover": {
            color: openNicknameEditSection ? "#121212" : "#9e9e9e",
        },
        transform: openNicknameEditSection ? "rotate(180deg)" : "rotate(0deg)",
        transition: "all 0.3s ease-in-out",
    }

    const arrowDropIconStylePassword = {
        color: openPasswordEditSection ? "#121212" : "#9e9e9e",
        "&:hover": {
            color: openPasswordEditSection ? "#121212" : "#9e9e9e",
        },
        transform: openPasswordEditSection ? "rotate(180deg)" : "rotate(0deg)",
        transition: "all 0.3s ease-in-out",

    }

    const handleUpdatePassword =(e:React.MouseEvent) => {
        e.preventDefault();
        const data = {
            password: watch("passwordValidate"),
            passwordValidate: watch("password"),
        }
        putChangePassword(data.passwordValidate,data.password).then((res)=>{
            alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
            dispatch(logout());
            navigate("/");
        }).catch((err)=>{
            alert(err.response.data);
        })
    };
    return (
        <Dialog open={props.open} onClose={props.onClose}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "400px",
                        height: "500px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}}>
            <DialogTitle>
                <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1.5rem"} fontWeight={"bold"}>회원정보
                    수정 </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Button sx={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }} onClick={handleToggleNicknameEditSection}>
                        <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"} color={"#121212"}
                                    fontWeight={"bold"}>닉네임 변경</Typography>
                        <ArrowDropDownIcon sx={arrowDropIconStyleNickname}/>
                    </Button>
                </Box>
                <Collapse orientation={"vertical"} in={openNicknameEditSection} mountOnEnter unmountOnExit>
                    <FormControl style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <ValidateForm {...nicknameFormProps} />
                        <Button variant={"contained"}
                                sx={{
                                    width: "100%",
                                }}
                                disabled={!!errors.nickname || !watch("nickname") || !isNicknameValidated}
                                onClick={(e) => {
                                    handleUpdateNickname(watch("nickname"));
                                }}>변경</Button>
                    </FormControl>
                </Collapse>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Button sx={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }} onClick={handleTogglePasswordEditSection}>
                        <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"} color={"#121212"}
                                    fontWeight={"bold"}>비밀번호 변경</Typography>
                        <ArrowDropDownIcon sx={arrowDropIconStylePassword}/>
                    </Button>
                </Box>
                <Collapse orientation={"vertical"} in={openPasswordEditSection} mountOnEnter unmountOnExit>
                    <FormControl sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <TextField fullWidth variant={"standard"} margin={"normal"}
                                   {...register("passwordValidate")}
                                   label={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                                   fontWeight={"bold"}>현재 비밀번호</Typography>
                                   } type={"password"}/>
                        <TextField fullWidth variant={"standard"} margin={"normal"}
                                   helperText={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"0.75rem"}>
                                           {errors.password?.message}</Typography>
                                   }
                                   {...register("password")} error={!!errors.password}
                                   label={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                                   fontWeight={"bold"}>변경할 비밀번호</Typography>
                                   } type={"password"}/>
                        <TextField fullWidth variant={"standard"} margin={"normal"}
                                   helperText={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"0.75rem"}
                                       >{errors.passwordConfirm?.message}</Typography>
                                   }
                                   {...register("passwordConfirm")} error={!!errors.passwordConfirm}
                                   label={
                                       <Typography component={"span"} fontFamily={"Core Sans"} fontSize={"1rem"}
                                                   fontWeight={"bold"}>비밀번호 확인</Typography>
                                   } type={"password"}/>
                        <Button variant={"contained"} color={"primary"} disabled={!!errors.password || !!errors.passwordConfirm || !watch("password") || !watch("passwordConfirm")
                            || !watch("passwordValidate")} sx={{width: "100%"}} onClick={handleUpdatePassword} >변경</Button>
                    </FormControl>
                </Collapse>
            </DialogContent>
        </Dialog>
    );

};

const UserProfileMenuList = (props: { refresh: () => void }) => {

    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [openLinkCharacterModal, setOpenLinkCharacterModal] = useState(false);
    const [openActivityHistoryModal, setOpenActivityHistoryModal] = useState(false);
    const [openProfileIconChangeModal, setOpenProfileIconChangeModal] = useState(false);
    const user = useSelector((state: RootState) => state.auth.userDetail);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const notification = useSelector((state: RootState) => state.notification);
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
    const handlePostCharacter = (characterId: string, serverId: string, characterName: string) => {
        if (characterId && serverId && window.confirm(`${characterName} 캐릭터를 등록하시겠습니까?`)) {
            postCharacterToUserAccount(USER_CHARACTERS_POST_URL.replace("{characterId}", characterId).replace("{serverId}", serverId)).then((response) => {
                window.alert("캐릭터가 등록되었습니다.");
                handleCloseCharacterLinkModal();
                props.refresh();
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
        handlePostCharacter(characterId, serverId, characterName);
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
    const handleOpenActivityHistoryModal = useCallback(() => {
        setOpenActivityHistoryModal(true);
    }, []);
    const handleCloseActivityHistoryModal = useCallback(() => {
        setOpenActivityHistoryModal(false);
    }, []);

    const handleOpenEditProfileModal = useCallback(() => {
        setOpenEditProfileModal(true);
    }, []);

    const handleCloseEditProfileModal = useCallback(() => {
        setOpenEditProfileModal(false);
    }, []);

    const profileMenuList = [
        {
            label: "정보 수정",
            onClick: handleOpenEditProfileModal,
            icon: <EditIcon/>
        },
        {
            label: "캐릭터 링크",
            onClick: handleOpenCharacterLinkModal,
            icon: <AttachFileIcon/>
        },
        {
            label: "활동내역",
            onClick: handleOpenActivityHistoryModal,
            icon: <AccountCircleIcon/>
        }
    ];
    return (
        <ProfileMenuList>
            {isAuthenticated && <ProfileIconChangeModal isOpened={openProfileIconChangeModal}
                                                        handleClose={handleProfileChangeModalClose}
                                                        refresh={props.refresh}/>}
            {profileMenuList.map((menu, index) => {
                return (
                    <ProfileMenuButton key={index} onClick={menu.onClick}>
                        {menu.icon}
                        <Typography component={"span"} fontSize={"0.8rem"}>{menu.label}</Typography>
                        {menu.label === '활동내역' && <Badge sx={{
                            marginLeft: "10px"
                        }} color={"primary"}
                               badgeContent={notification.notificationCount} />}
                    </ProfileMenuButton>
                );
            })}
            <ActivitiesModal activitiesModalOpened={openActivityHistoryModal}
                             handleClose={handleCloseActivityHistoryModal}/>
            <UserDetailEditModal open={openEditProfileModal} onClose={handleCloseEditProfileModal}
                                 refresh={props.refresh}/>
            <ProfileMenuButton onClick={handleProfileChangeModalOpen}>
                <Avatar sx={{width: "20px", height: "20px"}} src={user.profileImgPath}/>
                <Typography component={"span"} fontSize={"0.8rem"}>프로필 변경</Typography>
            </ProfileMenuButton>
            {!user.adventureName && <ProfileMenuButton>
                <PublicIcon/>
                <Typography component={"span"} fontSize={"0.8rem"}>모험단 등록</Typography>
            </ProfileMenuButton>
            }
            <CharacterLinkModal isOpened={openLinkCharacterModal} handleClose={handleCloseCharacterLinkModal}
                                handleOptionMouseDown={handleOptionMouseDown}
                                handleRemoveSearchOptions={handleRemoveSearchOptions}
                                handleSetCharacterDetails={handleSetCharacterDetails}/>
        </ProfileMenuList>
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
            <UserProfileMenuList refresh={props.refresh}/>
        </UserProfileCardStyled>
    );
};

const CharacterLinkModal = (props: {
    isOpened: boolean,
    handleClose: () => void,
    handleOptionMouseDown: (e: React.MouseEvent) => void,
    handleRemoveSearchOptions: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    handleSetCharacterDetails: (characterId: string, serverId: string, characterName: string) => void
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const searchHistory = useSelector((state: RootState) => state.history.characterHistory);
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
        <CharacterSearchModal isOpened={props.isOpened} handleClose={props.handleClose}
                              serachBox={<NewSearchBox placeholder={"캐릭터 닉네임"}
                                                       direction={"down"} handleNavigate={handleSearch}
                                                       filterOptions={HeaderData.serverList}
                                                       searchHistoryMouseDown={props.handleOptionMouseDown}
                                                       removeSearchHistory={props.handleRemoveSearchOptions}
                                                       useSearchOption={true}
                                                       searchHistory={searchHistory}
                                                       autoCompleteHandler={getCharactersAutoComplete}
                                                       autoCompleteUrl={"/characters/autoComplete?name={searchValue}&serverId={selectValue}"}
                              />}
                              isLoading={isLoading}>
            {data?.length > 0 && <CharactersListForModal handleClick={props.handleSetCharacterDetails} data={data}/>}
            {data?.length === 0 && !isLoading &&
                <ErrorScreen icon={faExclamationCircle} message={"검색 결과가 없습니다."}/>}
        </CharacterSearchModal>
    );
};

const UserCharacterCard = (props: { data: Content[], refresh: () => void }) => {
    let navigate = useNavigate();
    const onClickDeleteButton = (e: React.MouseEvent) => {
        e.stopPropagation();
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if (characterId && serverId && window.confirm("삭제하시겠습니까?")) {
            deleteCharacterFromUserAccount(characterId, serverId).then((res) => {
                window.alert("삭제되었습니다.");
                props.refresh();
            }).catch((err) => {
                window.alert(err.response.data);
            });
        }
    };
    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const characterId = e.currentTarget.getAttribute("data-id");
        const serverId = e.currentTarget.getAttribute("data-server");
        if (characterId && serverId) {
            navigate(`/details/?serverId=${serverId}&characterId=${characterId}`);
        }
    };
    return (
        <CharacterList data={props.data} onClick={onClick} deletable onClickDeleteButton={onClickDeleteButton}/>
    );
};


export const MyPage = () => {
    const userData = useSelector((state: RootState) => state.auth.userDetail);
    const [myPageResponse, setMyPageResponse] = useState<MyPageResponse>({} as MyPageResponse);
    const handleSetMyPageResponse = useCallback((response: MyPageResponse) => {
        setMyPageResponse(response);
        dispatch(getUser());
    }, []);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

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
        if (!isAuthenticated) {
            window.alert("로그인이 필요합니다.");
            navigate("/");
        }
        handleGetMyPageResponse();
    }, []);
    const dispatch = useAppDispatch();
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
                        <UserCharacterCard data={myPageResponse.userDetail.characters}
                                           refresh={handleGetMyPageResponse}/>}
                </Box>

            </Box>
            }
        </Container>

    );
};