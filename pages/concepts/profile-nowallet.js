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

          <div className="pane-center--main w-full">

            <div className="page page-full">

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

                <div className="page-section">

                  <div className="card card-pagecontent">

                    <div className="card-header">
                      <span className="card-title">
                        Connections
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="grid">
                        <div className="list-group">

                          {/* Wallet not connected --> Show Connect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-duotone fa-wallet"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Wallet
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                                <span>No wallet connected</span>
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                              <btn className="btn nav-btn">Connect</btn>
                            </div>
                          </div>

                          {/* Twitter connected --> Show DisConnect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-brands fa-google"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Google
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                                <span>No Google account connected</span>
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                              <btn className="btn nav-btn">Disconnect</btn>
                            </div>
                          </div>

                          {/* Facebook connected --> Show DisConnect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-brands fa-facebook-f"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Facebook
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                                <strong>Hieu Nguyen</strong>
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                              <btn className="btn nav-btn">Disconnect</btn>
                            </div>
                          </div>

                          {/* Google disconnected --> Show Connect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i class="fa-brands fa-twitter"></i></span>
                              </div>
                              <label for="blockchain-wallet" className="text-color-desc">
                                Twitter
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                                <strong>@nnth83</strong>
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                              <btn className="btn nav-btn">Disconnect</btn>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="card card-pagecontent">
                    <span className="card-title">
                      Activities
                    </span>
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
