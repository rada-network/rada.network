import React from 'react';

import {useState} from "react";
import {Card} from "../cards/Project";
import {Dropdown} from "../dropdown/DropDown";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import { RiFireFill } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { RiFireLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";
import Link from "next/link"
import {useRouter} from "next/router";

export const ProjectsList = ({posts, extraClass, grid, gap, title, titleIcon, titleIconColor, cta, itemType, detail}) => {
	const date = new Date()
	const router = useRouter()

	const handleTopComment = () => router.push('/explore/top-comment')
	const handleTopVote = () => router.push('/explore/top-vote')
	const handlePostsDate = () => router.push('/explore/New-Project-Today')

	const fullDate = date.toISOString()
	const currentTime = fullDate.split(('T'))[0]
	const currentDate = fullDate.split('T')[0].split('-')[2]
	const currentMonth = fullDate.split('T')[0].split('-')[1]
	const currentYear = fullDate.split('T')[0].split('-')[0]

	const postsByDate =  posts.filter(function (post){
		// return post.createdAt.includes(currentTime.toString())
		return post.createdAt.includes("2021-05-19")
	})
	const showPosts = (posts) => {
		if (Object.keys(posts).length === 0) return <div>Haven't updated  new posts for {currentTime}</div>
		return (
			posts.map((post) => (
			<Card
				key={post.id}
				post={post}
				projectTitle={post.title}
				projectTextShort={post.description}
				projectIconUri={post.imagesUri}
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
		)))
	}


	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
				<div className="container-inner">

					<div className="section-header">
						<div className="section-title">

							{ titleIcon &&
							<span class={`icon mr-3 text-${titleIconColor}`}>
								<i class={`fad fa-${titleIcon}`}></i>
							</span> }

							{itemType !== undefined ? 
							<Link href={`/explore/${itemType}`}>
								{title}
							</Link>
							: title }
							
              {/* Hieu: Example Dropdown in Section Title */}
              <div className="dropdown ml-2 inline-flex justify-center items-center">
								<Dropdown
									color={"blue"}
								/>
                {/*<span className="text-blue-700">Today</span>*/}
                {/*<span className="caret ml-2 -mt-0.5"></span>*/}
              </div>

						</div>

						{ cta &&
						<div className="section-cta">
							{cta === "View All" ? <button className="btn">
								<span className="btn-text">
									<Link href={`/explore/${itemType}`}>
										{cta}
									</Link>
								</span>
								<span className="icon"><IoChevronForwardSharp /></span>
							</button>
							: detail ?
								<div className="section-cta">
									<button className="btn text-gray-700"
									onClick={handleTopComment}>
										<span className="icon mr-1"><RiTimeFill /></span>
										<span className="btn-text text-xs font-medium uppercase">
												Top comments
										</span>
									</button>
									<button className="btn ml-4 text-gray-700 opacity-60 hover:opacity-100"
									onClick={handleTopVote}>
										<span className="icon mr-1"><RiFireFill /></span>
										<span className="btn-text text-xs font-medium uppercase">
												Top Vote
										</span>
									</button>
									<button className="btn ml-4 text-gray-700 opacity-60 hover:opacity-100"
									onClick={handlePostsDate}>
										<span className="icon mr-1"><RiFireFill /></span>
										{/*<span className="btn-text text-xs font-medium uppercase">Ascending by...</span>*/}
										<span className="btn-text text-xs font-medium uppercase">{currentTime}</span>
									</button>
								</div>
								:
								<div className="section-cta">
									<button className="btn text-gray-700">
									{/*onClick={handlePostsDate}>*/}
										<span className="icon mr-1"><RiTimeFill /></span>
										<span className="btn-text text-xs font-medium uppercase">
											<Link href={'/explore/today'}>
												Latest
											</Link>
										</span>
									</button>
									<button className="btn ml-4 text-gray-700 opacity-60 hover:opacity-100"
									onClick={handleTopVote}>
										<span className="icon mr-1"><RiFireFill /></span>
										<span className="btn-text text-xs font-medium uppercase">Popular</span>
									</button>
								</div>
							}
						</div>
						}
					</div>

					<div className="section-body">
						<div className={`grid grid gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
							{
								detail
									? showPosts(postsByDate)
									: showPosts(posts)
							}
						</div>
					</div>

					<div className="section-footer">
						<a href="#" class="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700  justify-center py-3 px-6 rounded w-full mt-8 text-sm">Show 18 more</a>
					</div>
				
				</div>
			</div>
		</div>
	)
}