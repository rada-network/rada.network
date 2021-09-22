import {observer} from "mobx-react";
import React, {createRef, useEffect} from "react";
// import PerfectScrollbar from "perfect-scrollbar";
import Screen from "./utils/Responsive";
import {PostListDetail} from "./card-layouts/PostListDetail";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import {useStore} from "../lib/useStore";
import {useRouter} from "next/router";
import { useSession } from "next-auth/client";
import Profile from "./Profile";
import _ from "lodash";
import Usermenu from "./Usermenu";
import Link from "next/link";

import { Transition } from '@headlessui/react';


export const IndexRightBar = observer(({dataStore,detailStore,voteStore}) => {
  // const scrollBox2 = createRef();
  // let ps2;

  // useEffect(() => {
  //   // make scrollbar
  //   ps2 = new PerfectScrollbar(scrollBox2.current, {});
  //   return () => {
  //     ps2.destroy()
  //   }
  // }, [scrollBox2]);
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
  
  const handleBack = (e) => {
    detailStore.data = {}
    store.setShallowConnect(true)
    router.push(back,back,{shallow:true})
  }
  const {t} = useTranslation()

  const Intro = dynamic(() => import(`./locales/${dataStore.lang}/Intro.js`))
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
                    <i class="fa-solid fa-chevron-left"></i>
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
              <div className="tabbar-main">

                {!_.isEmpty(detailStore.data) && detailStore.data.token && detailStore.data.token !== null ? 
                <>
                <a href="#" className="tab-item tab-item--active">
                  {t("article")}
                </a>
                
                <span className="tab-item--divider" />

                <Link href={`/tokens/` + detailStore.data.token.symbol}>
                  <a href="#" className="tab-item">
                    {detailStore.data.token.symbol} Info
                  </a>
                </Link>
                <Link href={`/tokens/` + detailStore.data.token.symbol + "/team"}>
                  <a href="#" className="tab-item">
                  {t("team & partners")}
                  </a>
                </Link>
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


        {!_.isEmpty(detailStore.data) &&
          <PostListDetail detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} />
        }

        <div className={`pane-content--sec--main scrollbar ` + (!_.isEmpty(detailStore.data) ? "hidden" : "")}>


          <Intro dataStore={dataStore} />

          {/* <Header props={{
            itemType : "home",
          }}/> */}

          {/* Temporary Disable Widgets */}
          {/* <Sidebar className={`sidebar`} extraClass="" /> */}
        </div>

      </div>
    </>
  )
})