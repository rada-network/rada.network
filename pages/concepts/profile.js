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

        <div className={`pane-center scrollbar`}>
          <Screen upto="md">
            <div className="pane-center--top">
              {/* <Tabbar /> */}
              <Topbar dataStore={dataStore} />
            </div>
          </Screen>

          <div className="pane-center--main w-full">

            <div className="page page-full scrollbar">

              <div className="page-full--inner">

                {/* <div className="page-title">
                  Your Profile
                </div> */}

                <div className="page-section text-center">
                  <div className="">
                    <span className="avatar avatar-2xl shadow">
                      <img src="/images/examples/avatar.png" alt="User Name Here"/>
                    </span>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl">Xin chào <strong>Hieu Nguyen</strong></h1>
                  </div>
                </div>

                <div className="page-section pb-8">
                  {/* Connection */}
                  <div className="card card-pagecontent">

                    <div className="card-header">
                      <span className="card-title">
                        Connections
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="grid">
                        <div className="list-group">

                          {/* Wallet connected --> Show DisConnect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-solid fa-wallet"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Wallet
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full flex items-center">
                                <strong>0xDB33...345f</strong>
                                <span className="badge badge-coin relative ml-2">ETHEREUM</span>
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                              <btn className="btn btn-default">Disconnect</btn>
                            </div>
                          </div>

                          {/* Google disconnected --> Show Connect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-brands fa-google"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Google
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full">
                                <span>No Google account connected</span>
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                              <btn className="btn btn-default">Connect</btn>
                            </div>
                          </div>

                          {/* Facebook connected --> Show DisConnect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-brands fa-facebook-f"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Facebook
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full">
                                <strong>Hieu Nguyen</strong>
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                              <btn className="btn btn-default">Disconnect</btn>
                            </div>
                          </div>

                          {/* Twitter connected --> Show DisConnect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-brands fa-twitter"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Twitter
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full">
                                <strong>@nnth83</strong>
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                              <btn className="btn btn-default">Disconnect</btn>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                  {/* END: Connection */}
                  {/* Distribution */}
                  <div className="card card-pagecontent">

                    <div className="card-header">
                      <span className="card-title">
                        Contribution (required)
                      </span>
                    </div>

                    <div className="card-body">
                      
                      <div className="list-group">

                        <div className="list-group--item !justify-start !items-start">
                          
                          <i class="fa-solid fa-circle-1 mr-2 md:mr-4 text-xl md:text-3xl text-purple-500"></i>

                          <div>
                            <h3 className="font-semibold mb-4">
                              TIER 1: $50 allocation <span className="font-normal">(first come first serve)</span>
                            </h3>

                            <p className="mb-2">Complete all the folllowing tasks:</p>

                            <ol className="">
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Follow our Twitter <a className="link" href="https://twitter.com/radamedia" rel="nofollow" target="_blank">@radamedia</a></li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Subscribe to our <a className="link" href="https://www.youtube.com/channel/UCZUun_BIo0GZgvBNsYSUjwQ/featured" rel="nofollow" target="_blank">RADA TV</a></li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Join our <a className="link" href="https://www.facebook.com/groups/857926278494577" rel="nofollow" target="_blank">Facebook Group</a></li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Join our <a className="link" href="https://discord.gg/2hmmK6P3" rel="nofollow" target="_blank">Dicord</a></li>
                            </ol>
                          </div>
                        </div>

                        <div className="list-group--item !justify-start !items-start">

                          <i class="fa-solid fa-circle-2 mr-2 md:mr-4 text-xl md:text-3xl text-yellow-500"></i>

                          <div>
                            <h3 className="font-semibold mb-4">
                              TIER 2: $100 allocation <span className="font-normal">(Guaranty)</span>
                            </h3>

                            <p className="mb-2">Complete at least 1 of the folllowing tasks:</p>

                            <ul className="grid grid-cols-1 w-full">
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Have at least 1 post on FB group</li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Commit at least 1 commit to our Rada Github</li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Contribute a design</li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Invite at least 100 people to Rada</li>
                              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> Translating at least 1 post to a new language</li>
                            </ul>
                          </div>
                        </div>

                        <div className="list-group--item !justify-start !items-start">

                          <i class="fa-solid fa-circle-3 mr-2 md:mr-4 text-xl md:text-3xl text-green-500"></i>

                          <div>
                            <h3 className="font-semibold mb-4">TIER 3:  $200</h3>

                            <ol>
                              <li>Officially become a Rada (working team)</li>
                            </ol>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                  {/* Distribution */}

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
