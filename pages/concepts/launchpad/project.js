import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import TokenInfo from "../../../components/token/TokenInfo";
import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";
import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";

// Cards Concepts
import TokenMeta from "../../../components/cards/concepts/launchpad/TokenMeta";
import MainActions from "../../../components/cards/concepts/launchpad/MainActions-1";

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

      <div className={`main-layout--wrapper`}>

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
                    <div class="flex h-full w-limiter-lg relative">
                      <div class="page-back flex-shrink-0">
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
                          <a href="#invest" class="tab-item ">
                            <span class="icon"><i class="fa-duotone fa-sack-dollar"></i></span>
                            <span class="tab-item--text">Invest</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pane-content--sec--main">

                    <div className="page page-full page-project-details scrollbar !pt-0">
                      <div className="w-limiter-lg">
                        <div className="mx-6 relative">
                          <div class="tabbar-sub page-subtabs !px-0 !bg-transparent">
                            <div class="tabbar--main">
                              <a href="#" class="tab-item !py-4 tab-item--active ">IDO</a>
                              <a href="#" class="tab-item !py-4">Overview</a>
                              <a href="#" class="tab-item !py-4">Airdrop</a>
                            </div>
                            <div class="page-back flex-shrink-0 !right-0">
                              <a title="Back" class="btn"><span class="icon"><i class="fa-solid fa-chevron-left md:hidden"></i><i class="fa-solid fa-times hidden md:!block"></i></span><span class="btn--text sr-only">Quay lại</span></a>
                            </div>
                          </div> 
                        </div>

                        <div className="section">
                          
                          <div className="section-header mb-4">
                            
                            <div className="post-title lg:flex w-full">
                              <h1 className="post-title--text mb-2">
                                Moniwar</h1>
                              <div className="post-header--meta py-2 flex ml-auto text-gray-600 dark:text-gray-300">
                                <div className="label private">Private</div>
                                <div className="flex items-center ml-2 text-sm ">
                                  <span className="w-4 h-4">
                                    <UsdtSvg />
                                  </span>
                                  <span className="ml-1">USDT</span>
                                </div>
                                <div className="flex items-center ml-2 text-sm">
                                  <span className="w-4 h-4">
                                    <BscSvg />
                                  </span>
                                  <span className="ml-1">Biance Smart Chain</span>
                                </div>
                              </div>
                            </div>
                          
                          </div>


                          {/* Video / Banner of Project */}
                          <div className="page-media">
                            <div className="media-player">
                              <div className="w-full h-full">
                                <div className={`aspect-w-16 aspect-h-9`}>
                                  <iframe
                                    src="https://www.youtube.com/embed/aTksaWSW65s"
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

                              <div className="box project-brief">
                                <div className="box-header">
                                  <h3>Information</h3>
                                </div>
                                <div className="box-body flex flex-col">
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

                              <div className="box project-process">
                                <div className="box-header">
                                  <h3>Requirements</h3>
                                </div>
                                <div className="box-body">
                                  <p className="flex justify-between items-center my-2 step-wrapper">
                                    <span>
                                      <span className="icon text-base mr-2 text-green-500"><i class="fas fa-check-circle"></i></span>
                                      Connect your Wallet
                                    </span>
                                  </p>
                                  <p className="flex justify-between items-center my-2  step-wrapper">
                                    <span>
                                      <span className="icon text-base mr-2 text-red-500"><i class="fas fa-times-circle"></i></span>
                                      KYC
                                    </span>
                                    <a className="btn btn-default w-24">KYC Now</a>
                                  </p>
                                  <p className="flex justify-between items-center my-2  step-wrapper">
                                    <span>
                                      <span className="icon text-base mr-2 text-red-500"><i class="fas fa-check-circle"></i></span>
                                      Have a minimum <strong>5 RIR</strong>
                                    </span>
                                    <a className="btn btn-default w-24">Earn RIR</a>
                                  </p>
                                  <p className="my-1  step-wrapper">
                                    <span>
                                      <span className="icon text-base mr-2 text-red-500"><i class="fas fa-times-circle"></i></span>
                                      Requirement 4
                                    </span>
                                  </p>
                                  <p className="flex justify-between items-center my-2 step-wrapper">
                                    <span>
                                      <span className="icon text-base mr-2 text-green-500"><i class="fas fa-check-circle"></i></span>
                                      Requirement 5
                                    </span>
                                  </p>
                                </div>
                              </div>
                              {/* end of project-process */}

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
