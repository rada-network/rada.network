import utils from "../lib/util";

import { observer } from "mobx-react";
import { HOME_ITEM_TAKE } from "../config/paging";
import { getItemById, getItems } from "../data/query/getItem";
import { getPage } from "../data/query/page";
import React, { useEffect, useRef } from "react";

import _ from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import store from "store";
import { usePageStore } from "../lib/usePageStore";
import { getTokenById } from "../data/query/getTokenById";
import { useRouter } from "next/router";
import useStore from "@lib/useStore";
import dynamic from "next/dynamic";

const Layout = dynamic(import("@components/page-layouts/Global"));

const IndexRightBar = dynamic(() =>
  import("@components/IndexRightBar").then((mod) => mod.IndexRightBar)
);

const PostsListWrapper = dynamic(() =>
  import("@components/card-layouts/PostsList").then(
    (mod) => mod.PostsListWrapper
  )
);

const getDataExplore = async ({ query, type, lang }) => {
  const itemFeed = await getItems({
    take: HOME_ITEM_TAKE,
    skip: 0,
    orderBy: { createdAt: "desc" },
    query: query,
    type: type,
    lang: lang,
  });
  query = query || "";
  const intro = await getPage({ slug: "intro", lang });

  return {
    query: query,
    type: type,
    lang: lang,
    itemFeed: itemFeed.data.itemFeed,
    intro,
  };
};

const getDataPostDetail = async ({ query, id, lang }) => {
  const newsDetail = await getItemById({ id: id });
  if (_.isEmpty(newsDetail.data.itemById)) {
    return false;
  }
  let type = "all";
  let airdrop = null;
  if (newsDetail.data.itemById.news !== null) {
    type = "news";
    if (newsDetail.data.itemById.news.category !== null) {
      type = newsDetail.data.itemById.news.category.slug;
    }
    if (
      newsDetail.data.itemById.news.tokens !== null &&
      newsDetail.data.itemById.news.tokens.length > 0
    ) {
      airdrop = await getTokenById({
        id: newsDetail.data.itemById.news.tokens[0]["slug"],
        lang: lang,
      });
    }
  } else if (newsDetail.data.itemById.video !== null) {
    type = "video";
    if (
      newsDetail.data.itemById.video.tokens !== null &&
      newsDetail.data.itemById.video.tokens.length > 0
    ) {
      airdrop = await getTokenById({
        id: newsDetail.data.itemById.video.tokens[0]["slug"],
        lang: lang,
      });
    }
  } else if (newsDetail.data.itemById.tweet !== null) {
    type = "social";
  }
  const intro = await getPage({ slug: "intro", lang });
  const itemFeed = await getItems({
    take: HOME_ITEM_TAKE,
    skip: 0,
    orderBy: { createdAt: "desc" },
    query: query,
    lang: lang,
    type: type,
  });
  query = query || "";
  if (airdrop !== null) {
    airdrop =
      airdrop.data.tokenById.airdrop.length > 0
        ? airdrop.data.tokenById.airdrop[0]
        : null;
  }
  return {
    query: query,
    lang: lang,
    type: type,
    itemFeed: itemFeed.data.itemFeed,
    item: newsDetail.data.itemById,
    intro,
    airdrop,
  };
};

export default observer(function (props) {
  const { dataStore, detailStore, voteStore } = usePageStore();
  //const { locales, asPath } = useRouter();
  const gstore = useStore();
  gstore.updateNetwork("bsc");
  if (props.item === undefined) {
    dataStore.query = props.query;

    dataStore.tweets = props.itemFeed;
    dataStore.type = props.type;
    detailStore.data = {};
  } else {
    dataStore.query = props.query;
    dataStore.tweets = props.itemFeed;
    let item = {};
    if (props.item.news !== null) {
      if (props.item.news.category !== null) {
        dataStore.type = props.item.news.category.slug;
      } else {
        dataStore.type = "news";
      }
      detailStore.type = "news";
      item = Object.assign({}, props.item.news);
    } else if (props.item.video !== null) {
      detailStore.type = "video";
      dataStore.type = detailStore.type.slice(0);
      item = Object.assign({}, props.item.video);
    } else if (props.item.tweet !== null) {
      detailStore.type = "tweet";
      dataStore.type = detailStore.type.slice(0);
      item = Object.assign({}, props.item.tweet);
    } else if (props.item.idea !== null) {
      detailStore.type = "idea";
      dataStore.type = detailStore.type.slice(0);
      item = Object.assign({}, props.item.idea);
    }

    item.item = {
      id: props.item.id,
      totalVote: props.item.totalVote,
      totalComment: props.item.totalComment,
      token: props.item.token,
    };
    item.airdrop = props.airdrop;
    detailStore.data = item;
  }
  return (
    <Index
      props={props}
      dataStore={dataStore}
      voteStore={voteStore}
      detailStore={detailStore}
    />
  );
});

