import axios from "axios";
import axiosInstance from "../../common/axiosInstance";

export default async function (formData: FormData) {
    return await axios.put("/users/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}