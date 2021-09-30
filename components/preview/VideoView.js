import ReactMarkdown from 'react-markdown'

const VideoDetail = function({item}){
    return (
      <div className="section post-detail post-detail-media">
        {/* Post Header */}
        <div className="section-header post-header">
          <div className="post-title">
            <h1 className="inline">
              <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
                <span className="post-title--text">
                  {item.title}
                </span>
              </a>
            </h1>
          </div>
        </div>
  
        <div className="section-body post-body">
          <div className="post-media">
            {/* Media Player Here */}
            <div className="media-player">
              <div className="w-full h-full">
                <div className={`aspect-w-16 aspect-h-9`}>
                  <iframe  src={"https://www.youtube.com/embed/" + item.youtubeId} title={item.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" />
                </div>
              </div>
            </div>
          </div>
          <div className="post-content">
            <div className="post-content--text">
                <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    )
  }    

export default function VideoView({item}) {
    return (
        <>
            {/* Top Bar */}
            <div className="pane-content--sec--top">
                <div className="flex">
                <div className="page-back flex-shrink-0">
                    <div className="btn">
                    <span className="icon">
                        <i className="fa-solid fa-chevron-left"></i>
                    </span>
                    <span className="btn--text sr-only">Quay lại</span>
                    </div>
                </div>
                <div className="tabbar page-tabs">
                    <div className="tabbar-main">
                    <a href="#" className="tab-item tab-item--active">
                        Video
                    </a>
                    <span className="tab-item--divider"></span>
                    <a href="#" className="tab-item">
                        BTC
                    </a>
                    <a href="#" className="tab-item">
                        AXS
                    </a>
                    </div>
                </div>
                </div>
            </div>
            {/* END: Top Bar */}

            {/* Main Content */}
            <div className="pane-content--sec--main grid scrollbar">
                <div className="page">
                <VideoDetail item={item} />
                </div>
            </div>
            {/* END: Main Content */}
        </>
    )
}