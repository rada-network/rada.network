import Layout from "../components/preview/Layout";
//import NewsForm from "../components/preview/NewsForm";
import NewsView from "../components/preview/NewsView";
import { useState } from "react";
import dynamic from 'next/dynamic'

const NewsForm = dynamic(() => import("../components/preview/NewsForm"), {
    ssr: false
})
export default function Index() {
    const [title, setTitle] = useState('Post Title')
    const [content, setContent] = useState('Post Content here')
    const [editor, setEditor] = useState('html')

    const info = {title, setTitle, content, setContent, editor, setEditor}

    const Preview = () => {
        return <NewsView item={info} />
    }

    return (
        <Layout Preview={Preview}>
            <NewsForm info={info}/>
        </Layout>
    )
}