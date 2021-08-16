import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../lib/store";
import utils from "../lib/util";
import {Layout} from "../components/page-layouts/Global";
import {PostsListWrapper} from "../components/card-layouts/concepts/PostsList";
import Screen from "../components/Resposive";
import ThemeSwitch from "../components/ThemeSwitch";
import {Wallet} from "../components/Wallet";
import {observer} from "mobx-react";
import {HOME_ITEM_TAKE} from "../config/paging";
import {getItemById, getItems} from "../data/query/getItem";
import React, {useEffect, useState} from "react";
import {IndexRightBar} from "../components/IndexRightBar";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const getDataExplore = async ({query,type,lang}) => {
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
    type : "",
    itemFeed : itemFeed.data.itemFeed
  }
}

const getDataPostDetail = async ({query,id,lang}) => {
  const newsDetail = await getItemById({id : id})
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
  const [cookies, setCookie] = useCookies(['dhunt_language']);
  useEffect(function(){
    if (cookies.dhunt_language != props.lang && ["en","vi"].indexOf(cookies.dhunt_language) !== -1){
      window.location.href = "/" + cookies.dhunt_language
    }
  },[])
  if (props.item === undefined) {
    observableItemStore.query = props.query
    observableItemStore.lang = props.lang

    observableItemStore.tweets = props.itemFeed
    observableItemStore.type = props.type
    observableItemStore.showDetail = false
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
    item.item = {
      id : props.item.id,
      totalVote : props.item.totalVote,
      totalComment : props.item.totalComment,
    }
    detailStore.data = item
  }

  return (
    <Layout dataStore={observableItemStore} extraClass="page-home" meta={utils.createSiteMetadata({page : 'Index',data : {}})}>

      <div className={`pane-content`}>

        {/* main content pane */}
        <div className={`pane-content--main`}>
          <PostsListWrapper  dataStore={observableItemStore} detailStore={detailStore} voteStore={voteStore} />
        </div>

        {/* secondary content pane */}
        <IndexRightBar back={ "/" + props.lang + "/explore/"+props.type} dataStore={observableItemStore} detailStore={detailStore} props={props} voteStore={voteStore} />
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
  console.log(context.params.slug)

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
  }
  else if (type === "post"){
    let id = context.params.slug[1] === undefined ? "" : context.params.slug[1]
    props = await getDataPostDetail({id : id,lang : context.locale});
  }
  return {
    props,
    revalidate: 60
  }
}