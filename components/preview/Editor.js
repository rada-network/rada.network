import { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function MyEditor({setContent}) {
    const [editor, setEditor] = useState(false)
    useEffect(() => {
      setEditor(true)
    })

    if (!editor) return null
    
    const editorState = EditorState.createEmpty()
    const onEditorStateChange = (editorState) => {
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
	
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