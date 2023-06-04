import axios from "axios";

export interface HookImageResponse {
    url: string;
    fileId: number;
}


export const postImage = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(response.data){
            const data = {
                url :`/files/?name=${response.data.fileName}`,
                fileId : response.data.id,
            }
            return data as HookImageResponse;
        }
    }
    catch (e) {
        console.log(e);
    }
    return '';
}