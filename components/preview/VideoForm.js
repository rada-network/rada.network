import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import("./Editor"), {
    ssr: false
})

export default function VideoForm({info}) {
    const Label = ({children}) => <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{children}</label>
    const inputcls = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    return (
        <>
        <div className="pane-content--main--main scrollbar pt-6">
        <form className="w-full">
        <div className="flex flex-wrap mx-3 mb-3 mt-3">
            <Label>Title</Label>
            <input className={inputcls} name="title" value={info.title} onChange={e => info.setTitle(e.target.value)} />
        </div>    
        <div className="flex flex-wrap mx-3 mb-3 mt-3">
            <Label>Youtube ID</Label>
            <input className={inputcls} name="youtubeId" value={info.youtubeId} onChange={e => info.setYoutubeId(e.target.value)} />
        </div>    
        <div className="flex flex-wrap mx-3 mb-0">
            <Label>Content</Label>
        </div>
        <div className="flex flex-wrap mx-3 mb-3">
            <MyEditor className="block w-full border border-gray-200" name="content" info={info} />
        </div>
        </form>
        </div>
        </>
    )
}