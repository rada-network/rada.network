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
  const router = useRouter()
  const store = useStore()
  let posts = dataStore.tweets
  const [loadingButton, setLoadingButton] = useState(false)

  const handleTopComment = () => router.push('/explore/top-comment')
  const handleTopVote = () => router.push('/explore/top-vote')
  const handlePostsDate = () => router.push('/explore/New-Project-Today')

  const fullDate = date.toISOString()
  const currentTime = fullDate.split(('T'))[0]
  const handleLoadMoreItems = async (e) => {
    if (dataStore.tweets.length > 0) dataStore.home.homeDisplay = homeDisplay
    setLoadingButton(true)

    const itemsData = await getPosts({
      socialOrder: dataStore.currentTab,
      skip: dataStore.tweets.length,
      take: 12,
      type: itemType === "all" ? "" : itemType
    });
    if (itemsData.loading) return false
    setLoadingButton(false)
    dataStore.addTweet(itemsData.data.itemFeed)
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
              <div className="ml-2 inline-flex justify-center items-center">
                <DropDown color="white"/>
              </div>

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
                    <button className="btn text-gray-700"
                            onClick={handleTopComment}>
                      <span className="icon mr-1"><RiTimeFill/></span>
                      <span className="btn-text text-xs font-medium uppercase">
												Top comments
										</span>
                    </button>
                    <button className="btn ml-4 text-gray-700 opacity-60 hover:opacity-100"
                            onClick={handleTopVote}>
                      <span className="icon mr-1"><RiFireFill/></span>
                      <span className="btn-text text-xs font-medium uppercase">
												Top Vote
										</span>
                    </button>
                    <button className="btn ml-4 text-gray-700 opacity-60 hover:opacity-100"
                            onClick={handlePostsDate}>
                      <span className="icon mr-1"><RiFireFill/></span>
                      {/*<span className="btn-text text-xs font-medium uppercase">Ascending by...</span>*/}
                      <span className="btn-text text-xs font-medium uppercase">{currentTime}</span>
                    </button>
                  </div>
                  :
                  <div className="section-cta">
                    <div className="btn-group flex rounded px-1 py-1 bg-gray-100 text-xs ml-4">
                      {/*<Button active={store.stateIdeas.ideasOrder_ == 'popular'} onClick={e => store.stateIdeas.setIdeasOrder('popular')}>Popular11</Button>*/}
                      {/*<Button active={store.stateIdeas.ideasOrder_ == 'latest'} onClick={e => store.stateIdeas.setIdeasOrder('latest')}>Latest22</Button>*/}
                      <Button active={store.state.socialOrder == 'popular'}
                              onClick={e => store.state.setSocialOrder('popular')}>Popular</Button>
                      <Button active={store.state.socialOrder == 'latest'}
                              onClick={e => store.state.setSocialOrder('latest')}>Latest</Button>
                    </div>
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
            {dataStore.home.homeDisplay === homeDisplay
							? <a onClick={e => dataStore.home.homeDisplay = 0} href={"#top"}
                   className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                 justify-center py-3 px-3 rounded w-auto mt-8 mr-4 text-sm">
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
              : <a onClick={handleLoadMoreItems}
                   className="btn bg-gray-100 hover:bg-purple-100 hover:text-purple-700
                   justify-center py-3 px-6 rounded w-full mt-8 text-sm">
                <span className="btn-text">Show 12 more</span>
              </a>
            }
          </div>
          {/* <div className={"section-footer"}>
						{dataStore.home.homeDisplay === homeDisplay
							? <a onClick={e => dataStore.home.homeDisplay = 0} href={"#top"}
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