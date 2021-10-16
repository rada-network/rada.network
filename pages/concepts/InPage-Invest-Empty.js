import { Head } from "../../components/Head";
import ReactTooltip from 'react-tooltip'
function Concept() {
  return (
    <>
      <Head />

      <div className="pane-content--sec--main grid scrollbar">
        {/* NNTH: Remove 'max-w-screen-md mx-auto' on production */}
        <div className="page page-coininfo max-w-screen-md mx-auto">
          <div className="section section-coininfo--general">
            <div className="grid grid-cols-1">

              {/* Post Header */}
              <div className="flex flex-col">
                <div className="flex flex-wrap justify-between items-center w-full">
                  <div className="flex flex-0 flex-shrink-0 mb-4">
                    <span className="icon flex-shrink-0">
                      <img
                        src="/images/coins/axs.png"
                        className="mr-2 h-px-24 w-px-24"
                        alt="AXS Symbol"
                      />
                    </span>
                    <h1 className="flex items-center">
                      <strong className="text-xl font-semibold">
                        Axie Infinity
                      </strong>
                      <span className="badge badge-coin badge-coin-lg ml-2">
                        AXS
                      </span>
                    </h1>
                  </div>
                 
                </div>

            
              </div>
              {/* End: Post Header */}

              {/* Post Content */}
              <div className="w-full mt-4">
                {/* investment meta */}
                <div className="flex w-full">
                  <div className="text-sm w-full">
                    <div className="flex flex-wrap items-end justify-between mb-2">
                      <div className="w-full lg:w-auto">
                        <div className="uppercase opacity-50 text-2xs md:text-xs">
                          Available RIR for this project  <span
                              className="hasTooltip"
                              data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                              data-event="click"
                            > <i className="fa-duotone fa-info-circle text-base" />
                            </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        44/<span className="text-gray-500">50</span>RIR
                        <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.14 23.04"><path d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z" fill="#374050" stroke="#9ca2af" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.4" fill-rule="evenodd"/><path d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z" fill="#9ca2af" fill-rule="evenodd"/><path d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z" fill="#fff" fill-rule="evenodd"/><path d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z" fill="#fff" fill-rule="evenodd"/><path d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z" fill="#fff" fill-rule="evenodd"/><path d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z" fill="#fff" fill-rule="evenodd"/><path d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z" fill="#fff" fill-rule="evenodd"/><path d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z" fill="#fff" fill-rule="evenodd"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mb-2">
                      <div className="w-full lg:w-auto">
                        <span className="uppercase opacity-50 text-2xs md:text-xs">
                         Token Generated Events (TGE)<span
                              className="hasTooltip"
                              data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                              data-event="click"
                            > <i className="fa-duotone fa-info-circle text-base" />
                            </span>
                        </span>
                      </div>
                      <div className="">
                      14 December, 2021
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between mb-2">
                      <div className="w-full lg:w-auto">
                        <span className="uppercase opacity-50 text-2xs md:text-xs">
                         Unlocked at TGE <span
                              className="hasTooltip"
                              data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                              data-event="click"
                            > <i className="fa-duotone fa-info-circle text-base" />
                            </span>
                        </span>
                      </div>
                      <div className="">
                        10% 
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between mb-2">
                      <div className="w-full lg:w-auto">
                        <span className="uppercase opacity-50 text-2xs md:text-xs">
                          Status
                        </span>
                      </div>
                      <div className="label label--active">
                        Open for investment
                      </div>
                      { /*
                      <div className="label label--inactive">
                        Close for investment
                      </div>
                      */}
                    </div>
                  </div>
                </div>
                {/* End: Investment Meta */}
                
                <div className="mt-4 border border-gray-200 dark:border-gray-800 p-3 lg:p-5 rounded">
                    <h3 className="text-lg mb-4">Contribute to invest</h3>
                    <p className="text-gray-800 dark:text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                    consequat.</p>

                    <a href="#" className="btn-primary mt-2 px-3 py-2 rounded ">Contribute</a>
                  
                </div>


                
                
              </div>
              {/* End: Post Content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Concept
