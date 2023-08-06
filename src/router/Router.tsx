import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Home';
import { useUserQuery } from '../hooks/authHooks/queries/useUserQuery';
import {
  BOARD_LIST_URL,
  CHARACTER_DETAIL_URL,
  CHARACTER_SEARCH_URL,
  USER_KAKAO_LOGIN_URL,
  USER_MYPAGE_URL,
} from '../apis/data/urls';
import Board from '../pages/Board';
import { BOARD_INSERT_FORM_ROUTE, BOARD_ROUTE } from '../apis/data/route';
import WriteBoard from '../pages/Board/Write';
import Characters from '../pages/Characters';
import CharacterDetail from '../pages/Characters/Detail';
import BoardDetail from '../pages/BoardDetail';
import MyPage from '../pages/MyPage';
import KaKaoCallback from '../pages/KakaoCallback';

const PrivateRouter = () => {
  const user = useUserQuery();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: BOARD_LIST_URL,
          element: <Board />,
        },
        {
          path: BOARD_INSERT_FORM_ROUTE,
          element: user ? <WriteBoard /> : <Navigate to={BOARD_LIST_URL} />,
        },
        {
          path: CHARACTER_SEARCH_URL,
          element: <Characters />,
        },
        {
          path: CHARACTER_DETAIL_URL,
          element: <CharacterDetail />,
        },
        {
          path: BOARD_ROUTE,
          element: <BoardDetail />,
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
        {
          path: USER_MYPAGE_URL,
          element: user ? <MyPage /> : <Navigate to="/" />,
        },
        {
          path: USER_KAKAO_LOGIN_URL,
          element: <KaKaoCallback />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default PrivateRouter;
