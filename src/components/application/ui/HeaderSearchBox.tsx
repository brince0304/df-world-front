import Select from 'react-select';
import React, {useCallback, useState} from "react";
import styled from "styled-components";
import SearchBar from '@mkyy/mui-search-bar';

interface HeaderProps {
    title: string;
    data: { value: string; label: string; }[];
    latestSearchData: {
        serverName?: string;
        serverId?: string;
        characterName?: string;
        characterId?: string;
        level?: string;
        job?: string;
    }[];
}


const Container = styled.div`
  position: absolute;
    top: 0;
    left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left:50%;
  width: 415px;
  @media (max-width: 768px) {
    position: relative;
  }
  @media(max-width: 1024px){
    top: 0;
    right: 0;
  }
`

const SearchSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  height: 100%;
    width: 100%;
  @media (max-width: 768px) {
    //그리드 두번째줄 혼자 사용
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
    padding-top: 6px;
  }
`


const searchBarStyle = {
    width: "65%",
    border: "2px solid #2684FF",
    borderRadius: "2px",
    borderBottomRightRadius: "0px",
    borderTopRightRadius: "0px",
    borderRight: "0px",
    borderRightStyle: "none",
    '@media (max-width: 768px)': {
        width: "500px",
    }
}

const SearchOption = styled.div`
  display: flex;
  width: 98%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 0px solid #2684FF;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width:103%;
  }
`;



const SearchOptionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(226, 226, 226);
  padding: 8px 10px;
  color: gray;
  font-size: 13px;
  border-bottom: 0.5px solid silver;
`;




const SearchOptionBody = styled.div`
  display: grid
  overflow: hidden;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
  background-color: white;
  padding: 5px 10px;
  font-size: 12px;
`



const OptionRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px;
    width: 100%;
    `;

const OptionCell = styled.div`
    display: flex;
  font-size: 14px;
`;

const CharacterNameWrapper = styled.div`
    display: flex;
  font-weight: bold;
    `


const SearchBarWrapper = styled.div`
`
//셀렉트 박스와 검색창을 나란히 배치하는 styled div


function HeaderSearchBox(props: HeaderProps) {
    const [serverName, setServerName] = useState<string>("");
    const [serverId, setServerId] = useState<string>("");
    const [characterName, setCharacterName] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const onFocus = useCallback(() => {
        setIsFocused(true);
    } , [setIsFocused]);
    const onBlur = useCallback(() => {
        setIsFocused(false);
    } , [setIsFocused]);
    return (
        <Container>
            <SearchSelectContainer>
                <SearchBarWrapper onFocus={onFocus} onBlur={onBlur}>
                <SearchBar style={searchBarStyle}
                           value={characterName}
                           onChange={newValue => setCharacterName(newValue)}
                           onSearch={() => {
                               alert("검색")
                           }}
                           placeholder={"캐릭터 이름"}

                />
                </SearchBarWrapper>
                <Select
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            border: "2px solid #2684FF",
                            borderRadius: "3px",
                            borderLeftWidth: "1px",
                            borderLeftColor: "silver",
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                            width: "110px",
                            backgroundColor: 'rgb(255, 255, 255)',
                            boxShadow: '0 !important',
                            '&:hover': {},
                            '@media (max-width: 768px)': {
                                width: "130px",
                            }
                        }),
                    }
                    }
                    defaultValue={props.data[0]}
                    isLoading={false}
                    name="color"
                    options={props.data}
                />
            </SearchSelectContainer>
            {isFocused &&<SearchOption>
                <SearchOptionTitle>
                    최근 검색 결과
                </SearchOptionTitle>
                <SearchOptionBody>
                    {props.latestSearchData.map((data, index) => {
                        return (
                            <OptionRow key={index}>
                                <OptionCell>
                                    {data.serverName}
                                </OptionCell>
                                <OptionCell>
                                    <CharacterNameWrapper>
                                    {data.characterName}
                                    </CharacterNameWrapper>
                                </OptionCell>
                                <OptionCell>
                                    레벨 {data.level}
                                </OptionCell>
                                <OptionCell>
                                    {data.job}
                                </OptionCell>
                            </OptionRow>
                        )
                    })
                    }
                </SearchOptionBody>
            </SearchOption>}
        </Container>
    )
}

export default HeaderSearchBox;



