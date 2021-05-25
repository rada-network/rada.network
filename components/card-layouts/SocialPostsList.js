import Link from "next/link";
import {IoChevronForwardSharp} from "react-icons/io5";
import {RiFireFill, RiTimeFill} from "react-icons/ri";
import { observer } from "mobx-react"

import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {TweetCard} from "../cards/Tweet";
import { useStore } from "../../lib/useStore"


export const SocialPostsList = observer(({posts, extraClass, grid, gap, title, titleIcon, titleIconColor, cta, itemType, detail}) => {

  const store = useStore()

  const Button = ({active, onClick, children}) => {
    if (active) return <a className="btn rounded bg-white px-4 py-1 shadow-sm" onClick={onClick}>{children}</a>
    return <a className="btn rounded bg-white text-gray-400 bg-opacity-0 px-4 py-1" onClick={onClick}>{children}</a>
  }

  const showPosts = (posts) => {
    return (
      posts.map((post) => (
        <TweetCard key={post.id}
          post={post}
          favoriteCount={post.favoriteCount}
          retweetCount={post.retweetCount}
          hashtags={post.source.entities.hashtags}
          source={post.source.source}
          createdAt={post.createdAt}
          fullText={post.source.full_text}
          expandedUrl={post.source.extended_entities}
          media={post.source.entities.media}
          tweetUser={post.tweetUser.source}
        />
      ))
    )
  }

  return (
    <div className={`section section-socialposts ${extraClass || ''}`}>
      <div className="container">
        <div className="container-inner">

          <div className="section-header">

            <div className="section-title">

              { titleIcon &&
							<span className={`icon mr-3 text-${titleIconColor}`}>
								<i className={`fad fa-${titleIcon}`}></i>
							</span> }

              {itemType !== undefined ? 
              <Link href={`/explore/${itemType}`}>
                {title}
              </Link>
              : title }

              {/* <span className="mx-1">in</span> */}

              {/* Hieu: Example Dropdown in Section Title */}
              {/* <div className="dropdown inline-flex justify-center items-center">
                <span className="text-blue-700">7 days</span>
                <span className="caret ml-2 -mt-0.5"></span>
              </div> */}

            </div>

            {/* Hieu: Example Sections Buttons */}
            <div className="section-cta">

              {/* <div className="btn-group flex rounded px-1 py-1 bg-gray-100 text-xs">
                <Button active={true}>All</Button>
                <Button>Twitter</Button>
                <Button>Reddit</Button>
              </div> */}

              <div className="btn-group flex rounded px-1 py-1 bg-gray-100 text-xs ml-4">
                <Button active={store.state.socialOrder == 'popular'} onClick={e => store.state.setSocialOrder('popular')}>Popular</Button>
                <Button active={store.state.socialOrder == 'latest'} onClick={e => store.state.setSocialOrder('latest')}>Latest</Button>
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
            {/* <div className={`grid gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
              {
                detail
                  // ? showPosts(postsByDate)
                  ? "in progress"
                  : showPosts(posts)
              }
            </div> */}
            <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2}} 
            >
              <Masonry columnsCount={2} gutter="1rem">
                {
                detail
                  // ? showPosts(postsByDate)
                  ? "in progress"
                  : showPosts(posts)
                }
              </Masonry>
            </ResponsiveMasonry>
          </div>

          <div className="section-footer">
            {itemType !== undefined
              ? <a href={`/explore/${itemType}`}
                 className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700  justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span class="btn-text">Show all Social Signals</span>
                <span className="icon"><IoChevronForwardSharp/></span>
              </a>
              : ""
            }
					</div>
        </div>
      </div>
    </div>
  )
})