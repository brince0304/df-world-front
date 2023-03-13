import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/application/layout/Header';
import Main from './components/application/layout/Main';
import {BrowserRouter, Route, Routes} from "react-router-dom";

interface IUserDetail {
    userId: string;
    userAuthority: [string];
}

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [userDetail, setUserDetail] = useState<IUserDetail>();

    return (
        <BrowserRouter>
            <div className="App">
                <Header title={"던파모아"} isLogin={isLogin} />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
