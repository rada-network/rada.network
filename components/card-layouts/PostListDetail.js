import { RiExternalLinkLine } from "react-icons/ri";
import Link from "next/link";
import { CommentList } from "../comments/commentList";
import React, { createRef, useEffect, useRef, useState } from "react";
// import PerfectScrollbar from "perfect-scrollbar";

import { getTokenById } from "../../data/query/getTokenById";

import { observer } from "mobx-react";
import { getSourceFromUri, getSourceVideoFromUri } from "./PostsList";
import utils from "../../lib/util";
import { Vote } from "../vote/Vote";
import { useTranslation } from "next-i18next";
import { getItemById } from "../../data/query/getItem";
import ContentLoader from "react-content-loader";
import TokenInfo from "../token/TokenInfo";
import TokenInfoAirdrop from "../token/TokenInfoAirdrop";
import TokenInfoInvest from "../token/TokenInfoInvest";
import TokenInfoTeam from "../token/TokenInfoTeam";
import TokenInfoGeneral from "../token/TokenInfoGeneral";

import Footnote from "../Footnote";
import PostNotice from "../PostNotice";
import PostNoticeVideo from "../PostNoticeVideo";

import { usePageStore } from "../../lib/usePageStore";
import { PostDetailAuthor } from "./PostDetailAuthor";
import FloatButton from "pages/launchverse/toc/FloatingButton";

export const PostListDetail = observer(
  ({ tokenId, tabName, setTabCallback,tokenData }) => {
    const { detailStore, dataStore, voteStore } = usePageStore();
    let item = detailStore.data;

    item.currentLang = dataStore.lang;

    const [usdCoinInfo, setUSDCoinInfo] = useState({});
    const [btcCoinInfo, setBTCCoinInfo] = useState({});
    const { t, i18n } = useTranslation();

    const scrollRef = useRef();
    const awayCls = "details-top-away";
    const onScroll = (e) => {
      if (e.target.scrollTop > 100) {
        document.body.classList.add(awayCls);
      } else {
        document.body.classList.remove(awayCls);
      }
    };
    const onUnload = (e) => {
      document.body.classList.remove(awayCls);
    };

    const tokenInfo = detailStore?.data?.tokens?.find((t) => t.id === tokenId);
    // find active airdrop
    const airdrop = tokenData?.airdrop?.find((ad) => ad.status == "published");
    // find active invest
    const investCampaign = tokenData?.invest_campaign?.find(
      (ic) => ic.status == "published"
    );
    useEffect(() => {
      tokenId &&
          getCoinInfo(tokenData?.symbol);
    }, [tokenId]);

    useEffect(() => {
      scrollRef.current.removeEventListener("scroll", onScroll);
      scrollRef.current.addEventListener("scroll", onScroll);
      return onUnload;
    }, []);

    useEffect(() => {
      voteStore.addVotesV2([
        {
          id: item.item?.id,
          totalVote: item.item?.totalVote,
          isVote: item.item?.isVote,
        },
      ]);
      if (typeof twttr.widgets !== "undefined") {
        twttr.widgets.load();
      }
      window.removeEventListener("resize", handleResize);
      window.addEventListener("resize", handleResize);
      scrollRef.current.scrollTop = 0; // For Safari
      if (
        detailStore.type === "news" ||
        detailStore.type === "rada" ||
        detailStore.type === "projects"
      ) {
        getItemById({ id: item.item.id }).then(function (res) {
          if (
            res.data.itemById.news !== null &&
            detailStore.data.id &&
            detailStore.data.id === res.data.itemById.news.id
          ) {
            detailStore.data.content = res.data.itemById.news.content;
            detailStore.data.content_en = res.data.itemById.news.content_en;
            detailStore.data.contentDisplay =
              res.data.itemById.news.contentDisplay;
            detailStore.data.content_en_display =
              res.data.itemById.news.content_en_display;
            //detailStore.data.token = res.data.itemById.news.token;
          }
        });
      }
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [item.item]);
    let resizeTimeout = 0;
    const handleResize = (event) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (detailStore.type === "news") {
          detailStore.data.contentDisplay +=
            "<span class='newstag123' style='display:none;'>" +
            Math.random() +
            "</span>";
        }
      }, 500);
    };

    const getCoinInfo = async (fsym) => {
      await fetch(`/api/coin-info?fsym=${fsym}&tsym=USD`)
        .then((response) => response.json())
        .then((data) => setUSDCoinInfo(data.Data));

      await fetch(`/api/coin-info?fsym=${fsym}&tsym=BTC`)
        .then((response) => response.json())
        .then((data) => setBTCCoinInfo(data.Data));
    };

    const renderTokenByTabName = (tabName) => {
      switch (tabName) {
        case "overview":
          return (
            <TokenInfoGeneral
              tokenData={tokenData}
              usdCoinInfo={usdCoinInfo}
              btcCoinInfo={btcCoinInfo}
              tokenInfo={tokenInfo}
            />
          );

        case "airdrop":
          return (
            airdrop && (
              <TokenInfoAirdrop
                tokenData={tokenData}
                tokenInfo={tokenInfo}
                airdrop={airdrop}
              />
            )
          );

        case "team":
          return <TokenInfoTeam tokenData={tokenData} tokenInfo={tokenInfo} />;

        case "invest":
          return (
            investCampaign && (
              <TokenInfoInvest
                tokenData={tokenData}
                tokenInfo={tokenInfo}
                usdCoinInfo={usdCoinInfo}
                btcCoinInfo={btcCoinInfo}
                investCampaign={investCampaign}
              />
            )
          );
      }
    };

    const date = utils.timeDifference(new Date(), new Date(item.createdAt));
    const dateTitle = utils.titleTime(item.createdAt);
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
            {detailStore.type === "news" ||
            detailStore.type === "rada" ||
            detailStore.type === "projects" ? (
              tabName === "article" ? (
                <NewsDetail
                  item={item}
                  date={date}
                  dateTitle={dateTitle}
                  setTabCallback={setTabCallback}
                  scrollRef={scrollRef}
                />
              ) : (
                renderTokenByTabName(tabName)
              )
            ) : (
              ""
            )}

            {detailStore.type === "video" ? (
              tabName === "article" ? (
                <VideoDetail
                  item={item}
                  date={date}
                  dateTitle={dateTitle}
                  setTabCallback={setTabCallback}
                />
              ) : (
                renderTokenByTabName(tabName)
              )
            ) : (
              ""
            )}
            {detailStore.type === "tweet" ? (
              <SocialTweetDetail
                item={item}
                date={date}
                dateTitle={dateTitle}
                setTabCallback={setTabCallback}
              />
            ) : (
              ""
            )}
            {/* Comments */}
            {tabName === "article" && (
              <CommentList detailStore={detailStore} dataStore={dataStore} />
            )}
            {/* //Comments */}
          </div>
        </div>
      </>
    );
  }
);

