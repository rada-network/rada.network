import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import TokenInfo from "../../../components/token/TokenInfo";
import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";
import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";

// Cards Concepts
import TokenMeta from "../../../components/cards/concepts/launchpad/TokenMeta";
import MainActions from "../../../components/cards/concepts/launchpad/MainActions-whitelist-done";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";

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

                  <div class="pane-content--sec--top !block">
                    <div class="flex h-full w-limiter-lg relative lg:px-3">
                      <div class="page-back flex-shrink-0 lg:!right-14">
                        <a title="Back" class="btn">
                        <span class="icon">
                          <i class="fa-solid fa-chevron-left md:hidden"></i>
                          <i class="fa-solid fa-times hidden md:!block"></i>
                        </span>
                        <span class="btn--text sr-only">Quay lại</span></a>
                      </div>
                      <div class="tabbar page-tabs">
                        <div class="tabbar--main">
                          <a href="#" class="tab-item tab-item--active">Launchpad</a>
                          <span class="tab-item--divider"></span>
                          <a href="#overview" class="tab-item ">
                            <span class="token-symbol mr-2">
                              <img src="https://media.rada.network/assets/514649e2-bf3c-4836-afbd-2c3ccd50293a?format=webp&amp;width=128" class="h-px-20 w-px-20" alt="Moniwar" />
                            </span>
                            <span class="tab-item--text !block">MOWA</span>
                          </a>
                          <a href="#team" class="tab-item ">
                            <span class="icon"><i class="fa-duotone fa-users"></i></span>
                            <span class="tab-item--text">Team</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pane-content--sec--main grid scrollbar">

                    <div className="page page-full page-project-details !pt-0">
                      <div className="w-limiter-lg">

                        <div className="section">
                          
                          <div className="section-header mb-4">
                            
                            <div class="flex flex-wrap justify-between items-center w-full">
                              <div class="flex flex-0 flex-shrink-0 mb-4 items-center">
                                <span class="icon flex-shrink-0 mr-2">
                                  <img src="https://media.rada.network/assets/514649e2-bf3c-4836-afbd-2c3ccd50293a?format=webp&width=128" class="h-px-32 w-px-32" alt="Moniwar" />
                                </span>
                                <h1 class="flex items-center">
                                  <strong class="text-color-title text-xl lg:text-2xl font-semibold">Moniwar</strong>
                                  <span class="badge badge-coin badge-coin-lg ml-2 -mb-1">MOWA</span>
                                </h1>
                              </div>

                              <div class="flex flex-wrap space-x-4 mb-4">

                                <div className="flex items-center text-sm">
                                  <span className="w-5 h-5">
                                    <UsdtSvg />
                                  </span>
                                  <span className="ml-1">USDT</span>
                                </div>

                                <div className="flex items-center text-sm">
                                  <span className="w-4 h-4">
                                    <BscSvg />
                                  </span>
                                  <span className="ml-1">Binance Smart Chain</span>
                                </div>

                                <div className="label private">Private</div>
                              </div>
                            </div>

                          </div>


                          {/* Video / Banner of Project */}
                          <div className="page-media">
                            <div className="media-player">
                              <div className="w-full h-full">
                                <div className={`aspect-w-16 aspect-h-9`}>
                                  <iframe
                                    src="https://www.youtube.com/embed/_jX5T-JrEhI"
                                    title="Video Title"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen="allowFullScreen"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* END: Video / Banner of Project */}

                          <div className="section-body">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                              <div className="card card-default project-process">
                                <div className="card-header">
                                  <h3>Moniwar's Info</h3>
                                </div>
                                <div className="card-body">
                                  <p className="">
                                    Moniwar là một tựa game blockchain lấy cảm hứng từ những câu chuyện sử thi thần thoại của Hy Lạp cổ đại, với những hình tượng nhân vật vô cùng hấp dẫn. Trò chơi thuộc thể loại Puzzle với cơ chế PvP cùng lối chơi đơn giản, ai cũng có thể chơi được.
                                  </p>
                                  <p className="mt-auto">
                                    <a href="#" className="link">Read full research</a> <span class="icon text-2xs ml-0.5"><i class="fa-duotone fa-external-link"></i></span>
                                  </p>
                                </div>

                              </div>
                              {/* end of project-process */}

                              <div className="card card-default project-brief">
                                <div className="card-header">
                                  <h3>Launchpad Overview</h3>
                                </div>
                                <div className="card-body flex flex-col">
                                  <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">   
                                    <li className="list-pair mb-2">
                                      <span className="list-key">
                                        Raise
                                      </span>
                                      <span className="ml-auto list-value font-semibold">
                                        45,000 USDT
                                      </span>
                                    </li>
                                    <li className="list-pair mb-2">
                                      <span className="list-key">
                                        Participants
                                      </span>
                                      <span className="ml-auto list-value font-semibold">
                                        2,200
                                      </span>
                                    </li>
                                    <li className="list-pair mb-2">
                                      <span className="list-key">
                                        Token Price
                                      </span>
                                      <span className="ml-auto font-semibold">0.1 USDT </span>
                                    </li>
                                    <li className="list-pair mb-2">
                                      <span className="list-key">
                                        Progress
                                      </span>
                                      <span className="list-value ml-auto">
                                        <span className="font-semibold">72000</span>
                                        <span className="opacity-70">/100,0000</span> MOWA
                                      </span>
                                    </li>
                                  </ul>
                                  <div className="progress-bar mt-3 bg-gray-300 dark:bg-gray-600 w-full h-5 rounded-full">
                                    <div className="text-2xs font-semibold  flex px-2 text-white items-center progress-bar--percentage h-5 bg-green-600 rounded-full" style={{width: `72%`}}>72%</div>
                                  </div>
                                </div>
                              </div>
                              {/* end of project-brief */}

                            </div>


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
