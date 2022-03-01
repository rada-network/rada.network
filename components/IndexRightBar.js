import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";

import isEmpty from "lodash/isEmpty";

import { getTokenById } from "../data/query/getTokenById";

import { usePageStore } from "../lib/usePageStore";

import Image from "./Image";
import dynamic from "next/dynamic";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { createPostUri } from "./card-layouts/PostsList";
import logo from "../public/images/rada.svg";

const Breadcrumbs = dynamic(import("@components/Breadcrumbs"));

const PostListDetail = dynamic(() =>
  import("./card-layouts/PostListDetail").then(
    (module) => module.PostListDetail
  )
);

export const IndexRightBar = observer(() => {
  const { dataStore, detailStore, voteStore } = usePageStore();

  const [tabName, setTabName] = useState("article");
  const [tokenData, setTokenData] = useState({});

  const router = useRouter();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!isEmpty(detailStore.data)) {
      document.body.classList.add("page-details");
    } else {
      document.body.classList.remove("page-details");
    }
  }, [detailStore.data]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substr(1);
      if (
        ["overview", "", "team", "airdrop", "share2earn"].indexOf(hash) !== -1
      ) {
        setTabName(hash);
      }
    } else {
      setTabName("article");
    }
  }, [router.asPath]);

  const handleBack = (e) => {
    router.back();
  };

  // find active airdrop
  const airdrop = tokenData?.airdrop?.find((ad) => ad.status == "published");
  // find active invest

  const share2earn = detailStore?.data?.share_campaign;

  const tokenInfo =
    detailStore?.data?.tokens && detailStore?.data?.tokens.length
      ? detailStore?.data?.tokens[0]
      : null;
  useEffect(() => {
    tokenInfo &&
      getTokenById({ id: tokenInfo?.slug, lang: i18n.language }).then(function (
        res
      ) {
        setTokenData(res.data.tokenById);
      });
  }, [tokenInfo]);

  // SEO
  let keywords, keyword;

  if (detailStore.data.keywords !== null) {
    try {
      keywords = JSON.parse(detailStore.data.keywords);
      keywords = Object.entries(keywords);
      keyword = keywords
        .map(function (item) {
          return item[0];
        })
        .join(",");
    } catch (e) {
      keyword = detailStore.data.keywords.replace(/\n/g, ",");
    }
  }

  let title = detailStore.data.title;
  let slug = detailStore.data.slug;
  if (detailStore.data.lang && detailStore.data.lang === "all") {
    if (dataStore.lang === "en") {
      title = detailStore.data.title_en;
      slug = detailStore.data.slug_en;
    }
  }

  return (
    <>
      <NextSeo
        title={`RADA - ${title}`}
        description={detailStore.data.description}
        openGraph={{
          images: [
            {
              url: detailStore.data.thumbnailUri,
            },
          ],
        }}
      />

      <ArticleJsonLd
        url={`${process.env.NEXT_PUBLIC_URL}${createPostUri(title, slug, detailStore.data.item, dataStore.lang)}`}
        title={title}
        images={[detailStore.data.thumbnailUri]}
        datePublished={detailStore.data.createdAt}
        dateModified={detailStore.data.updatedAt}
        authorName={detailStore.data.author?.name ?? "RADA"}
        publisherName="RADA"
        publisherLogo={logo.src}
      />

      <div
        className={
          `pane-content--sec` +
          (tabName == "article" ? " article" : " token") +
          (detailStore.data.id ? " pane-content-active" : "")
        }
      >
        <div className={`pane-content--sec--top`}>
          <div className="flex h-full w-full relative">
            {dataStore !== undefined &&
            !isEmpty(detailStore.data) &&
            detailStore.data.id ? (
              <div className="page-back flex-shrink-0">
                <a
                  title="Back"
                  className="btn"
                  onClick={(e) => {
                    handleBack(e);
                  }}
                >
                  <span className="icon">
                    <i className="fa-solid fa-chevron-left "></i>
                  </span>
                  <span className="btn--text sr-only">{t("back")}</span>
                </a>
              </div>
            ) : (
              ""
            )}

            {/*
            HieuNN:
            Example of Page Tabs Here
            */}
            {dataStore !== undefined && !isEmpty(detailStore.data) ? (
              <div className="tabbar page-tabs">
                <div className="tabbar--main">
                  <a
                    href="#"
                    className={`tab-item ${
                      tabName === "article" &&
                      !isEmpty(detailStore.data) &&
                      detailStore.data.tokens &&
                      detailStore.data.tokens.length
                        ? "tab-item--active"
                        : ""
                    }`}
                    onClick={() => setTabName("article")}
                  >
                    {detailStore.type === "news" && t("article")}
                    {detailStore.type === "projects" && t("Projects")}
                    {detailStore.type === "rada" && t("article")}
                    {detailStore.type === "video" && t("Video")}
                    {detailStore.type === "tweet" && t("Tweet")}
                  </a>

                  {!isEmpty(detailStore.data) &&
                  detailStore.data.tokens &&
                  detailStore.data.tokens.length ? (
                    <>
                      <span className="tab-item--divider" />
                      {detailStore.data.tokens?.map((token, index) => {
                        if (index === 0) {
                          return (
                            <a
                              href="#overview"
                              className={`tab-item ${
                                tabName === "overview" ? "tab-item--active" : ""
                              }`}
                              onClick={() => {
                                setTabName("overview");
                              }}
                            >
                              <span className="token-symbol mr-2 h-px-20 w-px-20">
                                {token && (
                                  <Image
                                    src={
                                      token?.logo !== null
                                        ? token.logo
                                        : `https://cdn.rada.network/static/img/coins/128x128/${token?.slug}.png`
                                    }
                                    alt={token?.name}
                                    width={20}
                                    height={20}
                                    objectFit="content"
                                  />
                                )}
                              </span>
                              <span className="tab-item--text !block">
                                {token.symbol}
                              </span>
                            </a>
                          );
                        }
                      })}

                      <a
                        href="#team"
                        className={`tab-item ${
                          tabName === "team" ? "tab-item--active" : ""
                        }`}
                        onClick={() => {
                          setTabName("team");
                        }}
                      >
                        {/* {t("team & backers")} */}
                        <span className="icon">
                          <i className="fa-duotone fa-users"></i>
                        </span>
                        <span className="tab-item--text">{t("team")}</span>
                      </a>

                      {airdrop && (
                        <a
                          href="#airdrop"
                          className={`tab-item ${
                            tabName === "airdrop" ? "tab-item--active" : ""
                          }`}
                          onClick={() => {
                            setTabName("airdrop");
                          }}
                        >
                          <span className="icon">
                            <i className="fa-duotone fa-gift"></i>
                          </span>
                          <span className="tab-item--text">{t("airdrop")}</span>
                        </a>
                      )}

                      {share2earn && (
                        <a
                          href="#share2earn"
                          className={`tab-item ${
                            tabName === "share2earn" ? "tab-item--active" : ""
                          }`}
                          onClick={() => {
                            setTabName("share2earn");
                          }}
                        >
                          <span className="icon">
                            <i className="fa-duotone fa-hand-holding-heart"></i>
                          </span>
                          <span className="tab-item--text">
                            {t("share2earn")}
                          </span>
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      {share2earn && (
                        <>
                          <span className="tab-item--divider" />
                          <a
                            href="#share2earn"
                            className={`tab-item ${
                              tabName === "share2earn" ? "tab-item--active" : ""
                            }`}
                            onClick={() => {
                              setTabName("share2earn");
                            }}
                          >
                            <span className="icon">
                              <i className="fa-duotone fa-hand-holding-heart"></i>
                            </span>
                            <span className="tab-item--text">
                              {t("share2earn")}
                            </span>
                          </a>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {detailStore.data.id && (
          <>
            <Breadcrumbs />
            <PostListDetail
              tabName={tabName}
              setTabCallback={setTabName}
              tokenId={tokenData?.id}
              tokenData={tokenData}
            />
          </>
        )}
      </div>
    </>
  );
});