export const Index = ({ props, dataStore, voteStore, detailStore }) => {
  let meta;
  const { locales, asPath } = useRouter();
  dataStore.page = "item";
  if (props.item === undefined) {
    meta = utils.createSiteMetadata(
      {
        page: "Explore",
        data: {
          query: props.type == "all" ? props.query : props.type,
        },
        dataStore: dataStore,
      },
      locales,
      asPath
    );
  } else {
    let item = {};
    if (props.item.news !== null) {
      item = Object.assign({}, props.item.news);
    } else if (props.item.video !== null) {
      item = Object.assign({}, props.item.video);
    } else if (props.item.tweet !== null) {
      item = Object.assign({}, props.item.tweet);
    } else if (props.item.idea !== null) {
      item = Object.assign({}, props.item.idea);
    }
    item.item = {
      id: props.item.id,
      totalVote: props.item.totalVote,
      totalComment: props.item.totalComment,
      token: props.item.token,
    };
    item.airdrop = props.airdrop;
    meta = utils.createSiteMetadata(
      {
        page: "ItemDetail",
        data: { ...item, type: detailStore.type },
        dataStore: dataStore,
      },
      locales,
      asPath
    );
  }
  /* Dragger to resize main col */
  const mainRef = useRef();
  const containerRef = useRef();

  console.log("props.type ", detailStore.data.id);
  return (
    <Layout
      dataStore={dataStore}
      detailStore={detailStore}
      extraClass="page-home"
      meta={meta}
    >
      <div className={`pane-content`} ref={containerRef}>
        {detailStore.data.id ? (
          <IndexRightBar />
        ) : (
          <PostsListWrapper />
        )}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  if (context.params.slug === undefined) {

    return {
      // returns a redirect to an internal page `/another-page`
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const type = context.params.slug[0];
  let props;
  if (type === "explore") {
    let exType =
      context.params.slug[1] === undefined ? "" : context.params.slug[1];
    //redirect old /explore/projects to /explore/research
    if (exType == "projects") {
      return {
        // returns a redirect to an internal page `/another-page`
        redirect: {
          destination: `/${context.locale}/explore/research`,
          permanent: false,
        },
      };
    }

    if (exType == "rada") {
      return {
        // returns a redirect to an internal page `/another-page`
        redirect: {
          destination: `/${context.locale}/explore/articles`,
          permanent: false,
        },
      };
    }

    props = await getDataExplore({ type: exType, lang: context.locale });

    if (!props) {
      return {
        notFound: true,
      };
    }
  } else if (type === "post") {
    let id = context.params.slug[1] === undefined ? "" : context.params.slug[1];
    props = await getDataPostDetail({ id: id, lang: context.locale });
    if (!props) {
      return {
        notFound: true,
      };
    }
  } else if (type === "tags") {
    let query =
      context.params.slug[1] === undefined ? "" : context.params.slug[1];
    props = await getDataExplore({
      query: query,
      type: "all",
      lang: context.locale,
    });
    if (!props) {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
  props = Object.assign(props, {
    ...(await serverSideTranslations(context.locale, [
      "common",
      "navbar",
      "invest",
      "share2earn",
      "launchpad",
    ])),
  });
  return {
    props,
    revalidate: 60,
  };
}
