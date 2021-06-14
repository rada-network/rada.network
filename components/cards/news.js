import React from "react";

import utils from "../../lib/util";

import styles from '../../styles/modules/Card.project.module.css'
import KeywordIcon from "../icons/keywordIcon";

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
              <img className={`card-img ${styles.project_icon_ph__img}`} src={'/images/dhunt.svg'} />
            </a>
          </div>
          :
          <div className={`${styles.project_icon_ph}`}>
            <a rel={"nofollow"} target={"_blank"} href={news.websiteUri}>
              <img className={`card-img ${styles.project_icon_ph__img}`} src={news.thumbnailUri} />
            </a>
          </div>
        }
      </div>

      <div className={`${styles.card_body}`}>

        <div className={`${styles.card_body_header}`}>
          <div className={`${styles.card_title}`}>
            <a rel={"nofollow"} target={"_blank"} href={news.websiteUri}>
              <a className="card-link">{news.title}</a>
            </a>
          </div>
        </div>

        <div className={`${styles.card_body_main}`}>
          <div className={`${styles.card_text}`} dangerouslySetInnerHTML={{__html: news.description}} />
        </div>

        <div className={`${styles.card_body_footer}`}>
          <div className="metadata-wrapper project-metadata-wrapper">
            {
              keywords.map(function(value, index, array){
                return (
                  <KeywordIcon keyword={value[0]} weight={value[1]}/>
                )
              })
            }
            <div className="metadata project-metadata_date">
              {/*<span className="metadata-value">{projectDate.split(('T'))[0]}</span>*/}
              <span className="metadata-value" title={`${postDate}`}>{postDate}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
