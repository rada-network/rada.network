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
                  <img src="/images/coins/axs.png" className="mr-2 h-px-24 w-px-24" alt="AXS Symbol"/>
                </span>
                <h1 className="flex items-center">
                  <strong className="text-lg font-semibold">Axie Infinity</strong>
                  <span className="badge badge-coin ml-2">AXS</span>
                </h1>
                {/* Price */}
              </div>
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="badge badge-lg badge-red">Trending</span>
                <span className="badge badge-lg">GameFi</span>
                <span className="badge badge-lg">NFT</span>
                <span className="badge badge-lg">Play to Earn</span>
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
                    <span className="pricing-value opacity-50">0.001241 BTC</span>
                    <span className="pricing-indicator" type="up">
                      <i class="fa-solid fa-caret-up mr-1"></i>
                      3.51%
                    </span>
                  </div>
                </div>
                {/* END: Pricing */}

                {/* Pricing Info */}
                <div className="flex flex-wrap md:flex-nowrap w-full md:ml-6 md:space-x-2 md:divide-x divide-gray-400 divide-opacity-20">

                  <div className="md:text-center md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">Market Cap</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                        $770.1B
                      </strong>
                    </div>
                  </div>

                  <div className="md:text-center pl-4 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">Volume 24h</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                        $58.8B
                      </strong>
                    </div>
                  </div>
                  
                  <div className="md:text-center pl-4 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs" title="Circulating Supply">C. Supply</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                      18,822,487
                      </strong>
                    </div>
                  </div>  
                  
                  <div className="md:text-center pl-4 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">Total Supply</span>
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
          <div className="w-full mt-6">

            <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-full">
              <h2 className="heading-2 mb-4">
                Axie Infinity Price Chart
              </h2>
              <div className="flex justify-between w-full md:w-auto mb-4">
                <div class="btn-group btn-group-filter w-auto">
                  <a class="btn w-full btn-filter-active">USD</a>
                  <a class="btn w-full btn-filter">BTC</a>
                </div>
                <div class="btn-group btn-group-filter justify-evenly w-2/3 w-auto ml-2">
                  <a class="btn w-full btn-filter">1D</a>
                  <a class="btn w-full btn-filter-active">7D</a>
                  <a class="btn w-full btn-filter">1M</a>
                  <a class="btn w-full btn-filter">3M</a>
                  <a class="btn w-full btn-filter">1Y</a>
                  <a class="btn w-full btn-filter">ALL</a>
                </div>
              </div>
            </div>

            <div className="chart-coinpricing">
              <img src="/images/examples/chart-cmc.png" className="" alt="AXS"/>
            </div>

          </div>


          <div className="w-full mt-4"> 

            <div className="post-content mt-8">

              <h2>Axie Infinity Live Price</h2>

              <p>The live <strong>Axie Infinity price today</strong> is $52,18 USD with a 24-hour trading volume of $294.605.161 USD. We update our AXS to USD price in real-time. Axie Infinity is down 9,16% in the last 24 hours. The current CoinMarketCap ranking is #43, with a live market cap of $3.177.981.900 USD. It has a circulating supply of 60.907.500 AXS coins and a max. supply of 270.000.000 AXS coins.</p>

              <p>If you would like to know where to buy Axie Infinity, the top exchanges for trading in Axie Infinity are currently <a href="#">Binance</a>, <a href="#">Mandala Exchange</a>, <a href="#">Huobi Global</a>, <a href="#">OKEx</a>, and <a href="#">FTX</a>.</p>


            </div>
          </div>
          {/* End: Post Content */}

        </div>

      </div>

    </div>
    </div>

    </>
  )
}

export default Concept
