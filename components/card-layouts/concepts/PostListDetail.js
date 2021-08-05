import {RiExternalLinkLine} from "react-icons/ri";
import Link from "next/link";
import {CommentList} from "../../comments/commentList";
import React, {createRef, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {observer} from "mobx-react";
import {getSourceFromUri} from "./PostsList";
import utils from "../../../lib/util";
import {Vote} from "../../vote/Vote";
import {useRouter} from "next/router";

export const PostListDetail = observer(({back,detailStore,dataStore,voteStore}) => {
  back = back || "/"
  const router = useRouter()
  let item
  item = detailStore.data
  const scrollBox2 = createRef();
  let ps2;
  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);
  const handleBack = (e) => {
    dataStore.showDetail = false
    if (dataStore.home.isHome){
      window.history.pushState("", "", back);
    }
    else{
      router.push(back,undefined)
    }
  }


  const date = utils.timeDifference(new Date(), new Date(item.createdAt))
  const dateTitle = utils.titleTime(item.createdAt)
  return (
    <>
      <div className={`pane-content--sec--main scrollbar`} ref={scrollBox2}>
        {/* Post Detail */}
        <div className="page">

          {/* Close Button */}
          {dataStore !== undefined ?
            <div className="page-back" onClick={(e) => handleBack(e)}>
              <div className="btn">
                <span className="btn__caret_left"></span>
                <span className="btn__text">Back</span>
              </div>
            </div>
            : ""
          }

          {/* News Post Detail Content */}
          {detailStore.type === "news" ?
            <NewsDetail item={item} date={date} dateTitle={dateTitle} voteStore={voteStore}/>
            : ""
          }

          {detailStore.type === "video" ?
            <VideoDetail item={item} date={date} dateTitle={dateTitle} voteStore={voteStore}/>
            : ""
          }

          {detailStore.type === "tweet" ?
            <SocialTweetDetail item={item} date={date} dateTitle={dateTitle} voteStore={voteStore}/>
            : ""
          }


          {/* Comments */}
          <CommentList item={item}/>
          {/* //Comments */}
        </div>
      </div>
    </>
  )
})

const VideoDetail = function({item,dateTitle,date,voteStore}){
  return (
    <div className="section post-detail post-detail-media">
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
                          <i className="fab fa-youtube"></i>
                        </span>
              <span className="metadata-value" title="CoinTelegraph">
                          Crypto Capital Venture
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
          <PostVisitVoteDetail item={item} voteStore={voteStore} />
        </div>
      </div>

      <div className="section-body post-body">
        <div className="post-media">
          {/* Media Player Here */}
          <div className="media-player">
            <div className="w-full h-full">
              <div className={`aspect-w-16 aspect-h-9`}>
                <iframe  src={"https://www.youtube.com/embed/" + item.youtubeId} title="Bitcoin Price FLOODED With Green (Cardano BREAKOUT Pending)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" />
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          {item.description}
        </div>
      </div>
    </div>
  )
}

const NewsDetail = function ({item,dateTitle,date,voteStore}){
  return (
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
          <PostVisitVoteDetail item={item} voteStore={voteStore} />
        </div>
      </div>

      <div className="section-body post-body">
        <div className="post-content">
          <div dangerouslySetInnerHTML={{__html: item.description}}/>
        </div>
        {item.thumbnailUri !== "" ?
          <div className="post-media">
            <a title={item.title}>
              <img  title={item.title} className="post-media--img" src={item.thumbnailUri}/>
            </a>
          </div>
          : ""
        }
      </div>
    </div>
  )
}

const SocialTweetDetail = function({item,voteStore,date,dateTitle}){
  let title = item.source.full_text
  let mediaUri = item.tweetUser ? item.tweetUser.source.profile_image_url_https : null
  let source = item.tweetUser ? item.tweetUser.source.screen_name : null
  let media=item.source.entities.media
  const link = `https://twitter.com/${source}/status/${item.id}`
  item.websiteUri = link
  return (
    <div className="section post-detail post-detail-social">
      {/* Post Header */}
      <div className="section-header post-header">
        <div className="flex">
          <h1 className="post-title">
            <span className="text-color-title">
            {title}
            </span>
          </h1>
        </div>
        <div className="metadata-wrapper justify-between">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1">
                <i className="fab fa-twitter"></i>
              </span>
              <span className="metadata-value" title={source}>
                {source}
              </span>
            </div>
            <div className="metadata metadata-date">
              <span className="metadata-value" title={dateTitle}>
                {date}
              </span>
            </div>
          </div>
          <PostVisitVoteDetail voteStore={voteStore} item={item} />
        </div>
      </div>

      <div className="section-body post-body">

        <div className="post-content">

          {/* Card Social Post Here */}
          <div className="card card-social cursor-pointer">

            <div className="card-header">
              <div className="user-info-wrapper flex">
                <div className="avatar">
                  <img className="avatar-img"
                       src={mediaUri}/>
                </div>
                <div className="flex flex-col ml-3">
                  <div className="metadata-wrapper">
                    <a href="https://twitter.com/ADABreathes/status/1420306216115392512" target="_blank"
                       className="metadata metadata-socialusername">
                      <span className="text-color-title">{source}</span>
                    </a>
                  </div>
                  <div className="metadata-wrapper">
                    <div className="metadata">
                      <span className="metadata-value">@{source}</span>
                    </div>
                    <div className="metadata tweet_metadata_date">
                      <span className="metadata-value" title={dateTitle}>{date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="icon icon-twitter"><i className="fab fa-twitter"></i></span>

            </div>

            <div className="card-body">
              <div className="card-body--main">
                <div className="card-text">
                  {title}
                </div>
                {media &&
                <div className={`card-media`}
                     style={{backgroundImage: media
                         ? media[0].media_url_https
                           ? "url(" + media[0].media_url_https + ")"
                           : ""
                         : "",
                     }}>

                  {media
                    ? <img src={media[0].media_url_https ? media[0].media_url_https : ""} className={"post-icon_img w-full h-full rounded object-cover"} alt=""/>
                    : ""
                  }
                </div> }
              </div>
            </div>

            <div className="card-footer">
              <div className="metadata-wrapper metadata-wrapper_nodivide">
                <div className="metadata">
                  <span className="icon mr-1 text-base opacity-40">
                    <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em">
                      <g>
                        <path
                          d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                        </path>
                      </g>
                    </svg>
                  </span>
                  <span title="likes">{item.replyCount}</span>
                </div>
                <div className="metadata ml-2">
                  <span className="icon mr-1 text-base opacity-40">
                    <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em">
                      <g>
                        <path
                          d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                        </path>
                      </g>
                    </svg>
                  </span>
                  <span title="retweet count">{item.retweetCount}</span>
                </div>
                <div className="metadata ml-2">
                  <span className="icon mr-1 text-base opacity-40">
                    <svg viewBox="0 0 24 24" aria-hidden="true" width="1em" heigh="1em">
                      <g>
                        <path
                          d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                        </path>
                      </g>
                    </svg>
                  </span>
                  <span title="likes">{item.favoriteCount}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const PostVisitVoteDetail = function({item,voteStore}){
  return (
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
  )
}