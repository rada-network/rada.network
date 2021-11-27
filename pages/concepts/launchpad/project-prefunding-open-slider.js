import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import TokenInfo from "../../../components/token/TokenInfo";
import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";
import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";
import ReactDOM from 'react-dom';
// Cards Concepts
import TokenMeta from "../_components/cards/launchpad/TokenMeta";
import MainActions from "../_components/cards/launchpad/MainActions-prefunding-open-slider";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";
import TokenContent from "./TokenContent";
import TokenBrief from "./TokenBrief";
import TokenNav from "./TokenNav";
import BackgroundWrapper from "../../../components/card-layouts/concepts/launchpad/BackgroundWrapper";

const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
  dataStore.lang = props.lang
  const meta = {}
  return (
    <>
      <Head meta={meta} />

      <BackgroundWrapper />

      <div className={`main-layout--wrapper glassmorphism`}>

        <div className={`main-layout`}>
          {/* Mobile / Tablet Navbar */}
          <Screen upto="md">
            <div className="pane-bottom">
              <Navbar dataStore={dataStore} detailStore={detailStore} />
            </div>
          </Screen>

          {/* Desktop Navbar */}
          <Screen from="lg">
            <div className="pane-left">
              <Navbar dataStore={dataStore} detailStore={detailStore} />
              <div className="pane-left--bottom">
                <Profile />
                <div className="pane-left--bottom-section">
                  <LanguageSwitch />
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </Screen>

          <div className={`pane-center`}>
            <div className="pane-center--main">

              <div className="pane-content">
                <div className="pane-content--sec pane-content-active !w-full">
                  <TokenNav />
                  <div className="pane-content--sec--main grid scrollbar">
                    <div className="page page-full page-project-details !pt-0">
                      <div className="w-limiter-lg">
                        <div>                          
                          <TokenBrief />
                          <div className="section-body p-4 md:p-4">
                            <TokenContent />

                            {/* Main Action Card */}
                            <div className="grid grid-cols-1 mt-4">
                              <MainActions />
                            </div>
                            {/* END: Main Action Card */}

                          </div>          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
})


export async function getStaticProps(context) {
  console.log(context)
  return { 
    props: {
      lang : context.locale
    }
  }
}

export default Layout;
