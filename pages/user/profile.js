import React from 'react'
import { useSession } from 'next-auth/client'
import AccessDenied from '../../components/AccessDenied'
import { Head } from "../../components/Head";
import { Topbar } from "../../components/Topbar";
import { Navbar } from "../../components/Navbar";

import ThemeSwitch from "../../components/ThemeSwitch"

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../components/LanguageSwitch";
import Screen from "../../components/utils/Responsive";
import { observer } from "mobx-react";
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from "../../components/Profile";
import {getCurrentUser} from "../../data/query/user"
import _ from "lodash";

export default function UserProfile (props) {
  const [ session, loading ] = useSession()
  const [user,setUser] = useState({})
  const {t} = useTranslation()
  useEffect(() => {
    getCurrentUser().then(res => {
      setUser(res)
    })
  },[])
  
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null
  
  // If no session exists, display access denied message
  if (!session) { return <AccessDenied/> }

  // If session exists, display content

  const homeStore = new HomeStore({isHome : false});
  const dataStore = new ObservableTweetStore({homeStore})
  const detailStore = new DetailStore();
  dataStore.lang = props.lang
  
  
  let google = {}, wallet = {}, facebook = {}, twitter = {}
  if (_.isEmpty(user)){
    return ""
  }
  google = user.account.find((item) => { 
    return item.provider === "google"
  })
  wallet = user.account.find((item) => { 
    return item.provider === "wallet" 
  })
  facebook = user.account.find((item) => { 
    return item.provider === "facebook" 
  })
  twitter = user.account.find((item) => { 
    return item.provider === "twitter"
  })
  const meta = {
    "title" : session.user.name + " profile"
  }
  return (
    <>
      <Head meta={meta} />

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
                      <img src={user.image} alt={user.name}/>
                    </span>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl">{t("hello")}&nbsp;<strong>{user.name}</strong></h1>
                  </div>
                </div>

                <div className="page-section">

                  <div className="card card-pagecontent">

                    <div className="card-header">
                      <span className="card-title">
                        {t("information")}
                      </span>
                    </div>

                    <div className="card-body">
                      
                    </div>

                  </div>

                  <div className="card card-pagecontent">

                    <div className="card-header">
                      <span className="card-title">
                        {t("connection")}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="grid">
                        <div className="list-group">

                          {/* Wallet connected --> Show DisConnect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Wallet
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative flex items-center">
                                {_.isEmpty(wallet) ? 
                                <span>{t("no connection",{"provider" : "wallet"})}</span>
                                :
                                <><strong>0xDB33...345f</strong>
                                <span className="badge relative -top-0.5 ml-2">ETHEREUM</span></>
                                }
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                                {_.isEmpty(wallet) ? 
                                <button className="btn nav-btn">{t("connect")}</button>
                                :
                                <button className="btn nav-btn">{t("disconnect")}</button>
                                } 
                              
                            </div>
                          </div>

                          {/* Google disconnected --> Show Connect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-brands fa-google"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Google
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                              {_.isEmpty(google) ? 
                                <span>{t("no connection",{"provider" : "Google"})}</span>
                                :
                                <strong>{google.oauth_profile.email}</strong>
                                }
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                                {_.isEmpty(google) ? 
                                <button className="btn nav-btn">{t("connect")}</button>
                                :
                                <button className="btn nav-btn">{t("disconnect")}</button>
                                } 
                            </div>
                          </div>

                          {/* Facebook connected --> Show DisConnect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-brands fa-facebook-f"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Facebook
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                              {_.isEmpty(facebook) ? 
                                <span>{t("no connection",{"provider" : "Facebook"})}</span>
                                :
                                <strong>{facebook.oauth_profile.email}</strong>
                                }
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                            {_.isEmpty(facebook) ? 
                                <button className="btn nav-btn">{t("connect")}</button>
                                :
                                <button className="btn nav-btn">{t("disconnect")}</button>
                                } 
                            </div>
                          </div>

                          {/* Twitter connected --> Show DisConnect Buttons */}
                          <div className="list-group--item">
                            <div className="list-group--item--title w-1/3">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-brands fa-twitter"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Twitter
                              </label>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                              {_.isEmpty(twitter) ? 
                                <span>{t("no connection",{"provider" : "Twitter"})}</span>
                                :
                                <strong>@{twitter.oauth_profile.screen_name}</strong>
                                }
                              </div>
                            </div>
                            <div className="flex-1 text-right">
                            {_.isEmpty(twitter) ? 
                                <button className="btn nav-btn">{t("connect")}</button>
                                :
                                <button className="btn nav-btn">{t("disconnect")}</button>
                                } 
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
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  console.log(context)
  return { 
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'navbar']),
      lang : context.locale
    }
  }
}