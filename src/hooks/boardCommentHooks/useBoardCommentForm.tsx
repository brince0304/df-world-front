import { yupResolver } from '@hookform/resolvers/yup';
import { CommentListDataComments } from 'interfaces/CommentListData';
import {  useForm } from 'react-hook-form';
import {  IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';
import * as yup from 'yup';

const useBoardCommentForm = (initialValue?: CommentListDataComments) => {
    const schema = yup.object().shape({
        commentContent: yup
          .string()
          .default(String(initialValue?.commentContent))
          .required('댓글을 입력해주세요.')
          .min(2, '댓글을 2자 이상 입력해주세요')
          .max(1000, '댓글은 1000자 이내로 입력해주세요.'),
          boardId: yup.string().default(String(initialValue?.boardId)),
            commentId: yup.string().default(String(initialValue?.id)),
      });
    const {
            register,
            handleSubmit,
            setValue,
            watch,
            formState: { errors },
          } = useForm<IBoardCommentUpdateChildrenRequest>({
            mode: 'onChange',
            resolver: yupResolver(schema),
            defaultValues: {
                commentContent: initialValue?.commentContent,
                boardId: Number(initialValue?.boardId),
                commentId: Number(initialValue?.id),
            }
          });

          const watchValues = {
            watchContent: watch('commentContent'),
            watchBoardId: watch('boardId'),
            watchCommentId: watch('commentId'),
          }

          const setValues = {
            setContent: (data: string) => setValue('commentContent', data),
            setBoardId: (data: number) => setValue('boardId', data),
            setCommentId: (data: number) => setValue('commentId', data),
          }

          return {
            register,
            watchValues,
            handleSubmit,
            setValues,
            errors,
          }
    
}

export default useBoardCommentForm;