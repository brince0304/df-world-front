import {
    Avatar,
    Button, Chip,
    Container,
    Divider,
    FormControl,
    Grid, Grow,
    InputLabel, LinearProgress, List, ListItemButton, ListItemText, MenuItem,
    Select,
    styled,
    TextField, Zoom
} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import {getBoardType} from "./Board";
import {SubmitErrorHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Tagify, {BaseTagData} from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Content} from "../../../interfaces/CharactersData";
import * as React from "react";
import {ArrowBack, Error, HighlightOffOutlined, Label, PersonAdd} from "@mui/icons-material";
import {removeCharacterHistory} from "../../../api/character/getCharacterDetail";
import {NewSearchBox} from "../ui/NewSearchBox";
import {HeaderData} from "../../../data/HeaderData";
import {getCharactersAutoComplete} from "../../../api/character/getCharactersAutoComplete";
import {CharacterSearchModal} from "../character/CharacterSearchModal";
import {ErrorScreen} from "../ui/ErrorScreen";
import {Editor, EditorCore} from "@toast-ui/editor";
import {BOARD_DETAIL_URL, BOARD_GET_CHARACTERS_URL} from "../../../data/ApiUrl";
import {getCharacterList} from "../../../api/board/getCharacterList";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import {HookImageResponse, postImage} from "../../../api/board/postImage";
import {postBoard} from "../../../api/board/postBoard";
import {getBoardDetail} from "../../../api/board/getBoardDetail";
import {putBoard} from "../../../api/board/putBoard";
import {getHashtagList} from "../../../api/board/getHashtagList";
import {BOARD_LIST_ROUTE} from "../../../data/routeLink";
import {setIsLoading, setLoginModalIsOpened} from "../../../redux";


const BoardWriteFormTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const HashtagWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const FormFooter = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const SetCharacterContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 10px;
`;


const schema = yup.object().shape(
    {
        boardTitle: yup.string().required("제목을 입력해주세요.").max(50, "제목은 50자 이내로 입력해주세요.").min(3, "제목은 3자 이상으로 입력해주세요."),
        boardContent: yup.string().required("내용을 입력해주세요.").max(10000, "내용은 10000자 이내로 입력해주세요.").min(10, "내용은 10자 이상으로 입력해주세요."),
        id: yup.number(),
        boardType: yup.string().required("게시판 타입을 선택해주세요."),
        boardFiles: yup.string().default(""),
        characterId: yup.string().default(""),
        serverId: yup.string().default(""),
        hashtag: yup.array().of(yup.object().shape({
            value: yup.string().max(7, "해시태그는 8자 이내로 입력해주세요.").min(2, "해시태그는 2자 이상으로 입력해주세요."),
            __isValid: yup.boolean().default(false),
            __tagId: yup.string().default("")
        })).default([]),
    }
);

export interface BoardInsertDataProps {
    id?: number,
    boardType: string,
    boardTitle: string,

    boardContent: string,
    hashtag: { value: string, __isValid: boolean, __tagId: string }[],

    boardFiles: string,
    characterId: string,

    serverId: string,
}

const actions = [
    {icon: <PersonAdd/>, name: "캐릭터 등록"},
    {icon: <ArrowBack/>, name: "뒤로가기"},
];

const CustomBox = styled(Box)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
`;

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
const FontWrapper = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
  color: gray;
`;


const CharacterDetailContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 5px;
`;


export const CharactersListForModal = (props: { data: Content[], handleClick: (characterId: string, serverId: string, characterName: string) => void }) => {
    return (
        <List sx={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        }}>
            {props.data.map((character, index) => {
                return (
                    <ListItemButton key={index} sx={{width: "100%", position: "relative",padding:'10px 15px'}}
                                    onClick={(e) => props.handleClick(character.characterId, character.serverId, character.characterName)}>
                        <Avatar sx={{
                            position: "absolute", left: 0, backgroundColor: "white", border: "1px solid lightgray",
                            "& > img": {
                                height: "300%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }
                        }} src={character.characterImgPath} variant={"rounded"}/>
                        <ListItemText sx={{paddingLeft: "13%"}}
                                      primary={character.characterName} secondary={
                            <CharacterDetailContainer container spacing={1}>
                                <Grid item xs={3}>
                                    <FontWrapper>{character.serverName}</FontWrapper>
                                </Grid>
                                <Grid item xs={3}>
                                    <FontWrapper>{"레벨 " + character.level}</FontWrapper>
                                </Grid>
                                <Grid item xs={5}>
                                    <FontWrapper>{character.jobGrowName}</FontWrapper>
                                </Grid>
                            </CharacterDetailContainer>
                        }/>
                    </ListItemButton>
                );
            })}
        </List>
    );
};


