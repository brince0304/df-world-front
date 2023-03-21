import {TableCustom} from "./TableCustom";
import {useParams, useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {BoardData} from "../../../interfaces/BoardData";
import axios from "axios";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 15%;
  @media (max-width: 768px) {
    padding: 10% 2%;
  }
`;

const SelectSearchWrapper = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    position: absolute;
  left : 15%;
  right : 15%;
  @media (max-width: 768px) {
    position: relative;
    width:70%;
  }
     
  
`




const boardSearchType ={
    type : "board",
    url : "/boards/"
}

function getBoardTypes(p: string | undefined) {
    switch (p) {
        case "FREE":
            return "자유게시판";
        case "NOTICE":
            return "공지사항";
        case "MARKET":
            return "거래";
        case "QUESTION":
            return "질문/답변";
        case "REPORT":
            return "사건/사고";
        case "RECRUITMENT":
            return "구인";
        default:
            return "전체";
    }
}


const BoardBody = (props: BoardData) => {
    return (
        props.content.map((data, index: number) => {
            }

        )
    );
}

const SelectOptions = [
    {value: "title", label: "제목"},
    {value: "content", label: "내용"},
];



const Board = () => {
    let params = useParams();
    const [data, setData] = useState<BoardData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [boardType, setBoardType] = useState<string>(getBoardTypes(params.boardType ? params.boardType : ""));
    const [searchType, setSearchType] = useState<string>(params.searchType ? params.searchType : "");
    const [searchKeyword, setSearchKeyword] = useState<string>(params.searchKeyword ? params.searchKeyword : "");
    const [page, setPage] = useState<number>(params.page ? parseInt(params.page) : 0);
    let navigate = useNavigate();
    useEffect(() => {
            const fetchData = async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                    const result = await axios(
                        `/boards/?boardType=${params.boardType ? params.boardType : ""}&page=${page}&searchType=${searchType}&searchKeyword=${searchKeyword}`
                    );
                    setData(result.data.articles);
                } catch (error) {
                    setIsError(true);
                }
                setIsLoading(false);
            };
            fetchData().then(r => {
                console.log("data: ", data);
            });
        }
        , [boardType, page, searchType, searchKeyword]);
    return (
        <Container>
            <TableCustom title={boardType} useMenu={false} isLoading={isLoading} useIcon={true}  icon={<FontAwesomeIcon icon={faChevronRight} size="sm"/>}>
                <SelectSearchWrapper>
                <SearchBox selectOptions={[]} useSearchOption={true} placeholder={"검색"} selectLoading={false} searchType={boardSearchType}
                           handleNavigate={()=>{}} searchValue={searchKeyword} selectValue={searchType} handleSearchValueChange={()=>{}}
                           handleSelectValueChange={()=>{}}/>
                </SelectSearchWrapper>
            </TableCustom>


        </Container>
    );
}
export default Board;
