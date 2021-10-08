import {observer} from "mobx-react";
import React, {createRef, useEffect, useState} from "react";
// import PerfectScrollbar from "perfect-scrollbar";
import Screen from "./utils/Responsive";
import {PostListDetail} from "./card-layouts/PostListDetail";
import { useTranslation } from "next-i18next";
import {useStore} from "../lib/useStore";
import {useRouter} from "next/router";
import Profile from "./Profile";
import ContentTools from "./ContentTools";
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
    if (!_.isEmpty(detailStore.data)) {
      document.body.classList.add('page-details')
    } else {
      document.body.classList.remove('page-details')
    }
  }, [detailStore.data])

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substr(1)
      if (hash) {
        const arr = hash.split('/')
        const symbol = arr[0].toUpperCase()
        if (detailStore.data.tokens?.find(token => token.symbol == symbol)) {
          setTabName(symbol)
        }      
      }
    } else {
      setTabName('article')
    }
  }, [router.asPath])  


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
      <div className={`pane-content--sec` +  (tabName == 'article'? " article" : " token") + ((detailStore.data.id) ? " pane-content-active" : "")}>

        <div className={`pane-content--sec--top`}>

          <div className="flex">

            {/* Pageback Here */}
            {dataStore !== undefined && !_.isEmpty(detailStore.data) && detailStore.data.id ?
              <div className="page-back flex-shrink-0">
                <a title="Back" className="btn" onClick={(e) => {handleBack(e)}}>
                  <span className="icon">
                    <i className="fa-solid fa-chevron-left md:hidden"></i>
                    <i className="fa-solid fa-times hidden md:!block"></i>
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

                <a href="#" className={`tab-item ${tabName === 'article' && !_.isEmpty(detailStore.data) && detailStore.data.tokens && detailStore.data.tokens.length ?'tab-item--active':'' }`} onClick={()=>setTabName('article')}>
                  {detailStore.type === 'news' && t("article")}
                  {detailStore.type === 'projects' && t("Projects")}
                  {detailStore.type === 'rada' && t("Rader")}
                  {detailStore.type === 'video' && t("Video")}
                  {detailStore.type === 'tweet' && t("Tweet")}
                </a>

                {!_.isEmpty(detailStore.data) && detailStore.data.tokens && detailStore.data.tokens.length ?
                <>

                <span className="tab-item--divider" />

                  {detailStore.data.tokens?.map(token => (
                    <a href={`#${token.symbol.toLowerCase()}`} className={`tab-item ${tabName === token.symbol ?'tab-item--active':'' }`} onClick={()=>{setTabName(token.symbol)}}>
                      {token.symbol}
                    </a>
                  ))}

                </>
                :""
                }
              </div>

            </div>
            : ""
            }

          </div>


          <div className="flex items-center space-x-2">
            <div className="relative">
              <ContentTools />
            </div>
          </div>


        </div>

        {detailStore.data.id &&
          <PostListDetail tabName={tabName} setTabCallback={setTabName} />
        }
        {(!detailStore.data.id) &&
        <div className={`pane-content--sec--main scrollbar`}>
          {detailStore.data.id}
          <Siteintro intro={intro} />

        {/* <Header props={{
          itemType : "home",
        }}/> */}

        {/* Temporary Disable Widgets */}
        {/* <Sidebar className={`sidebar`} extraClassName="" /> */}
        </div>
        }
        

      </div>
    </>
  )
})