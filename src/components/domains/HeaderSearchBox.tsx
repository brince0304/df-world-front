import {FormControl, TextField, Button, Select, MenuItem, InputLabel} from "@mui/material";
import React, {useState} from "react";
import styled from "styled-components";
import SearchBar from '@mkyy/mui-search-bar';
import  { SelectChangeEvent } from '@mui/material/Select';
import SelectInput from "@mui/material/Select/SelectInput";
import {useTheme} from '@mui/material/styles';
import muiStyles from '@mui/material/styles';
interface HeaderProps {
    title: string;
    data: { serverId: string; name: string; }[];
}

const SearchBox = styled(SearchBar)`
  && {
    border-left: 3px solid cornflowerblue;
    border-top: 3px solid cornflowerblue;
    border-bottom: 3px solid cornflowerblue;
    border-right: 0px solid black;

  }
`
const SearchSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  padding-top: 15px;
    @media (max-width: 768px) {
    //그리드 두번째줄 혼자 사용
    grid-column-start: 1;
    grid-column-end: 5;
      grid-row-start: 2;
        grid-row-end: 3;
      padding-top: 0;
    }
`





const SearchSelect = styled(Select)`
    && {
    border-left: 0.5px solid black;
    border-top: 3px solid cornflowerblue;
    border-bottom: 3px solid cornflowerblue;
    border-right: 3px solid cornflowerblue;
      height: 40px;
      background-color: white;
      width: 30%;
    }
`
//셀렉트 박스와 검색창을 나란히 배치하는 styled div


function HeaderSearchBox(props: HeaderProps) {
    const [serverName, setServerName] = useState<string>("");
    const [serverId, setServerId] = useState<string>("");
    const [characterName, setCharacterName] = useState<string>("");
    return (
        <SearchSection>
                <SearchBox width={"70%"}
                    value={characterName}
                    onChange={newValue => setCharacterName(newValue)}
                    onSearch={()=>{}}
                           placeholder={"캐릭터 이름"}
                           options={["ㅎㅇㅎㅇ","ㅎ2ㅎ2","ㅎ3ㅎ3"]}
                />
            <SearchSelect   value={serverId}
                            onChange={(e)=>{
                                setServerId(e.target.value as string);}}
                            autoWidth={true}
                            displayEmpty={true}
            >
                <MenuItem value={"all"}>
                    <em>전체</em>
                </MenuItem>
                {props.data.map((server) => {
                    return <MenuItem
                        value={server.serverId}
                                      key={server.serverId}>{server.name}</MenuItem>
                })
                }
            </SearchSelect>
        </SearchSection>
    )
}

export default HeaderSearchBox;



