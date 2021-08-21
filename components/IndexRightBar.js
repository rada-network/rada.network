import {observer} from "mobx-react";
import React, {createRef, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import Screen from "./Resposive";
import {Wallet} from "./Wallet";
import {PostListDetail} from "./card-layouts/PostListDetail";
import {Header} from "./headers/HeaderHome";
import {Sidebar} from "./sidebar/Sidebar";
import dynamic from "next/dynamic";

export const IndexRightBar = observer(({dataStore,detailStore,voteStore}) => {

  const scrollBox2 = createRef();
  let ps2;

  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);

  const Intro = dynamic(() => import(`./locales/${dataStore.lang}/Intro.js`))
  console.log(dataStore.showDetail)
  return (
    <>
      <div className={`pane-content--sec` + (dataStore.showDetail ? " pane-content-active" : "")}>

        <Screen from="lg">
          <div className={`pane-content--sec--top`}>
            <div className="leading-10"></div>
            <div className="flex items-center space-x-2">
              {/* <ThemeSwitch /> */}
              <div className="relative">
                <Wallet />
              </div>
            </div>
          </div>
        </Screen>

        {dataStore.showDetail ?
          <PostListDetail detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} />
          :
          ""
        }

        <div className={`pane-content--sec--main scrollbar ` + (dataStore.showDetail ? "hidden" : "")} ref={scrollBox2}>


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