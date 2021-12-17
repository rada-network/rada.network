import { Head } from "../../../components/Head";
import RadaSvg from "../../../components/svg/rada";
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

            <div className="flex w-12 md:mr-2 mt-1 flex-shrink-0 md:items-center md:justify-center">
              <span className="icon text-4xl"><i className="fa-solid fa-check-circle text-green-500"></i></span>
            </div>

            <div className="w-full">
              <h1 className="">
                <span className="text-xl lg:text-lg font-semibold text-color-title">
                  Welcome to The Parallel #Share2Earn event.
                </span>
              </h1>
              <div className="px-4 py-2 border border-gray-800 w-full mt-4 rounded-lg">
                Please complete all following steps to earn RIR.
              </div>
            </div>

          </div>

          <div className="section-body !pt-0">

            <div className="mb-8 items-center text-base mt-4 bg-gray-50 
            dark:bg-gray-900 dark:bg-border-800 border border-gray-200 dark:border-gray-700 rounded-lg md:ml-14">
              <div className="p-4  border-b border-gray-200 dark:border-gray-700">
                Your Share2Earn status
              </div>
              <div className="p-4">
                <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">   
                  <li className="list-pair mb-2">
                    <div className="list-key">
                      RIR Contract
                      <span
                        className="hasTooltip"
                        data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                        data-event="click"
                      > <i className="fa-duotone fa-info-circle text-base" />
                      </span> 
                    </div>
                    <div className="px-2 py-1 rounded flex bg-gray-100 dark:bg-gray-800 ml-auto list-value hover:bg-gray-200 hover:dark:bg-gray-900">
                      <div>53x6y4...12f5</div>
                      <button className="btn ml-2">
                        <i className="fa-duotone fa-copy text-xs"></i>
                      </button>
                    </div>
                  </li>
                  <li className="list-pair mb-2">
                    <div className="list-key">
                      Tier 1
                      <span
                        className="hasTooltip"
                        data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                        data-event="click"
                      > <i className="fa-duotone fa-info-circle text-base" />
                      </span> 
                    </div>
                    <div className="ml-auto flex items-center list-value font-semibold">
                     3
                    </div>
                  </li>
                  <li className="list-pair mb-2">
                    <div className="list-key">
                     Tier 2
                     <span
                        className="hasTooltip"
                        data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                        data-event="click"
                      > <i className="fa-duotone fa-info-circle text-base" />
                      </span> 
                    </div>
                    <span className="ml-auto font-semibold">5</span>
                  </li>
                  <li className="list-pair mb-2">
                    <div className="list-key">
                      Earned
                      <span
                        className="hasTooltip"
                        data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                        data-event="click"
                      > <i className="fa-duotone fa-info-circle text-base" />
                      </span> 
                    </div>
                    <div className="ml-auto flex items-center font-semibold">
                      <span className="icon w-Name4 h-4 mr-1">
                        <RadaSvg />
                      </span>
                      1 RIR
                    </div>
                  </li>
                  <li className="list-pair mb-2">
                    <div className="list-key">
                      Your ranking
                      <span
                        className="hasTooltip"
                        data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                        data-event="click"
                      > <i className="fa-duotone fa-info-circle text-base" />
                      </span> 
                    </div>
                    <div className="ml-auto flex items-center font-semibold"> 
                      <div>45<span className="font-normal opacity-70">/850</span></div>
                      <button className="!text-xs btn btn-default ml-2">
                        Leaderboard
                      </button>
                    </div>
                  </li>
                </ul>
              </div>

              
          </div>


            <ol className="text-sm space-y-8">

              {/* Step 1 */}
              <li className="flex flex-col md:flex-row items-start">

                <div className="flex w-12 mb-2 md:mb-0 mr-2 mt-1.5 flex-shrink-0 md:items-center md:justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      1
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">Create Avatar</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; change your avatar on your social chanels</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">

                      <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="text-sm">Image Source</span>
                        </div>
                        <div className="flex flex-srink-0 items-center">
                          {/* <span className="text-sm mr-2">Use your image</span>
                          <Toggle /> */}
                          <div className="btn-group btn-group-toggle text-xs">
                            <a className="btn btn-toggle-active">
                              <span className="btn--text">Default</span>
                            </a>
                            <a className="btn btn-toggle">
                              <span className="btn--text">Your Image</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-deepgray-50 grid gap-4 grid-cols-3 p-4">
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
                        <button className="btn btn-default w-full !py-2">
                          <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
                          <span className="btn--text">Download</span>
                        </button>
                       
                      </div>
                      
                    </div>

                  </div>

                  <div className="flex flex-col mt-4">
                    <strong className="text-base text-color-title">Create banner</strong>
                    <span className="text-gray-500 dark:text-gray-400">Download &amp; use this banner on your social chanels</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">

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

                        <div className="link-wrapper flex mt-2 text-xs">
                          <a className="ml-auto px-4" href="" >
                            <i className="fa-duotone fa-eye text-xs mr-1"></i>
                            View Samples
                          </a>
                          <a className="mr-auto px-4" href="https://drive.google.com/drive/folders/1ax-AW2LXtZ9UkBjGNEAlPYzlDGsd24v8?usp=sharing">
                            <i className="fa-duotone fa-images text-xs mr-2"></i>
                          More Images</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  

                </div>

              </li>

              {/* Step 2 */}
              <li className="flex flex-col md:flex-row items-start">

                <div className="flex w-12 mb-2 md:mb-0 mr-2 mt-1.5 flex-shrink-0 md:items-center md:justify-center">
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

                      <div className="grid grid-cols-2 gap-4 py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <a className="btn btn-default !py-2">
                          <span className="icon"><i className="fa-duotone fa-refresh text-xs"></i></span>
                          <span className="btn--text">Randomize</span>
                        </a>
                        <a className="btn btn-default !py-2" href="" target="_blank">
                          <span className="icon"><i className="fa-duotone fa-copy text-xs"></i></span>
                          <span className="btn--text">Copy link</span>
                        </a>

                       
                      </div>

                    </div>
                  </div>

                </div>

              </li>

              {/* Step 3 */}
              <li className="flex flex-col md:flex-row items-start">

                <div className="flex w-12 mb-2 md:mb-0 mr-2 mt-1.5 flex-shrink-0 md:items-center md:justify-center">
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
                            <span className="absolute top-2 left-3 flex justify-center iNametems-center w-px-24 h-px-24 rounded-full mr-4 brand--Facebook"><span className="icon"><i className="fa-brands fa-facebook-f"></i></Namespan></span>
                            <input type="text" name="fb-post-url" id="fb-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20" placeholder="Facebook's post link" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label for="twitter-post-url" className="sr-only block text-xs font-medium uppercase">Twitter's post link</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span className="absolute top-2 left-3 flex justify-center iNametems-center w-px-24 h-px-24 rounded-full mr-4 brand--Twitter"><span className="icon"><i className="fa-brands fa-twitter"></i></Namespan></span>
                            <input type="text" name="twitter-post-url" id="twitter-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20" placeholder="Twitter's post link" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label for="linkedin-post-url" className="sr-only block text-xs font-medium uppercase">Linkedin's post link</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span className="absolute top-2 left-3 flex justify-center iNametems-center w-px-24 h-px-24 rounded-full mr-4 brand--linkedin"><span className="icon"><i className="fa-brands fa-linkedin-in"></i></Namespan></span>
                            <input type="text" name="linkedin-post-url" id="linkedin-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20" placeholder="Linkedin's post link" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div>

                        
                      </form>
                    </div>
                    <div className="mb-4">
                      <p>
                        To avoid exploitation, we will manually approve RIR earning by checking your links submission, please make sure all links are <strong>public</strong>.</p>
                      <p className="pt-4">Any further question? Ask in our <a className="text-purple-400" href="t.me/radadao">Telegram</a></p>
                    </div>
                  </div>

                </div>
                  
              </li>

            </ol>
            <div className="lg:pl-14">
              <button className="w-full mt-4 btn btn-yellow justify-center py-3 px-4" type="submit">Save</button>                   
              </div>
        </div>

          </div>
         

      </div>
   
    </div>

    </>
  )
}

export default Concept
