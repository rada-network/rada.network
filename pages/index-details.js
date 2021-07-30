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
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../lib/store";
import Responsive from '../components/Resposive';
import Screen from '../components/Resposive';

const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : false})

const observableItemStore = new ObservableTweetStore({homeStore});

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {CommentList} from "../components/comments/commentList";
import {getNews} from "../data/query/getNewsById";
import {PostListDetail} from "../components/card-layouts/concepts/PostListDetail";

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

  observableItemStore.query = props.query
  const [scrollbar] = useState('')

  observableItemStore.tweets = props.itemFeed

  const detailStore = new DetailStore()
  detailStore.data = props.news

  return (
    <Layout
      extraClass="page-home"
      meta={utils.createSiteMetadata({ page: "Index", data: {} })}
    >
      <div className={`pane-content`}>
        {/* main content pane */}
        <div className={`pane-content--main`}>
          <PostsListWrapper dataStore={observableItemStore} voteStore={voteStore} detailStore={detailStore} />
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

          <PostListDetail props={props} detailStore={detailStore} dataStore={observableItemStore} voteStore={voteStore} />
        </div>
      </div>
    </Layout>
  );
})

export async function getServerSideProps() {
  const query = "ada,cardano"
  const props = await getData({query});
  return {
    props,
    revalidate: 180
  }
}