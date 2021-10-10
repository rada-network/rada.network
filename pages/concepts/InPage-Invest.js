import { Head } from "../../components/Head";

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

                <div className="mt-4">
                  <div className="flex flex-wrap md:flex-nowrap items-start w-full">
                    {/* Pricing */}
                    <div className="flex flex-col flex-shrink-0 flex-0 mb-4">
                      <div className="pricing">
                        <span className="pricing-value">$51.15</span>
                        <span className="pricing-indicator" type="down">
                          <i class="fa-solid fa-caret-down mr-1"></i>
                          9.37%
                        </span>
                      </div>
                      <div className="pricing pricing-sm mt-2">
                        <span className="pricing-value opacity-50">
                          0.001241 BTC
                        </span>
                        <span className="pricing-indicator" type="up">
                          <i class="fa-solid fa-caret-up mr-1"></i>
                          3.51%
                        </span>
                      </div>
                    </div>
                    {/* END: Pricing */}

                    {/* Pricing Info */}
                    <div className="flex flex-wrap md:flex-nowrap w-full md:ml-6 md:space-x-2 md:divide-x divide-gray-400 divide-opacity-20">

                      <div className="md:text-center pr-4 md:pr-0 md:w-1/2 lg:w-full">
                        <div className="w-full lg:w-auto">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Market Cap
                          </span>
                        </div>
                        <div className="mb-2">
                          <strong href="#" className="">
                            $770.1B
                          </strong>
                        </div>
                      </div>

                      <div className="md:text-center pr-4 md:pr-0 md:w-1/2 lg:w-full">
                        <div className="w-full lg:w-auto">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Volume 24h
                          </span>
                        </div>
                        <div className="mb-2">
                          <strong href="#" className="">
                            $58.8B
                          </strong>
                        </div>
                      </div>

                      <div className="md:text-center pr-4 md:pr-0 md:w-1/2 lg:w-full">
                        <div className="w-full lg:w-auto">
                          <span
                            className="uppercase opacity-50 text-2xs md:text-xs"
                            title="Circulating Supply"
                          >
                            C. Supply
                          </span>
                        </div>
                        <div className="mb-2">
                          <strong href="#" className="">
                            18,822,487
                          </strong>
                        </div>
                      </div>

                      <div className="md:text-center md:w-1/2 lg:w-full">
                        <div className="w-full lg:w-auto">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Total Supply
                          </span>
                        </div>
                        <div className="mb-2">
                          <strong href="#" className="">
                            21,000,000
                          </strong>
                        </div>
                      </div>

                    </div>
                    {/* END: Pricing Info */}
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
                        <span className="uppercase opacity-50 text-2xs md:text-xs">
                          Your allocation
                        </span>
                      </div>
                      <div className="text-lg font-semibold">
                        $US100
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between mb-2">
                      <div className="w-full lg:w-auto">
                        <span className="uppercase opacity-50 text-2xs md:text-xs">
                         Token Generated Events (TGE)
                        </span>
                      </div>
                      <div className="">
                      14 December, 2021
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between mb-2">
                      <div className="w-full lg:w-auto">
                        <span className="uppercase opacity-50 text-2xs md:text-xs">
                         Unlocked at TGE
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
                <h3 className="mt-4 text-gray-400">Invest in this project in 5 minutes following these simple steps</h3>
                <div className="">
                  <div className="steps">
                    <div className="step--wrapper">
                      <div className="step--header flex">
                        <span className="step--indicator"> Step 1</span>
                        <h3>
                        Send <span className="font-semibold dark:text-white"> 100 USDT </span> to RADA&rsquo;s Treasury Wallet
                        </h3>
                      </div>
                      <div className="step--content">
                        <div className="flex flex-wrap justify-between mb-1">
                          <div className="w-full lg:w-auto">
                            <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Wallet Address
                            </span>
                          </div>
                          <div className="">
                            <a href="#" className="btn btn-default btn-default-sm">
                              <span className="btn--text break-all">0x6cdF11996eEd528d69Cd8B56503fDb19EC0B2977</span>
                              <span className="icon">
                                <i class="fa-regular fa-copy text-2xs"></i>
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between mb-1">
                          <div className="w-full lg:w-auto">
                            <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Network
                            </span>
                          </div>
                          <div className="text-sm">
                            BSC <span className="text-gray-500">Binance Smart Chain (BEP20)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End: Step 1 */}

                    <div className="step--wrapper">
                      <div className="step--header flex">
                      <span className="step--indicator"> Step 2</span>
                        <h3>Confirm your transaction</h3>
                      </div>
                      <div className="step--content">
                       
                        <form>
                          <div className="inline-field--wrapper">
                            <label className="inline--label">
                                TXH of the transaction 
                            </label>
                            <input className="inline--field" type="text" />
                          </div>
                          <div className="inline-field--wrapper mt-3">
                            <label className="inline--label">
                                Your wallet address
                            </label>
                            <input className="inline--field" type="text" />
                          </div>
                          <button className="btn mt-3 btn-primary py-2 px-3">Confirm</button>
                        </form>
                      </div>
                    </div>
                    {/* End: Step 1 */}


                  </div>
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
