import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/application/layout/Header';
import Main from './components/application/layout/Main';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Board from "./components/application/layout/Board";
import {RootState, useAppDispatch} from "./redux/store";
import {getUser} from "./api/auth/getUser";
import {Characters} from "./components/application/layout/Characters";
import ReactLoading from "react-loading";
import styled from 'styled-components';
import LoadingBar from "./components/application/ui/LoadingBar";
import {useSelector} from "react-redux";
import {CharacterDetail} from "./components/application/layout/CharacterDetail";






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
        getUser(dispatch);
    }, []);
    return (
            <div className="App">
                {isLoading && <LoadingBar progress={progress}/>}
                <Header title={"커뮤니티"} />
                {isLoading && <LoadingWrapper>
                <ReactLoading type={"spin"} color={"cornflowerblue"} width={"35px"} height={"35px"}/>
                </LoadingWrapper>
                }
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/boards/" element={<Board />}></Route>
                    <Route path="/characters/:serverId" element={<Characters />}></Route>
                    <Route path="/details/" element={<CharacterDetail />}></Route>
                </Routes>
            </div>
    );
}

export default App;
