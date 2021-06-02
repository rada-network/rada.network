import React, {useState} from 'react';

import {Card} from "../cards/Project";
import {DropDown} from "../dropdown/DropDown";

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import {RiFireFill} from "react-icons/ri";
import {RiTimeFill} from "react-icons/ri";
import Link from "next/link"
import {useRouter} from "next/router";
import {useStore} from "../../lib/useStore";
import {observer} from "mobx-react";
import {getPosts} from "../../data/query/posts";

export const ProjectsList = observer(({
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
  const date = new Date()
  const store = useStore()
  let posts = dataStore.tweets
  const [loadingButton, setLoadingButton] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(true)

  if (itemType === "all") itemType = ""

  const handleTopComment = (e) => {
    dataStore.currentTab = "topcomment";
    dataStore.tweets = [];
    handleLoadMoreItems(e)
  }
  const handleTopVote = (e) => {
    dataStore.currentTab = "topvote";
    dataStore.tweets = [];
    handleLoadMoreItems(e)
  }
  const handlePopular = (e) => {
    dataStore.currentTab = "popular";
    dataStore.tweets = [];
    handleLoadMoreItems(e)
  }
  const handlePostsLatest = (e) => {
    dataStore.currentTab = "latest";
    dataStore.tweets = [];
    handleLoadMoreItems(e)
  }

  const fullDate = date.toISOString()
  const currentTime = fullDate.split(('T'))[0]
  const handleLoadMoreItems = async (e) => {
    if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = homeDisplay
    setLoadingButton(true)
    setShowMoreButton(false)

    const itemsData = await getPosts({
      socialOrder: dataStore.currentTab,
      skip: dataStore.tweets.length,
      take: 12,
      type: itemType === "all" ? "" : itemType
    });
    if (itemsData.loading) return false
    setLoadingButton(false)
    dataStore.addTweet(itemsData.data.itemFeed)
    if (itemsData.data.itemFeed.length === 0){
      setShowMoreButton(false)
    }
    else{
      setShowMoreButton(true)
    }
  }
  if (dataStore.home.homeDisplay !== 0 && dataStore.home.homeDisplay !== homeDisplay) return ""

  const Button = ({active, onClick, children}) => {
    if (active) return <a className="btn rounded bg-white px-4 py-1 shadow-sm" onClick={onClick}>{children}</a>
    return <a className="btn rounded bg-white text-gray-400 bg-opacity-0 px-4 py-1" onClick={onClick}>{children}</a>
  }

  const postsByDate = posts.filter(function (post) {
    // return post.createdAt.includes(currentTime.toString())
    return post.createdAt.includes("2021-05-19")
  })
  const showPosts = (posts) => {
    if (Object.keys(posts).length === 0) return <div>Haven't updated new posts for {currentTime}</div>
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
    <div className={`section ${extraClass || ''}`} id={"#top"}>
      <div className="container">
        <div className="container-inner">

          <div className="section-header">
            <div className="section-title">

              {titleIcon &&
              <span className={`icon mr-3 text-${titleIconColor}`}>
								<i className={`fad fa-${titleIcon}`}></i>
							</span>}

              {itemType !== undefined ?
                <Link href={`/explore/${itemType}`}>
                  {title}
                </Link>
                : title}

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
                  <div className="section-cta">
                    <button className={"btn ml-4 text-gray-700 " + (dataStore.currentTab !== 'latest' ? "opacity-60 hover:opacity-100" : "")}
                            onClick={handlePostsLatest}>
                      <span className="icon mr-1"><RiTimeFill/></span>
                      {/*<span className="btn-text text-xs font-medium uppercase">Ascending by...</span>*/}
                      <span className="btn-text text-xs font-medium uppercase">Latest</span>
                    </button>

                    <button className={"btn ml-4 text-gray-700 " + (dataStore.currentTab !== 'topvote' ? "opacity-60 hover:opacity-100" : "")}
                            onClick={handleTopVote}>
                      <span className="icon mr-1"><RiFireFill/></span>
                      <span className="btn-text text-xs font-medium uppercase">
												Top Vote
										</span>
                    </button>

                    <button className={"btn mr-4 text-gray-700 " + (dataStore.currentTab !== 'topcomment' ? "opacity-60 hover:opacity-100" : "")}
                            onClick={handleTopComment}>
                      <span className="icon ml-1"><RiFireFill/></span>
                      <span className="btn-text text-xs font-medium uppercase">
												Top comments
										</span>
                    </button>
                  </div>
                  :
                  <div className="section-cta">
                    <div className="btn-group flex rounded px-1 py-1 bg-gray-100 text-xs ml-4">
                      {/*<Button active={store.stateIdeas.ideasOrder_ == 'popular'} onClick={e => store.stateIdeas.setIdeasOrder('popular')}>Popular11</Button>*/}
                      {/*<Button active={store.stateIdeas.ideasOrder_ == 'latest'} onClick={e => store.stateIdeas.setIdeasOrder('latest')}>Latest22</Button>*/}
                      <Button active={dataStore.currentTab == 'popular'}
                              onClick={e => handlePopular(e)}>Popular</Button>
                      <Button active={dataStore.currentTab == 'latest'}
                              onClick={e => handlePostsLatest(e)}>Latest</Button>
                    </div>
                  </div>
              }
            </div>
            }
          </div>

          <div className="section-body">
            <div className={`grid grid gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
              {
                showPosts(posts)
              }
            </div>
          </div>

          <div className="section-footer">
            {dataStore.home.homeDisplay === homeDisplay && dataStore.home.isHome
							? <a onClick={e => dataStore.home.homeDisplay = 0} href={"#top"}
                   className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                 justify-center py-3 px-3 rounded w-auto mt-8 mr-2 text-sm">
                <span className="icon"><IoChevronBackSharp/></span>
                <span className="btn-text whitespace-nowrap">Back to home</span>
              </a>
							: ""
						}
            {loadingButton
              ? <a className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span className={"btn btn-text"}>Loading...</span>
              </a>
              : ""
            }
            {showMoreButton ?
              <a onClick={handleLoadMoreItems}
                 className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                   justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span className="btn-text">Show 12 more</span>
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
    </div>
  )
})