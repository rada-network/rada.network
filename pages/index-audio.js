import Link from 'next/link'

// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../components/page-layouts/Global';
import {Header} from '../components/headers/HeaderHome';
import {Sidebar} from '../components/sidebar/Sidebar';
import {ProjectsList} from '../components/card-layouts/ProjectsList';
import {CategoryList} from '../components/card-layouts/CategoryList';
import {MediaList} from '../components/card-layouts/MediaList';

// Concepts
import SearchInput from "../components/search"
import {PostsList, PostsListWrapper} from "../components/card-layouts/concepts/PostsList";
import {PostsListTrending} from "../components/card-layouts/concepts/PostsListTrending";
import {Wallet} from "../components/Wallet"
import ThemeSwitch from "../components/ThemeSwitch"
import {RiExternalLinkLine} from "react-icons/ri";

import { observer } from "mobx-react"
import React, { useState, useEffect, createRef } from 'react'

import utils from "../lib/util";
import {HomeStore, ObservableTweetStore, VoteStore} from "../lib/store";
import Responsive from '../components/Resposive';


const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableItemStore = new ObservableTweetStore({homeStore});

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {CommentList} from "../components/comments/commentList";
import {getNews} from "../data/query/getNewsById";

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

  observableItemStore.query = props.query
  const [scrollbar] = useState('')

  observableItemStore.tweets = props.itemFeed


  const scrollBox2 = createRef();
  let ps2;
  
  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);

  return (
    <Layout
      extraClass="page-home"
      meta={utils.createSiteMetadata({ page: "Index", data: {} })}
    >
      <div className={`pane-content`}>
        {/* main content pane */}
        <div className={`pane-content--main`}>
          <PostsListWrapper dataStore={observableItemStore} />
        </div>

        {/* secondary content pane */}
        <div className={`pane-content--sec`}>
          <Responsive gt="1024">
            <div className={`pane-content--sec--top`}>
              <div className="leading-10"></div>
              <div className="flex items-center space-x-2">
                <ThemeSwitch />
                <div className="relative">
                  <Wallet />
                </div>
              </div>
            </div>
          </Responsive>

          <div className={`pane-content--sec--main scrollbar`} ref={scrollBox2}>
            {/* Post Detail */}
            <div className="page">

              {/* Close Button */}
              <div className="page-back">
                <div className="btn">
                  <span class="btn__caret_left"></span>
                  <span className="btn__text">Back</span>
                </div>
              </div>

              {/* News Post Detail Content */}
              <div className="section post-detail post-detail-media">
                {/* Post Header */}
                <div className="section-header post-header">
                  <div className="flex">
                    <h1 className="post-title">
                      <span className="text-color-title">
                        Ep. 384 - The New FORTH Token with Evan Kuo of Ampleforth
                      </span>
                    </h1>
                  </div>
                  <div class="metadata-wrapper justify-between">
                    <div class="flex flex-shrink-0">
                      <div class="metadata metadata-source">
                        <span class="icon mr-1">
                          <i class="fab fa-spotify"></i>
                        </span>
                        <span class="metadata-value" title="CoinTelegraph">
                          CRYPTO 101
                        </span>
                      </div>
                      <div class="metadata metadata-date">
                        <span
                          class="metadata-value"
                          title="6:28 PM - Jul 28, 2021"
                        >
                          30m
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-shrink-0">
                      <div class="cta-wrapper">
                        <button class="btn btn-post-vote">
                          <span class="icon mr-1">
                           <i class="fas fa-arrow-up"></i>
                          </span>
                          <span class="btn-post-vote_total ml-1 whitespace-nowrap">
                            <span class="inline-block">Upvote</span>
                            <strong class="inline-block ml-2 font-bold">
                              5
                            </strong>
                          </span>
                        </button>
                        <a target="_blank" rel="nofollow" href="#" class="btn btn-post-link ml-2">
                          <span class="whitespace-nowrap">Visit</span>
                          <span class="icon ml-2"><RiExternalLinkLine /></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-body post-body">
                  <div className="post-media">
                    {/* Media Player Here */}
                    <div className="media-player">
                      <div className="w-full h-full overflow-hidden">
                        <iframe src="https://open.spotify.com/embed/episode/58C0oqH4VgdKy6TzFC4FCK" width="100%" height="152" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                      </div>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>
                      In this episode of CRYPTO 101, brought to you by StopSIMSwaps.com, we catch up with Evan Kuo of Ampleforth to talk about the launch of the new FORTH governance token… and how Ampleforth is diving into cross-chain integration.
                    </p>
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