import react from "react";
import React, {useEffect} from "react";
import styled from "styled-components";
import CustomTable from "../../../../components/CustomTable";
import BoardData from "../../../../data/BoardData";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faExclamationTriangle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ErrorScreen} from "../../../../components/ErrorScreen";
import {getLatestBoard} from "../../../../apis/postSignUp/getLatestBoard";
import {Avatar, IconButton, ListItemButton} from "@mui/material";
import {ChatBubbleOutlineOutlined, FavoriteBorderOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  color: #000;
`

const BoardCell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  color: gray;
  cursor: pointer;

  &:hover {
    color: black;
    transition: 0.5s ease;
    background-color: #f5f5f5;
  }
`

const BoardTitle = styled.div`
  display: block;
  //맨왼쪽부터
  font-size: 18px;
  color: black;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;


const BoardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  font-size: 14px;

`

const LikeCommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
`;

const LikeCommentContainer = styled.div`
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  width: 100%;
`

const NicknameCreatedAtContainer = styled.div`
  display: grid;
  justify-content: space-between;
    align-items: center;

  width: 100%;
  grid-template-columns: 140px 80px;
`

const ProfileImgWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  width: 25px;
  height: 25px;

  img {
    width: 100%;
    height: 100%;
  }
`
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
  `;

const NicknameWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;


interface BoardProps {
    title: string,
    boardTypes?: { name: string, id: string }[],
    url: string,
}

interface BoardData {
    id: string,
    boardTitle: string,
    createdAt: string,
    userNickname: string,
    userProfileImgUrl: string,
    commentCount: number,
    boardLikeCount: number,
    boardViewCount: number,
}

const BoardList = (props: { data: BoardData[] }) => {
    let navigate = useNavigate();
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.dataset.id;
        navigate(`/boards/${id}`);
    }
    return (
        <>{props.data.map((item, index: number) => (
                <ListItemButton key={index} onClick={onClickHandler} data-id={item.id} sx={{display: "flex", flexDirection: "column", width: "100%",gap:"6px"}}>
                    <BoardTitle>
                        {item.boardTitle}
                    </BoardTitle>
                    <BoardFooter>
                        <NicknameCreatedAtContainer>
                            <NicknameWrapper>
                                <ProfileImgWrapper>
                                    <Avatar src={item.userProfileImgUrl} alt="profile"
                                         style={{width: "25px", height: "25px"}}/>
                                </ProfileImgWrapper>
                                <Typography sx={{
                                    fontSize: "14px",
                                    fontFamily: "Core Sans"
                                }}>{item.userNickname}</Typography>
                            </NicknameWrapper>
                        </NicknameCreatedAtContainer>
                    </BoardFooter>
                    <LikeCommentContainer>
                        <IconContainer>
                            <LikeCommentWrapper>
                        <Typography><FavoriteBorderOutlined  style={{
                            padding: "0 2px 0 5px",
                        }
                        }/> {item.boardLikeCount}</Typography>
                        </LikeCommentWrapper>
                            <LikeCommentWrapper>
                        <Typography><ChatBubbleOutlineOutlined  style={{
                            padding: "0 2px 0 5px",
                        }
                        }/> {item.commentCount}</Typography>
                            </LikeCommentWrapper>
                        </IconContainer>
                        <Typography sx={{justifyContent:"flex-end"}}>{item.createdAt}</Typography>
                    </LikeCommentContainer>
                </ListItemButton>
            )
        )}</>
    )


}


const LatestBoard = (props: BoardProps) => {
    const [isSelected, setIsSelected] = props.boardTypes ? react.useState("FREE") : react.useState("NOTICE");
    const [data, setData] = react.useState<BoardData[]>([]);
    const [isLoading, setIsLoading] = react.useState(false);
    const [isError, setIsError] = react.useState(false);
    useEffect(() => {
        getLatestBoard(setIsError, setIsLoading, props.url,isSelected, setData);
    }, [isSelected]);
    let navigate = useNavigate();

    return (
        <CustomTable menus={props.boardTypes} title={props.title} isSelected={isSelected} setIsSelected={setIsSelected}
                     useMenu={true} useIcon={true}  isLoading={isLoading} icon={<IconButton onClick={()=>navigate('/boards/?boardType='+isSelected)}>
            <FontAwesomeIcon icon={faChevronRight} size="sm"/></IconButton>}>
            <BoardBody>
                {data?.length > 0 && !isError && <BoardList data={data}/>}
                {data?.length === 0 && !isError && <ErrorScreen icon={faXmark}  message={"게시글이 없습니다."}/>}
                {isError && <ErrorScreen icon={faExclamationTriangle}  message={"게시글을 불러오는데 실패했습니다."}/>}
            </BoardBody>
        </CustomTable>
    )
}

export default LatestBoard;