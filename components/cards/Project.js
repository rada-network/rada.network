import React from "react";
import Link from "next/link";

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
              className={`metadata project-metadata_type project-metadata_type-${
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
              <span className="metadata-value">{projectDate.split(('T'))[0]}</span>
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
        <Vote key={post.id}
          itemId={post.id}
          votes={voteTotal}
          page={"index"}
        />

        <div className="metadata-wrapper project-metadata-wrapper">
          <a href={link} className="metadata project-comment_count">
            <span className="mr-1 icon">
              <RiChat1Fill />
            </span>
            <span>{projectCommentsCounts}</span>
          </a>
        </div>

      </div>
    </div>
  )
}
