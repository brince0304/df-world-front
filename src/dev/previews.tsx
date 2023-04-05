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
        </Previews>
    );
};

export default ComponentPreviews;