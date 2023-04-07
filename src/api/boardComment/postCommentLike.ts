import axiosInstance from "../../common/axiosInstance";

export const postCommentLike = async (boardId: string, commentId: string) => {
    const url = `/comments/like-comment?commentId=${commentId}&boardId=${boardId}`;
    return await axiosInstance().post(url);
}