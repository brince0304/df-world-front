import React, { Suspense } from 'react';
import './App.css';
import Main from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Board from './pages/Board/';
import Characters from './pages/Characters';
import WriteBoard from './pages/Board/Write';
import { BOARD_LIST_URL } from './apis/data/urls';
import BoardDetail from './pages/Board/Detail';
import { Footer } from './components/application/footer/Footer';
import { BOARD_INSERT_FORM_ROUTE, BOARD_ROUTE } from './apis/data/route';
import { BadRequest } from './components/application/error/BadRequest';
import CharacterDetail from './pages/Characters/Detail';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import { useUser } from './hooks/authHooks/useUser';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLoading from './components/application/loading/AppLoading';

function App() {
  const { user } = useUser();

  return (
    <Suspense fallback={<AppLoading/>}>
    <div className="App">
      <Header title={'커뮤니티'} />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path={BOARD_LIST_URL} element={<Board />}></Route>
        <Route
          path={BOARD_INSERT_FORM_ROUTE}
          element={user ? <WriteBoard /> : <Navigate to={BOARD_LIST_URL} />}
        ></Route>
        <Route path="/characters/:serverId" element={<Characters />}></Route>
        <Route path="/details/" element={<CharacterDetail />}></Route>
        <Route path={BOARD_ROUTE} element={<BoardDetail />}></Route>
        <Route path="/*" element={<BadRequest />}></Route>
        <Route path="/mypage/" element={user ? <MyPage /> : <Navigate to={'/'} />}></Route>
      </Routes>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </div>
    </Suspense>
  );
}

export default App;
