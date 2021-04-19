import React from 'react';

import {useState} from "react";
import {Card} from "../cards/Nft";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import { RiFireFill } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { RiFireLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";
// import {suppressConsoleLogs} from "@headlessui/react/dist/test-utils/suppress-console-logs";



export const NftList = ({posts, extraClass, grid, gap, title, cta}) => {
    return (
        <div className={`section ${extraClass || ''}`}>
            <div className="container">
                <div className="section-header">
                    <div className="section-title">{title}</div>
                    { cta &&
                    <div className="section-cta">
                        <button className="btn pb-1 text-gray-700 border-b-2 border-gray-700">
                            <span className="icon mr-1"><RiTimeFill /></span>
                            <span className="btn-text text-xs font-medium uppercase">Latest</span>
                        </button>
                        <button className="btn ml-4 pb-1 text-gray-700 border-b-2 border-transparent opacity-60 hover:opacity-100">
                            <span className="icon mr-1"><RiFireFill /></span>
                            <span className="btn-text text-xs font-medium uppercase">Popular</span>
                        </button>
                    </div>
                    }
                </div>
                <div className="section-body">
                    <div className={`grid grid gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                post={post}
                                projectTitle={post.title}
                                projectTextShort={post.description}
                                projectIconUri={post.imageUri}
                                link={`/project_details/${post.id}`}
                                projectType={post.itemType}
                                projectPlatform={post.platform.name}
                                projectPlatformShort="sol"
                                projectDate={post.createdAt}
                                // projectSubmitterImgUri="https://picsum.photos/80/80?random=11"
                                // projectSubmitter="rada.co"
                                projectCommentsCounts="2112121"
                                voteTotal="2222"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}