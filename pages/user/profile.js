import React from 'react'
import { useSession } from 'next-auth/client'
import AccessDenied from '../../components/AccessDenied'
import { Head } from "../../components/Head";
import { Topbar } from "../../components/Topbar";
import { Navbar } from "../../components/Navbar";

import ThemeSwitch from "../../components/ThemeSwitch"
import {Wallet} from "../../components/Wallet"

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../components/LanguageSwitch";
import Screen from "../../components/utils/Responsive";
import { observer } from "mobx-react";
import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from "../../components/Profile";
import {getCurrentUser} from "../../data/query/user"
import {disconnectWallet} from "../../data/query/wallet"
import _ from "lodash";
import {useStore} from "../../lib/useStore";
import { useRouter } from 'next/router';

export default function UserProfile (props) {
  const [ session, loading ] = useSession()
  const [user,setUser] = useState({})
  const {t} = useTranslation()
  const router = useRouter()
  const store = useStore()
  
  const homeStore = new HomeStore({isHome : false});
  const dataStore = new ObservableTweetStore({homeStore})
  const detailStore = new DetailStore();
  dataStore.lang = props.lang
  useEffect(() => {
    // If session exists, display content
      getCurrentUser().then(res => {
        setUser(res)
      })
    },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <ProfileAccessDenied  dataStore={dataStore} detailStore={detailStore} /> }

  

  // If session exists, display content

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

  const handleConnectWallet = ()=>{
    store.wallet.showConnect(true)
  }

  const handleDisconnectWallet = async (id) =>{
    const res = await disconnectWallet(id)
    if(res.data.userDisconnect.status === 'success'){
      getCurrentUser().then(res => {
        setUser(res)
      })
    }

  }

const handleConnectSuccess = ()=>{
  getCurrentUser().then(res => {
    setUser(res)
  })
}

  return (
    <>
      <Head meta={meta} />
      <Wallet handleConnectSuccess={handleConnectSuccess} />

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
                      <img src={user.image} alt={user.name}/>
                    </span>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl">{t("hello")}&nbsp;<strong>{user.name}</strong></h1>
                  </div>
                </div>

                <div className="page-section">

                  {/* Connection */}
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
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Wallet
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full flex items-center">
                                {_.isEmpty(wallet) ?
                                <span>{t("no connection",{"provider" : "wallet"})}</span>
                                :
                                <>
                                <div>
                                {user?.account?.map(address => {
                                  return address.provider === 'wallet' && <span className="btn--text text-xs ml-2">{ `${address.provider_account_id.substr(0, 4)}...${address.provider_account_id.substr(-4)} `}</span>
                                })}
                                </div>
                                <strong></strong>
                                <span className="badge badge-coin relative ml-2">ETHEREUM</span></>
                                }
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                                {_.isEmpty(wallet) ?
                                <button className="btn btn-default" onClick={handleConnectWallet}>{t("connect")}</button>
                                :
                                <button className="btn btn-default" onClick={()=>handleDisconnectWallet(wallet.id)}>{t("disconnect")}</button>
                                }

                            </div>
                          </div>

                          {/* Google disconnected --> Show Connect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-brands fa-google"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Google
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full">
                              {_.isEmpty(google) ?
                                <span>{t("no connection",{"provider" : "Google"})}</span>
                                :
                                <strong>{google.oauth_profile.email}</strong>
                                }
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                                {_.isEmpty(google) ?
                                <button className="btn btn-default">{t("connect")}</button>
                                :
                                <button className="btn btn-default">{t("disconnect")}</button>
                                }
                            </div>
                          </div>

                          {/* Facebook connected --> Show DisConnect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-brands fa-facebook-f"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Facebook
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full">
                              {_.isEmpty(facebook) ?
                                <span>{t("no connection",{"provider" : "Facebook"})}</span>
                                :
                                <strong>{facebook.oauth_profile.email}</strong>
                                }
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                            {_.isEmpty(facebook) ?
                                <button className="btn btn-default">{t("connect")}</button>
                                :
                                <button className="btn btn-default">{t("disconnect")}</button>
                                }
                            </div>
                          </div>

                          {/* Twitter connected --> Show DisConnect Buttons */}
                          <div className="list-group--item !pb-0 md:!pb-4">
                            <div className="list-group--item--title w-full md:w-1/4">
                              <div className="list-group--item--media">
                                <span className="icon"><i className="fa-brands fa-twitter"></i></span>
                              </div>
                              <label htmlFor="blockchain-wallet" className="text-color-desc">
                                Twitter
                              </label>
                            </div>
                            <div className="flex-1 -mt-4 md:mt-0">
                              <div className="relative pl-8 md:pl-0 w-full">
                              {_.isEmpty(twitter) ?
                                <span>{t("no connection",{"provider" : "Twitter"})}</span>
                                :
                                <strong>@{twitter.oauth_profile.screen_name}</strong>
                                }
                              </div>
                            </div>
                            <div className="text-right relative -top-4 md:top-0">
                            {_.isEmpty(twitter) ?
                                <button className="btn btn-default">{t("connect")}</button>
                                :
                                <button className="btn btn-default">{t("disconnect")}</button>
                                }
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
                  {/* END: Distribution */}

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

const ProfileAccessDenied = ({dataStore,detailStore}) => {
  const store = useStore()
  useEffect(() => {
    store.user.showConnect(true)
  },[]);
  const meta = {
    "title" : "User profile"
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
                  <div className="mt-4">
                    <h1 className="text-2xl">403 forbidden</h1>
                  </div>
                  <Profile />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export async function getStaticProps(context) {
  console.log(context)
  return {
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'navbar']),
      lang : context.locale
    }
  }
}