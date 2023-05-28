import axios from "../../common/axiosInstance"
import {BOARD_COMMENT_GET_URL} from "../../data/ApiUrl";
import {CommentListData} from "../../interfaces/CommentListData";
import {ContentFlowProps} from "../../components/BestContent";
import {ReactNode} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import {Chip, styled} from "@mui/material";
import Box from "@mui/material/Box";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage} from "@fortawesome/free-solid-svg-icons";




export const getBoardComment = async (boardId: string)  => {
    return await axios().get(BOARD_COMMENT_GET_URL + boardId);
}