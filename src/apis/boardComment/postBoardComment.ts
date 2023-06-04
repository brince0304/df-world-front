import {BOARD_COMMENT_POST_URL} from "../../data/ApiUrl";
import {AxiosResponse} from "axios";
import {CommentForm} from "../../pages/Board/Detail";
import createInstance from "../index";


export function postBoardComment(postData: CommentForm, boardId:string): Promise<AxiosResponse> {
    const requestForm = {
        boardId: boardId,
        commentContent: postData.commentContent
    }
    return createInstance.post(BOARD_COMMENT_POST_URL, requestForm);
}
