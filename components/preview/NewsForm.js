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
            <textarea name="content" value={content} onChange={e => setContent(e.target.value)} />
        </div>
        </>
    )
}