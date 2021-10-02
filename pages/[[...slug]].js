import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../lib/store";
import utils from "../lib/util";
import {Layout} from "../components/page-layouts/Global";
import {PostsListWrapper} from "../components/card-layouts/PostsList";
import {observer} from "mobx-react";
import {HOME_ITEM_TAKE} from "../config/paging";
import {getItemById, getItems} from "../data/query/getItem";
import { getPage } from "../data/query/page";
import React, {useEffect, useRef, useState} from "react";
import {IndexRightBar} from "../components/IndexRightBar";
import _ from "lodash"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Resizer } from "../components/utils/Resizer";
import store from "store"
import { usePageStore } from "../lib/usePageStore";
import {getSession} from "next-auth/client"

const getDataExplore = async ({query,type,lang}) => {
  if (['news','projects','video','rada','social','all',''].indexOf(type) === -1){
    return false
  }
  if (type == ""){
    type = "projects"
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
  const intro = await getPage({slug: 'intro', lang})

  return {
    query : query,
    type : type,
    lang : lang,
    itemFeed : itemFeed.data.itemFeed,
    intro
  }
}

const getDataHome = async ({query,lang}) => {
  const itemFeed = await getItems({
    take : HOME_ITEM_TAKE,
    skip : 0,
    orderBy : {createdAt : "desc"},
    query : query,
    lang : lang,
    type : "projects"
  })
  query = query || ""
  const intro = await getPage({slug: 'intro', lang})
  return {
    query : query,
    lang : lang,
    type : "projects",
    itemFeed : itemFeed.data.itemFeed,
    intro
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
  const intro = await getPage({slug: 'intro', lang})
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
    intro
  }
}

export default observer(function(props) {
  const {dataStore,detailStore,voteStore} = usePageStore()
  if (props.item === undefined) {
    dataStore.query = props.query

    dataStore.tweets = props.itemFeed
    dataStore.type = props.type
    dataStore.meta = utils.createSiteMetadata(
    {
      page : 'Explore',
      data : {
        query:props.type == "all" ? props.query : props.type
      },
      dataStore : dataStore
    })
  }
  else{
    dataStore.query = props.query
    dataStore.tweets = props.itemFeed
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
    dataStore.type = detailStore.type.slice(0);
    item.item = {
      id : props.item.id,
      totalVote : props.item.totalVote,
      totalComment : props.item.totalComment,
      token : props.item.token,
    }
    detailStore.data = item
    dataStore.meta = utils.createSiteMetadata({page : 'ItemDetail',data : {...item,type : detailStore.type},dataStore : dataStore})
  }
  return (
    <Index props={props} dataStore={dataStore} voteStore={voteStore} detailStore={detailStore} />
  )
})

export const Index  = ({props,dataStore,voteStore,detailStore}) => {
  let meta
  /* Dragger to resize main col */
  const mainRef = useRef()
  const containerRef = useRef()
  return (
    <Layout dataStore={dataStore} detailStore={detailStore} extraClass="page-home" meta={meta}>

      <div className={`pane-content`} ref={containerRef} >
        {/* main content pane */}
        <div className={`pane-content--main`} ref={mainRef}>
          <PostsListWrapper  />
          <ResizeerWrapper dataStore={dataStore} mainRef={mainRef} containerRef={containerRef} />
        </div>

        {/* secondary content pane */}
        <IndexRightBar back={ "/" + props.lang + "/apps/explore/"+props.type} dataStore={dataStore} detailStore={detailStore} props={props} voteStore={voteStore} intro={props.intro} />
      </div>
    </Layout>
  )
}

const ResizeerWrapper = function({mainRef,dataStore,containerRef}){
  let pw 
  let mw 
  useEffect(() => {
    let mwp = store.get('main-width')
    if (_.isUndefined(mwp)) {
      mwp = 40
    }
    if (isNaN(mwp)) {
      mwp = 40
    }
    if (mwp > 50) mwp = 50
    if (mwp < 30) mwp = 30
    dataStore.home.mainwidth=mwp
    const style=`--main-width: ${mwp}%`
    containerRef.current.setAttribute('style', style)
  },[])
  const resizeStart = e => {
    pw = mainRef.current.parentNode.clientWidth
    mw = mainRef.current.clientWidth
  }
  const resizeDone = e => {
    if (!pw) pw = mainRef.current.parentNode.clientWidth
    // calculate width
    let mwp = Math.round(mainRef.current.clientWidth / pw * 100)
    if (mwp > 50) mwp = 50
    if (mwp < 30) mwp = 30
    dataStore.home.mainwidth=mwp
    const style=`--main-width: ${mwp}%`
    containerRef.current.setAttribute('style', style)
    store.set("main-width",mwp)
    mainRef.current.nextSibling.style.width = ''
    mainRef.current.style.width = ''
  }
  const resizePane = e => {
    // calculate width
    const dw = e.clientX - e.startX
    let mwn = Math.round(mw + dw)
    if (mwn > 0.5*pw) mwn = Math.round(0.5*pw)
    if (mwn < 0.3*pw) mwn = Math.round(0.3*pw)
    mainRef.current.style.width = mwn + 'px'
    mainRef.current.nextSibling.style.width = (pw-mwn-1) + 'px'
  }

  return (
    <Resizer className="pane-dragger" onDragMove={resizePane} onDragStop={resizeDone} onDragStart={resizeStart}></Resizer>
  )
}


export async function getStaticPaths() {
  return {
    paths: [
    ],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  if (context.params.slug === undefined){
    let props = await getDataHome({lang : context.locale});
    props = Object.assign(props,{
      ...await serverSideTranslations(context.locale, ['common', 'navbar']),
    })
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
  else if (type === "tags"){
    let query = context.params.slug[1] === undefined ? "" : context.params.slug[1]
    props = await getDataExplore({query : query,type : "all",lang : context.locale});
    if (!props){
      return {
        notFound: true
      }
    }

  }
  else {
    return {
      notFound: true
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