import createInstance from "../../common/axios";

export const getLatestBoard = async (setIsError:(boolean:boolean)=>void,setIsLoading:(boolean:boolean)=>void,url:string,isSelected:string,setData:([])=>void) => {
    setIsError(false);
    setIsLoading(true);
    const instance = createInstance(url+isSelected);
       instance.get('').then((res:any)=>{
        if (res.data.content.length > 5) {
            res.data.content = res.data.content.slice(0, 5);
        }
        setData(res.data.content);
        setIsLoading(false);
    }).catch((err:any)=>{
        setIsError(true);
        setIsLoading(false);
    })}