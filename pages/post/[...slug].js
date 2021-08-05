import Link from 'next/link'

// import dynamic from 'next/dynamic'
import Head from 'next/head';

// Components
import {Layout} from '../../components/page-layouts/Global';
import {Header} from '../../components/headers/HeaderHome';
import {Sidebar} from '../../components/sidebar/Sidebar';
import {ProjectsList} from '../../components/card-layouts/ProjectsList';
import {CategoryList} from '../../components/card-layouts/CategoryList';
import {MediaList} from '../../components/card-layouts/MediaList';

// Concepts
import SearchInput from "../../components/search"
import {PostsList, PostsListWrapper} from "../../components/card-layouts/concepts/PostsList";
import {Wallet} from "../../components/Wallet"
import ThemeSwitch from "../../components/ThemeSwitch"
import {RiExternalLinkLine} from "react-icons/ri";

import { observer } from "mobx-react"
import React, { useState, useEffect, createRef } from 'react'

import utils from "../../lib/util";
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import Responsive from '../../components/Resposive';


const voteStore = new VoteStore();
const homeStore = new HomeStore({isHome : false})

const observableItemStore = new ObservableTweetStore({homeStore});

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {getItemById, getItems} from "../../data/query/getItem";
import {HOME_ITEM_TAKE} from "../../config/paging";
import {CommentList} from "../../components/comments/commentList";
import {getNews} from "../../data/query/getNewsById";
import {PostListDetail} from "../../components/card-layouts/concepts/PostListDetail";
import {useRouter} from "next/router";
import {IndexRightBar} from "../index";

const getData = async ({query,id}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query
  })
  const newsDetail = await getItemById({id : id})
  return {
    query : query,
    itemFeed : itemFeed.data.itemFeed,
    item : newsDetail.data.itemById,
  }
}


export default observer((props) => {

  observableItemStore.query = props.query
  const [scrollbar] = useState('')

  observableItemStore.tweets = props.itemFeed

  const detailStore = new DetailStore()
  let item = {}
  if (props.item.news !== null){
    detailStore.type = "news"
    item = Object.assign({},props.item.news);
  }
  else if (props.item.video !== null){
    detailStore.type = "video"
    item = Object.assign({},props.item.video);
  }
  else if (props.item.tweet !== null){
    detailStore.type = "tweet"
    item = Object.assign({},props.item.tweet);
  }
  else if (props.item.idea !== null){
    detailStore.type = "idea"
    item = Object.assign({},props.item.idea);
  }
  item.item = {
    id : props.item.id,
    totalVote : props.item.totalVote,
    totalComment : props.item.totalComment,
  }

  detailStore.data = item
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
        <IndexRightBar back={"/"} dataStore={observableItemStore} detailStore={detailStore} props={props} voteStore={voteStore} />
      </div>
    </Layout>
  );
})

export async function getServerSideProps(context) {
  const query = "ada,cardano"
  const slug = context.params.slug
  const props = await getData({query : query,id : slug[0]});
  return {
    props: props
  }
}