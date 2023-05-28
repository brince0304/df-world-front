import {Content} from "../../../interfaces/CharactersData";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import deleteCharacterFromUserAccount from "../../../apis/myPage/deleteCharacterFromUserAccount";
import CharacterList from "../../../components/CharactersList";

const UserCharacters = (props: { data: Content[], refresh: () => void }) => {
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

export default UserCharacters;