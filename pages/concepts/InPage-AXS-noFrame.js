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
                  <div className="flex flex-wrap space-x-2 mb-4">
                    <span className="badge badge-lg">GameFi</span>
                    <span className="badge badge-lg">NFT</span>
                    <span className="badge badge-lg">Play to Earn</span>
                    <span className="badge badge-lg badge-red">Trending</span>
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

                      <div className="md:text-center md:w-1/2 lg:w-full">
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

                      <div className="md:text-center pl-4 md:w-1/2 lg:w-full">
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

                      <div className="md:text-center pl-4 md:w-1/2 lg:w-full">
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

                      <div className="md:text-center pl-4 md:w-1/2 lg:w-full">
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

                <div className="mt-4">
                  <div className="flex w-full">
                    <div className="text-sm w-full">
                      <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full lg:w-auto mb-2">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Website
                          </span>
                        </div>
                        <div className="space-x-2 mb-2">
                          <a
                            href="https://axieinfinity.com/"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="icon">
                              <i class="fa-regular fa-globe"></i>
                            </span>
                            <span className="btn--text">
                              https://axieinfinity.com/
                            </span>
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full lg:w-auto mb-2">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Community
                          </span>
                        </div>
                        <div className="space-x-2 mb-2">
                          <a
                            href="https://twitter.com/axieinfinity"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="icon">
                              <i class="fa-brands fa-twitter"></i>
                            </span>
                            <span className="btn--text">Twitter</span>
                          </a>
                          <a
                            href="https://t.me/axieinfinity"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="icon">
                              <i class="fa-brands fa-telegram"></i>
                            </span>
                            <span className="btn--text">Telegram</span>
                          </a>
                          <a
                            href="https://discord.com/invite/axie"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="icon">
                              <i class="fa-brands fa-discord"></i>
                            </span>
                            <span className="btn--text">Discord</span>
                          </a>
                          <a
                            href="https://axieinfinity.medium.com/"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="icon">
                              <i class="fa-brands fa-medium"></i>
                            </span>
                            <span className="btn--text">Medium</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full lg:w-auto mb-2">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Explorer
                          </span>
                        </div>
                        <div className="space-x-2 mb-2">
                          <a
                            href="https://etherscan.io/token/0xf5d669627376ebd411e34b98f19c868c8aba5ada"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="btn--text">etherscan</span>
                          </a>
                          <a
                            href="https://ethplorer.io/address/0xf5d669627376ebd411e34b98f19c868c8aba5ada"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="btn--text">ethplorer</span>
                          </a>
                          <a
                            href="https://bscscan.com/token/0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0"
                            className="btn btn-default btn-default-sm"
                            rel="nofollow"
                            target="_blank"
                          >
                            <span className="btn--text">bscscan</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full lg:w-auto mb-2">
                          <span className="uppercase opacity-50 text-2xs md:text-xs">
                            Contract
                          </span>
                        </div>
                        <div className="space-x-2">
                          <a
                            href="#"
                            className="btn btn-default btn-default-sm mb-2"
                          >
                            <span className="icon">
                              <i class="cf cf-eth"></i>
                            </span>
                            <span className="btn--text">
                              0xF5D6696273...8dd940327b28b
                            </span>
                            <span className="icon">
                              <i class="fa-regular fa-copy text-2xs"></i>
                            </span>
                          </a>
                          <a
                            href="#"
                            className="btn btn-default btn-default-sm mb-2"
                          >
                            <span className="icon">
                              <i class="cf cf-bsc"></i>
                            </span>
                            <span className="btn--text">
                              0xF5D6696273...8dd940327b28b
                            </span>
                            <span className="icon">
                              <i class="fa-regular fa-copy text-2xs"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
              {/* End: Post Header */}

              {/* Post Content */}
              <div className="w-full mt-4">
                <div className="post-media">
                  <img
                    src="/images/examples/axs-intro.jpeg"
                    className=""
                    alt="AXS"
                  />
                </div>

                <div className="post-content mt-8">
                  <h2>About Axie Infinity</h2>

                  <p>
                    Axie Infinity is a blockchain-based trading and battling
                    game that is partially owned and operated by its players.
                  </p>

                  <p>
                    Inspired by popular games like Pokémon and Tamagotchi, Axie
                    Infinity allows players to collect, breed, raise, battle and
                    trade token-based creatures known as Axies.
                  </p>

                  <p>
                    These Axies can take various forms, and there are more than
                    500 different body parts available, including aquatic,
                    beast, bird, bug, plant and reptile parts. Parts from each
                    type class come in four different rarity scales: common,
                    rare, ultra rare and legendary — and Axies can have any
                    combination of body parts, making them highly variable and
                    often rare and unique.
                  </p>

                  <h3>What Axie Infinity does?</h3>

                  <p>
                    Each Axie is a non-fungible token (NFT) with different
                    attributes and strengths and can be entered into 3v3
                    battles, with the winning team earning more experience (exp)
                    points that are used to level up an Axie's stats or evolve
                    their body parts. These Axies can be bred together to
                    produce new and unique offspring, which can be used or sold
                    on the Axie marketplace.
                  </p>

                  <p>
                    The Axie Infinity ecosystem also has its own unique
                    governance token, known as Axie Infinity Shards (AXS). These
                    are used to participate in key governance votes and will
                    give holders a say in how funds in the Axie Community
                    Treasury are spent.
                  </p>

                  <h3>What Makes Axie Infinity Unique?</h3>

                  <p>
                    Each Axie is a non-fungible token (NFT) with different
                    attributes and strengths and can be entered into 3v3
                    battles, with the winning team earning more experience (exp)
                    points that are used to level up an Axie's stats or evolve
                    their body parts. These Axies can be bred together to
                    produce new and unique offspring, which can be used or sold
                    on the Axie marketplace.
                  </p>

                  <p>
                    The Axie Infinity ecosystem also has its own unique
                    governance token, known as Axie Infinity Shards (AXS). These
                    are used to participate in key governance votes and will
                    give holders a say in how funds in the Axie Community
                    Treasury are spent.
                  </p>

                  <h2>AXS's Tokenomic</h2>
                  <ul>
                    <li>Staking Reward: 29%.</li>
                    <li>Team: 21%.</li>
                    <li>Play To Earn: 20%.</li>
                    <li>Binance Launchpad Sale: 11%.</li>
                    <li>Ecosystem Fund: 8%.</li>
                    <li>Advisors: 7%.</li>
                    <li>Private Sale: 4%.</li>
                  </ul>

                  <h2>Roadmap</h2>
                  <ul>
                    <li>Q4/2020: Tích hợp Lands và các Items lên Ronin.</li>
                    <li>2021: Launch Axie Infinity Beta.</li>
                  </ul>

                  <h2>Axie Infinity Live Price</h2>

                  <p>
                    The live <strong>Axie Infinity price today</strong> is
                    $52,18 USD with a 24-hour trading volume of $294.605.161
                    USD. We update our AXS to USD price in real-time. Axie
                    Infinity is down 9,16% in the last 24 hours. The current
                    CoinMarketCap ranking is #43, with a live market cap of
                    $3.177.981.900 USD. It has a circulating supply of
                    60.907.500 AXS coins and a max. supply of 270.000.000 AXS
                    coins.
                  </p>

                  <p>
                    If you would like to know where to buy Axie Infinity, the
                    top exchanges for trading in Axie Infinity are currently{" "}
                    <a href="#">Binance</a>, <a href="#">Mandala Exchange</a>,{" "}
                    <a href="#">Huobi Global</a>, <a href="#">OKEx</a>, and{" "}
                    <a href="#">FTX</a>.
                  </p>
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
