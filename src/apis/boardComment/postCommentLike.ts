import createInstance from "../index";

export const postCommentLike = async (boardId: string, commentId: string) => {
    const url = `/comments/like-comment?commentId=${commentId}&boardId=${boardId}`;
    return await createInstance.post(url);
}