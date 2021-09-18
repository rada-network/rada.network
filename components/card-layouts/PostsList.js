import React, {useCallback, useEffect, useMemo, useState, createRef, useRef} from 'react';
import Link from 'next/link'

//ReactIcons
import {observer} from "mobx-react";
import {CardPost, CardPostLoader} from "../cards/Post";
import SearchInput from "../search";

import {getItems} from "../../data/query/getItem";
import {HOME_ITEM_TAKE} from "../../config/paging";

import utils from "../../lib/util";
import {useRouter} from "next/router";
import {useStore} from "../../lib/useStore";

import { useTranslation } from 'next-i18next';
import { data } from 'autoprefixer';

// Concepts
import {ConceptCardPost} from "../cards/concepts/PostRada";


export const PostsListWrapper = observer(function ({dataStore,detailStore,voteStore}){
  const handleChangeFilter = ({filter}) =>{
    if (dataStore.loadingButton) return false
    dataStore.currentTab = filter;
    dataStore.tweets = []
    //dataStore.loadingButton = false;
    handleLoadMoreItem();
  }
  const {t} = useTranslation("common")
  const scrollBox1 = useRef();

  const awayCls = 'list-away-top'
  useEffect(() =>{
    scrollBox1.current.removeEventListener('scroll', mobileScroll);
    scrollBox1.current.addEventListener('scroll', mobileScroll);
    //mobileScroll()
    return () => {
      document.body.classList.remove(awayCls)
      if (scrollBox1?.current) {
        scrollBox1.current.scrollTo(0, 0)    
        scrollBox1.current.removeEventListener('scroll', mobileScroll);
      }
    }
  },[dataStore.type + dataStore.currentTab])

    // }
  let lastPos = 0
  const mobileScroll = function(e){
    const el = scrollBox1.current
    if (el.scrollTop > 100 && el.scrollTop >= lastPos) {
      document.body.classList.add(awayCls)
    } else if (el.scrollTop < el.scrollHeight - el.clientHeight - 100 && el.scrollTop < lastPos) {
      document.body.classList.remove(awayCls)
    }
    lastPos = el.scrollTop

    const bottom = el.scrollHeight - el.scrollTop < el.clientHeight +100;
    if (bottom) handleLoadMoreItem()
  }

  const handleLoadMoreItem = () =>{
    if (dataStore.loadingButton) return false;
    dataStore.loadingButton = true;
    getItems({
      take : HOME_ITEM_TAKE,
      skip : dataStore.tweets.length,
      orderBy : dataStore.currentTab === "latest" ? {createdAt : "desc"} : {totalVote : "desc"},
      query : dataStore.query,
      type : dataStore.type,
      lang : dataStore.lang
    }).then(function (res){
      dataStore.addTweet(res.data.itemFeed)
      dataStore.loadingButton = false;
    })
  }

  const store = useStore()
  voteStore.walletAddress = store.wallet.address
  voteStore.addVotesV2(dataStore.tweets)
  return (
    <>
      <div className={`pane-content--main--top`}>
        <div className="search-wrapper">
          {/* Search */}
          <SearchInput dataStore={dataStore} detailStore={detailStore} voteStore={voteStore}/>
        </div>

        <div className="cta-wrapper">
          {/* Sort */}
          <div className="btn-group btn-group-filter">
            <a className={"btn " + (dataStore.currentTab === "popular" ? "btn-filter-active" : "btn-filter")} onClick={() => {handleChangeFilter({filter: "popular"})}}>
              <span className="btn--text">{t("popular")}</span>
            </a>
            <a className={"btn " + (dataStore.currentTab === "latest" ? "btn-filter-active" : "btn-filter")} onClick={() => {handleChangeFilter({filter: "latest"})}}>
              <span className="btn--text">{t("latest")}</span>
            </a>
          </div>
        </div>
      </div>

      <div className={`pane-content--main--main scrollbar`} ref={scrollBox1} cls="list-top-away">

        <PostsList dataStore={dataStore} detailStore={detailStore} voteStore={voteStore} />

        {dataStore.tweets.length == 0 && dataStore.isSearch && !dataStore.loadingButton ? 
        <p className="search-not-found">
          <strong>{dataStore.query}</strong>&nbsp;{t("search not found")}
        </p>
        :
        ""
        }

        {dataStore.loadingButton ?
          <PostsListLoader />
          :""
        }

      </div>
    </>
  )
})


export function getSourceFromUri(item){
  if (item.author !== null){
    return item.author.name
  }
  if (item.grabTopic !== null){
    return item.grabTopic.website.name
  }
  const websiteUri = item.websiteUri
  const displaySources = ['Cardano Foundation', 'IOHK', 'CoinDesk', 'CoinTelegraph', 'AdaPulse', 'CoinGape',"CryptoSlate"]
  const listSources = ['forum.cardano', 'iohk', 'coindesk', 'cointele', 'adapulse', 'coingape','cryptoslate']
  for (const [i, value] of listSources.entries()) {
    if (websiteUri.toLowerCase().includes(value)) {
      return displaySources[i]
    }
  }
  return ""
}

export function getSourceVideoFromUri(item){
  if (item.grabTopic !== null){
    return item.grabTopic.name
  }
  return item.source
}


