import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { IBoardRequest } from '../../service/boardService';
import { IBoardDetail } from '../../interfaces/IBoardDetail';
import useCreateBoard from './useCreateBoard';

const useBoardForm = (initialValue?:IBoardDetail) => {
  const schema = yup.object().shape({
    boardTitle: yup
      .string().default(initialValue?.article.boardTitle || '')
      .required('제목을 입력해주세요.')
      .max(50, '제목은 50자 이내로 입력해주세요.')
      .min(3, '제목은 3자 이상으로 입력해주세요.'),
    boardContent: yup
      .string().default(initialValue?.article.boardContent || '')
      .required('내용을 입력해주세요.')
      .max(10000, '내용은 10000자 이내로 입력해주세요.')
      .min(10, '내용은 10자 이상으로 입력해주세요.'),
    id: yup.number().default(initialValue?.article.id || undefined),
    boardType: yup.string().required('게시판 타입을 선택해주세요.').default(initialValue?.article.boardType || 'FREE'),
    boardFiles: yup.string().default(''),
    characterId: yup.string().default(initialValue?.article.character.characterId || ''),
    serverId: yup.string().default(initialValue?.article.character.serverId || ''),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IBoardRequest>({
    mode: 'onChange',
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
  }

  const setValues = {
    setBoardType: (value:string) => setValue('boardType', value),
    setBoardTitle: (value:string) => setValue('boardTitle', value),
    setBoardContent: (value:string) => setValue('boardContent', value),
    setBoardFiles: (value:string) => setValue('boardFiles', value),
    setCharacterId: (value:string) => setValue('characterId', value),
    setServerId: (value:string) => setValue('serverId', value),
  }

  const createBoard = useCreateBoard();
  const onSubmit = (data: IBoardRequest) => {
    createBoard(data);
  }

  return {
    register,
    handleSubmit,
    errors,
    setValues,
    watchValues,
    onSubmit,
  }
}

export default useBoardForm;