import {useLocation, useParams} from "react-router";
import {useEffect, useState} from "react";
import {getCharacterDetail} from "../../../api/character/getCharacterDetail";
import {CharacterDetails} from "../../../interfaces/CharacterDetails";
import {useSelector} from "react-redux";
import store, {RootState, useAppDispatch} from "../../../redux/store";
import {getCharacters} from "../../../api/character/getCharacters";

export const CharacterDetail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const characterId = searchParams.get('characterId');
    const serverId = searchParams.get('serverId');
    const[data, setData] = useState<CharacterDetails>({} as CharacterDetails);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (characterId && serverId) {
             ;
            dispatch(getCharacterDetail(`http://localhost:8080/characters/detail?characterId=${characterId?characterId:""}&serverId=${serverId?serverId:""}`,setData));
        }
    }, [characterId, serverId]);

    return (
        <>gdgdgdga</>
    );
}