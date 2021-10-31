import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import TokenInfo from "../../../components/token/TokenInfo";
import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";
import { BscSvg, UsdtSvg, LaunchSvg } from "../../../components/svg/SvgIcons";

// Cards Concepts
import TokenMeta from "../../../components/cards/concepts/launchpad/TokenMeta";
// import MainActions from "../../../components/cards/concepts/launchpad/MainActions";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";

import { useState, useEffect, createRef } from 'react'

import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";
const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
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
                  <div className="video-container rounded-lg">
                    <iframe src="https://www.youtube.com/embed/aTksaWSW65s" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
                  </div>

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

                    {/* <div className="project-sale-info mb-2.5 mt-5 ml-2.5 mr-5 w-full md:w-2/3 p-5 box">
                      Sale info
                    </div> */}

                    {/* Main Action Card */}
                    <div className="grid grid-cols-1 mt-4">
                      {/* <MainActions /> */}
                    </div>
                    {/* END: Main Action Card */}


                    {/* Main Action Card */}
                    <div className="card--wrapper mt-4">
                      <div className="card--header">
                        <h4 className="mb-2">Invest in this project in 5 minutes following these simple steps</h4>
                      </div>
                      <div className="card--body">
                        <div className="step--wrapper">
                          <div className="step--header flex">
                            <h3>Amount of RIR you want to invest</h3>  
                          </div>           
                          <div className="step--content">
                            <form>
                              <label htmlFor="rir-amount" className="flex inline-field--wrapper relative items-stretch">
                                <div className="w-12 flex items-center bg-gray-100 border border-gray-200 rounded-l dark:border-gray-700 dark:bg-gray-800">
                                  <span className="flex w-5 h-5 m-auto opacity-60">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.14 23.04"><path d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z" fill="#374050" stroke="#9ca2af" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.4" fill-rule="evenodd"/><path d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z" fill="#fff" fill-rule="evenodd"/><path d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z" fill="#fff" fill-rule="evenodd"/><path d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z" fill="#fff" fill-rule="evenodd"/><path d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z" fill="#fff" fill-rule="evenodd"/><path d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z" fill="#fff" fill-rule="evenodd"/><path d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z" fill="#fff" fill-rule="evenodd"/></svg>
                                  </span>
                                </div>
                                <input className="inline--field border-l-none pr-16" id="rir-amount" type="text" />
                                <div className="absolute h-6 flex right-2 top-2">
                                  <button className="mr-1 leading-0 w-6 center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600">
                                    +
                                  </button>
                                  <button className="w-6 leading-0 center bg-gray-200 dark:bg-gray-800">
                                    -
                                  </button>
                                </div>
                              </label>
                            </form>
                          </div>
                        </div>
                        {/* End: Step 1 */}

                        {/* <div className="sep"></div>
                        <div className="step--wrapper">
                          <div className="step--header flex">
                          <span className="step--indicator">2</span>
                            <h3>Your wallet</h3>
                          </div>
                          <div className="step--content">
                            <form>                          
                              <label htmlFor="wallet" className="inline--label">
                                  Your [network_name] wallet address
                              </label>
                              <input id="wallet" className="inline--field" type="text" />                
                              <div className="opacity-70 rounded text-sm p-2 mt-2 form-message text-gray-900 form-message--notice bg-green-400">
                                [token_name] runs on [network_name]. Please make sure that you enter the correct [network_name] wallet address.
                              </div>
                            </form>
                          </div>
                        </div> */}
                        {/* End: Step 3 */}

                        
                      </div>
                      {/* Card body */}

                      <div className="card--footer p-3 lg:p-5  rounded-b-lg">
                        <button className="btn btn-primary py-2 px-3">Submit</button>
                      </div>
                    </div>
                    {/* END: Main Action Card */}

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
