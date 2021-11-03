
export default function ProjectDetails({ project }) {
    const news = project.news
    return (
        <div className="section">
            <div className="section-body">
                <div className="post-title">
                    <h1>
                        <span className="post-title--text">{news.title}</span>
                    </h1>
                </div>

                <div className="section-body post-body">
                    <div className="post-content">
                        <div dangerouslySetInnerHTML={{ __html: news.content }} />
                        {news?.is_footnote && <Footnote />}
                    </div>

                </div>

            </div>
        </div>
    )
}