import React from "react";

import utils from "../../lib/util";

import styles from '../../styles/modules/Card.post.module.css'
import KeywordIcon from "../icons/keywordIcon";

import {RiExternalLinkLine} from "react-icons/ri";
import ContentLoader from "react-content-loader";

export const NewsLoader = (props) => (
  <div className={`${styles.card}`}>
    <div className={`${styles.card_body}`}>
      <ContentLoader
        speed={2}
        backgroundColor="#F3F4F6"
        foregroundColor="#ecebeb"
        viewBox="0 0 380 100"
        // style={{ width: '100%' }}
        {...props}
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="380" height="6" />
        <rect x="-1" y="71" rx="3" ry="3" width="360" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </ContentLoader>
    </div>
  </div>
)

export const CardNews = ({news}) => {
  const postDate = utils.timeDifference(new Date(), new Date(news.createdAt))
  let keywords = JSON.parse(news.keywords);
  keywords = Object.entries(keywords)
  return (
    <div className={`${styles.card}`}>

      <div className={`${styles.card_media}`}>
        {news.thumbnailUri === "" ?
          <div className={`${styles.project_icon_ph}`}>
            <a rel={"nofollow"} target={"_blank"} href={news.websiteUri}>
              <span className={`icon text-yellow-500 ${styles.project_icon_ph__img}`}><i className="fad fa-newspaper"></i></span>
            </a>
          </div>
          :
          <div className={`${styles.project_icon}`}>
            <a rel={"nofollow"} target={"_blank"} href={news.websiteUri}>
              <img className={`card-img ${styles.project_icon__img}`} src={news.thumbnailUri}  alt={""}/>
            </a>
          </div>
        }
      </div>

      <div className={`${styles.card_body}`}>

        <div className={`${styles.card_body_header}`}>
          <div className={`${styles.card_title}`}>
            <a className="card-link group" rel={"nofollow"} target={"_blank"} href={news.websiteUri}>
              <span className="mr-2">{news.title}</span>
              <span className="icon -mb-0.5 ico-external-link"><RiExternalLinkLine /></span>
            </a>
          </div>
          <div className="metadata-wrapper md:my-1 lg:mt-0">
            {
              keywords.map(function(value, index, array){
                return (
                  <KeywordIcon key={value[0]+value[1]+(new Date()).getTime()} keyword={value[0]} weight={value[1]}/>
                )
              })
            }
          </div>
        </div>

        <div className={`${styles.card_body_main} transform scale-0 h-0 md:scale-100 md:h-auto`}>
          <div className={`${styles.card_text}`} dangerouslySetInnerHTML={{__html: news.description}} />
        </div>

        <div className={`${styles.card_body_footer}`}>
          <div className="metadata-wrapper">
            <div className="metadata metadata_author">
              <span className="metadata-value" title={news.source}>{news.source}</span>
            </div>
            <div className="metadata metadata_date">
              <span className="metadata-value" title={`${postDate}`}>{postDate}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
