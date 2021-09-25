import {RiExternalLinkLine} from "react-icons/ri";
import Link from "next/link";
import {CommentList} from "../comments/commentList";
import React, {createRef, useEffect, useRef, useState} from "react";
// import PerfectScrollbar from "perfect-scrollbar";

import {observer} from "mobx-react";
import {getSourceFromUri, getSourceVideoFromUri} from "./PostsList";
import utils from "../../lib/util";
import {Vote} from "../vote/Vote";
import { useTranslation } from "next-i18next";
import { getItemById } from "../../data/query/getItem";
import { getTokenById } from "../../data/query/getTokenById";
import { TrendingStore } from "../../lib/store";
import ContentLoader from 'react-content-loader'


export const PostListDetail = observer(({tabName,detailStore,dataStore,voteStore}) => {
  let item = detailStore.data
  voteStore.addVotesV2([
    {
      id : item.item.id,
      totalVote : item.item.totalVote,
      isVote : item.item.isVote
    }
  ])
  item.currentLang = dataStore.lang;

  const scrollRef = useRef()
  const awayCls = 'details-top-away'
  const onScroll = e => {
    if (e.target.scrollTop > 100) {
      document.body.classList.add(awayCls)
    } else {
      document.body.classList.remove(awayCls)
    }
  }
  const onUnload = e => {
    document.body.classList.remove(awayCls)
  }

  useEffect(() => {
    scrollRef.current.removeEventListener('scroll', onScroll)
    scrollRef.current.addEventListener('scroll', onScroll)
    return onUnload
  }, [])


  useEffect(() => {

    if (typeof twttr.widgets !== "undefined") {
      twttr.widgets.load()
    }
    window.removeEventListener('resize', handleResize)
    window.addEventListener('resize', handleResize)
    scrollRef.current.scrollTop = 0; // For Safari
    if (detailStore.type === "news"){
      getItemById({id : item.item.id}).then(function (res) {
        if (res.data.itemById.news !== null){
          detailStore.data.content = res.data.itemById.news.content
          detailStore.data.content_en = res.data.itemById.news.content_en
          detailStore.data.contentDisplay = res.data.itemById.news.contentDisplay
          detailStore.data.content_en_display = res.data.itemById.news.content_en_display
          detailStore.data.token = res.data.itemById.news.token
        }
      })
    }
    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [item.item]);
  let resizeTimeout = 0;
  const handleResize = (event) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (detailStore.type === "news"){
        detailStore.data.contentDisplay += "<span class='newstag123' style='display:none;'>"+ Math.random()+"</span>";
      }
    },500)
  }


  const {t} = useTranslation()
  const date = utils.timeDifference(new Date(), new Date(item.createdAt))
  const dateTitle = utils.titleTime(item.createdAt)
  return (
    <>

      <div className="pane-content--sec--main grid scrollbar" ref={scrollRef}>

        {/* Post Detail */}
        <div className="page">

          {/* Close Button
          {dataStore !== undefined ?
            <div className="page-back">
              <div className="btn" onClick={(e) => {handleBack(e)}}>
                <span className="btn--caret-left"></span>
                <span className="btn--text">{t("back")}</span>
              </div>
            </div>
            : ""
          } */}

          {/* News Post Detail Content */}
          {detailStore.type === "news" ?(tabName === 'article'?
            <NewsDetail item={item} date={date} dateTitle={dateTitle} voteStore={voteStore}/>
            : <TokenInfo token={detailStore.data.token} tabName={tabName} />) :''
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
          <CommentList detailStore={detailStore} dataStore={dataStore}/>
          {/* //Comments */}
        </div>
      </div>

    </>
  )
})

