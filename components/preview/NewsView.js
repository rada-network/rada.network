import ReactMarkdown from 'react-markdown'


const NewsDetail = function ({item}){
    return (
      <div className="section post-detail post-detail-news post-rada">
        {/* Post Header */}
        <div className="section-header post-header">
          <div className="post-title">
            <h1 className="inline">
              <a target="_blank" rel="nofollow noreferrer" href="#" className="">
                <span className="badge badge-rada mr-2">RADA</span>
                <span className="post-title--text">
                  {item.title}
                </span>
              </a>
            </h1>
          </div>

        </div>
  
        <div className="section-body post-body">
          <div className="post-content">
            <ReactMarkdown>{item.content}</ReactMarkdown>
            {item?.is_footnote && <Footnote />}
          </div>
        </div>
      </div>
    )
  }

export default function NewsView({item}) {
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
                        Bài Viết
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
                    <NewsDetail item={item} />
                </div>
            </div>
            {/* END: Main Content */}
        </>
    )
}