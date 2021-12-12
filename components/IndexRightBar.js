import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import { useStore } from "../lib/useStore";
import { useRouter } from "next/router";

import _ from "lodash";

import { getTokenById } from "../data/query/getTokenById";

import { usePageStore } from "../lib/usePageStore";
import utils from "../lib/util";
import Image from "./Image";
import dynamic from "next/dynamic";

const Siteintro = dynamic(import("./Intro"));

const PostListDetail = dynamic(() =>
  import("./card-layouts/PostListDetail").then(
    (module) => module.PostListDetail
  )
);

export const IndexRightBar = observer(({ intro }) => {
  const { dataStore, detailStore, voteStore } = usePageStore();
  // const scrollBox2 = createRef();
  // let ps2;

  // useEffect(() => {
  //   // make scrollbar
  //   ps2 = new PerfectScrollbar(scrollBox2.current, {});
  //   return () => {
  //     ps2.destroy()
  //   }
  // }, [scrollBox2]);
  const [tabName, setTabName] = useState("article");
  const [tokenData, setTokenData] = useState({});
  const back = "/" + dataStore.lang + "/apps/explore/" + dataStore.type;
  const router = useRouter();
  const store = useStore();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (!_.isEmpty(detailStore.data)) {
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
    detailStore.data = {};
    dataStore.meta = utils.createSiteMetadata({
      page: "Explore",
      data: { query: dataStore.type },
    });
    store.setShallowConnect(true);
    router.push(back, back, { shallow: true });
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

  // const Intro = dynamic(() => import(`./locales/${dataStore.lang}/Intro.js`))
  return (
    <>
      <div
        className={
          `pane-content--sec` +
          (tabName == "article" ? " article" : " token") +
          (detailStore.data.id ? " pane-content-active" : "")
        }
      >
        <div className={`pane-content--sec--top`}>
          <div className="flex h-full w-full relative">
            {/* Pageback Here */}
            {dataStore !== undefined &&
            !_.isEmpty(detailStore.data) &&
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
                    <i className="fa-solid fa-chevron-left lg:hidden"></i>
                    <i className="fa-solid fa-times hidden lg:!block"></i>
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
            {dataStore !== undefined && !_.isEmpty(detailStore.data) ? (
              <div className="tabbar page-tabs">
                <div className="tabbar--main">
                  <a
                    href="#"
                    className={`tab-item ${
                      tabName === "article" &&
                      !_.isEmpty(detailStore.data) &&
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

                  {!_.isEmpty(detailStore.data) &&
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

          {/* <div className="flex items-center space-x-2">
            <div className="relative">
              <ContentTools />
            </div>
          </div> */}
        </div>

        {detailStore.data.id && (
          <PostListDetail
            tabName={tabName}
            setTabCallback={setTabName}
            tokenId={tokenData?.id}
            tokenData={tokenData}
          />
        )}
        {!detailStore.data.id && (
          <div className={`pane-content--sec--main scrollbar`}>
            {detailStore.data.id}
            <Siteintro intro={intro} />

            {/* <Header props={{
          itemType : "home",
        }}/> */}

            {/* Temporary Disable Widgets */}
            {/* <Sidebar className={`sidebar`} extraClassName="" /> */}
          </div>
        )}
      </div>
    </>
  );
});
