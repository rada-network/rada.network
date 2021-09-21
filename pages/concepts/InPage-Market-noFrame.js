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
                  <strong className="text-base font-medium">Axie Infinity Price</strong>
                  <span className="badge badge-coin ml-2">AXS</span>
                </h1>
                {/* Price */}
              </div>
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="badge badge-lg">GameFi</span>
                <span className="badge badge-lg">NFT</span>
                <span className="badge badge-lg">Play to Earn</span>
                <span className="badge badge-lg badge-red">Trending</span>
              </div>
            </div>

            <div className="mt-4 md:ml-7">
              <div className="flex w-full">

                <div className="flex flex-col">
                  <div className="pricing mb-1">
                    <span className="pricing-value">$51.15</span>
                    <span className="pricing-indicator" type="down">
                      <i class="fa-solid fa-caret-down mr-1"></i>
                      9.37%
                    </span>
                  </div>
                  <div className="pricing pricing-sm">
                    <span className="pricing-value opacity-50">0.001241 BTC</span>
                    <span className="pricing-indicator" type="up">
                      <i class="fa-solid fa-caret-up mr-1"></i>
                      3.51%
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
          {/* End: Post Header */}

          {/* Post Content */}
          <div className="w-full mt-4">

            <div className="chart-coinpricing">
              <img src="/images/examples/chart-cmc.png" className="" alt="AXS"/>
            </div>

            <div className="post-content mt-8">

              <h2>About Axie Infinity</h2>

              <p>Axie Infinity is a blockchain-based trading and battling game that is partially owned and operated by its players.</p>

              <p>Inspired by popular games like Pokémon and Tamagotchi, Axie Infinity allows players to collect, breed, raise, battle and trade token-based creatures known as Axies.</p>

              <p>These Axies can take various forms, and there are more than 500 different body parts available, including aquatic, beast, bird, bug, plant and reptile parts. Parts from each type class come in four different rarity scales: common, rare, ultra rare and legendary — and Axies can have any combination of body parts, making them highly variable and often rare and unique.</p>

              <h2>What Axie Infinity does?</h2>

              <p>Each Axie is a non-fungible token (NFT) with different attributes and strengths and can be entered into 3v3 battles, with the winning team earning more experience (exp) points that are used to level up an Axie's stats or evolve their body parts. These Axies can be bred together to produce new and unique offspring, which can be used or sold on the Axie marketplace.</p>

              <p>The Axie Infinity ecosystem also has its own unique governance token, known as Axie Infinity Shards (AXS). These are used to participate in key governance votes and will give holders a say in how funds in the Axie Community Treasury are spent.</p>

              <h2>What Makes Axie Infinity Unique?</h2>

              <p>Each Axie is a non-fungible token (NFT) with different attributes and strengths and can be entered into 3v3 battles, with the winning team earning more experience (exp) points that are used to level up an Axie's stats or evolve their body parts. These Axies can be bred together to produce new and unique offspring, which can be used or sold on the Axie marketplace.</p>

              <p>The Axie Infinity ecosystem also has its own unique governance token, known as Axie Infinity Shards (AXS). These are used to participate in key governance votes and will give holders a say in how funds in the Axie Community Treasury are spent.</p>


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
