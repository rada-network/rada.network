import React from 'react'
import { useSession } from 'next-auth/client'

import {Wallet} from "../../components/Wallet"

import { useState, useEffect, createRef } from 'react'

import {DetailStore, HomeStore, ObservableTweetStore, VoteStore} from "../../lib/store";
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
import { getPage } from '../../data/query/page';

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
      return () => { 
        setUser({})
      }
    },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session && !loading) { return <ProfileAccessDenied  dataStore={dataStore} detailStore={detailStore} /> }
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
      <StaticLayout meta={meta} detailStore={detailStore} dataStore={dataStore} >
        
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

const UserDistribution = ({props}) => { 
  return (
    <>
    {/* Distribution */}
      <div className="card card-pagecontent">
        <div className="card-header">
          <span className="card-title">
            Contribution (required)
          </span>
        </div>
        {props.lang == "vi" ? 
        <ContentVi /> : 
        <ContentEn />
        }
        

      </div>
      {/* END: Distribution */}
    </>
  )
}

const ContentVi = function(){
  return (
    <div className="card-body">
      <div className="list-group">

        <div className="list-group--item !justify-start !items-start">
          
          <i class="fa-solid fa-circle-1 mr-2 md:mr-4 text-xl md:text-3xl text-purple-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 1: <strong>Raders</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Yêu cầu:</strong> Subscribe các channel RADA</li>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quyền lợi:</strong> Token trị giá $20 (Private Sale)</li>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Số lượng:</strong> 100 người</li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start">

          <i class="fa-solid fa-circle-2 mr-2 md:mr-4 text-xl md:text-3xl text-yellow-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 2: <strong>RADA Contributor</strong>(Những người có đóng góp cho RADA)
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Yêu cầu:</strong> Đáp ứng ít nhất 1 trong các tiêu chí sau</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1">
                  <i class="fa-thin fa-circle text-green-200 mr-2"></i>
                  Đăng bài trong RADA Group
                </li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Dịch thuật 1 bài viết sang ngôn ngữ bất kỳ</li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Ít nhất 1 commit lên RADA Repository</li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Đã điền đơn đăng ký</li>
              </ul>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quyền lợi:</strong> Token trị giá $100 (Private Sale)</li>
              <li className="mb-1">
                <i class="fa-solid fa-check text-green-400 mr-2"></i> 
                <strong>Số lượng:</strong> <a href="https://forms.gle/SkhQPsauBeQLSq6J8" target="_blank">100 người đầu tiên điền đơn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start">

          <i class="fa-solid fa-circle-3 mr-2 md:mr-4 text-xl md:text-3xl text-green-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 3: <strong>RADA Team & RADA Advisors</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Yêu cầu:</strong> đáp ứng một trong 2 tiêu chí sau</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Thành viên, <strong>cống hiến, làm việc full time</strong> cho RADA.</li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i><strong>Advisor</strong> của RADA</li>
              </ul>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quyền lợi:</strong> Token trị giá $200 (Private Sale)</li>
            </ul>
          </div>
        </div>

      </div>
                  
    </div>
  )
}

const ContentEn = function(){
  return (
    <div className="card-body">
      <div className="list-group">

        <div className="list-group--item !justify-start !items-start">
          
          <i class="fa-solid fa-circle-1 mr-2 md:mr-4 text-xl md:text-3xl text-purple-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 1: <strong>Raders</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Requirements:</strong> Subscribe to RADA channels</li>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Benefits:</strong> $20 worth of tokens (Private Sale)</li>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quantity:</strong> 100 people</li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start">

          <i class="fa-solid fa-circle-2 mr-2 md:mr-4 text-xl md:text-3xl text-yellow-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 2: <strong>RADA Contributor</strong>(RADA Contributors)
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Requirements:</strong>Meet at least 1 of the following criteria</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1">
                  <i class="fa-thin fa-circle text-green-200 mr-2"></i>
                  Least 1 post in RADA's FB Group
                </li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Least 1 translation into 2nd language</li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Least 1 git commit to RADA's repository</li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Submitted this form application</li>
              </ul>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Benefits:</strong> $100 worth of tokens(Private sale)</li>
              <li className="mb-1">
                <i class="fa-solid fa-check text-green-400 mr-2"></i> 
                <strong>Quantity:</strong>
                <a rel="nofollow " href="https://forms.gle/SkhQPsauBeQLSq6J8" target="_blank">First 100 people to fill out the application</a>
               </li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start">

          <i class="fa-solid fa-circle-3 mr-2 md:mr-4 text-xl md:text-3xl text-green-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 3: <strong>RADA Team & RADA Advisors</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Requirements:</strong> meet one of the following 2 criteria</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i>Devoted member, working full time for RADA.</li>
                <li className="mb-1"><i class="fa-thin fa-circle text-green-200 mr-2"></i><strong>Advisor</strong> for RADA</li>
              </ul>
              <li className="mb-1"><i class="fa-solid fa-check text-green-400 mr-2"></i> <strong>Benefits:</strong> $200 worth of tokens (Private sale)</li>
            </ul>
          </div>
        </div>

      </div>
                  
    </div>
  )
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
      <StaticLayout meta={meta} detailStore={detailStore} dataStore={dataStore}>
        <div className="page-section text-center">
          <div className="mt-4">
            <h1 className="text-2xl">403 forbidden</h1>
          </div>
          <Profile />
        </div>
      </StaticLayout>
      
    </>
  )
};

export async function getStaticProps(context) {
  return {
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'navbar']),
      lang : context.locale,
    }
  }
}