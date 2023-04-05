import createInstance from "../../common/axiosInstance";
import {CharactersData} from "../../interfaces/CharactersData";
import {AutoCompleteCharacterData} from "../../interfaces/AutoCompleteCharacterData";
import {SearchOption} from "../../interfaces/SeachBox";
import axios from "../../common/axiosInstance";

export const getCharactersAutoComplete = async (url:string,setData:([])=>void) => {
    axios().get(url).then((res:any)=>{
        const data =(data : AutoCompleteCharacterData[]) => {
            const result: SearchOption[] = [];
            data.forEach((item: AutoCompleteCharacterData) => {
                result.push({
                    id: item.characterId,
                    title: item.characterName,
                    content: item.serverName,
                    footer: item.jobName,
                    optionValue1: item.level,
                    optionValue2: item.serverId,
                    type: "character"
                })
            })
            return result;
        }
        setData(data(res.data));
    }).catch((err:any)=>{
        console.log(err);
    })}