import React, {useState} from 'react';

import {Card} from "../cards/Project";
import {DropDown} from "../dropdown/DropDown";

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {useRouter} from "next/router";
import {useStore} from "../../lib/useStore";
import {observer} from "mobx-react";
import {getPosts} from "../../data/query/posts";
import {TabButton} from "../button/tabButton";
import WidgetTitle from "../text/widgetTitle";
import utils from "../../lib/util";

const take = 12

export const ProjectsList = observer(({
                                        voteStore,
                                        homeDisplay,
                                        dataStore,
                                        extraClass,
                                        grid,
                                        gap,
                                        title,
                                        titleIcon,
                                        titleIconColor,
                                        cta,
                                        itemType,
                                        detail
                                      }) => {
  const store = useStore()
  voteStore.walletAddress = store.wallet.address
  voteStore.addVotes(dataStore.tweets)

  let posts = dataStore.tweets
  const [loadingButton, setLoadingButton] = useState(false)
  let startShowMoreButton = true;
  if (dataStore.tweets.length < take && !dataStore.home.isHome){
    startShowMoreButton = false
  }
  const [showMoreButton, setShowMoreButton] = useState(startShowMoreButton)
  if (itemType === "all") itemType = ""
  const handleLoadMoreItems = async (e) => {
    //if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = homeDisplay
    setLoadingButton(true)
    setShowMoreButton(false)

    const itemsData = await getPosts({
      socialOrder: dataStore.currentTab,
      skip: dataStore.tweets.length,
      take: take,
      type: itemType === "all" ? "" : itemType,
      query : dataStore.query
    });
    if (itemsData.loading) return false
    setLoadingButton(false)
    dataStore.addTweet(itemsData.data.itemFeed)

    voteStore.addVotes(itemsData.data.itemFeed)
    utils.initVoteStore(voteStore)
    if (itemsData.data.itemFeed.length < take){
      setShowMoreButton(false)
    }
    else{
      setShowMoreButton(true)
    }
  }
  //if (dataStore.home.homeDisplay !== 0 && dataStore.home.homeDisplay !== homeDisplay) return ""

  const showPosts = (posts) => {
    if (!loadingButton && posts.length === 0){
      return (
        <>
          <h2>{dataStore.query} was not found in any documents.</h2>
        </>
      )
    }
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
          voteStore={voteStore}
        />
      )))
  }


  return (
    <div className={`section ${extraClass || ''}`} id={"#top"}>
      <div className="section-inner">

        <div className="section-header">
          <div className="section-title">

            <WidgetTitle title={title} titleIcon={titleIcon} titleIconColor={titleIconColor}
                          dataStore={dataStore}
            />

            {/* Hieu: Example Dropdown in Section Title */}
            {/*<div className="ml-2 inline-flex justify-center items-center">*/}
            {/*  <DropDown color="white"/>*/}
            {/*</div>*/}

          </div>

          {cta &&
          <div className="section-cta">
            {cta === "View All" ? <button className="btn">
              <span className="btn-text">
                <Link href={`/explore/${itemType}`}>
                  {cta}
                </Link>
              </span>
                <span className="icon"><IoChevronForwardSharp/></span>
              </button>
              : detail ?
              <div className="btn-group btn-group-filter">
                <TabButton handle={handleLoadMoreItems} key={"topvote"} nValue={"topvote"} value={"Top Vote"} dataStore={dataStore} />
                <TabButton handle={handleLoadMoreItems} key={"topcomment"} nValue={"topcomment"} value={"Top Comment"} dataStore={dataStore} />
                <TabButton handle={handleLoadMoreItems} key={"latest"} nValue={"latest"} value={"Latest"} dataStore={dataStore} />
              </div>
                :
              <div className="btn-group btn-group-filter">
                <TabButton handle={handleLoadMoreItems} key={"popular"} nValue={"popular"} value={"Popular"} dataStore={dataStore} />
                <TabButton handle={handleLoadMoreItems} key={"latest"} nValue={"latest"} value={"Latest"}dataStore={dataStore} />
              </div>
            }
          </div>
          }
        </div>

        <div className="section-body no-padding">
          <div className={`grid gap-0 lg:gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
            {
              showPosts(posts)
            }
          </div>
        </div>

        <div className="section-footer">
          {dataStore.home.homeDisplay === homeDisplay && dataStore.home.isHome
            ? <a onClick={e => dataStore.home.homeDisplay = 0} href={"#top"}
                  className="btn btn-nav mr-2">
              <span className="icon"><IoChevronBackSharp/></span>
              <span className="btn-text whitespace-nowrap">Back to home</span>
            </a>
            : ""
          }
          {loadingButton
            ? <a className="btn btn-loading">
              <span className={"btn-text"}>Loading...</span>
            </a>
            : ""
          }
          {showMoreButton ?
            <a onClick={handleLoadMoreItems} className="btn btn-nav">
              <span className="btn-text">Show {take} more</span>
              <span className="btn-caret"></span>
            </a>
            :  ""
          }
        </div>
        {/* <div className={"section-footer"}>
          {dataStore.home.homeDisplay === homeDisplay
            ? <a onClick={e => {dataStore.home.homeDisplay = 0;setShowMoreButton(true)}} href={"#top"}
                  className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                justify-center py-3 px-6 rounded w-full mt-8 text-sm">
              <span className="btn-text">Back to home</span>
              <span className="icon"><IoChevronForwardSharp/></span>
            </a>
            : ""
          }
        </div> */}

      </div>
    </div>
  )
})