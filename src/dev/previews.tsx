import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App";
import BoardDetailSkeleton from "../components/Skeleton/BoardDetailSkeleton";
import BoardDetail from "../pages/Board/Detail";
import BoardListSkeleton from "../components/Skeleton/BoardListSkeleton ";
import WriteBoard from "../pages/Board/Write";
import Main from '../pages/Home';
import Board from '../pages/Board';
import ValidateForm from "../components/ValidateTextField";

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
                <BoardListSkeleton/>
            </ComponentPreview>
            <ComponentPreview path="/WriteBoard">
                <WriteBoard/>
            </ComponentPreview>
            <ComponentPreview path="/Index">
                <Main/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;