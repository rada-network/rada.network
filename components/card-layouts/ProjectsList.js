import React from 'react';

import {useState} from "react";
import {Card} from "../cards/Project";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import { RiFireFill } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { RiFireLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";



export const ProjectsList = ({posts, extraClass, grid, gap, title, cta}) => {
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
								link={`/item/${post.id}`}
								projectType={post.itemType}
								projectPlatform={post.platform.name}
								projectPlatformShort={post.platform.networkName.slice(0, 3)}
								projectDate={post.createdAt}
								projectWebsiteUri={post.platform.websiteUri}
								// projectSubmitterImgUri="https://picsum.photos/80/80?random=11"
								// projectSubmitter="rada.co"
								projectCommentsCounts={post.totalComment}
								voteTotal={post.totalVote}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}