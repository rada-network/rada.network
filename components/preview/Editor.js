import { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {stateFromHTML} from 'draft-js-import-html'
import {stateToHTML} from 'draft-js-export-html'
import {Converter} from 'showdown'

export default function MyEditor({info, className}) {
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

    const Button = ({type, children}) => {
        const cls = type == editor ? 
            'text-blue-500 hover:text-teal-800 text-sm py-1 px-1 rounded'
            :
            'text-teal-500 hover:text-teal-800 text-sm py-1 px-1 rounded'
        return <button className={cls} type="button" onClick={e => setEditor(type)}>{children}</button>
    }

    return (
        <>
            <div className="absolute -mt-8 mb-3 right-3">
                <Button type="html">HTML</Button>
                <Button type="markdown">Markdown</Button>
                <Button type="text">Text</Button>
            </div>   
            {editor == 'text' && <textarea className={className} style={{height: '70vh'}} name="content" value={info.content} onChange={e => info.setContent(e.target.value)} />}
            {editor == 'markdown' && <textarea className={className} style={{height: '70vh'}} name="content" value={mdContent} onChange={mdChange} />}
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