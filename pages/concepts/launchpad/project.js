import { Head } from "../../../components/Head";
import { Topbar } from "../../../components/Topbar";
import { Navbar } from "../../../components/Navbar";
import TokenInfo from "../../../components/token/TokenInfo";
import { ProjectsList } from "../../../components/card-layouts/concepts/launchpad/ProjectsList";
import {PostsListWrapper} from "../../../components/card-layouts/PostsList";

// Cards Concepts
import TokenMeta from "../../../components/cards/concepts/launchpad/TokenMeta";
import MainActions from "./MainActions";

import ThemeSwitch from "../../../components/ThemeSwitch"
import Profile from "../../../components/Profile";

import {LanguageSwitch} from "../../../components/LanguageSwitch";
import Screen from "../../../components/utils/Responsive";
import { observer } from "mobx-react";
import { usePageStore } from "../../../lib/usePageStore";

import { useRef,useEffect } from "react";
import BackgroundWrapper from "../../../components/card-layouts/concepts/launchpad/BackgroundWrapper";

const Layout = observer((props) => {

  const {dataStore,detailStore,voteStore} = usePageStore()
  dataStore.type = "projects"
  dataStore.lang = props.lang
  const meta = {'title' : "Project X"}

  return (
    <>
      <Head meta={meta} />

      <BackgroundWrapper />

      <div className={`main-layout--wrapper`}>
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

              <div className="page page-full page-project-details scrollbar">
                <div className="w-limiter-lg">

                  <div className="section">
                    
                    <div className="section-header">
                      
                      <div className="post-title">
                        <h1 className="post-title--text">
                          <a
                            href="projects"
                            className="inline-flex text-md mr-2 opacity-70 hover:opacity-100 items-center mb-4 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 "
                          >
                            <span className="w-4 h-4">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>arrow-left</title>
                                <path
                                  fill="currentColor"
                                  d="M22.548,10.561H5.437a.251.251,0,0,1-.165-.438l8.637-7.6a1.44,1.44,0,0,0-1.9-2.162L.828,10.2a2.4,2.4,0,0,0,0,3.6l11.179,9.837a1.44,1.44,0,0,0,1.9-2.161l-8.637-7.6a.251.251,0,0,1,.165-.438H22.548a1.44,1.44,0,0,0,0-2.879Z"
                                />
                              </svg>
                            </span>
                          </a>
                          Project Title</h1>
                        <div className="text-sm mt-4">
                          Nullam quis risus eget urna mollis ornare vel eu leo.  
                        </div>
                        <div className="text-sm mt-1">
                          Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris 
                        </div>
                      </div>
                      <div className="ml-auto mt-4">
                        <div className="label private">Private</div>
                      </div>
                    </div>

                    <div className="section-body">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="box project-brief">
                          <div className="box-header">
                            <h3>Information</h3>
                          </div>
                          <div className="box-body">
                          <ul className="mb-0 mt-auto pt-2 border-t border-gray-200 dark:border-gray-900">   
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
                                <span className="flex flex-col ml-auto list-value font-semibold">
                                  <span>0.001 RIR </span>
                                  <span>0.1 USDT </span>
                                </span>
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
                            <div className="progress-bar mt-5 bg-gray-300 dark:bg-gray-700 w-full h-3 rounded-lg">
                                <div className="progress-bar--percentage h-3 bg-green-600 rounded-lg" style={{width: "70%"}}></div>
                            </div>
                          </div>
                        </div>
                        {/* end of project-brief */}

                        <div className="box project-process">
                          <div className="box-header">
                            <h3>Requirements</h3>
                          </div>
                          <div className="box-body">
                            <p className="flex justify-between items-center my-2">
                              <span>
                                <span className="icon text-base mr-2 text-green-500"><i class="fas fa-check-circle"></i></span>
                                Connect your Wallet
                              </span>
                            </p>
                            <p className="flex justify-between items-center my-2">
                              <span>
                                <span className="icon text-base mr-2 text-red-500"><i class="fas fa-times-circle"></i></span>
                                KYC
                              </span>
                              <a className="btn btn-default w-24">KYC Now</a>
                            </p>
                            <p className="flex justify-between items-center my-2">
                              <span>
                                <span className="icon text-base mr-2 text-red-500"><i class="fas fa-check-circle"></i></span>
                                Have a minimum <strong>5 RIR</strong>
                              </span>
                              <a className="btn btn-default w-24">Earn RIR</a>
                            </p>
                            <p className="my-1">
                              <span>
                                <span className="icon text-base mr-2 text-red-500"><i class="fas fa-times-circle"></i></span>
                                Requirement 4
                              </span>
                            </p>
                            <p className="flex justify-between items-center my-2">
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
                        <MainActions />
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

                      {/* Project Info */}
                      <div className="box mt-4">
                        <TokenInfo tokenId={`THC`} />
                      </div>
                      {/* END: Project Info */}

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
