import { Head } from "../../../components/Head";

import SelectBannerType from "../../../components/concepts/listboxes/listbox-share2earn";

function Concept() {
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

                <div className="flex w-12 mr-2 mt-1 flex-shrink-0 items-center justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      1
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col">

                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">Create banner</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; use this banner on your social chanels</span>

                    <div>
                      <SelectBannerType />
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <strong className="text-color-title">Create Avatar</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; use this banner on your social chanels</span>

                    <div>
                      Avatar
                    </div>
                  </div>

                </div>

              </li>

              {/* Step 2 */}
              <li className="flex items-start">

                <div className="flex w-12 mr-2 mt-1 flex-shrink-0 items-center justify-center">
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

                    <div className="text-base mt-4 bg-gray-50 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="p-4">
                        <p className="mb-4">This game is whole new generation metaverse. Never seen anything like this!
                        I can play and earn so well 💰✨✨</p>
                        <p>👉 &nbsp;Learn more here <a href="#" className="link">https://rada.network/en/post/widiland-a-dreamy-story-with-real-humane-values/ref=1018</a></p>
                      </div>

                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-600">
                        <btn class="btn btn-default">
                          <span class="icon"><i class="fa-duotone fa-copy text-xs"></i></span>
                          <span class="btn--text">Copy to clipboard</span>
                        </btn>
                      </div>
                    </div>
                  </div>

                </div>

              </li>

              {/* Step 3 */}
              <li className="flex items-start">

                <div className="flex w-12 mr-2 mt-1 flex-shrink-0 items-center justify-center">
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

                    <div>
                      <form className="mt-4">

                      </form>
                    </div>
                  </div>

                </div>

              </li>

            </ol>

          </div>

        </div>

      </div>
   
    </div>

    </>
  )
}

export default Concept
