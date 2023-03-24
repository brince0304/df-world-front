import react, {useEffect} from "react";
import styled from "styled-components";
import {TableCustom} from "../layout/TableCustom";
import BoardData from "../../../data/BoardData";
import React from "react";
import boardData from "../../../data/BoardData";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faExclamationTriangle, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {ErrorScreen} from "./ErrorScreen";
import {getLatestBoard} from "../../../api/board/getLatestBoard";
import {Avatar} from "@mui/material";

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
  display: grid;
  grid-template-columns: 70px 70px;
`

const NicknameCreatedAtContainer = styled.div`
  display: grid;
  justify-content: flex-start;
    align-items: center;
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
                <BoardCell key={index} onClick={onClickHandler} data-id={item.id}>
                    <BoardTitle>
                        <span>{item.boardTitle}</span>
                    </BoardTitle>
                    <LikeCommentContainer>
                        <LikeCommentWrapper>
                        <span><FontAwesomeIcon icon={faHeart} style={{
                            padding: "0 2px 0 5px",
                        }
                        }/> {item.boardLikeCount}</span>
                        </LikeCommentWrapper>
                        <LikeCommentWrapper>
                        <span><FontAwesomeIcon icon={faComment} style={{
                            padding: "0 2px 0 5px",
                        }
                        }/> {item.commentCount}</span>
                        </LikeCommentWrapper>
                    </LikeCommentContainer>
                    <BoardFooter>
                        <NicknameCreatedAtContainer>
                            <NicknameWrapper>
                                <ProfileImgWrapper>
                                    <Avatar src={item.userProfileImgUrl} alt="profile"
                                         style={{width: "25px", height: "25px"}}/>
                                </ProfileImgWrapper>
                                <span>{item.userNickname}</span>
                            </NicknameWrapper>
                            <span>{item.createdAt}</span>
                        </NicknameCreatedAtContainer>
                    </BoardFooter>
                </BoardCell>
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

    return (
        <TableCustom menus={props.boardTypes} title={props.title} isSelected={isSelected} setIsSelected={setIsSelected}
                     useMenu={true} useIcon={true} onClickArrow={() => {
        }} isLoading={isLoading} icon={<FontAwesomeIcon icon={faChevronRight} size="sm"/>}>
            <BoardBody>
                {data?.length > 0 && !isError && <BoardList data={data}/>}
                {data?.length === 0 && !isError && <ErrorScreen icon={faXmark}  message={"게시글이 없습니다."}/>}
                {isError && <ErrorScreen icon={faExclamationTriangle}  message={"게시글을 불러오는데 실패했습니다."}/>}
            </BoardBody>
        </TableCustom>
    )
}

export default LatestBoard;
