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
      extraClassName="page-home"
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
                  <span className="btn__caret_left"></span>
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
                        Bitcoin Price FLOODED With Green (Cardano BREAKOUT Pending)
                      </span>
                    </h1>
                  </div>
                  <div className="metadata-wrapper justify-between">
                    <div className="flex flex-shrink-0">
                      <div className="metadata metadata-source">
                        <span className="icon mr-1">
                          <i className="fab fa-youtube"></i>
                        </span>
                        <span className="metadata-value" title="CoinTelegraph">
                          Crypto Capital Venture
                        </span>
                      </div>
                      <div className="metadata metadata-date">
                        <span
                          className="metadata-value"
                          title="6:28 PM - Jul 28, 2021"
                        >
                          30m
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
                  <div className="post-media">
                    {/* Media Player Here */}
                    <div className="media-player">
                      <div className="w-full h-full">
                        <div className={`aspect-w-16 aspect-h-9`}>
                          <iframe width="640" height="360" src="https://www.youtube.com/embed/k2dol_FXyRo" title="Bitcoin Price FLOODED With Green (Cardano BREAKOUT Pending)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>
                      ⚡⚡ Stake Your Cardano with my new ADA Pool! Ticker: CCV3<br/>
                      CCV3 pool id for delegation:<br/>
                      903c38e5905f1587d5ecf8c875a181725fb4b12b3eb06ce1d20bb1c6<br/>
                    </p>
                    <p>
                      Bitcoin has closed 9 daily green candles in a row. Crypto markets on the short term have been very hype with some altcoins continuing to see higher highs, including Cardano. Do Bitcoin and Cardano bulls have continued momentum to continue this rise? Or has their time come up and is BTC and ADA about to crash?
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