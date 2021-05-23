import Link from "next/link";
import {IoChevronForwardSharp} from "react-icons/io5";
import {RiFireFill, RiTimeFill} from "react-icons/ri";
import React from "react";
import {TweetCard} from "../cards/Tweet";

export const SocialPostsList = ({posts, extraClass, grid, gap, title, cta, itemType, detail}) => {
  // console.log(posts)
  // posts.map((post) => {
  //   console.log("post.text: ", post.source.full_text)
  // })

  const showPosts = (posts) => {
    return (
      posts.map((post) => (
        <TweetCard
          post={post}
          favoriteCount={post.favoriteCount}
          retweetCount={post.retweetCount}
          hashtags={post.source.entities.hashtags}
          source={post.source.source}
          createdAt={post.createdAt}
          fullText={post.source.full_text}
        />
      ))
    )
  }

  return (
    <div className={`section ${extraClass || ''}`}>
      <div className="container">
        <div className="container-inner">

          <div className="section-header">
            <div className="section-title">
              {itemType !== undefined
                ? <Link href={`/explore/${itemType}`}>
                  {title}
                </Link>
                : title}
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
                    <button className="btn pb-1 text-gray-700 border-b-2 border-gray-700">
                      <span className="icon mr-1"><RiTimeFill /></span>
                      <span className="btn-text text-xs font-medium uppercase">
												Top comments
										</span>
                    </button>
                    <button className="btn ml-4 pb-1 text-gray-700 border-b-2 border-transparent opacity-60 hover:opacity-100">
                      <span className="icon mr-1"><RiFireFill /></span>
                      <span className="btn-text text-xs font-medium uppercase">
												Top Vote
										</span>
                    </button>
                    <button className="btn ml-4 pb-1 text-gray-700 border-b-2 border-transparent opacity-60 hover:opacity-100">
                      <span className="icon mr-1"><RiFireFill /></span>
                      {/*<span className="btn-text text-xs font-medium uppercase">Ascending by...</span>*/}
                      <span className="btn-text text-xs font-medium uppercase">12/03</span>
                    </button>
                  </div>
                  :
                  <div className="section-cta">
                    <button className="btn pb-1 text-gray-700 border-b-2 border-gray-700">
                      {/*onClick={handlePostsDate}>*/}
                      <span className="icon mr-1"><RiTimeFill /></span>
                      <span className="btn-text text-xs font-medium uppercase">
											<Link href={'/explore/all?'}>
												Latest
											</Link>
										</span>
                    </button>
                    <button className="btn ml-4 pb-1 text-gray-700 border-b-2 border-transparent opacity-60 hover:opacity-100">
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
                  // ? showPosts(postsByDate)
                  ? "in progress"
                  : showPosts(posts)
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}