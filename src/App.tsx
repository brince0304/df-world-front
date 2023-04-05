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
import LoadingBar from "./components/application/ui/LoadingBar";
import {useSelector} from "react-redux";
import {CharacterDetail} from "./components/application/character/CharacterDetail";
import {CircularProgress, createTheme, LinearProgress, ThemeProvider} from "@mui/material";
import {WriteBoard} from "./components/application/board/WriteBoard";
import {BOARD_LIST_URL} from "./data/ApiUrl";
import {BoardDetail} from "./components/application/board/BoardDetail";






const LoadingWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  z-index: 1000;
    `;


function App() {
    const isLoading = useSelector((state: RootState) => state.app.isLoading);
    const progress = useSelector((state: RootState) => state.app.progress);
    const dispatch = useAppDispatch();
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
                    <Route path="/boards/write" element={<WriteBoard />}></Route>
                    <Route path="/characters/:serverId" element={<Characters />}></Route>
                    <Route path="/details/" element={<CharacterDetail />}></Route>
                    <Route path="/boards/:boardId" element={<BoardDetail />}></Route>
                </Routes>
            </div>
    );
}

export default App;