const PostContent = ({ item }) => {
  const content = item.content;

  return (
    <div className="post-content">
      <div
        className="post-content--text"
        dangerouslySetInnerHTML={{ __html: item.content }}
      ></div>
      {item?.is_footnote && <Footnote />}
    </div>
  );
};

const VideoDetail = function ({ item, dateTitle, date, setTabCallback }) {
  const source = getSourceVideoFromUri(item);
  const { t } = useTranslation();
  return (
    <div className="section post-detail post-detail-media">
      {/* Post Header */}
      <div className="section-header post-header">
        <div className="post-title">
          <h1>
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href={item.websiteUri ? item.websiteUri : item.url}
              className=""
            >
              <span className="post-title--text" itemProp="name">{item.title}</span>
              <span className="btn btn-post-link" title={t("visit website")}>
                <span className="icon">
                  <i className="fa-duotone fa-external-link" />
                </span>
                <span className="btn--text sr-only">
                  {t("visit website")}
                </span>
              </span>
            </a>
          </h1>
        </div>
        <div className="metadata-wrapper">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1.5">
                <i className="fab fa-youtube"></i>
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
          <PostVisitVoteDetail item={item} />
        </div>
      </div>

      <PostNotice setTabCallback={setTabCallback} type={`video`} />

      <div className="section-body post-body">
        <div className="post-media">
          {/* Media Player Here */}
          <div className="media-player">
            <div className="w-full h-full">
              <div className={`aspect-w-16 aspect-h-9`}>
                <iframe
                  src={"https://www.youtube.com/embed/" + item.youtubeId}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen="allowFullScreen"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          <div
            className="post-content--text"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
          {item?.is_footnote && <Footnote />}
        </div>
        {item.websiteUri !== null && (
          <div className="post-actions">
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href={item.websiteUri ? item.websiteUri : item.url}
              className=""
            >
              <span className="btn btn-default" title={t("visit website")}>
                <span className="icon">
                  <i className="fa-duotone fa-external-link" />
                </span>
                <span className="btn--text">{t("visit website")}</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const NewsDetail = observer(function ({
  item,
  dateTitle,
  date,
  setTabCallback,
  scrollRef,
}) {
  let title = item.title;
  let content = item.contentDisplay;
  let isRada = false;
  if (item.grabTopic !== null && item.grabTopic.url.indexOf("rada") !== -1) {
    isRada = true;
  }
  if (item.lang === "all") {
    if (item.currentLang === "vi") {
      title = item.title;
      content = isRada ? item.content : item.contentDisplay;
    } else if (item.currentLang === "en") {
      title = item.title_en;
      content = item.content_en_display;
    }
  }
  const { t } = useTranslation();
  useEffect(() => {
    windowResize()
  },[]);

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  const windowResize = () => {
    const parentNewsWidth = document.querySelector(".main-layout").getBoundingClientRect().width;
    const floatButton = document.querySelector(".floating-btn--container");
    const windowSize = document.querySelector(".body-decor").getBoundingClientRect().width;
    const padding = (parseInt(windowSize) - parseInt(parentNewsWidth))/2;
    floatButton.style.paddingRight = padding + "px";
  };

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
      twttr.widgets.load();
    }
  }, [item.contentDisplay]);
  


  return (
    <div
      className={
        `section post-detail post-detail-news` + (isRada ? " post-rada" : "")
      }
      itemScope itemType="http://schema.org/Article"
    >
      {/* Post Header */}
      <div className="section-header post-header">
        <div className="post-title">
          {/* {isRada ?
          <div className="badges-tags"><span className="badge badge-rada mr-2">RADA</span></div>
          : ""} */}
          <h1>
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href={item.websiteUri ? item.websiteUri : item.url}
              className=""
            >
              <span className="post-title--text" itemProp="name">{title}</span>
              {item.websiteUri !== null && (
                <span className="btn btn-post-link" title={t("visit website")}>
                  <span className="icon">
                    <i className="fa-duotone fa-external-link" />
                  </span>
                  <span className="btn--text sr-only">
                    {t("visit website")}
                  </span>
                </span>
              )}
            </a>
          </h1>
        </div>
        <div className="metadata-wrapper">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <PostDetailAuthor isRada={isRada} item={item} />
            </div>
            <div className="metadata metadata-date">
              <span className="metadata-value" title={dateTitle} itemProp="datePublished" content={item.createdAt}>
                {date}
              </span>
            </div>
          </div>
          <PostVisitVoteDetail item={item} />
        </div>
      </div>

      <PostNotice setTabCallback={setTabCallback} type={`news`} />

      <div className="section-body post-body">
        {!item.content ? <NewsLoader /> : ""}
        <div className="post-content" itemProp="description">
          {item.isshowcontent ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            // (item.description.length > 100 ?
            //   <div dangerouslySetInnerHTML={{__html: item.description}}/>
            //   :
            //   ""
            // )
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
          {item?.is_footnote && <Footnote />}
        </div>
        {/* {item.thumbnailUri !== "" ?
          <div className="post-media">
            <a title={item.title}>
              <img  title={item.title} className="post-media--img" src={item.thumbnailUri}/>
            </a>
          </div>
          : ""
        } */}
        {item.websiteUri !== null && (
          <div className="post-actions">
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href={item.websiteUri ? item.websiteUri : item.url}
              className=""
            >
              <span className="btn btn-default" title={t("visit website")}>
                <span className="icon">
                  <i className="fa-duotone fa-external-link" />
                </span>
                <span className="btn--text">{t("visit website")}</span>
              </span>
            </a>
          </div>
        )}
        <button> Button </button>
        <FloatButton mainScroll={scrollRef}/>
      </div>
    </div>
  );
});

const NewsLoader = () => {
  return (
    <ContentLoader
      viewBox="0 0 600 200"
      speed={2}
      backgroundColor="#9CA3AF"
      foregroundColor="#E5E7EB"
      style={{ opacity: "20%" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" rx="4" ry="4" width="600" height="8" />
      <rect x="0" y="20" rx="4" ry="4" width="100" height="8" />
      <rect x="0" y="40" rx="4" ry="4" width="600" height="8" />
      <rect x="0" y="60" rx="4" ry="4" width="600" height="8" />
      <rect x="0" y="80" rx="4" ry="4" width="300" height="8" />
      <rect x="0" y="100" rx="4" ry="4" width="600" height="8" />
      <rect x="0" y="120" rx="4" ry="4" width="200" height="8" />
      <rect x="0" y="140" rx="4" ry="4" width="600" height="8" />
      <rect x="0" y="160" rx="4" ry="4" width="600" height="8" />
      <rect x="0" y="180" rx="4" ry="4" width="200" height="8" />
    </ContentLoader>
  );
};

const SocialTweetDetail = function ({ item, date, dateTitle, setTabCallback }) {
  let title = item.source.full_text;
  let mediaUri = item.tweetUser
    ? item.tweetUser.source.profile_image_url_https
    : null;
  let source = item.tweetUser ? item.tweetUser.source.screen_name : null;
  let media = item.source.entities.media;
  const link = `https://twitter.com/${source}/status/${item.id}`;
  item.websiteUri = link;
  return (
    <div className="section post-detail post-detail-social">
      {/* Post Header */}
      <div className="section-header post-header">
        <div className="post-title">
          <h1>
            <a
              target="_blank"
              rel="nofollow noreferrer"
              href={item.websiteUri ? item.websiteUri : item.url}
              className=""
            >
              <span className="post-title--text" itemProp="name">{item.title}</span>
              <span className="btn btn-post-link" title="Visit Website">
                <span className="icon">
                  <i className="fa-duotone fa-external-link" />
                </span>
                <span className="btn--text sr-only">Visit Website</span>
              </span>
            </a>
          </h1>
        </div>
        <div className="metadata-wrapper">
          <div className="flex flex-shrink-0">
            <div className="metadata metadata-source">
              <span className="icon mr-1.5">
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
          <PostVisitVoteDetail item={item} />
        </div>
      </div>

      <div className="section-body post-body">
        <div className="post-content">
          {/* Card Social Post Here */}
          <div className="card card-social cursor-pointer">
            <div className="card-header">
              <div className="user-info-wrapper flex">
                <div className="avatar">
                  <img className="avatar-img" src={mediaUri} />
                </div>
                <div className="flex flex-col ml-3">
                  <div className="metadata-wrapper">
                    <a
                      href="https://twitter.com/ADABreathes/status/1420306216115392512"
                      target="_blank"
                      className="metadata metadata-socialusername"
                      rel="noreferrer"
                    >
                      <span className="text-color-title">{source}</span>
                    </a>
                  </div>
                  <div className="metadata-wrapper">
                    <div className="metadata">
                      <span className="metadata-value">@{source}</span>
                    </div>
                    <div className="metadata tweet_metadata_date">
                      <span className="metadata-value" title={dateTitle}>
                        {date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="icon icon-twitter">
                <i className="fab fa-twitter"></i>
              </span>
            </div>
            <div className="card-body">
              <div className="card-body--main">
                <div className="card-text">{title}</div>
                {media && (
                  <div
                    className={`card-media`}
                    style={{
                      backgroundImage: media
                        ? media[0].media_url_https
                          ? "url(" + media[0].media_url_https + ")"
                          : ""
                        : "",
                    }}
                  >
                    {media ? (
                      <img
                        src={
                          media[0].media_url_https
                            ? media[0].media_url_https
                            : ""
                        }
                        className={
                          "post-icon_img w-full h-full rounded object-cover"
                        }
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer">
              <div className="metadata-wrapper metadata-wrapper_nodivide">
                <div className="metadata">
                  <span className="icon mr-1.5 text-base opacity-40">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      width="1em"
                      heigh="1em"
                    >
                      <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                      </g>
                    </svg>
                  </span>
                  <span title="likes">{item.replyCount}</span>
                </div>
                <div className="metadata ml-2">
                  <span className="icon mr-1.5 text-base opacity-40">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      width="1em"
                      heigh="1em"
                    >
                      <g>
                        <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                      </g>
                    </svg>
                  </span>
                  <span title="retweet count">{item.retweetCount}</span>
                </div>
                <div className="metadata ml-2">
                  <span className="icon mr-1.5 text-base opacity-40">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      width="1em"
                      heigh="1em"
                    >
                      <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
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
          <a
            target="_blank"
            rel="nofollow noreferrer"
            href={item.websiteUri ? item.websiteUri : item.url}
            className=""
          >
            <span className="btn btn-default" title="Visit Website">
              <span className="icon">
                <i className="fa-duotone fa-external-link" />
              </span>
              <span className="btn--text">Visit Website</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

const PostVisitVoteDetail = function ({ item }) {
  const { voteStore } = usePageStore();
  return (
    <div className="flex flex-shrink-0">
      <div className="cta-wrapper">
        <Vote itemId={item.item.id} voteStore={voteStore} page={"postDetail"} />
      </div>
    </div>
  );
};

// const PostDetailAuthor = function({isRada,item}){

//   let authorImg = ""
//   if (item.author && item.author.image.small){
//     authorImg = item.author.image.small
//   }

//   return (
//     <>
//     {isRada ? (
//       <span className="icon icon-rada w-3.5 mr-1.5 opacity-70">
//         {authorImg && authorImg !== "" ?
//         <div className="avatar"><img src={authorImg} alt={getSourceFromUri(item)}/></div>
//         : <RadaPost />}
//       </span>
//     ) : (
//       <span className="icon mr-1.5">
//         <i className="fa-duotone fa-newspaper"></i>
//       </span>
//     )}

//     <span className="metadata-value" title={getSourceFromUri(item)}>
//       {getSourceFromUri(item)}
//     </span>
//     </>
//   )
// }
