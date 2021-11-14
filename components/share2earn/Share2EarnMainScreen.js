import { observer } from "mobx-react";
import React from "react";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';

import { useStore } from "../../lib/useStore";
import { usePageStore } from "@lib/usePageStore";
import { Head } from "../Head";
import SelectBannerType from "../share2earn/listbox-share2earn";
import { getCurrentUser } from "../../data/query/user";

const Share2EarnMainScreen = observer( ({tokenData}) => {
  const { detailStore } = usePageStore();

  // Banner component
  let bannerURL;
  if (detailStore.selectedBanner === "Facebook") {
    bannerURL = tokenData.share_campaign[0].facebook_banner;
  } else if (detailStore.selectedBanner === "Twitter") {
    bannerURL = tokenData.share_campaign[0].twitter_banner;
  } else {
    bannerURL = tokenData.share_campaign[0].linkedin_banner;
  }

  const handleDownload = () => {
    saveAs(bannerURL, detailStore.selectedBanner+".png");
  }

  // Generate share url
  const [user, setUser] = useState({});
  const store = useStore()
  useEffect(() => {
    if (store.user.access_token !== "") {
      getCurrentUser().then((res) => {
        setUser(res);
      });
    }
  }, [store.user.access_token]);

  const uid = user?.id?.split("-")[user?.id?.split("-").length - 1]
  
  
  return (
    <>     
    <Head />

    <div className="pane-content--sec--main grid scrollbar">

      <div className="page page-share2earn fadein">

        <div className="section max-w-screen-sm mx-auto">

          <div className="flex mb-4 items-center">

            <div className="flex w-12 mr-2 mt-1 flex-shrink-0 items-center justify-center">
              <span className="icon text-4xl"><i className="fa-solid fa-check-circle text-green-500"></i></span>
            </div>

            <div>
              <h1 className="">
                <span class="text-xl lg:text-lg font-semibold text-color-title">
                  You have joined successfully 
                </span>
              </h1>
              <div className="flex items-baseline">
                <a href="#" className="link text-sm">View refferal balance</a>
                <span className="icon ml-1 text-2xs"><i className="fa-duotone fa-external-link"></i></span>
              </div>
            </div>

          </div>

          <div className="section-body !pt-0">

            <div className="flex mb-8 items-center">
              <div className="w-12 mr-2 flex-shrink-0">&nbsp;</div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Complete these steps below to get reward from Program. After we review your refferal. reward will be sent to your Approved Wallet.</p>
            </div>


            <ol className="text-sm space-y-8">

              {/* Step 1 */}
              <li className="flex items-start">

                <div className="flex w-12 mr-2 mt-1.5 flex-shrink-0 items-center justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      1
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col w-full">

                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">Create banner</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; use this banner on your social chanels</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">

                      <SelectBannerType />

                      <div className="p-4 pt-0">
                        <div class="aspect-w-16 aspect-h-9">
                        <img class="rounded-lg" src={bannerURL} />
                        </div>
                      </div>

                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <btn class="btn btn-default w-full !py-2"
                          onClick={() => handleDownload()}
                        >
                          <span class="icon"><i class="fa-duotone fa-download text-xs"></i></span>
                          <span class="btn--text">Download</span>
                        </btn>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <strong className="text-base text-color-title">Create Avatar</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; change your avatar on your social chanels</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">

                      <div className="grid gap-4 grid-cols-3 p-4">
                        <div className="flex justify-center">
                          <img className="" src={process.env.NEXT_PUBLIC_CDN + "/placeholders/share2earn-1.png"} alt="" />
                        </div>
                        <div className="flex justify-center">
                          <img className="" src={process.env.NEXT_PUBLIC_CDN + "/placeholders/share2earn-2.png"} alt="" />
                        </div>
                        <div className="flex justify-center">
                          <img className="" src={process.env.NEXT_PUBLIC_CDN + "/placeholders/share2earn-3.png"} alt="" />
                        </div>
                      </div>
                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <btn class="btn btn-default w-full !py-2">
                          <span class="icon"><i class="fa-duotone fa-download text-xs"></i></span>
                          <span class="btn--text">Download</span>
                        </btn>
                      </div>
                    </div>

                  </div>

                </div>

              </li>

              {/* Step 2 */}
              <li className="flex items-start">

                <div className="flex w-12 mr-2 mt-1.5 flex-shrink-0 items-center justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      2
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col">

                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">Share on social media</strong>
                    <span className="text-gray-500 dark:text-gray-400">Copy this post below and share it on Facebook, Twitter or LinkedIn</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="p-4">
                        <p className="mb-4">This game is whole new generation metaverse. Never seen anything like this!
                        I can play and earn so well 💰✨✨</p>
                        <p>👉 &nbsp;Learn more here <a href="#" className="link">{window.location.href + "?ref=" + uid}</a></p>
                      </div>

                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <btn class="btn btn-default  w-full !py-2"
                          onClick={() =>  navigator.clipboard.writeText(window.location.href + "?ref=" + uid)}
                        >
                          <span class="icon"><i class="fa-duotone fa-copy text-xs"></i></span>
                          <span class="btn--text">Copy to clipboard</span>
                        </btn>
                      </div>
                    </div>
                  </div>

                </div>
              </li>
              {/* End step 2 */}

              {/* Step 3 */}
              <li className="flex items-start">

                <div className="flex w-12 mr-2 mt-1.5 flex-shrink-0 items-center justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      3
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">Verify your refferal</strong>
                    <span className="text-gray-500 dark:text-gray-400">Insert your share links in the box below to verify your refferal</span>
                  </div> 
                </div>
              </li>
              
              <li>
                <span>Facebook</span>
                <input className="inline--field border-l-none pr-16" id="facebook-url" type="text"/>
                <button class="btn btn-default">Submit</button>
              </li>
              
              <li>
                <span>Twitter</span>
                <input className="inline--field border-l-none pr-16" id="twitter-url" type="text"/>
                <button class="btn btn-default">Submit</button>
              </li>

              <li>
                <span>LinkedIn</span>
                <input className="inline--field border-l-none pr-16" id="linkedin-url" type="text"/>
                <button class="btn btn-default">Submit</button>
              </li>
              {/* End step 3 */}
            </ol>

          </div>

        </div>

      </div>
   
    </div>

    </>
  )

})

export default Share2EarnMainScreen
  
