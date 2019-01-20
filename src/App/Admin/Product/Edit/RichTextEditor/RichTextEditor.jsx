import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import htmlToDraft from 'html-to-draftjs';    // 将已有的 html 标签内容，生成一个 draft 内容

import "./css/RichTextEditor.css";

/* 富文本编辑器组件 */
export default class RichTextEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()    // 默认创建一个空的文本内容
        }
    }
    
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    
    getRichTextEditor = ()=>{    // 让父组件调
        const {editorState} = this.state;
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    };
    
    componentWillMount(){
        const detail = this.props.detail;
        if(detail){
            const blocksFromHtml = htmlToDraft(detail);    // 将传过来的 detail 转换
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState    // 更新界面相关内容
            })
        }
    }
    
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}    /* 初始显示文本的内容 */
                    wrapperClassName="demo-wrapper"    /* 包裹区类名 */
                    editorClassName="demo-editor"    /* 编辑区类名 */
                    onEditorStateChange={this.onEditorStateChange}    /* 监听，实时获取最新的输入内容 */
                />
                {/*<textarea    // draft2html */}
                    {/*disabled*/}
                    {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}