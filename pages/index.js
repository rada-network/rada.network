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

import { observer } from "mobx-react"
import React, { useState, useEffect, createRef } from 'react'

import utils from "../lib/util";
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../lib/store";
import Screen from '../components/Resposive';

const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : true})

const observableItemStore = new ObservableTweetStore({homeStore});

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {getItems} from "../data/query/getItem";
import {HOME_ITEM_TAKE} from "../config/paging";
import {PostListDetail} from "../components/card-layouts/concepts/PostListDetail";

const getData = async ({query}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query
  })
  return {
    query : query,
    itemFeed : itemFeed.data.itemFeed
  }
}


export default observer((props) => {

  observableItemStore.query = props.query
  const [scrollbar] = useState('')

  observableItemStore.tweets = props.itemFeed

  const detailStore = new DetailStore()
  observableItemStore.showDetail = false
  return (
    <Layout extraClass="page-home" meta={utils.createSiteMetadata({page : 'Index',data : {}})}>

    <div className={`pane-content`}>

      {/* main content pane */}
      <div className={`pane-content--main`}>
        <PostsListWrapper  dataStore={observableItemStore} detailStore={detailStore} voteStore={voteStore} />
      </div>

      {/* secondary content pane */}

      <IndexRightBar back={"/"} dataStore={observableItemStore} detailStore={detailStore} props={props} voteStore={voteStore} />
    </div>
    </Layout>
  )
})

export const IndexRightBar = observer(({dataStore,detailStore,props,voteStore,back}) => {

  const scrollBox2 = createRef();
  let ps2;

  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);

  return (
    <>
      <div className={`pane-content--sec` + (dataStore.showDetail ? " pane-content-active" : "")}>

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
        {dataStore.showDetail ?
          <PostListDetail back={back} detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} />
          :
          ""
        }
        <div className={`pane-content--sec--main scrollbar ` + (dataStore.showDetail ? "hidden" : "")} ref={scrollBox2}>
          <Header props={{
            title : "RADA is a trends hunter for Cardano community",
            itemType : "home",
            description : "Stay updated with the best quality news & updates"
          }}/>
          <Sidebar className={`sidebar`} extraClass="" />
        </div>
      </div>
    </>
  )
})

export async function getStaticProps() {
  const query = "ada,cardano"
  const props = await getData({query});
  return {
    props,
    revalidate: 180
  }
}