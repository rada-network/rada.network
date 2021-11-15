import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";


import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";

import BackgroundWrapper from "../../../components/card-layouts/concepts/launchpad/BackgroundWrapper";
let step = 1;
const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
  dataStore.lang = props.lang
  const meta = {}
  let step = 1;
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

                  <div className="pane-content--sec--main grid scrollbar">

                    <div className="page page-full page-landing--parallel bg-white dark:bg-gray-900 !pt-0">
                      <div className="w-limiter-lg py-8 lg:py-16 px-4 lg:px-16">

                        {/* LOGO */}
                        <div className="page-title flex items-center">
                          <span className="page-logo"></span>
                          <h1 className="sr-only">
                            <span className="">LaunchVerse</span>
                          </h1>
                        </div>
                        {/* END: LOGO */}

                        {/* HEADER */}
                        <header className="hero flex py-8 mt-8">
                          <div className="">
                            <h2 className="text-4xl leading-tight text-black dark:text-white font-semibold font-altsans">
                              Introducing 
                              <strong className="block text-yellow-400">RADA Launchverse</strong>
                            </h2>
                            <p className="text-base leading-relaxed font-light text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">LaunchVerse is a product of RADA - The DAO-based AngelList for Blockchain. As a leading decentralized community-driven LaunchPad, we fund and launch the most promising Gamefi and Blockchain projects.</p>
                          </div>
                          <span className="hero-deco -mt-24 ml-16"></span>
                        </header>
                        {/* END: HEADER */}

                        {/* SECTION 1 */}
                        <div className="">
                          <div className="">
                            <h2 className="text-4xl leading-tight text-black dark:text-white font-semibold font-altsans">
                              <strong className="block text-yellow-400">The first Metaverse Gamefi</strong> 
                              is launching on RADA LaunchVerse
                            </h2>
                          </div>

                          <div className="mt-8">

                            <div className="flex-shrink-0">
                              <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/media/the_parallel_screenshot.png"} alt="The Parallel" />
                            </div>

                            <div className="
                                flex items-center border border-gray-200 dark:border-gray-700 px-8 py-4
                                rounded-b-xl
                              "
                            >
                              <div className="flex-shrink-0">
                                <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/logos/theparallel.png"} alt="The Parallel" />
                              </div>

                              <div className="px-8">
                                <h3 className="text-3xl leading-tight text-black dark:text-white font-semibold font-altsans">The Parallel</h3>
                                <p className="text-base leading-relaxed font-light text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-2">The Parallel is an Infinite Metaverse where players can limitlessly create everything, enjoy the unexpected experience that only Parallel can make.</p>
                              </div>

                              <div className="flex-shrink-0">
                                <a href="" className="btn btn-secondary btn-lg btn-rounded">Discover Now</a>
                              </div>
                            </div>

                          </div>          
                        </div>
                        {/* END: SECTION 1 */}


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