const boardCategory = [
    {
        name: "자유",
        id: "FREE",
    },
    {
        name: "구인",
        id: "RECRUITMENT",
    },
    {
        name: "거래",
        id: "MARKET",
    },
    {
        name: "질문/답변",
        id: "QUESTION",
    },
    {
        name: "사건/사고",
        id: "REPORT",
    },
    {
        name: "공지",
        id: "NOTICE",
    }];

const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
];

interface TagifyType {
    value: string;
    __isValid: boolean;
    __tagId: string;
}


export const WriteBoard = () => {
    //게시글 작성용 state
    const location = useLocation();
    let navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [content, setContent] = useState("");
    const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userDetail = useSelector((state: RootState) => state.auth.userDetail);
    const type = searchParams.get("request");
    const boardTypeParam = searchParams.get("boardType");
    const [boardType, setBoardType] = useState(boardTypeParam === 'ALL' ? 'FREE' : boardTypeParam);
    const boardId = searchParams.get("boardId");
    const dispatch = useAppDispatch();
    //캐릭터 검색용 state
    const [characterId, setCharacterId] = useState("");
    const [serverId, setServerId] = useState("");
    const [characterName, setCharacterName] = useState("");
    const [characterImgPath, setCharacterImgPath] = useState("");
    const [boardFiles, setBoardFiles] = useState<string>("");
    //캐릭터 검색 로직
    const [characterSearchModalIsOpened, setCharacterSearchModalIsOpened] = useState(false);
    const handleCloseModal = useCallback(() => {
        setCharacterSearchModalIsOpened(false);
    }, []);
    const handleOpenModal = useCallback(() => {
        setCharacterSearchModalIsOpened(true);
    }, []);
    const [data, setData] = useState<Content[]>([]);
    const [isCharacterSearchLoading, setIsCharacterSearchLoading] = useState(false);


    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleSetBoardForm = (boardId: string, tuiEditor: EditorCore, tagify: Tagify<never>) => {
        dispatch(setIsLoading(true));
        getBoardDetail(BOARD_DETAIL_URL + boardId).then((res) => {
            if (res.data.article.userId !== userDetail.userId) {
                alert("본인이 작성한 글만 수정할 수 있습니다.");
                navigate("/");
            }
            setValue("boardTitle", res.data.article.boardTitle);
            setValue("boardContent", res.data.article.boardContent);
            setValue("hashtag", res.data.article.hashtag);
            if (res.data.article.character) {
                setValue("characterId", res.data.article.character.characterId);
                setValue("serverId", res.data.article.character.serverId);
                setCharacterId(res.data.article.character.characterId);
                setServerId(res.data.article.character.serverId);
                setCharacterName(res.data.article.character.characterName);
                setCharacterImgPath(`https://img-api.neople.co.kr/df/servers/${res.data.article.character.serverId}/characters/${res.data.article.character.characterId}?zoom=3`);
            }
            setContent(res.data.article.boardContent);
            tuiEditor.setHTML(res.data.article.boardContent);
            tagify.addTags(res.data.article.hashtags);
            setValue("id", res.data.article.id);
            dispatch(setIsLoading(false));
        }).catch((err) => {
            alert("게시글을 불러오는데 실패했습니다.");
            navigate(-1);
        });
    };


    const searchHistory = useSelector((state: RootState) => state.searchHistory.searchHistory.searchHistory);
    const handleRemoveSearchOptions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.attributes.getNamedItem("data-id")?.value;
        if (targetId) {
            dispatch(removeCharacterHistory(targetId));
        }
    };
    const handleSearch = (searchValue: string, selectValue: string) => {
        getCharacterList(BOARD_GET_CHARACTERS_URL.replace("{serverId}", selectValue).replace("{characterName}", searchValue)).then((res) => {
            setData(res.data);
            setIsCharacterSearchLoading(false);
        }).catch((err) => {
            alert("캐릭터 검색에 실패했습니다.");
            setIsCharacterSearchLoading(false);
        });
    };
    const handleSetCharacterDetails = useCallback((characterId: string, serverId: string, characterName: string) => {
        if (window.confirm("해당 캐릭터를 등록하시겠습니까?")) {
            setCharacterId(characterId);
            setValue("characterId", characterId);
            setServerId(serverId);
            setValue("serverId", serverId);
            setCharacterName(characterName);
            setCharacterImgPath(`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`);
            setCharacterSearchModalIsOpened(false);
        }
    }, []);
    const handleOptionMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        const serverId = event.currentTarget.getAttribute("data-option");
        const characterId = event.currentTarget.getAttribute("data-id");
        const characterName = event.currentTarget.getAttribute("data-title");
        console.log(serverId, characterId);
        if (serverId && characterId && characterName) {
            handleSetCharacterDetails(characterId, serverId, characterName);
        }
    };


    const handleDeleteCharacter = () => {
        setCharacterId("");
        setServerId("");
        setCharacterName("");
        setCharacterImgPath("");
        setValue("serverId", "");
        setValue("characterId", "");
    };


    //게시글
    useEffect(() => {
        if (!isLogin) {
            alert("로그인이 필요한 서비스입니다.");
            navigate(-1);
            dispatch(setLoginModalIsOpened(true));
        }
        let tagify = new Tagify(document.getElementById("tagify") as HTMLInputElement, {
            whitelist: [],
            maxTags: 5,
            callbacks: {
                change: (e: any) => {
                    handleAddHashtag(tagify.value);
                },
            },
            dropdown: {
                classname: "tags-look",
                enabled: 0,
                maxItems: 20,
                closeOnSelect: false,
                highlightFirst: true,
            },
            autoComplete: {
                enabled: false,
            }
        });
        const tuieditor = new Editor({
            el: document.querySelector("#tui-editor-container") as HTMLElement,
            height: "500px",
            useCommandShortcut: true,
            toolbarItems: toolbarItems,
            previewStyle: "vertical",
            plugins: [colorSyntax],

            events: {
                change: () => {
                    handleEditorChange(tuieditor.getHTML());
                }
            },
            hooks: {
                addImageBlobHook: async (blob, callback) => {
                    const data = await postImage(blob) as HookImageResponse;
                    if (data.url) {
                        callback(data.url, "대체 텍스트");
                        handleAddBoardFile(data.fileId);
                    }
                }
            }
        });


        if (type === "update") {
            if (boardId != null) {
                handleSetBoardForm(boardId, tuieditor, tagify);
            }
        }

        tagify.on("input", (e)=>{
            tagify.loading(true).dropdown.hide.call(tagify);
            if(e.detail.value.length>7){
                tagify.loading(false);
                tagify.settings.validate = (tagData: { value: string }) => {
                    setError("hashtag", {type: "manual", message: "해시태그는 7자 이하로 입력해주세요."})
                    setTimeout(() => {
                        clearErrors("hashtag");
                    }, 2000);
                    return tagData.value.length <= 7;
                }
                return;
            }
            const query= e.detail.value;
            if(query.length > 0){
                getHashtagList(query).then((res)=>{
                    const array = [] as string[];
                    res.data.map((item: { name:string,count:number }) => {
                        array.push(`${item.name}`)});
                    tagify.settings.whitelist = array;
                    tagify.dropdown.show.call(tagify, query);
                });
            }
            tagify.loading(false);
        });
        return () => {
            tagify.destroy();
            tuieditor.destroy();
        }
    }, []);
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        setError,
        clearErrors
    } = useForm<BoardInsertDataProps>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleAddHashtag = (data: TagifyType[] | undefined) => {
        if (data) {
            setValue("hashtag", data);
        }
    };
    const handleSelectChange = (event: React.MouseEvent) => {
        setBoardType(event.currentTarget.getAttribute("data-value") as string);
        setValue("boardType", event.currentTarget.getAttribute("data-value") as string);
    };
    const handleAddBoardFile = (fileId: number) => {
        setBoardFiles(boardFiles + fileId + ",");
        setValue("boardFiles", boardFiles);
    };
    const handleEditorChange = (value: string) => {
        setValue("boardContent", value);
    };

    const handleNavigateToBoardListByType = (boardType:string) => {
        navigate(BOARD_LIST_ROUTE);
    }


    const handlePost = (data: BoardInsertDataProps) => {
        if (window.confirm("글을 작성하시겠습니까?")) {
            postBoard(data, navigate);
        }
    };
    const onInvalid: SubmitErrorHandler<BoardInsertDataProps> = (errors) => {
        errors && console.log(errors);
    };

    const handleUpdate = (data: BoardInsertDataProps) => {
        if (window.confirm("글을 수정하시겠습니까?")) {
            putBoard(data).then((res) => {
                if (res.status === 200) {
                    navigate(`/boards/${boardId}`);
                }
            }).catch((err) => {
                alert(err.data);
            });
        }
    };
    return (
        <Container maxWidth={"md"} sx={{paddingTop: "20px", flexDirection: "column", gap: "20px"}}>
            <form
                onSubmit={type === "add" ? handleSubmit(handlePost, onInvalid) : handleSubmit(handleUpdate, onInvalid)}>
                <BoardWriteFormTitleWrapper>
                    <Typography variant={"h4"} sx={{fontWeight: "bold"}} fontFamily={"Core Sans"}>{type === "add" ? "글 작성" : "글 수정"}</Typography>
                    <FormControl sx={{width: "30%", height: "100%"}} variant={"standard"}>
                        <InputLabel>카테고리</InputLabel>
                        <Select
                            defaultValue={boardType}
                            label="카테고리"
                            {...register("boardType")}
                            id="boardTypeSelect"
                            sx={{
                                fontFamily: "Core Sans",
                                fontSize: "14px",
                                fontWeight: "bold",
                                }}
                        >
                            {boardCategory.map((boardType, index) => {
                                return <MenuItem  sx={{
                                fontFamily: "Core Sans",
                                fontSize: "14px",
                                fontWeight: "bold",
                                }} value={boardType.id} data-value={boardType.id} key={index}
                                                 onClick={handleSelectChange}>{boardType.name}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </BoardWriteFormTitleWrapper>
                <Box sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px"
                }}>
                    <TextField type="text"
                               variant={"outlined"} error={!!errors.boardTitle}
                               helperText={errors.boardTitle?.message}
                               label={"제목"}
                               defaultValue={type==='update' ? " ":""}
                               {...register("boardTitle")}
                               sx={{
                                      width: "100%",
                                        height: "100%",
                                   fontSize: "20px",
                                   fontWeight: "bold",
                                   display: "flex",
                               }}/>
                    <HashtagWrapper>
                        <input type="text" id="tagify" placeholder="해시태그를 입력해보세요!"/>
                    </HashtagWrapper>
                        <Typography variant={"body2"} sx={{color: "gray",textAlign:"left"}}>태그는 7자 이하로 5개까지 가능합니다.</Typography>
                </Box>
                <Box width={"100%"} height={"90%"} paddingTop={"20px"}>
                    <div id={"tui-editor-container"}/>
                    {errors.boardContent?.message &&
                        <Typography variant={"body2"} sx={{color: "red",textAlign:"left"}}>{errors.boardContent?.message}</Typography>}
                </Box>
                <SetCharacterContainer>
                    {!characterId &&
                        <Zoom in={characterId === ""}>
                            <Chip icon={<FontAwesomeIcon icon={faXmark} style={{padding:"5px"}}/>} color={"default"} label={"캐릭터를 링크해보세요!"}
                                  size="medium" sx={{fontWeight: "bold"}} clickable onClick={handleOpenModal}/>
                        </Zoom>
                    }
                    {characterId &&
                        <Zoom in={characterId !== ""}>
                            <Chip avatar={
                                <Avatar src={characterImgPath} sx={{
                                    "& > img": {
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        width: "100%",
                                        height: "400%",
                                    }
                                }}/>
                            } color={"primary"} label={characterName} size="medium" sx={{fontWeight: "bold"}}
                                  clickable deleteIcon={<HighlightOffOutlined/>}
                                  onDelete={handleDeleteCharacter}/>
                        </Zoom>}
                </SetCharacterContainer>
                <FormFooter>
                    <Button variant={"contained"} sx={{
                        width: "100px",
                        height: "40px",
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold"
                    }} type="submit">{type === "add" ? "작성" : "수정"}</Button>
                    <Button variant={"contained"} onClick={handleNavigateBack} sx={{
                        width: "100px",
                        height: "40px",
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold"
                    }}>취소</Button>
                </FormFooter>
            </form>
            <CharacterSearchModal isOpened={characterSearchModalIsOpened} handleClose={handleCloseModal}>
                {isCharacterSearchLoading && <LinearProgress sx={{width: "100%", position: "absolute", top: 5}}/>}
                <SearchBoxWrapper>
                    <NewSearchBox placeholder={"캐릭터 검색"}
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
                {data?.length === 0 && !isCharacterSearchLoading &&
                    <ErrorScreen icon={faExclamationCircle} message={"검색 결과가 없습니다."}/>}
            </CharacterSearchModal>
        </Container>
    );
};