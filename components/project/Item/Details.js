
import utils from "@lib/util"
import { PostDetailAuthor } from "@components/card-layouts/PostDetailAuthor";

export default function ProjectDetails({ project }) {
    const news = project.news
    if (!news){
        return null
    }
    const dateTitle = utils.titleTime(news?.createdAt);
    const date = utils.timeDifference(new Date(), new Date(news?.createdAt));
    return (
        <div className={
            `section post-detail post-detail-news`} itemScope itemType="http://schema.org/Article"> 
            <div className="section-header post-header">
                <div className="post-title">
                <h1>
                    <span className="post-title--text" itemProp="name">{news?.title}</span>
                </h1>
                </div>
                <div className="metadata-wrapper">
                <div className="flex flex-shrink-0">
                    <div className="metadata metadata-source">
                    <PostDetailAuthor isRada={true} item={news} />
                    </div>
                    <div className="metadata metadata-date">
                    <span className="metadata-value" title={dateTitle} itemProp="datePublished" content={news?.createdAt}>
                        {date}
                    </span>
                    </div>
                </div>
                {/* <PostVisitVoteDetail item={item} /> */}
                </div>
            </div>
            <div className="section-body post-body">
                <div className="post-content" itemProp="description">
                <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
                {news?.is_footnote && <Footnote />}
                </div>
                {/* {item.thumbnailUri !== "" ?
                <div className="post-media">
                    <a title={item.title}>
                    <img  title={item.title} className="post-media--img" src={item.thumbnailUri}/>
                    </a>
                </div>
                : ""
                } */}
            </div>

        </div>
    )
}