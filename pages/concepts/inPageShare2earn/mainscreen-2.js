import { Head } from "../../../components/Head";

import SelectBannerType from "../_components/listboxes/listbox-s2e";
import Toggle from "../_components/toggles/toggle-s2e";

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
                <span className="text-xl lg:text-lg font-semibold text-color-title">
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

                      <div className="p-0 pt-0 border-t border-gray-200 dark:border-gray-700">
                        <div className="">
                          <img className="" src="/placeholders/parallel-cover.jpg" />
                        </div>
                      </div>

                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="btn btn-default w-full !py-2">
                          <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
                          <span className="btn--text">Download</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <strong className="text-base text-color-title">Create Avatar</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; change your avatar on your social chanels</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">

                      <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="text-sm">Image Source</span>
                        </div>
                        <div className="flex flex-srink-0 items-center">
                          {/* <span className="text-sm mr-2">Use your image</span>
                          <Toggle /> */}
                          <div className="btn-group btn-group-toggle text-xs">
                            <a className="btn btn-toggle">
                              <span className="btn--text">Default</span>
                            </a>
                            <a className="btn btn-toggle-active">
                              <span className="btn--text">Your Image</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* <div className="bg-gray-100 dark:bg-deepgray-50 grid gap-4 grid-cols-3 p-4">
                        <div className="flex justify-center">
                          <img className="" src={process.env.NEXT_PUBLIC_CDN + "/placeholders/share2earn-1.png"} alt="" />
                        </div>
                        <div className="flex justify-center">
                          <img className="" src={process.env.NEXT_PUBLIC_CDN + "/placeholders/share2earn-2.png"} alt="" />
                        </div>
                        <div className="flex justify-center">
                          <img className="" src={process.env.NEXT_PUBLIC_CDN + "/placeholders/share2earn-3.png"} alt="" />
                        </div>
                      </div> */}
                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="btn btn-default w-full !py-2">
                          <span className="icon"><i className="fa-duotone fa-upload text-xs"></i></span>
                          <span className="btn--text">Upload your image</span>
                        </button>
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
                        <p>👉 &nbsp;Learn more here <a href="#" className="link">https://rada.network/en/post/widiland-a-dreamy-story-with-real-humane-values/ref=1018</a></p>
                      </div>

                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="btn btn-default  w-full !py-2">
                          <span className="icon"><i className="fa-duotone fa-copy text-xs"></i></span>
                          <span className="btn--text">Copy to clipboard</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </li>

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

                <div className="flex flex-col w-full">

                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">Verify your refferal</strong>
                    <span className="text-gray-500 dark:text-gray-400">Insert your share links in the box below to verify your refferal</span>

                    <div className="mt-4">
                      <form>
                        <div className="mb-4">
                          <label for="fb-post-url" className="sr-only block text-xs font-medium uppercase">Facebook's post link</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Facebook"><span class="icon"><i class="fa-brands fa-facebook-f"></i></span></span>
                            <input type="text" name="fb-post-url" id="fb-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20" placeholder="Facebook's post link" value="https://www.facebook.com/radanetwork.official/"/>
                            <div className="absolute inset-y-0 right-1 flex items-center">
                              <button className="btn btn-primary py-1 px-2 w-16">Submit</button>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label for="twitter-post-url" className="sr-only block text-xs font-medium uppercase">Twitter's post link</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Twitter"><span class="icon"><i class="fa-brands fa-twitter"></i></span></span>
                            <input type="text" name="twitter-post-url" id="twitter-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20" placeholder="https://www.twitter.com/radanetwork.official/" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <button className="btn btn-gray py-1 px-2 w-16 justify-center">Edit</button>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label for="linkedin-post-url" className="sr-only block text-xs font-medium uppercase">Linkedin's post link</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--linkedin"><span class="icon"><i class="fa-brands fa-linkedin-in"></i></span></span>
                            <input type="text" name="linkedin-post-url" id="linkedin-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20" placeholder="Linkedin's post link" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div>
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
