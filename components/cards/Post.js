import React from "react";

import utils from "../../lib/util";

import KeywordIcon from "../icons/keywordIcon";

import ContentLoader from "react-content-loader";
import Link from "next/link"
import {observer} from "mobx-react";
import Image from 'next/image'
import { usePageStore } from "../../lib/usePageStore";
import {createPostUri} from "../card-layouts/PostsList"

import Screen from "../utils/Responsive";

import _ from 'lodash';
import RadaPost from "../svg/RadaPost";
import { useRouter } from "next/router";

export const CardPostLoader = (props) => {
  return (
    <div className={`card card-post`}>
      <div className={`card-body content-loader`}>
        <Screen upto="md">
        <ContentLoader
          speed={2}
          // backgroundColor="#F3F4F6"
          // foregroundColor="#ecebeb"
          viewBox="0 0 400 40"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%' }}
          {...props}
        >
          <rect x="0" y="0" rx="4" ry="4" width="40" height="40" />
          <rect x="56" y="6" rx="4" ry="4" width="320" height="6" />
          <rect x="56" y="26" rx="4" ry="4" width="128" height="6" />
        </ContentLoader>
        </Screen>

        <Screen from="lg">
        <ContentLoader
          speed={2}
          // backgroundColor="#F3F4F6"
          // foregroundColor="#ecebeb"
          viewBox="0 0 640 40"
          preserveAspectRatio="xMidYMid meet"
          // style={{ width: '100%' }}
          {...props}
        >
          <rect x="0" y="0" rx="4" ry="4" width="40" height="40" />
          <rect x="56" y="6" rx="4" ry="4" width="528" height="6" />
          <rect x="56" y="26" rx="4" ry="4" width="128" height="6" />
        </ContentLoader>
        </Screen>
      </div>
    </div>
  )}
  
export const CardPost = observer(({title,slug, mediaUri, type, source, commentCount, voteCount,item}) => {
  let isRada = false;
  if (item && item.news !== null && item.news.grabTopic !== null && item.news.grabTopic.url.indexOf("rada") !== -1) {
    isRada = true;
  }
  if (item && item.video !== null && item.video.grabTopic !== null && item.video.grabTopic.url.indexOf("rada") !== -1) {
    isRada = true;
  }
  return (
    <CardPostNormal title={title} slug={slug} mediaUri={mediaUri} type={type} source={source} commentCount={commentCount} isRada={isRada}
      voteCount={voteCount}item={item} />
  )
})


const CardPostNormal = observer(({title,slug, mediaUri, type, source, commentCount, voteCount,item,isRada}) => {
  const {detailStore,dataStore,voteStore} = usePageStore()
  const router = useRouter()
  const date = utils.timeDifference(new Date(), new Date(item.createdAt))
  const dateTitle = utils.titleTime(item.createdAt)
  let state = ""
  if (!_.isEmpty(detailStore.data) && detailStore.data.item){
    state = detailStore.data.item.id === item.id ? "active" : ""
  }
  let vote = voteStore.votes.filter(el =>{
    return el.id === item.id
  })
  let isVote
  if (vote.length > 0){
    voteCount = vote[0].totalVote
    isVote = vote[0].isVoted
  }
  dataStore.tweets.forEach((el) =>{
    if (el.id === item.id){
      commentCount = el.totalComment
    }
  })
  if (commentCount > 0){
    state += " hasComment"
  }
  if (isVote > 0 || voteCount > 0){
    state += " hasVote"
  }
  const handleClickPost = (e) => {
    e.preventDefault()
    e.stopPropagation()
    store.setShallowConnect(true)
    let post = dataStore.tweets.find(el => el.id === item.id)
    let obj
    if (post.news !== null){
      obj = Object.assign({},post.news);
      detailStore.type = "news"
    }
    else if (post.video !== null){
      obj = Object.assign({},post.video);
      detailStore.type = "video"
    }
    else if (post.tweet !== null){
      obj = Object.assign({},post.tweet);
      detailStore.type = "tweet"
    }
    else{
      return false
    }
    detailStore.data = obj;
    const meta = utils.createSiteMetadata({page:"ItemDetail",data : {...obj,type : detailStore.type},dataStore})
    dataStore.meta = meta
    router.push(e.currentTarget.getAttribute("href"),e.currentTarget.getAttribute("href"),{shallow:true})
    return false
  }
  return (
    <div className={`card card-post ${state}`}>

      {mediaUri !== null ?
        <div className={`card-media`}>
          <div className={`card-media-img`}>
            <a key={item.id} href={createPostUri(title,slug,item,dataStore.lang)} onClick={(e)=>handleClickPost(e)}>
              <img layout='fill' className={`card-img`} src={mediaUri} alt={title}/>
            </a>
          </div>
        </div>
        :
        <div className="card-media-blank">
          <a key={item.id} href={createPostUri(title,slug,item,dataStore.lang)} onClick={(e)=>handleClickPost(e)}>
            <img layout='fill' className="logo--img" src={process.env.NEXT_PUBLIC_CDN + "/images/rada-mono.svg"} alt="no image" />
          </a>
        </div>
      }

      <div className={`card-body`}>
        <div className={`card-body-header`}>
          <div className={`card-title`}>
              {isRada && dataStore.type !== "rada"  && dataStore.type !== "projects" ? 
              <span className="badge badge-rada">RADA</span> 
              : ""}
              <a className="text-color-title" key={item.id} href={createPostUri(title,slug,item,dataStore.lang)} onClick={(e)=>handleClickPost(e)}>{title}</a>
          </div>
          <div className={`card-badges`}>
            <PostTokenHolder tokens={item.tokens} />
          </div>
        </div>

        <div className="metadata-wrapper justify-between">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              {isRada ?
              <span className="icon icon-rada w-3.5 mr-1.5 opacity-70"><RadaPost /></span>
              :
              <span className="icon mr-1.5">
                <i className={`${type}`} />
              </span>
              }
              <span className="metadata-value" title={source}>{source}</span>
            </div>
            <div className="metadata metadata-date">
              <span className="metadata-value" title={dateTitle}>{date}</span>
            </div>
          </div>
          <div className="flex flex-shrink-0 metadata-wrapper_nodivide">
            <div className="metadata metadata-commentcount">
              <span className="icon mr-1.5">
                <i className="fa fa-comment" />
              </span>
              <span className="">{commentCount}</span>
            </div>
            <div className="metadata metadata-votecount">
              <span className="icon mr-1.5">
                <i className="fa-solid fa-caret-up" />
              </span>
              <span>{voteCount}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
})

const PostTokenHolder = function({tokens}){
  if (tokens.length == 0) return null;
  return (
    <>
    {tokens.map((item,index) => {
       if (index == 0) {
        return (
          <a href="#">
          <span className="badge badge-coin">{item.symbol}</span>
          </a>
        )
       }
      })}
    </>
  )
}
