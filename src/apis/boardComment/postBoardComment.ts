import axiosCustom from "../../common/axiosInstance";
import {BOARD_COMMENT_POST_URL} from "../../data/ApiUrl";
import {AxiosResponse} from "axios";
import {CommentForm} from "../../pages/Board/Detail";


export function postBoardComment(postData: CommentForm, boardId:string): Promise<AxiosResponse> {
    const requestForm = {
        boardId: boardId,
        commentContent: postData.commentContent
    }
    return axiosCustom().post(BOARD_COMMENT_POST_URL, requestForm);
}
