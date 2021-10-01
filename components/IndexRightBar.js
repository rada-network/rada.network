import {observer} from "mobx-react";
import React, {createRef, useEffect, useState} from "react";
// import PerfectScrollbar from "perfect-scrollbar";
import Screen from "./utils/Responsive";
import {PostListDetail} from "./card-layouts/PostListDetail";
import { useTranslation } from "next-i18next";
import {useStore} from "../lib/useStore";
import {useRouter} from "next/router";
import Profile from "./Profile";
import _ from "lodash";

import { Transition } from '@headlessui/react';
import Siteintro from "./Intro";
import { usePageStore } from "../lib/usePageStore";
import utils from "../lib/util";


export const IndexRightBar = observer(({intro}) => {
  const {dataStore,detailStore,voteStore} = usePageStore()
  // const scrollBox2 = createRef();
  // let ps2;

  // useEffect(() => {
  //   // make scrollbar
  //   ps2 = new PerfectScrollbar(scrollBox2.current, {});
  //   return () => {
  //     ps2.destroy()
  //   }
  // }, [scrollBox2]);
  const [tabName, setTabName] = useState('article')
  const back = "/" + dataStore.lang + "/apps/explore/" + dataStore.type
  const router = useRouter()
  const store = useStore()

  useEffect(() => {
    setTabName('article')
    if (!_.isEmpty(detailStore.data)) {
      document.body.classList.add('page-details')
    } else {
      document.body.classList.remove('page-details')
    }
  }, [detailStore.data])

  const handleBack = (e) => {
    detailStore.data = {}
    dataStore.meta = utils.createSiteMetadata({page:"Explore",data : {query : dataStore.type}})
    store.setShallowConnect(true)
    router.push(back,back,{shallow:true})
  }
  const {t} = useTranslation()

  // const Intro = dynamic(() => import(`./locales/${dataStore.lang}/Intro.js`))
  return (
    <>
      <div className={`pane-content--sec` + (!_.isEmpty(detailStore.data) ? " pane-content-active" : "")}>

        <div className={`pane-content--sec--top`}>

          <div className="flex">

            {/* Pageback Here */}
            {dataStore !== undefined && !_.isEmpty(detailStore.data) ?
              <div className="page-back flex-shrink-0">
                <a title="Back" className="btn" onClick={(e) => {handleBack(e)}}>
                  <span className="icon">
                    <i className="fa-solid fa-chevron-left"></i>
                  </span>
                  <span className="btn--text sr-only">{t("back")}</span>
                </a>
              </div>
              : ""
            }

            {/*
            HieuNN:
            Example of Page Tabs Here
            */}
            {dataStore !== undefined && !_.isEmpty(detailStore.data) ?
            <div className="tabbar page-tabs">
              <div className="tabbar--main">

                <a href="#" className={`tab-item ${tabName === 'article' && !_.isEmpty(detailStore.data) && detailStore.data.token && detailStore.data.token !== null ?'tab-item--active':'' }`} onClick={()=>setTabName('article')}>
                  {detailStore.type === 'news' && t("article")}
                  {detailStore.type === 'video' && t("Video")}
                  {detailStore.type === 'tweet' && t("Tweet")}
                </a>

                {!_.isEmpty(detailStore.data) && detailStore.data.token && detailStore.data.token !== null ?
                <>

                <span className="tab-item--divider" />

                  <a href="#" className={`tab-item ${tabName === 'axs' ?'tab-item--active':'' }`} onClick={()=>setTabName('axs')}>
                    {detailStore.data.token.symbol}
                  </a>

                  {/* HieuNN: Examples of Token Lists */}

                  <a href="#" className={`tab-item ${tabName === 'axs' ?'tab-item--active':'' }`} onClick={()=>setTabName('axs')}>
                    ADA
                  </a>

                  <a href="#" className={`tab-item ${tabName === 'axs' ?'tab-item--active':'' }`} onClick={()=>setTabName('axs')}>
                    BNB
                  </a>

                  <a href="#" className={`tab-item ${tabName === 'axs' ?'tab-item--active':'' }`} onClick={()=>setTabName('axs')}>
                    DOT
                  </a>

                {/* <Link href={`/tokens/` + detailStore.data.token.symbol + "/events"}>
                  <a href="#" className="tab-item">
                  {t("events")}
                  </a>
                </Link> */}

                </>
                :""
                }
              </div>

            </div>
            : ""
            }

          </div>

          <Screen from="lg">
            <div className="flex items-center space-x-2">
              {/* <ThemeSwitch /> */}
              <div className="relative">
                <Profile />
              </div>
            </div>
          </Screen>

        </div>

        <div className="tabbar-sub page-subtabs">
          <div className="tabbar-sub--main">

            <a href="#" className={`tab-item tab-item--active`} onClick={()=>setTabName('team')}>
              Information
            </a>

            <a href="#" className={`tab-item ${tabName === 'team' ?'tab-item--active':'' }`} onClick={()=>setTabName('team')}>
              {t("team & backers")}
            </a>

            <a href="#" className={`tab-item ${tabName === 'team' ?'tab-item--active':'' }`} onClick={()=>setTabName('team')}>
              More Articles
            </a>

          </div>
        </div>


        {!_.isEmpty(detailStore.data) &&
          <PostListDetail tabName={tabName} detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} />
        }

        <div className={`pane-content--sec--main scrollbar ` + (!_.isEmpty(detailStore.data) ? "hidden" : "")}>

          <Siteintro intro={intro} />

          {/* <Header props={{
            itemType : "home",
          }}/> */}

          {/* Temporary Disable Widgets */}
          {/* <Sidebar className={`sidebar`} extraClassName="" /> */}
        </div>

      </div>
    </>
  )
})