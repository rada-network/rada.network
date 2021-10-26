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
                        <div className="field-label">
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
                        <span className="field-label">
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
                        <span className="field-label">
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
                        <span className="field-label">
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
                
                <div className="card--wrapper mt-4">
                  <h3 className="text-gray-400 card--header">Contribute to invest</h3>
                  <div className="card--body p-3 lg:p-5 flex">
                    <div className="flex mt-2 mr-3 w-12 h-12 p-2.5 mb-2 border-4 border-purple-200 bg-purple-300 text-purple-500 dark:bg-purple-400 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path fill="currentColor" d="M23.146,5.4,20.354,2.6a.5.5,0,0,0-.708,0L7.854,14.4a.5.5,0,0,1-.708,0L4.354,11.6a.5.5,0,0,0-.708,0L.854,14.4a.5.5,0,0,0,0,.707L7.146,21.4a.5.5,0,0,0,.708,0L23.146,6.1A.5.5,0,0,0,23.146,5.4Z"/></svg>
                    </div>
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>                  
                  </div>
                  {/* Card body */} 
                  <div className="card--footer p-3 lg:p-5">
                    <a className="btn btn-primary px-3 py-2">
                      How to invest?
                    </a>
                  </div>
                </div>
                

                <div className="card--wrapper mt-4">
                  <h3 className="text-gray-400 card--header">Dự án sẽ được mở trong 2 ngày nữa</h3>
                  <div className="card--body p-3 lg:p-5 flex">
                    <div className="flex mt-2 mr-3 w-12 h-12 p-2 mb-2 border-4 border-purple-200 bg-purple-300 text-purple-500 dark:bg-purple-300 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>hourglass-alternate</title><path fill='currentColor' d="M20.5,22h-1V18.5A7.505,7.505,0,0,0,15.739,12,7.5,7.5,0,0,0,19.5,5.5V2h1a1,1,0,0,0,0-2H3.5a1,1,0,0,0,0,2h1V5.5A7.5,7.5,0,0,0,8.261,12,7.505,7.505,0,0,0,4.5,18.5V22h-1a1,1,0,0,0,0,2h17a1,1,0,0,0,0-2Zm-14-3.5a5.507,5.507,0,0,1,6.051-5.473A5.668,5.668,0,0,1,17.5,18.747V21.5a.5.5,0,0,1-.5.5H7a.5.5,0,0,1-.5-.5ZM7,2H17a.5.5,0,0,1,.5.5V5.256a5.667,5.667,0,0,1-4.949,5.718A5.506,5.506,0,0,1,6.5,5.5v-3A.5.5,0,0,1,7,2Z"/><path fill='currentColor' d="M12,9.626a4.042,4.042,0,0,0,3.433-2.165A.5.5,0,0,0,15,6.71H9a.5.5,0,0,0-.433.751A4.042,4.042,0,0,0,12,9.626Z"/><path fill='currentColor'  d="M12.748,15.59a1.035,1.035,0,0,0-1.5,0L7.925,19.337A1,1,0,0,0,8.671,21h6.658a1,1,0,0,0,.747-1.664Z"/></svg>
                    </div>
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>                  
                  </div>
                  {/* Card body */} 
                  
                </div>


                <div className="card--wrapper mt-4">
                  <h3 className="text-gray-400 card--header">Dự án đã hết hạn đầu tư</h3>
                  <div className="card--body p-3 lg:p-5 flex">
                    <div className="flex mt-2 mr-3 w-12 h-12 p-2 mb-2 border-4 border-yellow-100 bg-yellow-300 text-yellow-600 dark:bg-yellow-300 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>time-clock-file-warning</title><path fill="currentColor" d="M23.362,3.053,20.947.638A1.749,1.749,0,0,0,19.71.126H8.124a1.75,1.75,0,0,0-1.75,1.75v7.8a.245.245,0,0,0,.222.248,7.37,7.37,0,0,1,.963.152.249.249,0,0,0,.315-.24V1.876a.251.251,0,0,1,.25-.25H19.71l.177.073L22.3,4.113a.249.249,0,0,1,.073.177V18.376a.251.251,0,0,1-.25.25h-8.9c-.134,0-.151.133-.1.232l.6,1.134a.251.251,0,0,0,.222.134h8.187a1.75,1.75,0,0,0,1.75-1.75V4.29A1.749,1.749,0,0,0,23.362,3.053Z"/><path fill="currentColor" d="M7.905,12.147a1.449,1.449,0,0,0-2.561,0L.289,21.781a1.426,1.426,0,0,0,.047,1.408,1.454,1.454,0,0,0,1.233.687H11.68a1.456,1.456,0,0,0,1.233-.686,1.428,1.428,0,0,0,.047-1.409ZM5.874,15.876a.75.75,0,0,1,1.5,0v3a.75.75,0,0,1-1.5,0Zm.75,6.25a1,1,0,1,1,1-1A1,1,0,0,1,6.624,22.126Z"/><path fill="currentColor" d="M20.374,8.376a4.75,4.75,0,1,0-4.75,4.75A4.755,4.755,0,0,0,20.374,8.376Zm-8,0a3.25,3.25,0,1,1,3.25,3.25A3.254,3.254,0,0,1,12.374,8.376Z"/><path fill="currentColor" d="M17.392,9.126a.75.75,0,1,0,0-1.5h-.766a.252.252,0,0,1-.252-.252V6.608a.75.75,0,0,0-1.5,0V8.376a.75.75,0,0,0,.75.75Z"/></svg>
                    </div>
                    <p className="text-sm">Dự án đã hết hạn đầu tư. Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>                  
                  </div>
                  {/* Card body */} 
                  
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
