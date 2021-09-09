
// import dynamic from 'next/dynamic'

// Components
import {Layout} from '../../components/page-layouts/Global';

// Concepts
import {PostsListWrapper} from "../../components/card-layouts/PostsList";
import {Wallet} from "../../components/Wallet"
import ThemeSwitch from "../../components/ThemeSwitch"
import {RiExternalLinkLine} from "react-icons/ri";

import { observer } from "mobx-react"
import React, { useState, useEffect, createRef } from 'react'

import utils from "../../lib/util";
import {HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import { FromLg } from '../../components/utils/Responsive';

const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableItemStore = new ObservableTweetStore({homeStore});

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {getItems} from "../../data/query/getItem";
import {HOME_ITEM_TAKE} from "../../config/paging";
import {CommentList} from "../../components/comments/commentList";

const getData = async ({query}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query
  })
  return {
    query : query,
    itemFeed : itemFeed.data.itemFeed,
  }
}


export default observer((props) => {
  if (!props) return <div>loading...</div>

  observableItemStore.query = props.query
  const [scrollbar] = useState('')

  observableItemStore.tweets = props.itemFeed

  return ""
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
          <PostsListWrapper voteStore={voteStore} dataStore={observableItemStore} />
        </div>

        {/* secondary content pane */}
        <div className={`pane-content--sec`}>

          {/* <Screen from="lg"> */}
          <FromLg>
          <div className={`pane-content--sec--top`}>
            <div className="leading-10"></div>
            <div className="flex items-center space-x-2">
              <ThemeSwitch />
              <div className="relative">
                <Wallet />
              </div>
            </div>
          </div>
          </FromLg>
          {/* </Screen> */}

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
                  <div className="metadata-wrapper justify-between">
                    <div className="flex flex-shrink-0">
                      <div className="metadata metadata-source">
                        <span className="icon mr-1">
                          <i className="fab fa-spotify"></i>
                        </span>
                        <span className="metadata-value" title="CoinTelegraph">
                          CRYPTO 101
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