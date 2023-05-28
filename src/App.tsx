import React, {useEffect} from "react";
import "./App.css";
import Main from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Board from "./pages/Board/";
import {RootState, useAppDispatch} from "./redux/store";
import {getUser} from "./apis/auth/getUser";
import Characters from "./pages/Characters";
import {useSelector} from "react-redux";
import {createTheme, LinearProgress} from "@mui/material";
import WriteBoard from "./pages/Board/Write";
import {BOARD_LIST_URL} from "./data/ApiUrl";
import BoardDetail from "./pages/Board/Detail";
import {Footer} from "./components/application/footer/Footer";
import {BOARD_INSERT_FORM_ROUTE, BOARD_ROUTE} from "./data/routeLink";
import {BadRequest} from "./components/application/error/BadRequest";
import CharacterDetail from "./pages/Characters/Detail";
import MyPage from "./pages/MyPage";
import {useEventSource} from "react-sse-hooks";
import Header from "./components/Header";


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
