import Link from "next/link";
import {
  IoChevronDownSharp,
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoChevronUpCircleOutline,
  IoChevronUpCircleSharp
} from "react-icons/io5";
import {RiFireFill, RiTimeFill} from "react-icons/ri";
import { observer } from "mobx-react"

import React, {useState} from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {SocialPost} from "../cards/SocialPost";
import {getTweet} from "../../data/query/postsTweet";
import {TabButton} from "../button/tabButton";

import ReactTooltip from 'react-tooltip'


export const SocialPostsList = observer( ({dataStore,extraClass, grid, gap, title, titleIcon, titleIconColor, cta, itemType, detail}) => {
  const [loadingButton,setLoadingButton] = useState(false)
  let posts = dataStore.tweets;

  const handleLoadMoreTweets = async (e) =>{
    //if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = 1;

    setLoadingButton(true)
    const data = await getTweet({
      socialOrder : dataStore.currentTab,
      skip : dataStore.tweets.length,
      take : 12,
      query : dataStore.query
    });
    if (data.loading){
      return false
    }
    setLoadingButton(false)
    dataStore.addTweet(data.data.tweetFeed)
  }

  //if (dataStore.home.homeDisplay !==0 && dataStore.home.homeDisplay !== 1) return ""

  return (
    <div className={`section section-socialposts ${extraClass || ''}`} id={"top"}>
      <div className="section-inner">

        <div className="section-header">

          <div className="section-title">

            { titleIcon &&
            <span className={`icon mr-3 text-${titleIconColor}`}>
              <i className={`fad fa-${titleIcon}`}></i>
            </span> }

            {itemType !== undefined ?
            <Link href={`/explore/${itemType}`}>
              <>
              {title}
              <span className="hasTooltip ml-2 -mb-1 text-xs text-blue-500 relative group" 
                    data-tip="By using smart algorithm, we detect and analysis the social trends to keep you up on any latest movements of the blockchain community.">
                <span className="border-b border-dotted border-blue-500">What's this?</span> <i className="icon fal fa-info-circle text-base relative -bottom-0.5" />
              </span>
              </>
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
            <div className="btn-group btn-group-filter">
              <TabButton handle={handleLoadMoreTweets} key={"popular"} nValue={"popular"} value={"Popular"} dataStore={dataStore} />
              <TabButton handle={handleLoadMoreTweets} key={"latest"} nValue={"latest"} value={"Latest"} dataStore={dataStore} />
            </div>
          </div>
        </div>

        <div className="p-0 md:p-4 lg:p-8 lg:pt-0">
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 1280: 2}}>
            <Masonry gutter="1rem">
              {
              detail
                // ? showPosts(postsByDate)
                ? "in progress"
                : posts.map((post) => (
                  <SocialPost key={post.id}
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

          {dataStore.home.homeDisplay === 1 ?
            !itemType
              ? <a href={"#top"}
                    className="btn btn-nav mr-2">
                <span className="icon"><IoChevronUpCircleSharp/></span>
                <span className="btn-text whitespace-nowrap">Back to Top</span>
              </a>
              : <a onClick={e => dataStore.home.homeDisplay = 0} href={"#top"}
                className="btn btn-nav mr-2">
              <span className="icon"><IoChevronBackSharp/></span>
              <span className="btn-text whitespace-nowrap">Back to home</span>
            </a>
            : ""
          }

          {loadingButton
            ? <a className="btn btn-loading">
              <span className="btn-text">Loading...</span>
            </a>
            : <a onClick={handleLoadMoreTweets} className="btn btn-nav">
              <span className="btn-text">Show 12 more</span>
            </a>
          }
        </div>

      </div>
    </div>
  )
})