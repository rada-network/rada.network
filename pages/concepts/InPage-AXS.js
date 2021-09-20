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
                          Market
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
                  <Screen from="md">
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
                  </Screen>
                </div>
                {/* END: Top Bar */}

                {/* Main Content */}
                <div className="pane-content--sec--main grid scrollbar">
                  <div className="page page-coininfo">

                    <div className="section section-coininfo--general">

                      <div className="grid grid-cols-1">

                        {/* Post Header */}
                        <div className="flex flex-col">

                          <div className="flex flex-wrap justify-between items-center items-center w-full">
                            <div className="flex flex-0 flex-shrink-0 mb-4">
                              <span className="icon flex-shrink-0">
                                <img src="/images/coins/axs.png" className="mr-2 h-px-32 w-px-32" alt="AXS Symbol"/>
                              </span>
                              <h1 className="flex items-center">
                                <strong className="text-2xl font-semibold">Axie Infinity</strong>
                                <span className="badge badge-coin badge-coin-lg ml-2">AXS</span>
                              </h1>
                            </div>
                            <div className="flex flex-wrap space-x-2 mb-4">
                              <span className="badge badge-lg badge-red">Trending</span>
                              <span className="badge badge-lg">GameFi</span>
                              <span className="badge badge-lg">NFT</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex w-full">

                              <div className="text-sm w-full">
                                <div className="flex flex-wrap justify-between items-center">
                                  <div className="w-full lg:w-auto mb-2">
                                    <span className="uppercase opacity-50 text-xs">Website</span>
                                  </div>
                                  <div className="space-x-2 mb-2">
                                    <a href="https://axieinfinity.com/" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="icon">
                                        <i class="fa-regular fa-globe"></i>
                                      </span>
                                      <span className="btn--text">https://axieinfinity.com/</span>
                                    </a>
                                  </div>
                                </div>

                                <div className="flex flex-wrap justify-between items-center">
                                  <div className="w-full lg:w-auto mb-2">
                                    <span className="uppercase opacity-50 text-xs">Community</span>
                                  </div>
                                  <div className="space-x-2 mb-2">
                                    <a href="https://twitter.com/axieinfinity" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="icon">
                                        <i class="fa-brands fa-twitter"></i>
                                      </span>
                                      <span className="btn--text">Twitter</span>
                                    </a>
                                    <a href="https://t.me/axieinfinity" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="icon">
                                        <i class="fa-brands fa-telegram"></i>
                                      </span>
                                      <span className="btn--text">Telegram</span>
                                    </a>
                                    <a href="https://discord.com/invite/axie" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="icon">
                                        <i class="fa-brands fa-discord"></i>
                                      </span>
                                      <span className="btn--text">Discord</span>
                                    </a>
                                    <a href="https://axieinfinity.medium.com/" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="icon">
                                        <i class="fa-brands fa-medium"></i>
                                      </span>
                                      <span className="btn--text">Medium</span>
                                    </a>
                                  </div>
                                </div>

                                <div className="flex flex-wrap justify-between items-center">
                                  <div className="w-full lg:w-auto mb-2">
                                    <span className="uppercase opacity-50 text-xs">Explorer</span>
                                  </div>
                                  <div className="space-x-2 mb-2">
                                    <a href="https://etherscan.io/token/0xf5d669627376ebd411e34b98f19c868c8aba5ada" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="btn--text">etherscan</span>
                                    </a>
                                    <a href="https://ethplorer.io/address/0xf5d669627376ebd411e34b98f19c868c8aba5ada" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="btn--text">ethplorer</span>
                                    </a>
                                    <a href="https://bscscan.com/token/0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0" className="btn nav-btn nav-btn-sm" rel="nofollow" target="blank">
                                      <span className="btn--text">bscscan</span>
                                    </a>
                                  </div>
                                </div>

                                <div className="flex flex-wrap justify-between items-center">
                                  <div className="w-full lg:w-auto mb-2">
                                    <span className="uppercase opacity-50 text-xs">Contract</span>
                                  </div>
                                  <div className="space-x-2 mb-2">
                                    <a href="#" className="btn nav-btn nav-btn-sm">
                                      <span className="icon">
                                        <i class="cf cf-eth"></i>
                                      </span>
                                      <span className="btn--text">0xF5D6696273...8dd940327b28b</span>
                                      <span className="icon">
                                        <i class="fa-regular fa-copy text-2xs"></i>
                                      </span>
                                    </a>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>

                        </div>
                        {/* End: Post Header */}

                        {/* Post Content */}
                        <div className="w-full mt-6">

                          <div className="post-media">
                            <img src="/images/examples/axs-intro.jpeg" className="" alt="AXS"/>
                          </div>

                          <div className="post-content mt-8">

                            <h2>About Axie Infinity</h2>

                            <p>Axie Infinity is a blockchain-based trading and battling game that is partially owned and operated by its players.</p>

                            <p>Inspired by popular games like Pokémon and Tamagotchi, Axie Infinity allows players to collect, breed, raise, battle and trade token-based creatures known as Axies.</p>

                            <p>These Axies can take various forms, and there are more than 500 different body parts available, including aquatic, beast, bird, bug, plant and reptile parts. Parts from each type class come in four different rarity scales: common, rare, ultra rare and legendary — and Axies can have any combination of body parts, making them highly variable and often rare and unique.</p>

                            <h2>What Axie Infinity does?</h2>

                            <p>Each Axie is a non-fungible token (NFT) with different attributes and strengths and can be entered into 3v3 battles, with the winning team earning more experience (exp) points that are used to level up an Axie's stats or evolve their body parts. These Axies can be bred together to produce new and unique offspring, which can be used or sold on the Axie marketplace.</p>

                            <p>The Axie Infinity ecosystem also has its own unique governance token, known as Axie Infinity Shards (AXS). These are used to participate in key governance votes and will give holders a say in how funds in the Axie Community Treasury are spent.</p>

                            <h2>What Makes Axie Infinity Unique?</h2>

                            <p>Each Axie is a non-fungible token (NFT) with different attributes and strengths and can be entered into 3v3 battles, with the winning team earning more experience (exp) points that are used to level up an Axie's stats or evolve their body parts. These Axies can be bred together to produce new and unique offspring, which can be used or sold on the Axie marketplace.</p>

                            <p>The Axie Infinity ecosystem also has its own unique governance token, known as Axie Infinity Shards (AXS). These are used to participate in key governance votes and will give holders a say in how funds in the Axie Community Treasury are spent.</p>

                          </div>
                        </div>
                        {/* End: Post Content */}

                      </div>

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
