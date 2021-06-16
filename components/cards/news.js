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
    <div className={`card card-news group ${styles.card}`}>

      <div className={`${styles.card_media}`}>
        {news.thumbnailUri === "" ?
          <div className={`${styles.project_icon_ph}`}>
            <a rel={"nofollow"} target={"_blank"} href={news.websiteUri}>
              <span class={`icon text-yellow-500 ${styles.project_icon_ph__img}`}><i class="fad fa-newspaper"></i></span>
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
              <span className="">{news.title}</span>
              <span className="icon ml-2 -mb-0.5 ico-external-link"><RiExternalLinkLine /></span>
            </a>
          </div>
          <div className="metadata-wrapper">
            {
              keywords.map(function(value, index, array){
                return (
                  <KeywordIcon keyword={value[0]} weight={value[1]}/>
                )
              })
            }
          </div>
        </div>

        <div className={`${styles.card_body_main}`}>
          <div className={`${styles.card_text}`} dangerouslySetInnerHTML={{__html: news.description}} />
        </div>

        <div className={`${styles.card_body_footer}`}>
          <div className="metadata-wrapper">
            <div className="metadata metadata_author">
              <span className="metadata-value" title={`${postDate}`}>Cardano Foundation</span>
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
