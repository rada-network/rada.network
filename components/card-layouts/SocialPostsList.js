import Link from "next/link";
import {
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoChevronUpCircleOutline,
  IoChevronUpCircleSharp
} from "react-icons/io5";
import {RiFireFill, RiTimeFill} from "react-icons/ri";
import { observer } from "mobx-react"

import React, {useState} from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {TweetCard} from "../cards/Tweet";
import { useStore } from "../../lib/useStore"
import {getTweet} from "../../data/query/postsTweet";


export const SocialPostsList = observer( ({dataStore, initPosts,extraClass, grid, gap, title, titleIcon, titleIconColor, cta, itemType, detail}) => {
  const [loadingButton,setLoadingButton] = useState(false)
  const Button = ({active, onClick, children}) => {
    if (active) return <a className="btn rounded bg-white px-4 py-1 shadow-sm" onClick={onClick}>{children}</a>
    return <a className="btn rounded bg-white text-gray-400 bg-opacity-0 px-4 py-1" onClick={onClick}>{children}</a>
  }
  let posts = dataStore.tweets;

  const handleLoadMoreTweets = async (e) =>{
    if (dataStore.tweets.length > 0){
      dataStore.homeDisplay = 1;
    }
    setLoadingButton(true)
    const data = await getTweet({
      socialOrder : dataStore.currentTab,
      skip : dataStore.tweets.length,
      take : 12});
    if (data.loading){
      return false
    }
    setLoadingButton(false)
    dataStore.addTweet(data.data.tweetFeed)
  }

  if (dataStore.homeDisplay !==0 && dataStore.homeDisplay !== 1){
    return ""
  }

  return (
    <div className={`section section-socialposts ${extraClass || ''}`} id={"top"}>
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

              <div className="btn-group flex rounded px-1 py-1 bg-gray-100 text-xs">
                <Button
                  active={dataStore.currentTab === 'popular'}
                  onClick={e => {dataStore.currentTab = "popular";dataStore.tweets = [];handleLoadMoreTweets(e)} }>
                  Popular
                </Button>
                <Button
                  active={dataStore.currentTab === 'latest'}
                  onClick={e => {dataStore.currentTab = "latest";dataStore.tweets = [];handleLoadMoreTweets(e) }}>
                  Latest
                </Button>
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
              columnsCountBreakPoints={{350: 1, 640: 2, 1024: 3}}
            >
              <Masonry columnsCount={3} gutter="1rem">
                {
                detail
                  // ? showPosts(postsByDate)
                  ? "in progress"
                  : posts.map((post) => (
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
                }
              </Masonry>
            </ResponsiveMasonry>
          </div>

          <div className="section-footer">
            {loadingButton
              ? <a className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span className="btn-text">Loading...</span>
                <span className="icon"><IoChevronDownSharp/></span>
              </a>
              : <a onClick={handleLoadMoreTweets}
                   className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                   justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span className="btn-text">Show all Social Signals</span>
                <span className="icon"><IoChevronForwardSharp/></span>
              </a>
            }
					</div>
          <div className="section-footer">
            {dataStore.homeDisplay === 1 ?
              !itemType
                ? <a href={"#top"}
                     className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                     justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                  <span className="btn-text">Back to Top</span>
                  <span className="icon"><IoChevronUpCircleSharp/></span>
                </a>
                : <a onClick={e => dataStore.homeDisplay = 0} href={"#top"}
                 className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                 justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span className="btn-text">Back to home</span>
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