import React from "react";
import utils from "../../../../lib/util";
import KeywordIcon from "../../../../components/icons/keywordIcon";
import ContentLoader from "react-content-loader";
import Link from "next/link"
import ShowSources from '../../news-sources/ShowSources'
import ReadingTime from "../../../../components/news-sources/ReadingTime";
export const NewsLoader = (props) => (
  <div className={`card card-post`}>
    <div className={`card-body`}>
      <ContentLoader
        speed={2}
        backgroundColor="#9CA3AF"
        foregroundColor="#E5E7EB"
        style={{ opacity: '20%' }}
        viewBox="0 0 380 100"
        {...props}
      >
        <rect x="0" y="0" rx="3" ry="3" width="40" height="40" />
        <rect x="48" y="8" rx="3" ry="3" width="128" height="6" />
        <rect x="48" y="24" rx="3" ry="3" width="80" height="6" />
        <rect x="48" y="56" rx="3" ry="3" width="360" height="6" />
        <rect x="48" y="71" rx="3" ry="3" width="380" height="6" />
        <rect x="48" y="88" rx="3" ry="3" width="178" height="6" />
      </ContentLoader>
    </div>
  </div>
)
export const CardPost = ({title, mediaUri, type, source, commentCount, voteCount}) => {
  return (
    <Link href={"#"}>
    <div className={`card card-post`}>

      <div className={`card-media`}>
        <div className={`card-media-img`}>
          <a className="" href={"/"}>
            <img className={`card-img`} src={mediaUri}  alt={""}/>
          </a>
        </div>
      </div>

      <div className={`card-body`}>

        <div className={`card-title`}>
          <a className="card-link group" href={"/"}>
            <span className="text-color-title mr-2">{title}</span>
          </a>
        </div>

        <div className="metadata-wrapper justify-between mt-1">

          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1.5">
                <i className={`${type}`} />
              </span>
              <span className="metadata-value" title="CoinTelegraph">{source}</span>
            </div>
            <div className="metadata metadata-date">
              <span className="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
            </div>
          </div>

          <div className="flex metadata-wrapper_nodivide">
            <div className="flex flex-shrink-0 metadata-wrapper_nodivide">
              <div className="metadata">
                <span className="icon mr-1.5">
                  <i className="far fa-comment-alt" />
                </span>
                <span className="">{commentCount}</span>
              </div>
              <div className="metadata">
                <span className="icon mr-1.5">
                  <i className="far fa-arrow-up" />
                </span>
                <span>{voteCount}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
      
    </div>
    </Link>
  )
}