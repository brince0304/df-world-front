import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';
import Main from '../pages/MainPage';
import { useUserQuery } from '../hooks/authHooks/queries/useUserQuery';
import {
  BOARD_LIST_URL,
  CHARACTER_DETAIL_URL,
  CHARACTER_SEARCH_URL,
  USER_KAKAO_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_MYPAGE_URL,
} from '../apis/data/urls';
import Board from '../pages/BoardListPage';
import { BOARD_INSERT_FORM_ROUTE, BOARD_ROUTE } from '../apis/data/route';
import WriteBoard from '../pages/WriteBoard';
import Characters from '../pages/CharacterSearchPage';
import CharacterDetail from '../pages/CharacterDetailPage';
import BoardDetailPage from '../pages/BoardDetailPage';
import MyPage from '../pages/MypagePage';
import KaKaoCallback from '../pages/KakaoCallback';
import Logout from '../pages/Logout';

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
          element: <BoardDetailPage />,
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
        {
          path: USER_LOGOUT_URL,
          element: <Logout />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default PrivateRouter;
