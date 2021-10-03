import React from 'react'
import { useSession } from 'next-auth/client'

import {Wallet} from "../../components/Wallet"

import { useState, useEffect, createRef } from 'react'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from "../../components/Profile";
import {getCurrentUser} from "../../data/query/user"
import {disconnectWallet} from "../../data/query/wallet"
import _ from "lodash";
import {useStore} from "../../lib/useStore";
import { useRouter } from 'next/router';
import {signIn} from 'next-auth/client'
import { StaticLayout } from '../../components/page-layouts/StaticLayout';
import { UserDistribution } from '../../components/user/UserDistribution';
import { usePageStore } from '../../lib/usePageStore';
import {getSession} from "next-auth/client"
import {getPage} from "../../data/query/page";


export default function UserProfile (props) {
  const [session,setSession] = useState()
  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState({})
  const {t} = useTranslation()
  const router = useRouter()
  const store = useStore()
  
  const {dataStore,detailStore} = usePageStore()
  useEffect(() => {
    // If session exists, display content
      getCurrentUser().then(res => {
        setUser(res)
      })
   },[session])
  useEffect(() => { 
    getSession().then((sess) => {
      setSession(sess);
    }).finally(() => {
      setLoading(false);
    })
  },[])

  if (loading) return null;
  // If no session exists, display access denied message
  if (!session) { return <ProfileAccessDenied  dataStore={dataStore} detailStore={detailStore} /> }
  // If session exists, display content
  let google = {}, wallet = {}, facebook = {}, twitter = {}
  google = user.account?.find((item) => {
    return item.provider === "google"
  })
  wallet = user.account?.find((item) => {
    return item.provider === "wallet"
  })
  facebook = user.account?.find((item) => {
    return item.provider === "facebook" 
  })
  twitter = user.account?.find((item) => {
    return item.provider === "twitter"
  })
  const meta = {
    "title" : user?.name + " profile"
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
      <StaticLayout meta={meta} >
        
        <div className="page-section text-center mt-1 mb-2 lg:mt-2">
          <div className="">
            <span className="avatar avatar-3xl shadow">
              <img src={user.image} alt={user.name}/>
            </span>
            <Wallet handleConnectSuccess={handleConnectSuccess} />
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
                          return address.provider === 'wallet' && <strong>{ `${address.provider_account_id.substr(0, 4)}...${address.provider_account_id.substr(-4)} `}</strong>
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
                        <button className="btn btn-default disabled" onClick={(e) => signIn("google")} >{t("connect")}</button>
                        :
                        <button className="btn btn-default disabled">{t("disconnect")}</button>
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
                        <button className="btn btn-default disabled" onClick={(e) => signIn("facebook")} >{t("connect")}</button>
                        :
                        <button className="btn btn-default disabled">{t("disconnect")}</button>
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
                        <button className="btn btn-default disabled" onClick={(e) => signIn("twitter")} >{t("connect")}</button>
                        :
                        <button className="btn btn-default disabled">{t("disconnect")}</button>
                        }
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
          {/* END: Connection */}
          <UserDistribution props={props} />
          

        </div>
      </StaticLayout>
    </>
  );
}



const ProfileAccessDenied = ({}) => {
  const store = useStore()
  useEffect(() => {
    store.user.showConnect(true)
  },[]);
  const meta = {
    "title" : "User profile"
  }
  return (
    <>
      <StaticLayout meta={meta}>
        <div className="page-section text-center">
          <div className="my-8">
            <h1 className="text-3xl">403 forbidden</h1>
          </div>
          <Profile />
        </div>
      </StaticLayout>
      
    </>
  )
};

export async function getStaticProps(context) {
  const info = await getPage({slug: 'profile-info', lang: context.locale})
  
  return {
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'navbar']),
      lang : context.locale,
      info
    }
  }
}