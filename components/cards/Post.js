import React from "react";

import utils from "../../lib/util";

import KeywordIcon from "../icons/keywordIcon";

import ContentLoader from "react-content-loader";
import Link from "next/link"
import {observer} from "mobx-react";
import Image from 'next/image'


import Screen from "../utils/Responsive";

import _ from 'lodash';

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
  
export const CardPost = observer(({title, mediaUri, type, source, commentCount, voteCount,item,detailStore,dataStore,voteStore}) => {
  let isRada = false;
  if (item && item.news !== null && item.news.grabTopic !== null && item.news.grabTopic.url.indexOf("rada") !== -1) {
    isRada = true;
  }
  if (item && item.video !== null && item.video.grabTopic !== null && item.video.grabTopic.url.indexOf("rada") !== -1) {
    isRada = true;
  }
  if (isRada) {
    return (
      <CardPostRada title={title} mediaUri={mediaUri} type={type} source={source} commentCount={commentCount}
      voteCount={voteCount} detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} item={item} />
    )
  }
  return (
    <CardPostNormal title={title} mediaUri={mediaUri} type={type} source={source} commentCount={commentCount}
      voteCount={voteCount} detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} item={item} />
  )
    
})


const CardPostNormal = observer(({title, mediaUri, type, source, commentCount, voteCount,item,detailStore,dataStore,voteStore}) => {
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
  return (
    <div className={`card card-post ${state}`}>

      {mediaUri !== null ?
        <div className={`card-media`}>
          <div className={`card-media-img`}>
            <img layout='fill' className={`card-img`} src={mediaUri} alt={title}/>
          </div>
        </div>
        :
        <div className="card-media-blank">
          <img layout='fill' className="logo--img" src={process.env.NEXT_PUBLIC_CDN + "/images/rada-mono.svg"} alt="no image" />
        </div>
      }

      <div className={`card-body`}>
        <div className={`card-body-header`}>
          <div className={`card-title`}>
            <span className="card-link">
              <span className="text-color-title" dangerouslySetInnerHTML={{__html: title}}></span>
            </span>
          </div>

          <PostTokenHolder token={item.token} />
        </div>

        <div className="metadata-wrapper justify-between">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1.5">
                <i className={`${type}`} />
              </span>
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

const CardPostRada = observer(({title, mediaUri, type, source, commentCount, voteCount,item,detailStore,dataStore,voteStore}) => {
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
  if (item.news !== null){
    if (item.news.lang === "all"){
      if (dataStore.lang === "en"){
        title = item.news.title_en
      }
    }
  }
  return (
    <div className={`card card-post ${state}`}>

      {mediaUri !== null ?
        <div className={`card-media`}>
          <div className={`card-media-img`}>
            <img layout='fill' className={`card-img`} src={mediaUri} alt={title}/>
          </div>
        </div>
        :
        <div className="card-media-blank">
          <img layout='fill' className="logo--img" src={process.env.NEXT_PUBLIC_CDN +"/images/rada-mono.svg"} alt="no image" />
        </div>
      }

      <div className={`card-body`}>

        <div className={`card-body-header`}>
          <div className={`card-title`}>
            <div className="card-link group" href={"/"}>
              {dataStore.type !== "rada" ? 
              <span className="badge badge-rada">RADA</span> 
              : ""}
              <span className="text-color-title mr-2">{title}</span>
            </div>
          </div>

          <PostTokenHolder token={item.token} />
        </div>
        
        <div className="metadata-wrapper justify-between mt-1">

          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon icon-rada w-3.5 mr-1.5 opacity-70">
                <svg class="rada-svg" viewBox="4 4 32 32" xmlns="http://www.w3.org/2000/svg"><path class="inline-rec" d="M18 11.1547C19.2376 10.4402 20.7624 10.4402 22 11.1547L26.6603 13.8453C27.8979 14.5598 28.6603 15.8803 28.6603 17.3094V22.6906C28.6603 24.1197 27.8979 25.4402 26.6603 26.1547L22 28.8453C20.7624 29.5598 19.2376 29.5598 18 28.8453L13.3397 26.1547C12.1021 25.4402 11.3397 24.1197 11.3397 22.6906V17.3094C11.3397 15.8803 12.1021 14.5598 13.3397 13.8453L18 11.1547Z" fill="#9CA3AF"></path><path class="inline-stroke" d="M20 2L20.8806 15.1519C20.9757 16.5717 22.4811 17.4409 23.7582 16.8133L35.5885 11L24.6389 18.3386C23.4568 19.1308 23.4568 20.8692 24.6389 21.6614L35.5885 29L23.7582 23.1867C22.4811 22.5591 20.9757 23.4283 20.8806 24.848L20 38L19.1194 24.8481C19.0243 23.4283 17.5189 22.5591 16.2418 23.1867L4.41154 29L15.3611 21.6614C16.5432 20.8692 16.5432 19.1308 15.3611 18.3386L4.41154 11L16.2418 16.8133C17.5189 17.4409 19.0243 16.5717 19.1194 15.152L20 2Z" fill="#fff"></path><circle class="inline-circle" cx="20" cy="7" r="3" fill="#374151"></circle><circle class="inline-circle" cx="20" cy="33" r="3" fill="#374151"></circle><circle class="inline-circle" cx="31.2583" cy="13.5" r="3" transform="rotate(60 31.2583 13.5)" fill="#374151"></circle><circle class="inline-circle" cx="8.74167" cy="26.5" r="3" transform="rotate(60 8.74167 26.5)" fill="#374151"></circle><circle class="inline-circle" cx="8.74167" cy="13.5" r="3" transform="rotate(-60 8.74167 13.5)" fill="#374151"></circle><circle class="inline-circle" cx="31.2583" cy="26.5" r="3" transform="rotate(-60 31.2583 26.5)" fill="#374151"></circle></svg>
              </span>
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

const PostTokenHolder = function({token}){
  if (token == null){return null}
  return (
    <div className={`card-badges`}>
      <a href="/">
        <span className="badge badge-coin">{token.symbol}</span>
      </a>
    </div>
  )
}
