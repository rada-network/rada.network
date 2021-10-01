import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import("./Editor"), {
    ssr: false
})

export default function NewsForm({info}) {

    return (
        <>
        <div className="pane-content--main--top"></div>
        <div className="pane-content--main--main scrollbar">
            <label>Title</label>
            <input name="title" value={info.title} onChange={e => info.setTitle(e.target.value)} />
            <label>Content: 
            </label>
            <MyEditor name="content" info={info} />
            {/* <textarea name="content" value={content} onChange={e => setContent(e.target.value)} /> */}
        </div>
        </>
    )
}