const TokenInfo = ({token, tabName})=>{
  const trendingStore = new TrendingStore()
  const [tokenData, setTokenData] = useState({})
  const {t, i18n} = useTranslation()
  useEffect(() => {
   token?.slug && getTokenById({id : token?.slug, lang: i18n.language}).then(function (res) {
   setTokenData(res.data.tokenById)
  })
  }, [token])

  return tabName ==='axs'? <div className="pane-content--sec--main grid scrollbar">
    <div className="page page-coininfo">

      <div className="section section-coininfo--general">

        <div className="grid grid-cols-1">

          {/* Post Header */}
          <div className="flex flex-col">

            <div className="flex flex-wrap justify-between items-center w-full">
              <div className="flex flex-0 flex-shrink-0 mb-4">
                <span className="icon flex-shrink-0">
                  <img src="/images/coins/axs.png" className="mr-2 h-px-32 w-px-32" alt="AXS Symbol"/>
                </span>
                <h1 className="flex items-center">
                  <strong className="text-2xl font-semibold">{tokenData?.name}</strong>
                  <span className="badge badge-coin badge-coin-lg ml-2">{tokenData?.symbol}</span>
                </h1>
              </div>
              <div className="flex flex-wrap space-x-2 mb-4">
                {tokenData.tag?.map(item => <span key={item.id} className={`badge badge-lg ${trendingStore.data.find(t => t === item.slug) ? 'badge-red':''}`}>{item.name}</span>)}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex w-full">

                <div className="text-sm w-full">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Website</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      <a href="https://axieinfinity.com/" className="btn btn-default btn-default-sm" rel="nofollow" target="_blank">
                        <span className="icon">
                          <i class="fa-regular fa-globe"></i>
                        </span>
                        <span className="btn--text">{tokenData?.link?.find(item => item.group === 'homepage')?.url}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Community</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      {tokenData?.link?.map(item => item.group === 'community' && (
                      <a key={item.id} href={item.url} className="btn btn-default btn-default-sm" rel="nofollow" target="_blank">
                        <span className="icon">
                          <i class={`fa-brands fa-${item.name.toLowerCase()}`}></i>
                        </span>
                        <span className="btn--text">{item.name}</span>
                      </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Explorer</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      {tokenData?.link?.map((item, index) => item.group === 'explorers' && (
                        <a key={item.id} href={item.url} className="btn btn-default btn-default-sm" rel="nofollow" target="_blank">
                          <span className="btn--text">{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Contract</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      <a href="#" className="btn btn-default btn-default-sm">
                        <span className="icon">
                          <i class="cf cf-eth"></i>
                        </span>
                        <span className="btn--text">{tokenData?.contract_address}</span>
                        <span className="icon">
                          <i class="fa-regular fa-copy text-2xs"></i>
                        </span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
          {/* End: Post Header */}

          {/* Post Content */}
          <div className="w-full mt-4">
              {tokenData.token_description?.map((item) =>  <div key={item.id} className="post-content mt-8" dangerouslySetInnerHTML={{__html:item.content}}/>)}
          </div>

        </div>

      </div>

    </div>
  </div> :<div className="section section-coininfo--team">

<div className="grid grid-cols-1">

  {/* Post Header */}
  <div className="flex flex-col">

    <div className="flex flex-wrap justify-between items-center w-full">
      <div className="flex flex-0 flex-shrink-0 mb-4">
        <span className="icon flex-shrink-0">
          <img src="/images/coins/axs.png" className="mr-2 h-px-24 w-px-24" alt="AXS Symbol"/>
        </span>
        <h1 className="flex items-center">
          <strong className="text-lg font-semibold">{tokenData?.name}</strong>
          <span className="badge badge-coin ml-2">{tokenData?.symbol}</span>
        </h1>
        {/* Price */}
      </div>
      <div className="flex flex-wrap space-x-2 mb-4">
      {tokenData.tag?.map(item => <span key={item.id} className={`badge badge-lg ${trendingStore.data.find(t => t === item.slug) ? 'badge-red':''}`}>{item.name}</span>)}
      </div>
    </div>

    <div className="mt-4">
      <div className="flex flex-wrap md:flex-nowrap items-start w-full">

        {/* General Info */}
        <div className="flex flex-wrap md:flex-nowrap w-full md:space-x-2 md:divide-x divide-gray-400 divide-opacity-20">

          <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
            <div className="w-full lg:w-auto">
              <span className="uppercase opacity-50 text-2xs md:text-xs">
                {t('Location')}
              </span>
            </div>
            <div className="mb-2">
              <strong className="">
                {tokenData?.team?.location}
              </strong>
            </div>
          </div>

          <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
            <div className="w-full lg:w-auto">
              <span className="uppercase opacity-50 text-2xs md:text-xs">
                {t('Founded')}
              </span>
            </div>
            <div className="mb-2">
              <strong className="">
                {tokenData?.team?.founded}
              </strong>
            </div>
          </div>

          <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
            <div className="w-full lg:w-auto">
              <span className="uppercase opacity-50 text-2xs md:text-xs">
                {t('Employees')}
              </span>
            </div>
            <div className="mb-2">
              <strong className="">
              {tokenData?.team?.employees}
              </strong>
            </div>
          </div>

          <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
            <div className="w-full lg:w-auto">
              <span
                className="uppercase opacity-50 text-2xs md:text-xs"
                title="Last Funding Type"
              >
                {t('Last Funding')}
              </span>
            </div>
            <div className="mb-2">
              <strong className="">
              {tokenData?.team?.last_funding}
              </strong>
            </div>
          </div>

          <div className="md:text-center md:w-1/2 lg:w-full">
            <div className="w-full lg:w-auto">
              <span className="uppercase opacity-50 text-2xs md:text-xs">
                {t('Headquarter')}
              </span>
            </div>
            <div className="mb-2">
              <a
                href={tokenData?.team?.headquarter_url}
                rel="nofollow"
                target="_blank"
              >
                <strong className="">
                {tokenData?.team?.headquarter}
                </strong>
                <span class="icon ml-1 relative -top-0.5"><i class="fa-duotone fa-external-link text-2xs"></i></span>
              </a>
            </div>
          </div>

        </div>
        {/* END: General Info */}
      </div>
    </div>

  </div>
  {/* End: Post Header */}

  {/* Post Content - Team */}
  <div className="w-full mt-4">

    <div className="mt-8">

      <h2 className="md:text-center text-2xl font-semibold">
      {t("Who is building Axie Infinity",{"provider" : tokenData.name})}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">

        {tokenData?.team?.author?.map(item =>(
          <div key={item.id} className="card card-team">
          <div className="card-media">
            <div className="avatar avatar-3xl">
              <img src={item.image.medium} />
            </div>
          </div>
          <div className="card-body">
            <div className="card-body-header">
              <h3 className="">{item.name}</h3>
              <p>{item.position}</p>
            </div>
            <div className="card-body-main">
              <p className="">
                Trung Nguyen is CEO of Sky Mavis. He is an entrepreneur who started 5 years on Wall Street in 2007 and left to create an open source community which grew to over 100,000 members.
              </p>
            </div>
          </div>
          <div className="card-body-footer">
            <div className="cta-wrapper about-social">
              <a className="btn" href={item.linkedin} rel="nofollow" target="_blank">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a className="btn" href={item.twitter} rel="nofollow" target="_blank">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a className="btn" href={item.facebook} rel="nofollow" target="_blank">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
        ))}

      </div>
    </div>
  </div>
  {/* END: Post Content - Team */}


  {/* Post Content - Partners */}
  <div className="w-full mt-8">

    <div className="mt-8">

      <h2 className="md:text-center text-2xl font-semibold">
        {t("Axie Infinity Partners",{"provider" : tokenData.name})}
      </h2>

      <div className="flex flex-wrap mt-4 list-partners">
        {tokenData?.partner?.map(item => (
          <a key={item.id} href={item.url} className="" rel="nofollow" target="_blank">
          <img src={item.image.medium} />
        </a>
        ))}
      </div>

    </div>

  </div>
  {/* END: Post Content - Partners */}

</div>

</div>

}

const VideoDetail = function({item,dateTitle,date,voteStore}){
  const source = getSourceVideoFromUri(item)
  const {t} = useTranslation()
  return (
    <div className="section post-detail post-detail-media">
      {/* Post Header */}
      <div className="section-header post-header">
        <div className="post-title">
          <h1 className="inline">
            <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
              <span className="post-title--text">
                {item.title}
              </span>
              <span className="btn btn-post-link" title={t("visit website")}>
                <span className="icon"><i className="fa-duotone fa-external-link" /></span>
                <span className="btn--text sr-only">{t("visit website")}</span>
              </span>
            </a>
          </h1>
        </div>
        <div className="metadata-wrapper">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1">
                <i className="fab fa-youtube"></i>
              </span>
              <span className="metadata-value" title={source}>
                {source}
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
                <iframe  src={"https://www.youtube.com/embed/" + item.youtubeId} title={item.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen" />
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          <div className="post-content--text" dangerouslySetInnerHTML={{__html:item.content}}></div>
        </div>
        <div className="post-actions">
          <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
            <span className="btn btn-default" title={t("visit website")}>
              <span className="icon"><i className="fa-duotone fa-external-link" /></span>
              <span className="btn--text">{t("visit website")}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

const NewsDetail = observer(function ({item,dateTitle,date,voteStore}){
  let title = item.title
  let content = item.contentDisplay
  let isRada = false;
  if (item.grabTopic !== null && item.grabTopic.url.indexOf("rada") !== -1) {
    isRada = true;
  }
  if (item.lang === "all"){
    if (item.currentLang === "vi"){
      title = item.title
      content = isRada ? item.content : item.contentDisplay
    }
    else if (item.currentLang === "en"){
      title = item.title_en
      content = item.content_en_display
    }
  }

  useEffect(() => {
    // make scrollbar
    // let iframes = document.querySelectorAll('iframe')
    // iframes.forEach((iframe) => {
    //   // iframe.addEventListener('load', function() {
    //   //   const iframeBody = this.contentWindow.document.body;
    //   //   const height = Math.max(iframeBody.scrollHeight, iframeBody.offsetHeight);
    //   //   this.style.height = `${height}px`;
    //   // })
    //   iframe.setAttribute("src",iframe.getAttribute("data-src"))
    // })

    if (typeof twttr.widgets !== "undefined") {
      twttr.widgets.load()
    }
  }, [item.contentDisplay]);
  const {t} = useTranslation()
  return (
    <div className={`section post-detail post-detail-news` + (isRada ? " post-rada" : "")}>
      {/* Post Header */}
      <div className="section-header post-header">
        <div className="post-title">
          <h1 className="inline">
            <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
              {isRada ?
              <span className="badge badge-rada mr-2">RADA</span>
              : ""}
              <span className="post-title--text">
                {title}
              </span>
              <span className="btn btn-post-link" title={t("visit website")}>
                <span className="icon"><i className="fa-duotone fa-external-link" /></span>
                <span className="btn--text sr-only">{t("visit website")}</span>
              </span>
            </a>
          </h1>
        </div>
        <div className="metadata-wrapper">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              {isRada ?
              <span className="icon icon-rada w-3.5 mr-1">
                <img layout='fill' src="/images/rada-mono.svg" alt="RADA NETWORK" />
              </span>
              :
              <span className="icon mr-1">
                <i className="fa-duotone fa-newspaper"></i>
              </span>}

              <span className="metadata-value" title={getSourceFromUri(item)}>
                {getSourceFromUri(item)}
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
        {!item.content ?
        <NewsLoader /> 
        : ""
        }
        <div className="post-content">
          {item.isshowcontent ?
            <div dangerouslySetInnerHTML={{__html: content}}/>
            :
            // (item.description.length > 100 ?
            //   <div dangerouslySetInnerHTML={{__html: item.description}}/>
            //   :
            //   ""
            // )
            <div dangerouslySetInnerHTML={{__html: content}}/>
          }

        </div>
        {/* {item.thumbnailUri !== "" ?
          <div className="post-media">
            <a title={item.title}>
              <img  title={item.title} className="post-media--img" src={item.thumbnailUri}/>
            </a>
          </div>
          : ""
        } */}
        <div className="post-actions">
          <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
            <span className="btn btn-default" title={t("visit website")}>
              <span className="icon"><i className="fa-duotone fa-external-link" /></span>
              <span className="btn--text">{t("visit website")}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
})

const NewsLoader = () => { 
  return <ContentLoader viewBox="0 0 400 160" >
          <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
          <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
          <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
          <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
          <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
          <rect x="0" y="93" rx="4" ry="4" width="400" height="9" />
          <rect x="0" y="106" rx="4" ry="4" width="100" height="8" />
          <rect x="0" y="118" rx="4" ry="4" width="400" height="10" />
          <rect x="0" y="132" rx="4" ry="4" width="400" height="10" />
          <rect x="0" y="146" rx="4" ry="4" width="100" height="10" />
        </ContentLoader>
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
        <div className="post-title">
          <h1 className="inline">
            <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
              <span className="post-title--text">
                {item.title}
              </span>
              <span className="btn btn-post-link" title="Visit Website">
                <span className="icon"><i className="fa-duotone fa-external-link" /></span>
                <span className="btn--text sr-only">Visit Website</span>
              </span>
            </a>
          </h1>
        </div>
        <div className="metadata-wrapper">
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
                       className="metadata metadata-socialusername" rel="noreferrer">
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
        <div className="post-actions">
          <a target="_blank" rel="nofollow noreferrer" href={item.websiteUri ? item.websiteUri : item.url} className="">
            <span className="btn btn-default" title="Visit Website">
              <span className="icon"><i className="fa-duotone fa-external-link" /></span>
              <span className="btn--text">Visit Website</span>
            </span>
          </a>
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
          itemId={item.item.id}
          voteStore={voteStore}
          page={"postDetail"}
        />
      </div>
    </div>
  )
}