import React from "react";
import Link from "next/link";

import utils from "../../lib/util";
import {Vote} from "../vote/Vote";

import styles from '../../styles/modules/Card.project.module.css'
import ItemTypeIcon from "../icons/itemTypeIcon";
import NetworkIcon from "../icons/networkIcon";

export const Card = ({
  post,
  projectTitle,
  projectTextShort,
  projectText,
  projectIconUri,
  projectType,
  projectPlatform,
  projectPlatformShort,
  projectDate,
  projectSubmitter,
  projectSubmitterImgUri,
  projectWebsiteUri,
  projectCommentsCounts,
  link,
  voteTotal,
}) => {
  const postDate = utils.timeDifference(new Date(), new Date(projectDate))
  const titleTime = utils.titleTime(projectDate)
  return (
    <div className={`card group ${styles.card}`}>

      <div className={`card-body ${styles.card_body}`}>

        <div className={`card-body-header ${styles.card_body_header}`}>

          <div className="metadata-wrapper project-metadata-wrapper">
            {/* aHieu: Van should check if there is value or not */}

            <ItemTypeIcon projectType={projectType} />

            <NetworkIcon projectPlatform={projectPlatform} projectPlatformShort={projectPlatformShort} projectWebsiteUri={projectWebsiteUri} badge={false}/>
            { projectDate && 
            <div className="metadata project-metadata_date">
              {/*<span className="metadata-value">{projectDate.split(('T'))[0]}</span>*/}
              <span className="metadata-value" title={`${titleTime}`}>{postDate}</span>
            </div> }

          </div>

          <div className={`card-title ${styles.card_title}`}>
            <Link href={`/item/${post.id}`}>
              <a className="card-link">{projectTitle}</a>
            </Link>
          </div>
        </div>

        <div className={`card-body-main ${styles.card_body_main}`}>
          {Object.keys(projectIconUri).length === 0
          ? ""
          : <div className={`card-media ${styles.project_icon}`}>
              <Link href={`/item/${post.id}`}>
                <img className="card-img project-icon_img" src={projectIconUri[0]} />
              </Link>
            </div>
          }
          <div className={`card-text ${styles.card_text}`} dangerouslySetInnerHTML={{ __html: projectTextShort}}></div>
        </div>

        {/* <div className="card-body-footer">
        </div> */}

      </div>

      <div className={`card-footer ${styles.card_footer}`}>

        <div className="metadata-wrapper project-metadata-wrapper">
          <a href={link} className="metadata project-comment_count">
            <span className="icon mr-1 text-base opacity-40">
              <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
            </span>
            <span>{projectCommentsCounts}</span>
          </a>
        </div>

        <Vote key={post.id}
          itemId={post.id}
          votes={voteTotal}
          page={"index"}
        />

      </div>
    </div>
  )
}
