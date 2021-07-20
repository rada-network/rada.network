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
import {PostsList} from "../components/card-layouts/concepts/PostsList";
import {PostsListTrending} from "../components/card-layouts/concepts/PostsListTrending";

import { observer } from "mobx-react"
import { useState, useEffect, createRef } from 'react'

//ReactIcons
import {getPosts} from "../data/query/posts"
import {getTweet} from "../data/query/postsTweet"
import {useStore} from "../lib/useStore"
import {SocialPostsList} from "../components/card-layouts/SocialPostsList";
import {getTopic} from "../data/query/topic";
import utils from "../lib/util";
import {HomeStore, ObservableTweetStore, VoteStore} from "../lib/store";
import {BlogsList} from "../components/card-layouts/BlogsList";
import {getNews} from "../data/query/news";


const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableTweetStore = new ObservableTweetStore({homeStore});
const observableItemStore = new ObservableTweetStore({homeStore})
const observableNftStore = new ObservableTweetStore({homeStore})
const observableDappStore = new ObservableTweetStore({homeStore})
const observableNewsStore = new ObservableTweetStore({homeStore})

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

const scrollBox = createRef();
let ps;

const getData = async () => {

  const posts = await getPosts({type : "",skip : 0,take : 6, socialOrder : observableItemStore.currentTab})

  const postsNFT = await getPosts({type : "nft",skip : 0,take : 6,socialOrder : observableNftStore.currentTab})

  const postsDapp = await getPosts({type : "dapp",skip : 0,take : 6,socialOrder : observableDappStore.currentTab})

  const postsTweet = await getTweet({socialOrder: observableTweetStore.currentTab,skip : 0,take : 12,query: "ada,cardano"});

  const news = await getNews({take : 6, skip: 0, orderBy: {createdAt : "desc"}})

  const topic = await getTopic();

  return {
    posts: posts.data.ideaFeed,
    postsNFT: postsNFT.data.ideaFeed,
    postsDapp: postsDapp.data.ideaFeed,
    postsTweet: postsTweet.data.tweetFeed,
    topic : topic.data.itemTypeCount,
    news : news.data.newsFeed
  }
}


export default observer((props) => {
  const data = props
  // const data = props
  // update to store
  if (!data) return <div>loading...</div>
  // init first tweet data to show in homepage
  observableTweetStore.query = "ada,cardano"
  observableTweetStore.tweets = data.postsTweet
  observableItemStore.tweets = data.posts
  observableNftStore.tweets = data.postsNFT
  observableDappStore.tweets = data.postsDapp
  observableNewsStore.tweets = data.news

  const [scrollbar] = useState('')

  useEffect(() => {
    // make scrollbar
    ps = new PerfectScrollbar(scrollBox.current, {
    });

    return () => {
      ps.destroy();
    }
  }, [scrollBox]);

  return (
    <Layout extraClass="page-home" meta={utils.createSiteMetadata({page : 'Index',data : {}})}>

    <div className={`pane-content`}>

      {/* main content pane */}
      <div className={`pane-content--main`}>

        <div className={`pane-content--main--top`}>

          <div className="flex-1">
            {/* Search */}
            <SearchInput />
          </div>

          <div className="flex-shrink-0">
            {/* Sort */}
            <div className="btn-group btn-group-filter">
              <a className="btn btn-filter">Popular</a>
              <a className="btn btn-filter-active">Latest</a>
            </div>
          </div>

        </div>

        <div className={`pane-content--main--main scrollbar`} ref={scrollBox}>
          <PostsList />
        </div>

      </div>

      {/* secondary content pane */}
      <div className={`pane-content--sec`}>

        <div className={`pane-content--sec--top`}>
        </div>

        <div className={`pane-content--sec--main`}>
          <PostsListTrending title="Most Popular" />
        </div>

      </div>

    </div>

    </Layout>
  )
})

export async function getStaticProps() {
  const props = await getData();
  return {
    props,
    revalidate: 900
  }
}