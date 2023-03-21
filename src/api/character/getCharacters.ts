import createInstance from "../../common/axios";
import {CharactersData} from "../../interfaces/CharactersData";
import store from "../../redux/store";
import {setIsLoading, setProgress} from "../../redux";

export const getCharacters = async (setIsError:(boolean:boolean)=>void,setCharacterLoading:(boolean:boolean)=>void,url:string,setData:({}:CharactersData)=>void) => {
    store.dispatch(setIsLoading(true));
    setIsError(false);
    setIsLoading(true);
    const instance = createInstance(url);
    store.dispatch(setProgress(10));
    store.dispatch(setProgress(25));
    store.dispatch(setProgress(50));
    store.dispatch(setProgress(65));
    instance.get('').then((res:any)=>{
        setData(res.data.characters);
        setIsLoading(false);
        store.dispatch(setProgress(70));
        store.dispatch(setProgress(100));
        store.dispatch(setIsLoading(false));
    }).catch((err:any)=>{
        store.dispatch(setProgress(70));
        store.dispatch(setProgress(100));
        store.dispatch(setIsLoading(false));
        setIsError(true);
        setIsLoading(false);
    })}