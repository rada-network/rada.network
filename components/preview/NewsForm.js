// import MyEditor from "./Editor"
import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import("./Editor"), {
    ssr: false
})

export default function NewsForm({
    title, setTitle,
    content, setContent
}) {
    return (
        <>
        <div className="pane-content--main--top"></div>
        <div className="pane-content--main--main scrollbar">
            <label>Title</label>
            <input name="title" value={title} onChange={e => setTitle(e.target.value)} />
            <label>Content</label>
            <MyEditor name="content" content={content} setContent={setContent} />
            {/* <textarea name="content" value={content} onChange={e => setContent(e.target.value)} /> */}
        </div>
        </>
    )
}