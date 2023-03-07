import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App";
import RankingTable from "../components/application/ui/RankingTable";
import MainPageRankingData from "../data/MainPageRankingData";
import HeaderSearchBox from "../components/application/ui/HeaderSearchBox";
import {HeaderData} from "../data/HeaderData";
import {SocialLogin} from "../components/application/ui/SocialLogin";
import RegisterPage from "../components/application/ui/RegisterPage";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/HeaderSearchBox">
                <HeaderSearchBox title={"던파모아"} data={HeaderData.serverList}/>
            </ComponentPreview>
            <ComponentPreview path="/SocialLogin">
                <SocialLogin/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;