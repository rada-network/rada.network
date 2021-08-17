import React from "react";

import utils from "../../../lib/util";

import KeywordIcon from "../../icons/keywordIcon";

import ContentLoader from "react-content-loader";
import Link from "next/link"
import ShowSources from '../../news-sources/ShowSources'
import ReadingTime from "../../news-sources/ReadingTime";
import {empty} from "@apollo/client";
import {observer} from "mobx-react";
import _ from 'lodash';

export const CardPostLoader = (props) => (
  <div className={`card card-post`}>
    <div className={`card-body content-loader`}>
      <ContentLoader
        speed={2}
        // backgroundColor="#F3F4F6"
        // foregroundColor="#ecebeb"
        viewBox="0 0 600 40"
        preserveAspectRatio="xMidYMid meet"
        // style={{ width: '100%' }}
        {...props}
      >
        <rect x="0" y="0" rx="4" ry="4" width="40" height="40" />
        <rect x="56" y="6" rx="4" ry="4" width="528" height="6" />
        <rect x="56" y="26" rx="4" ry="4" width="128" height="6" />
      </ContentLoader>
    </div>
  </div>
)

export const CardPost = observer(({title, mediaUri, type, source, commentCount, voteCount,item,detailStore,dataStore,voteStore}) => {
  const date = utils.timeDifference(new Date(), new Date(item.createdAt))
  const dateTitle = utils.titleTime(item.createdAt)
  let state = ""
  if (!_.isEmpty(detailStore.data)){
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
  if (commentCount > 0){
    state += " hasComment"
  }
  if (isVote > 0){
    state += " hasVote"
  }
  return (
    <div className={`card card-post ${state}`}>

      {mediaUri !== null ?
        <div className={`card-media`}>
          <div className={`card-media-img`}>
            <img className={`card-img`} src={mediaUri} alt={""}/>
          </div>
        </div>
        :
        <div className="card-media-blank">
          <img className="logo--img" src="/images/dhunt.svg" alt="no image" />
        </div>
      }

      <div className={`card-body`}>
        <div className={`card-body-header`}>
          <div className={`card-title`}>
            <a className="card-link" href={"/"}>
              <span className="text-color-title" dangerouslySetInnerHTML={{__html: title}}></span>
            </a>
          </div>

          <div className={`card-badges`}>
            <Link href="/">
              <span className="badge badge-btc">BTC</span>
            </Link>
            <Link href="/">
              <span className="badge badge-cardano">ADA</span>
            </Link>
            <Link href="/">
              <span className="badge badge-ethereum">ETH</span>
            </Link>
          </div>
        </div>

        <div className="metadata-wrapper justify-between mt-1">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1">
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
              <span className="icon mr-1">
                <i className="fa fa-comment" />
              </span>
              <span className="">{commentCount}</span>
            </div>
            <div className="metadata metadata-votecount">
              <span className="icon mr-1">
                <i className="fa fa-arrow-up" />
              </span>
              <span>{voteCount}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
})
