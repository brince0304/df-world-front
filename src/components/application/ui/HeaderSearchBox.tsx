import Select from 'react-select';
import React, {useState} from "react";
import styled from "styled-components";
import SearchBar from '@mkyy/mui-search-bar';

interface HeaderProps {
    title: string;
    data: { value: string; label: string; }[];
}


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
      width: 40%;
      height: 37px;
      

    }
`
const SearchBarCustom = styled(SearchBar)`
  &&{
      &:hover {
        background-color: white;
        border-color: #2684FF;
      }
    }
`;

//셀렉트 박스와 검색창을 나란히 배치하는 styled div


function HeaderSearchBox(props: HeaderProps) {
    const [serverName, setServerName] = useState<string>("");
    const [serverId, setServerId] = useState<string>("");
    const [characterName, setCharacterName] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState("");
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ];

    return (
        <SearchSection>
            <SearchBarCustom width={"70%"}
                       value={characterName}
                       onChange={newValue => setCharacterName(newValue)}
                       onSearch={() => {
                           alert("검색")
                       }}
                       placeholder={"캐릭터 이름"}
                       options={["ㅎㅇㅎㅇ", "ㅎ2ㅎ2", "ㅎ3ㅎ3"]}
                       height={37}
                             style={{borderRadius: "5px"}}
            />
            <SearchSelect
                className="basic-single"
                classNamePrefix="select"
                defaultValue={props.data[0]}
                isLoading={false}
                name="color"
                options={props.data}

            />

        </SearchSection>
    )
}

export default HeaderSearchBox;



