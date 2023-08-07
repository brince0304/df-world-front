import * as React from 'react';
import { useLocation } from 'react-router';
import '@yaireo/tagify/dist/tagify.css';
import useBoardForm from '../hooks/boardHooks/useBoardForm';
import BoardForm from '../components/BoardForm/BoardForm';
import useCreateBoardMutation from '../hooks/boardHooks/mutations/useCreateBoardMutation';
import { useEffect } from 'react';
import MyContainer from '../components/application/MyContainer';

const WriteBoard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const createBoard = useCreateBoardMutation();
  const boardType = searchParams.get('boardType') || 'ALL';
  const formProps = useBoardForm();

  useEffect(() => {
    if (boardType === 'ALL') {
      formProps.setValues.setBoardType('FREE');
      return;
    }
    formProps.setValues.setBoardType(boardType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyContainer>
      <BoardForm submitHandler={createBoard} useBoardForms={formProps} buttonLabel={'작성'} />
    </MyContainer>
  );
};
export default WriteBoard;
