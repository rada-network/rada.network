import { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateFromHTML} from 'draft-js-import-html'
import {stateToHTML} from 'draft-js-export-html'
import {Converter} from 'showdown'

export default function MyEditor({info}) {
    const [mdContent, setMdContent] = useState()
    const [editorState, setEditorState] = useState(null)

    const [editor, setEditor] = useState('')
    useEffect(() => {
      if (!editor) setEditor('html')
      let contentState = stateFromHTML(info.content)
      setEditorState(EditorState.createWithContent(contentState))
      setMdContent(converter.makeMarkdown(info.content))
    }, [editor])
    // let contentState = stateFromMarkdown(info.content)
    // const editorState = EditorState.createEmpty()
    const onEditorStateChange = (_editorState) => {
        setEditorState(_editorState)
        info.setContent(stateToHTML(_editorState.getCurrentContent()))
    }

    const converter = new Converter()

    const mdChange = e => {
        setMdContent(e.target.value)
        info.setContent(converter.makeHtml(e.target.value))
    }

    const EditorComp = () => {
        if (!editor) return null

        if (editor == 'text') return <textarea name="content" value={info.content} onChange={e => info.setContent(e.target.value)} />
        if (editor == 'markdown') return <textarea name="content" value={mdContent} onChange={mdChange} />
        
        return (
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
        )    
    }

    return (
        <>
            <div>
                <button onClick={e => setEditor('html')}>HTML</button>
                <button onClick={e => setEditor('markdown')}>Markdown</button>
                <button onClick={e => setEditor('text')}>Text</button>    
            </div>            
            {editor == 'text' && <textarea name="content" value={info.content} onChange={e => info.setContent(e.target.value)} />}
            {editor == 'markdown' && <textarea name="content" value={mdContent} onChange={mdChange} />}
            {editor == 'html' && <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />}
        </>
    )
}