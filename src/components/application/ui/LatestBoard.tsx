import react, {useEffect} from "react";
import styled from "styled-components";
import {TableCustom} from "../layout/TableCustom";
import BoardData from "../../../data/BoardData";
import React from "react";
import boardData from "../../../data/BoardData";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading';
import {faXmark} from "@fortawesome/free-solid-svg-icons";

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
  color : black;
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
    grid-template-columns: 130px 80px;
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

const ErrorWrapper = styled.div`
        display: flex;
          flex-direction: row;
              justify-content: center;
                align-items: center;
        
          width: 100%;  
          height: 100%; 
          font-size: 20px;
          font-weight: 700;
          color: black;
          padding: 20px 0;
`



const NoDataWrapper = styled.div`
      display: flex;
        flex-direction: column;
          justify-content: center;  
          align-items: center;  
          width: 100%;
          height: 100%;
          font-size: 20px;
          font-weight: 700;
          color: gray;
          padding: 20px 0;
`

interface BoardProps {
    title: string,
    boardTypes?: { name: string, id: string }[],
    url: string,
}

interface BoardData{
        id:string,
        boardTitle: string,
        createdAt: string,
        userNickname: string,
        userProfileImgUrl: string,
        commentCount: number,
        boardLikeCount: number,
        boardViewCount: number,
}

const BoardList = (props: {data:BoardData[]}) => {
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
                        padding: "0 2px 0 5px",}
                        }/> {item.boardLikeCount}</span>
                    </LikeCommentWrapper>
                    <LikeCommentWrapper>
                        <span><FontAwesomeIcon icon={faComment} style={{
                            padding: "0 2px 0 5px",}
                        }/> {item.commentCount}</span>
                    </LikeCommentWrapper>
                    </LikeCommentContainer>
                    <BoardFooter>
                        <NicknameCreatedAtContainer>
                        <NicknameWrapper>
                            <ProfileImgWrapper>
                        <img src={item.userProfileImgUrl} alt="profile" style={{width: "25px", height: "25px"}}/>
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
    const [isSelected, setIsSelected] = props.boardTypes ? react.useState("FREE"):react.useState("NOTICE");
    const [data, setData] = react.useState<BoardData[]>([]);
    const [isLoading, setIsLoading] = react.useState(false);
    const [isError, setIsError] = react.useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios(props.url+isSelected);
                if(result.data.content.length>5){
                    result.data.content = result.data.content.slice(0,5);
                }
                setData(result.data.content);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
        };
        fetchData();
    }, [isSelected]);

    return (
        <TableCustom menus={props.boardTypes} title={props.title} isSelected={isSelected} setIsSelected={setIsSelected}
                     useMenu={true} useArrow={true} onClickArrow={() => {
        }} isLoading={isLoading}>
            <BoardBody>
                {data?.length>0 && <BoardList data={data}/>}
                {data?.length ===0 && <NoDataWrapper><FontAwesomeIcon icon={faXmark} size={"xl"}/>게시글이 없습니다.</NoDataWrapper>}
                {isError && <ErrorWrapper>에러가 발생했습니다.</ErrorWrapper>}
            </BoardBody>
        </TableCustom>
    )
}

export default LatestBoard;
