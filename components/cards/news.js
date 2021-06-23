import React from "react";

import utils from "../../lib/util";

import styles from '../../styles/modules/Card.post.module.css'
import KeywordIcon from "../icons/keywordIcon";

import {RiExternalLinkLine} from "react-icons/ri";

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
              <img className={`card-img ${styles.project_icon__img}`} src={news.thumbnailUri} />
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
