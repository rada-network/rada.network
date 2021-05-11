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
    <div className="flex-row items-center content-center card group card-project">
      <div className="card-media project-icon">
          <Link href={`/item/${post.id}`}>
          <img className="card-img project-icon_img" src={projectIconUri} />
        </Link>
      </div>
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-title">
            <Link href={`/item/${post.id}`}>
              <a className="card-link">{projectTitle}</a>
            </Link>
            <a
              href={`/explore/${projectType}`}
              className={`metadata badge badge-sm project-metadata_type badge-${
                projectType || ""
              } `}
            >
              <span className="metadata-value">{projectType}</span>
            </a>
          </div>
        </div>
        <div className="card-body-main">
          <div className="card-text" dangerouslySetInnerHTML={{ __html: projectTextShort}}></div>
        </div>

        <div className="card-body-footer">
          <div className="metadata-wrapper project-metadata-wrapper">
            <a
              href={projectWebsiteUri}
              className={`metadata project-metadata_platform project-metadata_platform_${
                projectPlatformShort || ""
              } `}
            >
              {/* <img className="card-img" src={`./node_modules/cryptocurrency-icons/svg/color/${projectPlatformShort || ''}.svg`} /> */}
              <span className="icon">
                {/*networkName: polkadot, tron, cardano, eth, bsc, solana, ripple,*/}
                {/* available: cf-sol cf-eth cf-car, unavailable: cf-tron cf-bsc cf-polkadot cf-ripple icon*/}
                <i className={`cf cf-${projectPlatformShort} || "btc"`}></i>
              </span>
              <span className="metadata-value">{projectPlatform}</span>
            </a>

            <div className="metadata-divider"></div>

            <div className="metadata project-metadata_date">
              <span className="metadata-value">{projectDate}</span>
            </div>

              {/* <a href={link} className="hidden metadata project-metadata_submitter">
              <span className="inline-block mr-1 card-body-media project-submitter">
                <img className="card-img project-submitter_img" src={projectSubmitterImgUri} />
              </span>
              <span className="metadata-value">{projectSubmitter}</span>
            </a> */}

            <div className="metadata-divider"></div>

            <a href={link} className="metadata project-comment_count">
              <span className="mr-1 icon text-base">
                <RiChat1Fill />
              </span>
              <span>{projectCommentsCounts}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <Vote
          itemId={post.id}
          votes={voteTotal}
          page={"index"}
        />
      </div>
    </div>
  )
}
