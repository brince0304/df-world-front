import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App";
import RankingTable from "../components/application/character/RankingTable";
import MainPageRankingData from "../data/MainPageRankingData";
import {HeaderData} from "../data/HeaderData";
import {SocialLogin} from "../components/application/auth/SocialLogin";
import RegisterPage from "../components/application/auth/RegisterPage";
import Header from "../components/application/header/Header";
import Board from "../components/application/board/Board";
import {BoardDetailSkeleton} from "../components/application/loading/BoardDetailSkeleton";
import {BoardDetail} from "../components/application/board/BoardDetail";
import {BoardSkeleton} from "../components/application/loading/BoardSkeleton";
import {WriteBoard} from "../components/application/board/WriteBoard";
import Main from "../components/application/main/Main";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Board">
                <Board/>
            </ComponentPreview>
            <ComponentPreview path="/BoardDetailSkeleton">
                <BoardDetailSkeleton/>
            </ComponentPreview>
            <ComponentPreview path="/BoardDetail">
                <BoardDetail/>
            </ComponentPreview>
            <ComponentPreview path="/BoardSkeleton">
                <BoardSkeleton/>
            </ComponentPreview>
            <ComponentPreview path="/WriteBoard">
                <WriteBoard/>
            </ComponentPreview>
            <ComponentPreview path="/Main">
                <Main/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;