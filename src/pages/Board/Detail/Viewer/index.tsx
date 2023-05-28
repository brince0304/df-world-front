import {Viewer} from "@toast-ui/react-editor";
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

 const ToasterViewer = (props:{content:string}) => {
    return (
        <Viewer
              initialValue={props.content}
        />
    );
};

export default ToasterViewer;