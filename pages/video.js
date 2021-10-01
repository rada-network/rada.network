import Layout from "../components/preview/Layout";
import VideoForm from "../components/preview/VideoForm";
import VideoView from "../components/preview/VideoView";
import { useState } from "react";

export default function Index() {
    const [title, setTitle] = useState('Video Title')
    const [youtubeId, setYoutubeId] = useState('1BYT4gjP3fQ')
    const [content, setContent] = useState('Video Description')

    const info = {title, setTitle, content, setContent, youtubeId, setYoutubeId}

    const Preview = () => {
        return <VideoView item = {info}
        />
    }

    return (
        <Layout Preview={Preview}>
            <VideoForm info={info} />
        </Layout>
    )
}