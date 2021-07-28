import React, {useCallback, useEffect, useMemo, useState, createRef} from 'react';

//ReactIcons
import {observer} from "mobx-react";
import {CardPost, CardPostLoader} from "../../cards/concepts/Post";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import SearchInput from "../../search";
import {getItems} from "../../../data/query/getItem";
import {HOME_ITEM_TAKE} from "../../../config/paging";
import PerfectScrollbar from "perfect-scrollbar";

export const PostsListWrapper = observer(function ({dataStore}){
  const handleChangeFilter = ({filter}) =>{
    dataStore.currentTab = filter;
    dataStore.tweets = []
    dataStore.loadingButton = false;
    handleLoadMoreItem();
  }
  const scrollBox1 = createRef();

  let ps1;
  useEffect(() => {
    // make scrollbar
    ps1 = new PerfectScrollbar(scrollBox1.current, {});
    scrollBox1.current.removeEventListener('ps-y-reach-end', () => {handleLoadMoreItem()});
    scrollBox1.current.addEventListener('ps-y-reach-end', () => {handleLoadMoreItem()});
    return () => {
      ps1.destroy();
    }
  }, [scrollBox1]);

  const handleLoadMoreItem = () =>{
    if (dataStore.loadingButton) return false;
    dataStore.loadingButton = true;
    getItems({
      take : HOME_ITEM_TAKE,
      skip : dataStore.tweets.length,
      orderBy : dataStore.currentTab === "latest" ? {createdAt : "desc"} : {totalVote : "desc"},
      query : dataStore.query
    }).then(function (res){
      dataStore.loadingButton = false;
      dataStore.addTweet(res.data.itemFeed)
      ps1.update()
    })
  }
  return (
    <>
      <div className={`pane-content--main--top`}>

        <div className="flex-1">
          {/* Search */}
          <SearchInput />
        </div>

        <div className="flex-shrink-0">
          {/* Sort */}
          <div className="btn-group btn-group-filter">
            <a className={"btn " + (dataStore.currentTab === "popular" ? "btn-filter-active" : "btn-filter")} onClick={() => {handleChangeFilter({filter: "popular"})}}>Popular</a>
            <a className={"btn " + (dataStore.currentTab === "latest" ? "btn-filter-active" : "btn-filter")} onClick={() => {handleChangeFilter({filter: "latest"})}}>Latest</a>
          </div>
        </div>
      </div>
      <div className={`pane-content--main--main scrollbar`} ref={scrollBox1}>
        {dataStore.loadingButton ?
          <PostsListLoader />
          :
          <PostsList dataStore={dataStore} />
        }
      </div>
    </>
  )
})


function getSourceFromUri(websiteUri){
  const displaySources = ['Cardano Foundation', 'IOHK', 'CoinDesk', 'CoinTelegraph', 'AdaPulse', 'CoinGape']
  const listSources = ['forum.cardano', 'iohk', 'coindesk', 'cointele', 'adapulse', 'coingape']
  for (const [i, value] of listSources.entries()) {
    if (websiteUri.toLowerCase().includes(value)) {
      return displaySources[i]
    }
  }
  return ""
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

export const PostsList = observer(({title, extraClass,dataStore}) => {
  return (
    <div className={`cards-list ${extraClass || ''}`}>
      {dataStore.tweets.map(function(item){
        let title = null,mediaUri = null,source = null, voteCount=item.totalVote,commentCount=item.totalComment
        if (item.news !== null){
          item.createdAt = item.news.createdAt
          source = getSourceFromUri(item.news.websiteUri)
          title = item.news.title
          mediaUri = item.news.thumbnailUri !== "" ? item.news.thumbnailUri : null
          return <CardPost key={item.id}
                           title={title}
                           mediaUri={mediaUri}
                           type="fad fa-newspaper"
                           source={source}
                           commentCount={commentCount}
                           voteCount={voteCount} item={item}
          />
        }

        if (item.tweet !== null){
          item.createdAt = item.tweet.createdAt
          title = item.tweet.source.full_text
          mediaUri = item.tweet.tweetUser ? item.tweet.tweetUser.source.profile_image_url_https : null
          source = "Twitter"
          return <CardPost key={item.id}
                           title={title}
                           mediaUri={mediaUri}
                           type="fad fa-twitter"
                           source={source}
                           commentCount={commentCount}
                           voteCount={voteCount} item={item}
          />
        }

        if (item.idea !== null){
          item.createdAt = item.idea.createdAt
          title = item.idea.title
          mediaUri = Object.keys(item.idea.imagesUri).length === 0 ? null : item.idea.imagesUri[0]
          return <CardPost key={item.id}
                           title={title}
                           mediaUri={mediaUri}
                           type="fad fa-code"
                           source={"Project Catalyst"}
                           commentCount={commentCount}
                           voteCount={voteCount} item={item}
          />
        }

        if (item.video !== null){
          return <CardPost key={item.id}
                           title="This Group of Investors Drives Bitcoin Bull Markets, According to Analyst Willy Woo – And It’s Not Whales"
                           mediaUri="https://picsum.photos/80/80?random=3"
                           type="fad fa-youtube"
                           source="DailyHodl"
                           commentCount="0"
                           voteCount="0" item={item}
          />
        }

        if (item.media !== null){
          return <CardPost key={item.id}
                           title="This Group of Investors Drives Bitcoin Bull Markets, According to Analyst Willy Woo – And It’s Not Whales"
                           mediaUri="https://picsum.photos/80/80?random=3"
                           type="fad fa-spotify"
                           source="DailyHodl"
                           commentCount="0"
                           voteCount="0" item={item}
          />
        }

      })}
    </div>
  )
})