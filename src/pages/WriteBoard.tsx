import * as React from 'react';
import { useLocation } from 'react-router';
import '@yaireo/tagify/dist/tagify.css';
import useBoardForm from '../hooks/boardHooks/useBoardForm';
import BoardForm from '../components/BoardForm/BoardForm';
import useCreateBoardMutation from '../hooks/boardHooks/mutations/useCreateBoardMutation';
import { useEffect } from 'react';
import MyContainer from '../components/application/MyContainer';
import useBoardDetailQuery from '../hooks/boardHooks/queries/useBoardDetailQuery';
import useUpdateBoardMutaion from '../hooks/boardHooks/mutations/useUpdateBoardMutaion';
import { IBoardRequest } from '../services/boardService';

const WriteBoard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const createBoard = useCreateBoardMutation();
  const boardType = searchParams.get('boardType') || 'ALL';
  const formType = searchParams.get('request') || 'add';
  const boardId = searchParams.get('boardId') || '';
  const { data } = useBoardDetailQuery(boardId);
  const formProps = useBoardForm(data);
  const updateBoard = useUpdateBoardMutaion(boardId);
  useEffect(() => {
    if (boardType === 'ALL') {
      formProps.setValues.setBoardType('FREE');
      return;
    }
    formProps.setValues.setBoardType(boardType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateBoardCallback = (data: IBoardRequest) => {
    const newData = {
      ...data,
      id: boardId,
    } as IBoardRequest;
    updateBoard(newData);
  };

  return (
    <MyContainer>
      {formType === 'add' && <BoardForm submitHandler={createBoard} useBoardForms={formProps} buttonLabel={'작성'} />}
      {formType === 'update' && data && (
        <BoardForm
          initialValue={data}
          submitHandler={updateBoardCallback}
          useBoardForms={formProps}
          buttonLabel={'수정'}
        />
      )}
    </MyContainer>
  );
};
export default WriteBoard;
