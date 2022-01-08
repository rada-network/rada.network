import React, { useEffect, useRef } from "react";

//ReactIcons
import { observer } from "mobx-react";
import { CardPost, CardPostLoader } from "../cards/Post";
import SearchInput from "../search";

import { getItems } from "../../data/query/getItem";
import { HOME_ITEM_TAKE } from "../../config/paging";

import utils from "../../lib/util";
import { useRouter } from "next/router";
import { useStore } from "../../lib/useStore";

import { useTranslation } from "next-i18next";
import { usePageStore } from "../../lib/usePageStore";
import _ from "lodash";
import { DISPLAY_SOURCES, LIST_SOURCE } from "../../config/links";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

const Breadcrumbs = dynamic(import("@components/Breadcrumbs"));

export const PostsListWrapper = observer(function ({}) {
  const { dataStore, voteStore } = usePageStore();
  const { t } = useTranslation(["common", "navbar"]);
  const scrollBox1 = useRef();
  const store = useStore();
  const awayCls = "list-away-top";
  useEffect(() => {
    scrollBox1.current.removeEventListener("scroll", mobileScroll);
    scrollBox1.current.addEventListener("scroll", mobileScroll);

    scrollBox1.current.removeEventListener("scroll", scrollUpDown);
    scrollBox1.current.addEventListener("scroll", scrollUpDown);
    //mobileScroll()
    handleLoadMoreItem();
    return () => {
      document.body.classList.remove(awayCls);
      if (scrollBox1?.current) {
        scrollBox1.current.scrollTo(0, 0);
        scrollBox1.current.removeEventListener("scroll", mobileScroll);
        scrollBox1.current.removeEventListener("scroll", scrollUpDown);
      }
    };
  }, [dataStore.currentTab, dataStore.query, dataStore.type, dataStore.forceUpdate]);

  let lastPos = 0;
  const mobileScroll = function (e) {
    const el = scrollBox1.current;
    const bottom = el.scrollHeight - el.scrollTop < el.clientHeight + 100;
    if (bottom) handleLoadMoreItem();
  };

  const scrollUpDown = function (e) {
    const el = scrollBox1.current;

    if (el.scrollTop > lastPos) {
      document.body.classList.add(awayCls);
    } else if (el.scrollTop <= lastPos) {
      document.body.classList.remove(awayCls);
    }
    lastPos = el.scrollTop;
  };

  const handleLoadMoreItem = () => {
    if (dataStore.loadingButton) return false;
    dataStore.loadingButton = true;
    getItems({
      take: HOME_ITEM_TAKE,
      skip: dataStore.tweets.length,
      orderBy:
        dataStore.currentTab === "latest"
          ? { createdAt: "desc" }
          : { totalVote: "desc" },
      query: dataStore.query,
      type: dataStore.type,
      lang: dataStore.lang,
    }).then(function (res) {
      dataStore.addTweet(res.data.itemFeed);
      dataStore.loadingButton = false;
      voteStore.addVotesV2(res.data.itemFeed);
      if (res.data.itemFeed.length !== HOME_ITEM_TAKE && scrollBox1.current) {
        scrollBox1.current.removeEventListener("scroll", mobileScroll);
      }
    });
  };
  const handleChangeFilter = ({ filter }) => {
    if (dataStore.loadingButton) return false;
    dataStore.currentTab = filter;
    dataStore.tweets = [];
    //dataStore.loadingButton = false;
    handleLoadMoreItem();
  };

  voteStore.access_token = store.user.access_token;
  voteStore.addVotesV2(dataStore.tweets);
  return (
    <>
    <NextSeo
        title={`RADA - ${t(dataStore.type, { ns: 'navbar' })}`}

      />
      <div className={`pane-content--main--top`}>
        <div className="search-wrapper">
          {/* Search */}
          <SearchInput />
        </div>

        <div className="cta-wrapper">
          {/* Sort */}
          <div className="btn-group btn-group-filter">
            <a
              className={
                "btn " +
                (dataStore.currentTab === "popular"
                  ? "btn-filter-active"
                  : "btn-filter")
              }
              onClick={() => {
                handleChangeFilter({ filter: "popular" });
              }}
            >
              <span className="btn--text">{t("popular")}</span>
            </a>
            <a
              className={
                "btn " +
                (dataStore.currentTab === "latest"
                  ? "btn-filter-active"
                  : "btn-filter")
              }
              onClick={() => {
                handleChangeFilter({ filter: "latest" });
              }}
            >
              <span className="btn--text">{t("latest")}</span>
            </a>
          </div>
        </div>
      </div>

      <Breadcrumbs />

      <div
        className={`section pane-content--main--main scrollbar`}
        ref={scrollBox1}
        cls="list-top-away"
      >
        <PostsList />

        {dataStore.tweets.length == 0 &&
        dataStore.isSearch &&
        !dataStore.loadingButton ? (
          <p className="search-not-found">
            <strong>{dataStore.query}</strong>&nbsp;{t("search not found")}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
});

export function getSourceFromUri(item) {
  if (item.author && item.author !== null) {
    return item.author.name;
  }
  if (item.grabTopic && item.grabTopic !== null) {
    return item.grabTopic.website.name;
  }
  const websiteUri =
    item.websiteUri && item.websiteUri !== null ? item.websiteUri : "";
  const displaySources = DISPLAY_SOURCES;
  const listSources = LIST_SOURCE;
  for (const [i, value] of listSources.entries()) {
    if (websiteUri.toLowerCase().includes(value)) {
      return displaySources[i];
    }
  }
  return "";
}

export function getSourceVideoFromUri(item) {
  if (item.grabTopic !== null) {
    return item.grabTopic.name;
  }
  return item.source;
}

export function createPostUri(title, slug, item, lang) {
  if (slug !== null) {
    return "/" + lang + "/post/" + slug;
  }

  return (
    "/" +
    lang +
    "/post/" +
    item.id +
    "/" +
    (title !== null ? utils.convertToSlug(title) : "")
  );
}


export const PostsList = observer(({ title, extraClass }) => {
  const { dataStore } = usePageStore();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${extraClass || ""}`}>
      {dataStore.tweets.map(function (item) {
        let title = null,
          mediaUri = null,
          source = null,
          voteCount = item.totalVote,
          commentCount = item.totalComment,
          slug = null;
        if (item.news !== null) {
          item.news.item = {
            id: item.id,
            totalVote: item.totalVote,
            totalComment: item.totalComment,
          };
          item.token = item.news.token;
          item.tokens = item.news.tokens;
          item.createdAt = item.news.createdAt;
          source = getSourceFromUri(item.news);
          title = item.news.title;
          slug = item.news.slug;
          if (item.news.lang === "all") {
            if (dataStore.lang === "en") {
              title = item.news.title_en;
              slug = item.news.slug_en;
            }
          }
          mediaUri =
            item.news.thumbnailUri !== "" ? item.news.thumbnailUri : null;
          return (
            <CardPost
              key={item.id}
              title={title}
              mediaUri={mediaUri}
              type="fa-duotone fa-newspaper"
              source={source}
              slug={slug}
              commentCount={commentCount}
              voteCount={voteCount}
              item={item}
            />
          );
        }

        if (item.tweet !== null) {
          item.tweet.item = {
            id: item.id,
            totalVote: item.totalVote,
            totalComment: item.totalComment,
          };
          item.token = item.tweet.token;
          item.tokens = item.tweet.tokens;
          item.createdAt = item.tweet.createdAt;
          title = item.tweet.source.full_text;
          mediaUri = item.tweet.tweetUser
            ? item.tweet.tweetUser.source.profile_image_url_https
            : null;
          source = item.tweet.tweetUser
            ? item.tweet.tweetUser.source.screen_name
            : null;
          return (
            <a
              key={item.id}
              href={createPostUri(title, slug, item, dataStore.lang)}
              onClick={(e) => handleClickPost(e, item.tweet, "tweet")}
            >
              <CardPost
                key={item.id}
                title={title}
                mediaUri={mediaUri}
                type="fab fa-twitter"
                source={source}
                slug={slug}
                commentCount={commentCount}
                voteCount={voteCount}
                item={item}
              />
            </a>
          );
        }

        if (item.video !== null) {
          item.video.item = {
            id: item.id,
            totalVote: item.totalVote,
            totalComment: item.totalComment,
          };
          item.token = item.video.token;
          item.tokens = item.video.tokens;
          item.createdAt = item.video.createdAt;
          title = item.video.title;
          slug = item.video.slug;
          mediaUri = item.video.thumbnailUri;
          source = getSourceVideoFromUri(item.video);
          return (
            <CardPost
              key={item.id}
              title={title}
              mediaUri={mediaUri}
              type="fab fa-youtube"
              source={source}
              slug={slug}
              commentCount={commentCount}
              voteCount={voteCount}
              item={item}
            />
          );
        }

      })}
    </div>
  );
});

