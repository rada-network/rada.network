import Layout from "../components/preview/Layout";
import NewsForm from "../components/preview/NewsForm";
import NewsView from "../components/preview/NewsView";
import { useState } from "react";

export default function Index() {
    const [title, setTitle] = useState('Post Title')
    const [content, setContent] = useState('Post Content here')

    const Preview = () => {
        return <NewsView item={{title, content}} />
    }

    return (
        <Layout Preview={Preview}>
            <NewsForm 
                title={title} setTitle={setTitle} 
                setContent={setContent} 
            />
        </Layout>
    )
}