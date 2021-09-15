import {observer} from "mobx-react";
import React, {createRef, useEffect} from "react";
// import PerfectScrollbar from "perfect-scrollbar";
import Screen from "./utils/Responsive";
import {Wallet} from "./Wallet";
import {PostListDetail} from "./card-layouts/PostListDetail";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import {useStore} from "../lib/useStore";
import {useRouter} from "next/router";
import Usermenu from "./Usermenu";


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
    if (dataStore.showDetail) {
      document.body.classList.add('page-details')
    } else {
      document.body.classList.remove('page-details')
    }
  }, [dataStore.showDetail])
  
  const handleBack = (e) => {
    detailStore.data = {}
    dataStore.showDetail = false
    store.setShallowConnect(true)
    router.push(back,back,{shallow:true})
  }
  const {t} = useTranslation()

  const Intro = dynamic(() => import(`./locales/${dataStore.lang}/Intro.js`))
  return (
    <>
      <div className={`pane-content--sec` + (dataStore.showDetail ? " pane-content-active" : "")}>

        <div className={`pane-content--sec--top`}>

          <div className="flex h-full">

            {/* Pageback Here */}
            {dataStore !== undefined && dataStore.showDetail ?
              <div className="page-back flex-shrink-0">
                <div className="btn" onClick={(e) => {handleBack(e)}}>
                  <span className="btn--caret-left"></span>
                  <span className="btn--text">{t("back")}</span>
                </div>
              </div>
              : ""
            }

            {/* Page Tabs Here */}
            <div className="tabbar page-tabs">
              <div className="tabbar-main">
                <a href="#" className="tab-item">
                  Profile
                </a>
                <a href="#" className="tab-item tab-item--active">
                  About
                </a>
                <a href="#" className="tab-item">
                  Privacy
                </a>
              </div>
            </div>


          </div>

          <Screen from="lg">
          <div className="flex items-center space-x-2">
            {/* <ThemeSwitch /> */}
            <div className="relative">
              {/* <Wallet /> */}
              <Usermenu />
            </div>
          </div>
          </Screen>

        </div>


        {dataStore.showDetail &&
          <PostListDetail detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} />
        }

        <div className={`pane-content--sec--main scrollbar ` + (dataStore.showDetail ? "hidden" : "")}>


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