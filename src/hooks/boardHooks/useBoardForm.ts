import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { IBoardRequest, IHashtagRequest } from '../../services/boardService';
import { IBoardDetail } from '../../interfaces/IBoardDetail';

const useBoardForm = (initialValues?: IBoardDetail) => {
  const schema = yup.object().shape({
    boardTitle: yup
      .string()
      .default('')
      .required('제목을 입력해주세요.')
      .max(50, '제목은 50자 이내로 입력해주세요.')
      .min(3, '제목은 3자 이상으로 입력해주세요.'),
    boardContent: yup
      .string()
      .default('')
      .required('내용을 입력해주세요.')
      .max(10000, '내용은 10000자 이내로 입력해주세요.')
      .min(10, '내용은 10자 이상으로 입력해주세요.'),
    id: yup.number().default(undefined),
    boardType: yup.string().required('게시판 타입을 선택해주세요.').default('FREE'),
    boardFiles: yup.string().default(''),
    characterId: yup.string().default(''),
    serverId: yup.string().default(''),
    hashtag: yup
      .array()
      .default([] as IHashtagRequest[])
      .max(3, '해시태그는 3개까지 입력 가능합니다.')
      .of(
        yup.object().shape({
          value: yup
            .string()
            .max(7, '해시태그는 8자 이내로 입력해주세요.')
            .min(2, '해시태그는 2자 이상으로 입력해주세요.'),
          __isValid: yup.boolean().default(false),
        }),
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
    setError,
  } = useForm<IBoardRequest>({
    mode: 'onChange',
    defaultValues: {
      boardTitle: initialValues?.article.boardTitle || '',
      boardContent: initialValues?.article.boardContent || '',
      boardFiles: initialValues?.article.boardFiles || '',
      boardType: initialValues?.article.boardType || 'FREE',
      characterId: initialValues?.article.character?.characterId,
      serverId: initialValues?.article.character?.serverId,
      hashtag: initialValues?.article.hashtags.map((hashtag) => ({
        value: hashtag,
      })),
    },
    resolver: yupResolver(schema),
  });

  const watchBoardType = watch('boardType');
  const watchBoardTitle = watch('boardTitle');
  const watchBoardContent = watch('boardContent');
  const watchBoardFiles = watch('boardFiles');
  const watchCharacterId = watch('characterId');
  const watchServerId = watch('serverId');
  const watchValues = {
    watchBoardType,
    watchBoardTitle,
    watchBoardContent,
    watchBoardFiles,
    watchCharacterId,
    watchServerId,
    watchHashtag: watch('hashtag'),
  };

  const setValues = {
    setBoardType: (value: string) => setValue('boardType', value),
    setBoardTitle: (value: string) => setValue('boardTitle', value),
    setBoardContent: (value: string) => setValue('boardContent', value),
    setBoardFiles: (value: string) => setValue('boardFiles', value),
    setCharacterId: (value: string) => setValue('characterId', value),
    setServerId: (value: string) => setValue('serverId', value),
    setHashtag: (value: any) => setValue('hashtag', value),
  };

  return {
    register,
    handleSubmit,
    errors,
    setValues,
    watchValues,
    setError,
    clearErrors,
  };
};

export default useBoardForm;
