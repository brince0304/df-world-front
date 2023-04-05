import axios from "../../common/axiosInstance";
import {BOARD_GET_CHARACTERS_URL} from "../../data/ApiUrl";
import {Content} from "../../interfaces/CharactersData";

export const getBoardCharacterSearch = async (setIsLoading:(boolean:boolean)=>void,setData:({}:Content[])=>void,url:string) => {
    setIsLoading(true);
    axios().get(url)
        .then((res) => {
                const data = res.data;
                if (data) {
                    setIsLoading(false);
                    setData(data);
                } else {
                    setIsLoading(false);
                    setData([]);
                }
            }
        ).catch((err) => {
        setIsLoading(false);
    })
}