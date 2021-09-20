import { Head } from "../../components/Head";
import { Topbar } from "../../components/Topbar";
import { Navbar } from "../../components/Navbar";

import ThemeSwitch from "../../components/ThemeSwitch"

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../components/LanguageSwitch";
import Screen from "../../components/utils/Responsive";
import { observer } from "mobx-react";
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";

const Layout = observer((props) => {

  const homeStore = new HomeStore({isHome : false});
  const dataStore = new ObservableTweetStore({homeStore})
  const detailStore = new DetailStore();
  dataStore.lang = props.lang
  const meta = {}
  return (
    <>
      <Head meta={meta} />

      {/* <div className={`body-decor`}>
    </div>

    <div className={`body-decor--text`}>
      <p className="mb-1">&copy; Photo from Unsplash</p>
      <div className="flex">
        <a href="#"><i className="far fa-random"></i> New Photo</a>
        <a href="#" className="ml-2"><i className="far fa-minus-circle"></i> Remove</a>
      </div>
    </div> */}

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
              <LanguageSwitch dataStore={dataStore} />
              <ThemeSwitch />
            </div>
          </div>
        </Screen>

        <div className={`pane-center`}>

          <Screen upto="md">
            <div className="pane-center--top">
              {/* <Tabbar /> */}
              <Topbar dataStore={dataStore} />
            </div>
          </Screen>

          <div className="pane-center--main">

            <div className="pane-content">

              <div className="pane-content--main">
                <div className="bg-gray-200 flex flex-col h-full w-full justify-center items-center">
                  <strong>CARDS LIST HERE</strong>
                  <span className="text-sm bg-opacity-50">
                    For showing Placeholder UI only
                  </span>
                </div>
              </div>

              <div className="pane-content--sec pane-content-active">

                {/* Top Bar */}
                <div className="pane-content--sec--top">
                  <div className="flex">
                    <div className="page-back flex-shrink-0">
                      <div className="btn">
                        <span className="icon">
                          <i className="fa-solid fa-chevron-left"></i>
                        </span>
                        <span className="btn--text sr-only">Quay lại</span>
                      </div>
                    </div>
                    <div className="tabbar page-tabs">
                      <div className="tabbar-main">
                        <a href="#" className="tab-item">
                          Bài Viết
                        </a>
                        <span className="tab-item--divider"></span>
                        <a href="#" className="tab-item tab-item--active">
                          AXS
                        </a>
                        <a href="#" className="tab-item">
                          Team
                        </a>
                        <a href="#" className="tab-item">
                          Events
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="btn nav-btn btn-login" aria-expanded="false" aria-haspopup="true">
                        <span className="icon">
                          <i className="fa-duotone fa-wallet"></i>
                        </span>
                        <span className="btn--text">Đăng nhập</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END: Top Bar */}

                {/* Main Content */}
                <div className="pane-content--sec--main grid scrollbar">
                  <div className="page page-coininfo">

                    <div className="section section-coininfo--general">

                      <div className="grid grid-cols-1 justify-start items-start">

                        {/* General */}
                        <div>
                          <div className="flex flex-col w-full">
                            <div className="flex flex-1 flex-wrap">
                              <span className="icon w-full md:w-auto">
                                <img src="/images/coins/axs.png" className="mr-2 h-px-32 w-px-32" alt="AXS Symbol"/>
                              </span>
                              <h1 className="flex items-center">
                                <strong className="text-2xl font-semibold">Axie Infinity</strong>
                                <span className="badge badge-coin badge-coin-lg ml-2">AXS</span>
                              </h1>
                            </div>
                          </div>

                          <div className="w-full mt-8">

                            <div className="post-media">
                              <img src="/images/examples/axs-intro.jpeg" className="" alt="AXS"/>
                            </div>

                            <div className="post-content mt-8">

                              <p>Axie Infinity is a blockchain-based trading and battling game that is partially owned and operated by its players.</p>

                              <p>To learn more about this project, check out our deep dive of Axie Infinity.</p>

                              <p>Inspired by popular games like Pokémon and Tamagotchi, Axie Infinity allows players to collect, breed, raise, battle and trade token-based creatures known as Axies.</p>

                              <p>These Axies can take various forms, and there are more than 500 different body parts available, including aquatic, beast, bird, bug, plant and reptile parts. Parts from each type class come in four different rarity scales: common, rare, ultra rare and legendary — and Axies can have any combination of body parts, making them highly variable and often rare and unique.</p>

                              <p>Each Axie is a non-fungible token (NFT) with different attributes and strengths and can be entered into 3v3 battles, with the winning team earning more experience (exp) points that are used to level up an Axie's stats or evolve their body parts. These Axies can be bred together to produce new and unique offspring, which can be used or sold on the Axie marketplace.</p>

                              <p>The Axie Infinity ecosystem also has its own unique governance token, known as Axie Infinity Shards (AXS). These are used to participate in key governance votes and will give holders a say in how funds in the Axie Community Treasury are spent.</p>
                            </div>
                          </div>
                        </div>
                        {/* END: General */}

                      </div>

                    </div>

                    <div className="section section-coininfo--market">
                        {/* Market Info */}
                        <div>
                          <div className="flex flex-col w-full">
                            <div className="flex flex-1 flex-wrap">
                              <div className="flex items-center">
                                <strong className="text-xl font-medium">Axie Infinity</strong>
                                <span className="badge badge-coin badge-coin-lg ml-2">AXS</span>
                              </div>
                            </div>
                            <div className="flex mt-4 md:ml-9">
                              <span className="text-3xl font-bold">$64.36</span>
                            </div>
                          </div>

                          <div className="flex w-full mt-8 md:mt-0">
                            <div className="list-group-sm text-sm w-full">
                              <div className="list-group-sm--item">
                                <span className="uppercase opacity-50 text-xs">Market Cap</span>
                                <span className="font-semibold">$3.7B</span>
                              </div>
                              <div className="list-group-sm--item">
                                <span className="uppercase opacity-50 text-xs">Volume 24h</span>
                                <span className="font-semibold">$217.0M</span>
                              </div>
                              <div className="list-group-sm--item">
                                <span className="uppercase opacity-50 text-xs">Available Supply</span>
                                <span className="font-semibold">57,849,238</span>
                              </div>
                              <div className="list-group-sm--item">
                                <span className="uppercase opacity-50 text-xs">Total Supply</span>
                                <span className="font-semibold">270,000,000</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* END: Market Info */}
                    </div>

                  </div>
                </div>
                {/* END: Main Content */}

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
