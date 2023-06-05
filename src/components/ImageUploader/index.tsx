import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {Avatar, Button} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import {useEffect, useState} from "react";
import putAvatar from "../../apis/myPage/putAvatar";
import {getUserDetails} from "../../apis/auth/getUserDetails";

function ImageUploader(props:{handleClose:()=>void}) {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.auth.userDetail);
    const [profile, setProfile] = useState<File | null>(null);
    const [profileUrl, setProfileUrl] = useState<string>("");
    useEffect(() => {
        if (user) {
            setProfileUrl(user.profileImgPath);
        }
    }, []);

    const handleUpload = () => {
        if (profile) {
            const formData = new FormData();
            formData.append("file", profile);
            putAvatar( formData).then((res) => {
                window.alert("프로필 사진이 변경되었습니다.");
                dispatch(getUserDetails())
                props.handleClose();
            }).catch((err) => {
                window.alert("프로필 사진 변경에 실패하였습니다.");
                console.log(err);
            });
        }
    }
    const handleChange = (newValue: File | null) => {
        setProfile(newValue);
        if(!newValue) {
            setProfileUrl(user.profileImgPath);
        }else{
        setProfileUrl(URL.createObjectURL(newValue));}

    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            padding: 2,
        }}>
            <Avatar src={profileUrl} sx={{width: 50, height: 50, position: "relative"}}/>
            <MuiFileInput
                value={profile}
                onChange={handleChange}
                inputProps={{
                    accept: "image/*",
                    id: "icon-button-file",
                }}
            />
            <Button variant="contained" onClick={handleUpload}>변경</Button>

        </Box>
    );
}

export default ImageUploader;
