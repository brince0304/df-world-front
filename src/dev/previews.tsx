import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App";
import RankingTable from "../components/application/ui/RankingTable";
import MainPageRankingData from "../data/MainPageRankingData";
import SearchBox from "../components/application/layout/SearchBox";
import {HeaderData} from "../data/HeaderData";
import {SocialLogin} from "../components/application/ui/SocialLogin";
import RegisterPage from "../components/application/ui/RegisterPage";
import Header from "../components/application/layout/Header";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;