import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import("./Editor"), {
    ssr: false
})

export default function VideoForm({info}) {
    return (
        <>
        <div className="pane-content--main--top"></div>
        <div className="pane-content--main--main scrollbar">
            <label>Title</label>
            <input name="title" value={info.title} onChange={e => info.setTitle(e.target.value)} />
            <label>Video Url</label>
            <input name="youtubeId" value={info.youtubeId} onChange={e => info.setYoutubeId(e.target.value)} />
            <label>Content:</label>            
            <MyEditor name="content" info={info} />
        </div>
        </>
    )
}