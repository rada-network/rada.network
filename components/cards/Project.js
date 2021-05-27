import React from "react";
import Link from "next/link";
import utils from "../../lib/util";

import { RiArrowUpSFill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";
import {Vote} from "../vote/Vote";

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
    <div className="flex-col items-center content-center card group card-project">

      <div className="card-body">

        <div className="card-body-header">

          <div className="metadata-wrapper project-metadata-wrapper">
            {/* aHieu: Van should check if there is value or not */}
            { projectType &&
            <a
              href={`/explore/${projectType}`}
              // className={`metadata project-metadata_type project-metadata_type_${
              className={`metadata project-metadata_type project-metadata_type_${
                projectType.toLowerCase() || ""
              } `}
            >
              <span className="metadata-value">{projectType}</span>
            </a> }

            { projectPlatform && 
            <a
              href={projectWebsiteUri}
              className={`metadata project-metadata_platform project-metadata_platform_${
                projectPlatformShort || ""
              } `}
            >
              {/* <img className="card-img" src={`./node_modules/cryptocurrency-icons/svg/color/${projectPlatformShort || ''}.svg`} /> */}
              <span className="icon mr-1">
                {/*networkName: polkadot, tron, cardano, eth, bsc, solana, ripple,*/}
                {/* available: cf-sol cf-eth cf-car, unavailable: cf-tron cf-bsc cf-polkadot cf-ripple icon*/}
                <i className={`cf cf-${projectPlatformShort || 'btc'} text-base`}></i>
              </span>
              <span className="metadata-value">{projectPlatform}</span>
            </a> }

            { projectDate && 
            <div className="metadata project-metadata_date">
              {/*<span className="metadata-value">{projectDate.split(('T'))[0]}</span>*/}
              <span className="metadata-value" title={`${titleTime}`}>{postDate}</span>
            </div> }

          </div>

          <div className="card-title">
            <Link href={`/item/${post.id}`}>
              <a className="card-link">{projectTitle}</a>
            </Link>
          </div>
        </div>

        <div className="card-body-main">
          {Object.keys(projectIconUri).length === 0
          ? ""
          : <div className="card-media project-icon">
              <Link href={`/item/${post.id}`}>
                <img className="card-img project-icon_img" src={projectIconUri[0]} />
              </Link>
            </div>
          }
          <div className="card-text" dangerouslySetInnerHTML={{ __html: projectTextShort}}></div>
        </div>

        {/* <div className="card-body-footer">
        </div> */}

      </div>

      <div className="card-footer">

        <div className="metadata-wrapper project-metadata-wrapper">
          <a href={link} className="metadata project-comment_count">
            <span className="mr-1 icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-12c3ph5 r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
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