export function createPostUri(title,slug,item,lang){
  if (slug !== null){
    return "/" + lang + "/post/" + slug
  }
  return "/" + lang + "/post/" + item.id + "/" + utils.convertToSlug(title)
}

const PostsListLoader = () => {
  return (
    <>
      {[...Array(10)].map((x, i) =>
        <CardPostLoader key={i} />
      )}
    </>
  )
}

export const PostsList = observer(({title, extraClass,dataStore,detailStore,voteStore}) => {
  const router = useRouter();
  const handleClickPost = (e,obj,type) => {
    e.preventDefault()
    e.stopPropagation()
    store.setShallowConnect(true)
    dataStore.showDetail = true;
    detailStore.data = obj
    detailStore.type = type
    const meta = utils.createSiteMetadata({page:"ItemDetail",data : {...obj,type},dataStore})
    document.title = meta.title
    router.push(e.currentTarget.getAttribute("href"),e.currentTarget.getAttribute("href"),{shallow:true})
    return false
  }
  return (
    <div className={`cards-list ${extraClass || ''}`}>
      {dataStore.tweets.map(function(item){
        let title = null,mediaUri = null,source = null, voteCount=item.totalVote,commentCount=item.totalComment,slug = null
        if (item.news !== null){
          item.news.item = {
            id : item.id,
            totalVote: item.totalVote,
            totalComment: item.totalComment
          }
          item.createdAt = item.news.createdAt
          source = getSourceFromUri(item.news)
          title = item.news.title
          slug = item.news.slug
          if (item.news.lang === "all"){
            if (dataStore.lang === "en"){
              title = item.news.title_en
              slug = item.news.slug_en
            }
          }
          mediaUri = item.news.thumbnailUri !== "" ? item.news.thumbnailUri : null
          return (
            <a key={item.id} href={createPostUri(title,slug,item,dataStore.lang)} onClick={(e)=>handleClickPost(e,item.news,"news")}>
              <CardPost key={item.id}
                        title={title}
                        mediaUri={mediaUri}
                        type="fa-duotone fa-newspaper"
                        source={source}
                        commentCount={commentCount}
                        voteCount={voteCount} item={item}
                        detailStore={detailStore}
                        voteStore={voteStore}
                        dataStore={dataStore}
              />
            </a>
          )
        }

        if (item.tweet !== null){
          item.tweet.item = {
            id : item.id,
            totalVote: item.totalVote,
            totalComment: item.totalComment
          }
          item.createdAt = item.tweet.createdAt
          title = item.tweet.source.full_text
          mediaUri = item.tweet.tweetUser ? item.tweet.tweetUser.source.profile_image_url_https : null
          source = item.tweet.tweetUser ? item.tweet.tweetUser.source.screen_name : null
          return (
            <a key={item.id} href={createPostUri(title,slug,item,dataStore.lang)} onClick={(e)=>handleClickPost(e,item.tweet,"tweet")}>
              <CardPost key={item.id}
                        title={title}
                        mediaUri={mediaUri}
                        type="fab fa-twitter"
                        source={source}
                        commentCount={commentCount}
                        voteCount={voteCount} item={item}
                        detailStore={detailStore}
                        voteStore={voteStore}
                        dataStore={dataStore}
              />
            </a>
          )
        }

        if (item.idea !== null){
          item.createdAt = item.idea.createdAt
          title = item.idea.title
          mediaUri = Object.keys(item.idea.imagesUri).length === 0 ? null : item.idea.imagesUri[0]
          return <CardPost key={item.id}
                           title={title}
                           mediaUri={mediaUri}
                           type="fa-duotone fa-code"
                           source={"Project Catalyst"}
                           commentCount={commentCount}
                           voteCount={voteCount} item={item}
                           detailStore={detailStore}
                           voteStore={voteStore}
                           dataStore={dataStore}
          />
        }

        if (item.video !== null){
          item.video.item = {
            id : item.id,
            totalVote: item.totalVote,
            totalComment: item.totalComment
          }
          item.createdAt = item.video.createdAt
          title = item.video.title
          slug = item.video.slug
          mediaUri = item.video.thumbnailUri
          source = getSourceVideoFromUri(item.video)
          return (
            <a key={item.id} href={createPostUri(title,slug,item,dataStore.lang)} onClick={(e)=>handleClickPost(e,item.video,"video")}>
            <CardPost key={item.id}
                      title={title}
                      mediaUri={mediaUri}
                      type="fab fa-youtube"
                      source={source}
                      commentCount={commentCount}
                      voteCount={voteCount} item={item}
                      detailStore={detailStore}
                      voteStore={voteStore}
                      dataStore={dataStore}
            />
            </a>
          )
        }

        if (item.media !== null){
          return <CardPost key={item.id}
                           title="This Group of Investors Drives Bitcoin Bull Markets, According to Analyst Willy Woo – And It’s Not Whales"
                           mediaUri="https://picsum.photos/80/80?random=3"
                           type="fa-duotone fa-spotify"
                           source="DailyHodl"
                           commentCount="0"
                           voteCount="0" item={item}
                           detailStore={detailStore}
                           voteStore={voteStore}
                           dataStore={dataStore}
          />
        }

      })
      }
    </div>
  )
})