import React from 'react';
import Link from 'next/link'

import {RiArrowUpSFill} from "react-icons/ri";
import {RiChat1Fill} from "react-icons/ri";


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
                         projectCommentsCounts,
                         link,
                         voteTotal
                     }) => {
    return (
        <div className="flex-row items-center content-center card group card-project">
            {/*<p>{console.log("NFT")}</p>*/}
            {/*<p>{console.log(projectType)}</p>*/}
            <div className="card-media project-icon">
                <Link href={`/project_details/${post.id}`}>
                    <img className="card-img project-icon_img" src={projectIconUri}/>
                </Link>
            </div>
            <div className="card-body">
                <div className="card-body-header">
                    <div className="card-title">
                        <Link href={`/project_details/${post.id}`}>
                            <a className="card-link">
                                {projectTitle}
                            </a>
                        </Link>
                    </div>
                    <div className="metadata-wrapper project-metadata-wrapper">
                        <a href="#"
                           className={`metadata badge badge-sm badge-${projectType || ''} project-metadata_type`}>
                            <span className="metadata-value">{projectType}</span>
                        </a>
                    </div>
                </div>
                <div className="card-body-main">
                    <div className="card-text">{projectTextShort}</div>
                </div>

                <div className="card-body-footer">
                    <div className="metadata-wrapper project-metadata-wrapper">

                        <a href="#"
                           className={`metadata project-metadata_platform project-metadata_platform_${projectPlatformShort || ''} `}>
                            {/* <img className="card-img" src={`./node_modules/cryptocurrency-icons/svg/color/${projectPlatformShort || ''}.svg`} /> */}
                            <span className="icon"><i class={`cf cf-${projectPlatformShort || 'btc'}`}></i></span>
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
                            <span className="mr-1 icon"><RiChat1Fill/></span>
                            <span>{projectCommentsCounts}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <btn
                    className="flex-col justify-center transition-all rounded-md btn w-icon-64 h-icon-64 btn-project-vote bg-gray-50 group-hover:bg-primary-700 group-hover:text-white bg-gradient-to-tr from-gray-50 to-gray-50 group-hover:from-primary-700 group-hover:to-primary-500">
                    <span className="text-xl transition-none icon"><RiArrowUpSFill/></span>
                    <span className="text-xs font-bold btn-project-vote_total whitespace-nowrap">
            {voteTotal}
          </span>
                </btn>
            </div>
        </div>
    );
};