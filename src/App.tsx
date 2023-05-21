import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/application/header/Header';
import Main from './components/application/main/Main';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Board from "./components/application/board/Board";
import {RootState, useAppDispatch} from "./redux/store";
import {getUser} from "./api/auth/getUser";
import {Characters} from "./components/application/character/Characters";
import ReactLoading from "react-loading";
import styled from 'styled-components';
import {useSelector} from "react-redux";
import {CircularProgress, createTheme, LinearProgress, ThemeProvider} from "@mui/material";
import {WriteBoard} from "./components/application/board/WriteBoard";
import {BOARD_LIST_URL} from "./data/ApiUrl";
import {BoardDetail} from "./components/application/board/BoardDetail";
import {Footer} from "./components/application/footer/Footer";
import {BOARD_INSERT_FORM_ROUTE, BOARD_ROUTE} from "./data/routeLink";
import {BadRequest} from "./components/application/error/BadRequest";
import {CharacterDetail} from "./components/application/character/CharacterDetail";
import {MyPage} from "./components/application/myPage/MyPage";
import {setNotificationCount} from "./redux";
import {EventSourceProvider, useEventSource} from "react-sse-hooks";



const light = createTheme({
    palette: {
        mode: "light",
    },
});



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
function App() {
    const isLoading = useSelector((state: RootState) => state.app.isLoading);
    const progress = useSelector((state: RootState) => state.app.progress);
    const dispatch = useAppDispatch();
    const userDetails = useSelector((state: RootState) => state.auth.userDetail);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const eventSource = useEventSource({
        source: "/sub?userId=" + userDetails.userId,
        options: {
            withCredentials: true,
        }
}
) as EventSource;
    useEffect(() => {
        dispatch(getUser());
    }, []);
    return (
            <div className="App">
                {isLoading && <LinearProgress value={progress}/>}
                <Header title={"커뮤니티"} />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path={BOARD_LIST_URL} element={<Board />}></Route>
                    <Route path={BOARD_INSERT_FORM_ROUTE} element={<WriteBoard />}></Route>
                    <Route path="/characters/:serverId" element={<Characters />}></Route>
                    <Route path="/details/" element={<CharacterDetail />}></Route>
                    <Route path={BOARD_ROUTE} element={<BoardDetail />}></Route>
                    <Route path="/*" element={<BadRequest />}></Route>
                    <Route path="/mypage/" element={<MyPage />}></Route>
                </Routes>
                <Footer />
            </div>
    );
}

export default App;
