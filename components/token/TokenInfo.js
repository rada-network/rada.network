import { useEffect,useState } from "react";
import { getTokenById } from "../../data/query/getTokenById";
import { TrendingStore } from "../../lib/store";
import numberFormatter from "../utils/numberFormatter";
import roundNumber from "../utils/roundNumber"
import { useTranslation } from "next-i18next";
import TokenInfoHeader from "./TokenInfoHeader";


const TokenInfo = ({token, tabName})=>{
  const trendingStore = new TrendingStore()
  const [tokenData, setTokenData] = useState({})
  const [usdCoinInfo, setUSDCoinInfo] = useState({})
  const [btcCoinInfo, setBTCCoinInfo] = useState({})
  const {t, i18n} = useTranslation()
  useEffect(() => {
   token?.slug && getTokenById({id : token?.slug, lang: i18n.language}).then(function (res) {
   setTokenData(res.data.tokenById)
   getCoinInfo(res.data.tokenById.symbol)
  })
  }, [token])

  const getCoinInfo =  async (fsym)=>{
    await fetch(`/api/coin-info?fsym=${fsym}&tsym=USD`).then(response => response.json())
    .then(data => setUSDCoinInfo(data.Data));

    await fetch(`/api/coin-info?fsym=${fsym}&tsym=BTC`).then(response => response.json())
    .then(data => setBTCCoinInfo(data.Data));
  }

  return tabName ==='axs'?

  <div className="section section-coininfo--general">

        <div className="grid grid-cols-1">

          {/* Post Header */}
          <div className="flex flex-col">

            <TokenInfoHeader tokenData={tokenData} token={token} />

            <div className="mt-4">
              <div className="flex flex-wrap xl:flex-nowrap items-start w-full">

                {/* Pricing */}
                <div className="flex flex-col flex-shrink-0 flex-0 mb-4">
                  <div className="pricing">
                    <span className="pricing-value">
                      {numberFormatter(usdCoinInfo?.AggregatedData?.PRICE || 0,{
                          style: 'currency',
                          currency: 'USD',
                          notation: 'compact',
                          minimumFractionDigits: 1
                      })}
                    </span>
                    <span className="pricing-indicator" type={usdCoinInfo?.AggregatedData?.CHANGE24HOUR > 0 ?"up":"down"}>
                      <i className={`fa-solid fa-caret-${usdCoinInfo?.AggregatedData?.CHANGE24HOUR > 0 ?"up":"down"} mr-1`}></i>
                      {/* {usdCoinInfo?.AggregatedData?.CHANGE24HOUR < 0 && '-'} */}
                      {roundNumber(Math.abs(usdCoinInfo?.AggregatedData?.CHANGE24HOUR || 0), 6)}%
                    </span>
                  </div>
                  <div className="pricing pricing-sm mt-2">
                    <span className="pricing-value opacity-50">
                      {btcCoinInfo?.AggregatedData?.PRICE} BTC</span>
                    <span className="pricing-indicator" type={usdCoinInfo?.AggregatedData?.CHANGE24HOUR > 0 ?"up":"down"}>
                      <i className={`fa-solid fa-caret-${btcCoinInfo?.AggregatedData?.CHANGE24HOUR > 0 ?"up":"down"} mr-1`}></i>
                      {/* {btcCoinInfo?.AggregatedData?.CHANGE24HOUR < 0 && '-'} */}
                      {roundNumber(Math.abs(btcCoinInfo?.AggregatedData?.CHANGE24HOUR || 0), 6) }%
                    </span>
                  </div>
                </div>
                {/* END: Pricing */}

                {/* Pricing Info */}
                <div className="flex flex-wrap md:flex-nowrap w-full xl:ml-6 md:space-x-2 md:divide-x divide-gray-400 divide-opacity-20">

                  <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs lg:text-xs">Market Cap</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                      {numberFormatter(usdCoinInfo?.AggregatedData?.MKTCAP || 0,{
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact',
                        minimumFractionDigits: 1
                      })}
                      </strong>
                    </div>
                  </div>

                  <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs lg:text-xs">Volume 24h</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                        {numberFormatter(usdCoinInfo?.AggregatedData?.VOLUME24HOUR|| 0,{
                          style: 'currency',
                          currency: 'USD',
                          notation: 'compact',
                          minimumFractionDigits: 1
                        })}
                      </strong>
                    </div>
                  </div>

                  <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs lg:text-xs" title="Circulating Supply">C. Supply</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                      {numberFormatter(usdCoinInfo?.AggregatedData?.CIRCULATINGSUPPLY|| 0,{
                        notation: 'compact',
                        minimumFractionDigits: 1
                      })}
                      </strong>
                    </div>
                  </div>

                  <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs lg:text-xs">Total Supply</span>
                    </div>
                    <div className="mb-2">
                      <strong href="#" className="">
                      {numberFormatter(usdCoinInfo?.AggregatedData?.SUPPLY|| 0,{
                        notation: 'compact',
                        minimumFractionDigits: 1
                      })}
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
                  {tokenData?.link?.find(item => item.group === 'homepage') && 
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Website</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      <a href={tokenData?.link?.find(item => item.group === 'homepage')?.url} className="btn btn-default btn-default-sm" rel="nofollow" target="_blank">
                        <span className="icon">
                          <i class="fa-regular fa-globe"></i>
                        </span>
                        <span className="btn--text">{tokenData?.link?.find(item => item.group === 'homepage')?.url}</span>
                      </a>
                    </div>
                  </div>
                  }
                  {tokenData?.link?.find(item => item.group === 'community') && 
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Community</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      {tokenData?.link?.map(item => item.group === 'community' && (
                      <a key={item.id} href={item.url} className="btn btn-default btn-default-sm" rel="nofollow" target="_blank">
                        <span className="icon">
                          <i class={`fa-brands fa-${item.name.toLowerCase()}`}></i>
                        </span>
                        <span className="btn--text">{item.name}</span>
                      </a>
                      ))}
                    </div>
                  </div>
                  }
                  {tokenData?.link?.find(item => item.group === 'explorers') && 
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Explorer</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      {tokenData?.link?.map((item, index) => item.group === 'explorers' && (
                        <a key={item.id} href={item.url} className="btn btn-default btn-default-sm" rel="nofollow" target="_blank">
                          <span className="btn--text">{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  }
                  {tokenData?.contract_address && 
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full lg:w-auto mb-2">
                      <span className="uppercase opacity-50 text-xs">Contract</span>
                    </div>
                    <div className="space-x-2 mb-2">
                      <a href="#" className="btn btn-default btn-default-sm">
                        <span className="icon">
                          <i class="cf cf-eth"></i>
                        </span>
                        <span className="btn--text">{tokenData?.contract_address}</span>
                        <span className="icon">
                          <i class="fa-regular fa-copy text-2xs"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                  }
                </div>
              </div>
            </div>


          </div>
          {/* End: Post Header */}

          {/* Post Content */}
          <div className="w-full mt-4">
            {tokenData?.cover !== null && <div className="post-media"><img src={tokenData?.cover} alt={tokenData?.name}/></div>}
            {tokenData.token_description?.map((item) =>  <div key={item.id} className="post-content mt-8" dangerouslySetInnerHTML={{__html:item.content}}/>)}
            {tokenData.token_description?.length == 0 && 
            <div className="post-content empty-state text-center py-8 lg:px-8">
              <span class="icon"><i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i></span>
              <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token description',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
              <button class="btn btn-default btn-lg btn-primary">
                <span class="icon"><i class="fa-solid fa-heart"></i></span>
                <span class="btn--text">{t("contribute")}</span>
                </button>
            </div>
            }
          </div>

        </div>

  </div>

  :

  <div className="section section-coininfo--team">

    <div className="grid grid-cols-1">

      {/* Post Header */}
      <div className="flex flex-col">

        <TokenInfoHeader tokenData={tokenData} token={token} />

        <div className="mt-4">
          {/* General Info */}
          <div className="flex flex-wrap lg:justify-evenly lg:flex-nowrap w-full lg:space-x-2 lg:divide-x divide-gray-400 divide-opacity-20">

            <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
              <div className="w-full lg:w-auto">
                <span className="uppercase opacity-50 text-2xs lg:text-xs">
                  {t('Location')}
                </span>
              </div>
              <div className="mb-2">
                <strong className="">
                {tokenData?.team?.location ? tokenData?.team?.location : "N/A"}
                </strong>
              </div>
            </div>

            <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
              <div className="w-full lg:w-auto">
                <span className="uppercase opacity-50 text-2xs lg:text-xs">
                  {t('Founded')}
                </span>
              </div>
              <div className="mb-2">
                <strong className="">
                  {tokenData?.team?.founded ? tokenData?.team?.founded : "N/A"}
                </strong>
              </div>
            </div>

            <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
              <div className="w-full lg:w-auto">
                <span className="uppercase opacity-50 text-2xs lg:text-xs">
                  {t('Employees')}
                </span>
              </div>
              <div className="mb-2">
                <strong className="">
                {tokenData?.team?.employees ? tokenData?.team?.employees : "N/A"}
                </strong>
              </div>
            </div>

            <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
              <div className="w-full lg:w-auto">
                <span
                  className="uppercase opacity-50 text-2xs lg:text-xs"
                  title="Last Funding Type"
                >
                  {t('Last Funding')}
                </span>
              </div>
              <div className="mb-2">
                <strong className="">
                {tokenData?.team?.last_funding ? tokenData?.team?.last_funding : "N/A"}
                </strong>
              </div>
            </div>

            <div className="lg:text-center flex-0 flex-srink-0 lg:w-full">
              <div className="w-full lg:w-auto">
                <span className="uppercase opacity-50 text-2xs lg:text-xs">
                  {t('Headquarter')}
                </span>
              </div>
              <div className="mb-2">
                {tokenData?.team?.headquarter ? 
                <a
                  href={tokenData?.team?.headquarter_url}
                  rel="nofollow"
                  target="_blank"
                >
                  <strong className="">
                  {tokenData?.team?.headquarter}
                  </strong>
                  <span class="icon ml-1 relative -top-0.5"><i class="fa-duotone fa-external-link text-2xs"></i></span>
                </a>
                : "N/A"
                }
              </div>
            </div>

          </div>
          {/* END: General Info */}
        </div>

      </div>
      {/* End: Post Header */}

      {/* Post Content - Team */}
      {(tokenData?.team?.author || token?.partner?.length) ?
      <div>
      <div className="w-full mt-8 lg:mt-16">

      <h2 className="lg:text-center text-xl lg:text-2xl font-semibold">
      {t("Who is building Axie Infinity",{"provider" : tokenData.name})}
      </h2>
      {tokenData?.team?.author ? 
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 mt-8">

        {tokenData?.team?.author?.map(item =>(
          <div key={item.id} className="card card-team">
          <div className="card-media">
            <div className="avatar avatar-3xl">
              <img src={item.image.small} />
            </div>
          </div>
          <div className="card-body">
            <div className="card-body-header">
              <h3 className="">{item.name}</h3>
              <p>{item.position}</p>
            </div>
            {/* <div className="card-body-main">
              <p className="">
                Trung Nguyen is CEO of Sky Mavis. He is an entrepreneur who started 5 years on Wall Street in 2007 and left to create an open source community which grew to over 100,000 members.
              </p>
            </div> */}
          </div>
          <div className="card-body-footer">
            <div className="cta-wrapper about-social">
              <a className="btn" href={item.linkedin} rel="nofollow" target="_blank">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a className="btn" href={item.twitter} rel="nofollow" target="_blank">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a className="btn" href={item.facebook} rel="nofollow" target="_blank">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
        ))}

      </div>
      :
      <div className="w-full mt-4"> 

        <div className="mt-8">

          <div className="post-content empty-state text-center py-8 lg:px-8">
            <span className="icon">
              <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
            </span>
            <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token info',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
            <button className="btn btn-default btn-lg btn-primary">
              <span className="icon">
                <i class="fa-solid fa-heart"></i>
              </span>
              <span className="btn--text">{t("contribute")}</span>
            </button>
          </div>

        </div>
      </div>
      }
      </div>
      
      {/* END: Post Content - Team */}


      {/* Post Content - Partners */}
      <div className="w-full mt-10 lg:mt-16">

        <h2 className="lg:text-center text-xl lg:text-2xl font-semibold">
          {t("Axie Infinity Partners",{"provider" : tokenData.name})}
        </h2>
        {tokenData?.partner?.length ?
        <div className="flex flex-wrap mt-6 list-partners">
          {tokenData?.partner?.map(item => (
            <a key={item.id} href={item.url} className="" rel="nofollow" target="_blank">
            <img src={item.image.small} />
          </a>
          ))}
        </div>
        :
        <div className="w-full mt-4"> 

          <div className="mt-8">

            <div className="post-content empty-state text-center py-8 lg:px-8">
              <span className="icon">
                <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
              </span>
              <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token info',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
              <button className="btn btn-default btn-lg btn-primary">
                <span className="icon">
                  <i class="fa-solid fa-heart"></i>
                </span>
                <span className="btn--text">{t("contribute")}</span>
              </button>
            </div>

          </div>
        </div>
        }

      </div>
      {/* END: Post Content - Partners */}
    </div>
    :
    
    <>
    <div className="w-full mt-4"> 

      <div className="mt-8">

        <div className="post-content empty-state text-center py-8 lg:px-8">
          <span className="icon">
            <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
          </span>
          <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token info',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
          <button className="btn btn-default btn-lg btn-primary">
            <span className="icon">
              <i class="fa-solid fa-heart"></i>
            </span>
            <span className="btn--text">{t("contribute")}</span>
          </button>
        </div>

      </div>
    </div>
    </>
    }

    </div>

</div>

}

export default TokenInfo