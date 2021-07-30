import {RiExternalLinkLine} from "react-icons/ri";
import Link from "next/link";
import {CommentList} from "../../comments/commentList";
import React, {createRef, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {observer} from "mobx-react";
import {getSourceFromUri} from "./PostsList";
import utils from "../../../lib/util";
import {Vote} from "../../vote/Vote";

export const PostListDetail = observer(({props,detailStore,dataStore,voteStore}) => {
  let item
  if (detailStore !== undefined){
    item = detailStore.data
  }
  else{
    item = props.news
  }

  const scrollBox2 = createRef();
  let ps2;
  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);
  const handleBack = (e) => {
    dataStore.showDetail = false
    window.history.pushState("", "", "/");
  }

  const date = utils.timeDifference(new Date(), new Date(item.createdAt))
  const dateTitle = utils.titleTime(item.createdAt)
  return (
    <>
      <div className={`pane-content--sec--main scrollbar`} ref={scrollBox2}>
        {/* Post Detail */}
        <div className="page">

          {/* Close Button */}
          <div className="page-back" onClick={(e) => handleBack(e)}>
            <div className="btn">
              <span className="btn__caret_left"></span>
              <span className="btn__text">Back</span>
            </div>
          </div>

          {/* News Post Detail Content */}
          <div className="section post-detail post-detail-news">
            {/* Post Header */}
            <div className="section-header post-header">
              <div className="flex">
                <h1 className="post-title">
                      <span className="text-color-title">
                        {item.title}
                      </span>
                </h1>
              </div>
              <div className="metadata-wrapper justify-between">
                <div className="flex flex-shrink-0">
                  <div className="metadata metadata-source">
                        <span className="icon mr-1">
                          <i className="fad fa-newspaper"></i>
                        </span>
                    <span className="metadata-value" title="CoinTelegraph">
                      {getSourceFromUri(item.websiteUri)}
                        </span>
                  </div>
                  <div className="metadata metadata-date">
                        <span
                          className="metadata-value"
                          title={dateTitle}
                        >
                          {date}
                        </span>
                  </div>
                </div>
                <div className="flex flex-shrink-0">
                  <div className="cta-wrapper">
                    <Vote
                      itemId={item.id}
                      voteStore={voteStore}
                      page={"postDetail"}
                    />
                    <a target="_blank" rel="nofollow" href={item.websiteUri} className="btn btn-post-link ml-2">
                      <span className="whitespace-nowrap">Visit</span>
                      <span className="icon ml-2"><RiExternalLinkLine/></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-body post-body">
              {item.thumbnailUri !== "" ?
                <div className="post-media">
                    <a title={item.title}>
                      <img  title={item.title} className="post-media--img" src={item.thumbnailUri}/>
                    </a>
                </div>
                : ""
              }
              <div className="post-content">
                <div dangerouslySetInnerHTML={{__html: item.description}}/>
              </div>
            </div>
          </div>

          {/* Comments */}
          <CommentList item={item}/>
          {/* //Comments */}
        </div>
      </div>
    </>
  )
})