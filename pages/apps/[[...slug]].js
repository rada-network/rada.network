import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import utils from "../../lib/util";
import {Layout} from "../../components/page-layouts/Global";
import {PostsListWrapper} from "../../components/card-layouts/concepts/PostsList";
import {observer} from "mobx-react";
import {HOME_ITEM_TAKE} from "../../config/paging";
import {getItemById, getItems} from "../../data/query/getItem";
import React, {useEffect, useState} from "react";
import {IndexRightBar} from "../../components/IndexRightBar";
import _ from "lodash"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const getDataExplore = async ({query,type,lang}) => {
  if (['news','media','video','social','all',''].indexOf(type) === -1){
    return false
  }
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query,
    type : type,
    lang : lang
  })
  query = query || ""
  return {
    query : query,
    type : type,
    lang : lang,
    itemFeed : itemFeed.data.itemFeed
  }
}

const getDataHome = async ({query,lang}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query,
    lang : lang
  })
  query = query || ""
  return {
    query : query,
    lang : lang,
    type : "all",
    itemFeed : itemFeed.data.itemFeed
  }
}

const getDataPostDetail = async ({query,id,lang}) => {
  const newsDetail = await getItemById({id : id})
  if (_.isEmpty(newsDetail.data.itemById)){
    return false
  }
  let type = "all"
  if (newsDetail.data.itemById.news !== null){
    type = "news"
  }
  else if (newsDetail.data.itemById.video !== null){
    type = "media"
  }
  else if (newsDetail.data.itemById.tweet !== null){
    type = "social"
  }
  else if (newsDetail.data.itemById.idea !== null){
    type = "projects"
  }
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query,
    lang : lang,
    type : type
  })
  query = query || ""
  return {
    query : query,
    lang : lang,
    type : type,
    itemFeed : itemFeed.data.itemFeed,
    item : newsDetail.data.itemById,
  }
}

export default observer(function(props) {

  const voteStore = new VoteStore();
  const homeStore = new HomeStore({isHome : true})

  const observableItemStore =  new ObservableTweetStore({homeStore});

  return (
    <Index props={props} observableItemStore={observableItemStore} voteStore={voteStore} />
  )
})

export const Index  = observer(({props,observableItemStore,voteStore}) => {
  const detailStore = new DetailStore()
  let meta
  if (props.item === undefined) {
    observableItemStore.query = props.query
    observableItemStore.lang = props.lang

    observableItemStore.tweets = props.itemFeed
    observableItemStore.type = props.type
    observableItemStore.showDetail = false

    meta = utils.createSiteMetadata({page : 'Explore',data : {query:props.type},dataStore : observableItemStore})
  }
  else{
    observableItemStore.query = props.query
    observableItemStore.tweets = props.itemFeed
    observableItemStore.lang = props.lang
    observableItemStore.showDetail = true
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
    observableItemStore.type = detailStore.type.slice(0);
    item.item = {
      id : props.item.id,
      totalVote : props.item.totalVote,
      totalComment : props.item.totalComment,
    }
    detailStore.data = item
    meta = utils.createSiteMetadata({page : 'NewsDetail',data : {...item,type : detailStore.type},dataStore : observableItemStore})
  }

  return (
    <Layout dataStore={observableItemStore} detailStore={detailStore} extraClass="page-home" meta={meta}>

      <div className={`pane-content`}>

        {/* main content pane */}
        <div className={`pane-content--main`}>
          <PostsListWrapper  dataStore={observableItemStore} detailStore={detailStore} voteStore={voteStore} />
        </div>

        {/* secondary content pane */}
        <IndexRightBar back={ "/" + props.lang + "/apps/explore/"+props.type} dataStore={observableItemStore} detailStore={detailStore} props={props} voteStore={voteStore} />
      </div>
    </Layout>
  )
})


export async function getStaticPaths() {
  return {
    paths: [
    ],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  if (context.params.slug === undefined){
    const props = await getDataHome({lang : context.locale});
    return {
      props,
      revalidate: 60
    }
  }
  const type = context.params.slug[0]
  let props
  if (type === "explore"){
    let exType = context.params.slug[1] === undefined ? "" : context.params.slug[1]
    props = await getDataExplore({type : exType,lang : context.locale});
    if (!props){
      return {
        notFound: true
      }
    }
  }
  else if (type === "post"){
    let id = context.params.slug[1] === undefined ? "" : context.params.slug[1]
    props = await getDataPostDetail({id : id,lang : context.locale});
    if (!props){
      return {
        notFound: true
      }
    }

  }
  props = Object.assign(props,{
    ...await serverSideTranslations(context.locale, ['common', 'navbar']),
  })
  return {
    props,
    revalidate: 60
  }
}