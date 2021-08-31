import Link from 'next/link'

// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../../components/page-layouts/Global';
import {Header} from '../../components/headers/HeaderHome';
import {Sidebar} from '../../components/sidebar/Sidebar';

// Concepts
import SearchInput from "../../components/search"
import {PostsList, PostsListWrapper} from "../../components/card-layouts/PostsList";
import {Wallet} from "../../components/Wallet"
import ThemeSwitch from "../../components/ThemeSwitch"
import {RiExternalLinkLine} from "react-icons/ri";

import { observer } from "mobx-react"
import React, { useState, useEffect, createRef } from 'react'

import utils from "../../lib/util";
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import Responsive from '../../components/Resposive';
import Screen from '../../components/Resposive';


const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableItemStore = new ObservableTweetStore({homeStore});

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {getItems} from "../../data/query/getItem";
import {HOME_ITEM_TAKE} from "../../config/paging";
import {CommentList} from "../../components/comments/commentList";
import {getNews} from "../../data/query/getNewsById";

const getData = async ({query}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query
  })
  const newsDetail = await getNews({id : "fef6c34e-db9f-4470-870d-24aab5d5f9e2"})
  return {
    query : query,
    itemFeed : itemFeed.data.itemFeed,
    news : newsDetail.data.newsById,
  }
}


export default observer((props) => {
  if (!props) return <div>loading...</div>

  return ""
  observableItemStore.query = props.query
  const [scrollbar] = useState('')

  observableItemStore.tweets = props.itemFeed
  const detailStore = new DetailStore()

  const scrollBox2 = createRef();
  let ps2;
  
  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);

  return (
    <Layout dataStore={observableItemStore}
      extraClass="page-home"
      meta={utils.createSiteMetadata({ page: "Index", data: {} })}
    >
      <div className={`pane-content`}>
        {/* main content pane */}
        <div className={`pane-content--main`}>
          <PostsListWrapper voteStore={voteStore}  dataStore={observableItemStore} />
        </div>

        {/* secondary content pane */}
        <div className={`pane-content--sec`}>

          <Screen from="lg">
          <div className={`pane-content--sec--top`}>
            <div className="leading-10"></div>
            <div className="flex items-center space-x-2">
              <ThemeSwitch />
              <div className="relative">
                <Wallet />
              </div>
            </div>
          </div>
          </Screen>

          <div className={`pane-content--sec--main scrollbar`} ref={scrollBox2}>
            {/* Post Detail */}
            <div className="page">

              {/* Close Button */}
              <div className="page-back">
                <div className="btn">
                  <span className="btn--caret-left"></span>
                  <span className="btn--text">Back</span>
                </div>
              </div>

              {/* News Post Detail Content */}
              <div className="section post-detail post-detail-social">
                {/* Post Header */}
                <div className="section-header post-header">
                  <div className="flex">
                    <h1 className="post-title">
                      <span className="text-color-title">
                        You can now filter #Cardano events in http://pool.pm pools and homepage timelines based on a minimum $ada value.
                      </span>
                    </h1>
                  </div>
                  <div className="metadata-wrapper justify-between">
                    <div className="flex flex-shrink-0">
                      <div className="metadata metadata-source">
                        <span className="icon mr-1">
                          <i className="fab fa-twitter"></i>
                        </span>
                        <span className="metadata-value" title="CoinTelegraph">
                          AIR | A Cardano Stake Pool
                        </span>
                      </div>
                      <div className="metadata metadata-date">
                        <span
                          className="metadata-value"
                          title="6:28 PM - Jul 28, 2021"
                        >
                          16h
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0">
                      <div className="cta-wrapper">
                        <button className="btn btn-post-vote">
                          <span className="icon mr-1">
                           <i className="fas fa-arrow-up"></i>
                          </span>
                          <span className="btn-post-vote_total ml-1 whitespace-nowrap">
                            <span className="inline-block">Upvote</span>
                            <strong className="inline-block ml-2 font-bold">
                              5
                            </strong>
                          </span>
                        </button>
                        <a target="_blank" rel="nofollow" href="#" className="btn btn-post-link ml-2">
                          <span className="whitespace-nowrap">Visit</span>
                          <span className="icon ml-2"><RiExternalLinkLine /></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-body post-body">

                  <div className="post-content">

                    {/* Card Social Post Here */}
                    <div className="card card-social cursor-pointer">

                      <div className="card-header">
                        <div className="user-info-wrapper flex">
                          <div className="avatar">
                            <img className="avatar-img" src="https://pbs.twimg.com/profile_images/1278293181541560321/aCJ0i27x_normal.jpg" />
                          </div>
                          <div className="flex flex-col ml-3">
                            <div className="metadata-wrapper">
                              <a href="https://twitter.com/ADABreathes/status/1420306216115392512" target="_blank" className="metadata metadata-socialusername">
                                <span className="text-color-title">AIR | A Cardano Stake Pool</span>
                              </a>
                            </div>
                            <div className="metadata-wrapper">
                              <div className="metadata">
                                <span className="metadata-value">@ADABreathes</span>
                              </div>
                              <div className="metadata tweet_metadata_date">
                                <span className="metadata-value" title="3:52 PM - Jul 28, 2021">20h</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        <span className="icon icon-twitter"><i className="fab fa-twitter"></i></span>
                      
                      </div>
                    
                      <div className="card-body">
                        <div className="card-body--main">
                          <div className="card-text">
                            You can now filter #Cardano events in http://pool.pm pools and homepage timelines based on a minimum $ada value.<br/>

                            Remember that you can also click the headers to toggle them.<br/>

                            Note: the minAda query parameter is not used anymore.
                          </div>
                          <div className="card-media"
                               style={{  
                                backgroundImage: "url(" + "https://pbs.twimg.com/media/E7Xw-eXXEAQ-9iU.jpg" + ")",
                               }}
                          >
                            <img src="https://pbs.twimg.com/media/E7Xw-eXXEAQ-9iU.jpg" className="project-icon_img w-full h-full rounded object-cover" alt="" />
                          </div>
                        </div>
                      </div>
                    
                      <div className="card-footer">
                        <div className="metadata-wrapper metadata-wrapper_nodivide">
                          <div className="metadata">
                            <span className="icon mr-1 text-base opacity-40">
                              <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em">
                                <g>
                                  <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                                  </path>
                                </g>
                              </svg>
                            </span>
                            <span title="likes">0</span>
                          </div>
                          <div className="metadata ml-2">
                            <span className="icon mr-1 text-base opacity-40">
                              <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em">
                                <g>
                                  <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                                </path>
                              </g>
                            </svg>
                          </span>
                          <span title="retweet count">1</span>
                        </div>
                        <div className="metadata ml-2">
                          <span className="icon mr-1 text-base opacity-40">
                            <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em">
                              <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                                </path>
                              </g>
                            </svg>
                          </span>
                          <span title="likes">5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>
              </div>

              {/* Comments */}
              <CommentList item={props.news} />
              {/* //Comments */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
})

export async function getStaticProps() {
  const query = "ada,cardano"
  const props = await getData({query});
  return {
    props,
    revalidate: 180
  }
}