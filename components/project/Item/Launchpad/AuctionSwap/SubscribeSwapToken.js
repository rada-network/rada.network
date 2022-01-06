import Timeline from "./Timeline";
import { useBUSDContractV2, useERC20, useRIRContract, useFixedSwapContract, useAuctionSwapContract } from "@utils/hooks/useContracts";
import { useEffect, useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";

import { useAuctionSwapInfo} from "@utils/hooks/index";
import SwapTokensV2 from "./SwapTokenV2";
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { toast } from "react-toastify"
import SocialPromote from "../SocialPromote";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useChainConfig from "utils/web3/useChainConfig"
import MiniCountdown from "@components/project/List/Countdown";
import useStore from "@lib/useStore"
import OpenDate from "@components/project/Item/Launchpad/OpenDate"
import { CheckSvg } from "@components/svg/SvgIcons"
import { poll } from "@ethersproject/web";


const SubscribeSwapToken = ({ project ,openTime,endTime,currentTime,pool}) => {
  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const { account } = useActiveWeb3React()
  const store = useStore()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { getBscScanURL } = useChainConfig()
  const launchpadContract = useAuctionSwapContract(pool)
  const {loading,auctionSwapInfo,fetchPoolInfo} = useAuctionSwapInfo({pool})
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [step, setStep] = useState(2)
  const [tokenAddress,setTokenAddress] = useState(ethers.constants.AddressZero)
  const [poolStatus, setPoolStatus] = useState("");

  useEffect(() => {
    if (pool.open_date !== null && Date.parse(pool.open_date) < Date.parse(new Date()) && Date.parse(new Date()) < Date.parse(pool.end_date)) {
      setPoolStatus("open")
    }

    if (Date.parse(new Date()) < Date.parse(pool.open_date)) {
      setPoolStatus("coming")
    }
    if (Date.parse(new Date()) > Date.parse(pool.end_date)){
      setPoolStatus("closed")
    }
    if (pool.open_date == null) {
      setPoolStatus("tba")
    }
  }, [])

  const CountdownInPool = function(){
    return (
      <div className={`flex text-base justify-between items-center"`}>
        {poolStatus == "open" && <div className="text-base">{t("Close in")}</div>}
        {poolStatus == "coming" && <div className="text-base">{t("Start in")}</div>}
        {poolStatus == "closed" && <div className="text-base">{t("pool closed")}</div>}
        {poolStatus == "tba" && <div className="text-base">{t("Comming Soon")}</div>}
        {poolStatus == "coming" && <MiniCountdown pool={pool} isEndDate={false} />}
        {poolStatus == "open" && <MiniCountdown pool={pool} isEndDate={true} />}
      </div>
    )
  }

  const reloadAccount = async function(){
    await fetchPoolInfo()
    await fetchAccountBalance()
  }

  const fetchAccountBalance = async function () {
    let busdBalance = await bUSDContract.balanceOf(account);
    setAccountBalance({
      busdBalance: utils.formatEther(busdBalance),
    })
  }
  useEffect(() => {
    if (!!account) {
      fetchAccountBalance().then(function () {
        setLoadBalance(false)
      });
    }
  }, [account])


  useEffect(() => {
    if (loading) return false;
    setTokenAddress(auctionSwapInfo.info.addressItem)
    if (auctionSwapInfo.info.isEnd){
      if (auctionSwapInfo.order.totalWinItem > 0){

      }
      else{
        if (auctionSwapInfo.order.total > 0){
          //place order success
          setStep(31)
        }
        else{
          //pool close
          setStep(32)
        }
      }
    }
    else{
      if (auctionSwapInfo.order.total == 0){
        setStep(2)
      }
      else{
        //place order success
        setStep(31)
      }
      
    }

    //pool dont set winner
  }, [loading,auctionSwapInfo]);

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };

  if (loading || loadBalance) {
    return (
      <SubscribeSwapTokenLoading openTime={openTime} currentTime={currentTime} endTime={endTime} />
    )
  }
  return (
    <>
      {step == 2 &&
        <div className="project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="2" />
              </div>

              <div className="project-card--container">
                <div className="flex flex-col md:grid md:gap-4 md:grid-cols-3">
                  <div className="p-4 md:p-0 order-2 md:order-1">
                    {/* <div className="box-header !px-0">
                      <CountdownInPool />
                    </div> */}
                    {/* <div className="flex relative rounded-md p-4 flex items-center border border-gray-100 dark:border-gray-700 mb-4">
                      
                    </div> */}
                    <ul className="flex-shrink-0 flex-grow">
                     
                      <li className="flex items-center md:block mb-3 pb-3 border-b border-gray-700">
                        <span className="opacity-70 block mb-1">Limit per wallet </span>
                        <span className="ml-auto  text-right md:text-left md:ml-0 block list-value text-lg font-semibold tabular-nums">
                          1-{auctionSwapInfo.info.maxBuyPerAddress} boxes
                        </span>
                      </li>
                      <li className="flex items-center md:block mb-3 pb-3 border-b border-gray-700">
                        <span className="opacity-70 block mb-1">Your bid</span>
                        <span className="ml-auto  text-right md:text-left md:ml-0 block text-lg font-semibold tabular-nums">
                          {auctionSwapInfo.order.total}
                        </span>
                      </li>
                      {/* <li className="list-pair mb-2">
                        <span className="list-key !w-3/4">Your number {pool.token_name}</span>
                        <span className="ml-auto list-value font-semibold tabular-nums">
                          {auctionSwapInfo.order.totalItem}
                        </span>
                      </li> */}
                    
                    </ul>
                    {/* <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
                      <li className="flex mb-2 relative pl-6">
                        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
                          <CheckSvg />  
                        </span>
                        <div className="">Some notice</div>
                      </li>
                    </ul> */}
                  </div>
                  <div className="box box--gray order-1 md:order-2 col-span-2 mt-2 md:mt-0">
                    <div className="box-header relative flex">
                      <h3>
                        Bid
                      </h3>
                      <div className="ml-auto flex !text-sm items-center">
                        <button className="btn btn-default !px-1 mr-2">
                          <span className="w-4 spin-10 h-4 rounded-full border-2 border-gray-300 dark:border-gray-400 border-l-purple-500 dark:border-l-purple-600" />
                        </button>
                        <span className="mr-2 !font-normal">Your position:</span>
                        <div className="ml-auto">
                          <span className="font-semibold">8</span>
                          <span className="opacity-50">/215</span>
                        </div>
                      </div>
                    </div>
                    <SwapTokensV2 auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {(step == 31) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-body no-padding">
            <div className="flex flex-col">

              <div className="">
                <Timeline step="3" />
              </div>

              <div className="project-card--container">
                <div className="max-w-xl mx-auto">
                  <div className="flex">
                    <div className="w-full">
                      <h3 className="text-lg md:text-xl border-2 p-4 rounded-lg bg-green-500 bg-opacity-5 border-green-500 mb-4 text-green-500 text-center text-semibold">
                        <span className="icon mr-2">
                          <i className="fa-duotone fa-badge-check"></i>
                        </span>
                        Place Bid success : {auctionSwapInfo.order.totalItem} {pool.token_name}
                      </h3>
                      <div className="mt-4">
                        <div className="inline-block w-full mx-auto text-center 
                            rounded-lg mb-4
                            border border-gray-200 dark:border-gray-700"
                        >
                          {!!pool.end_date && 
                          <div  className="py-1 px-4">
                            <span className="mr-2 opacity-70">{t("Closeat")}</span> 
                            <OpenDate time={pool.end_date} />
                          </div>
                          }
                          {!!pool.whitelist_date && 
                          <div  className="py-1 px-4">
                            <span className="mr-2 opacity-70">{t("Announcement")}</span> 
                            <OpenDate time={pool.whitelist_date} />
                          </div>
                          }
                        </div>
                      </div>

                      {!auctionSwapInfo.info.isEnd &&
                      <div className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex cursor-pointer items-center group" onClick={e => { setStep(2) }} >
                        <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow transition-all">
                          <i className="fa fa-money-bill"></i>
                        </span>
                        <div>
                          <p className="mb-1 text-lg text-yellow-600 dark:text-yellow-400">{t("Adjust bid")}</p>

                          <a href={`#`}  className="group">
                            <span className="text-sm mr-1">{t("adjust note",{"orderBusd" : auctionSwapInfo.order.totalItem,"maxBusd" : auctionSwapInfo.info.maxBuyPerAddress})}</span>
                            <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
                          </a>
                        </div>
                      </div>
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {step == 32 &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="3" />
              </div>
              <div className="project-card--container">
                <div className="max-w-xl mx-auto">
                  <div className="p-4 md:p-8 rounded-lg border border-yellow-300 dark:border-gray-700">
                    <h3 className="text-lg text-center text-yellow-500 md:text-xl mb-4  text-semibold">
                      <span className="icon mr-2">
                        <i class="fas fa-exclamation-triangle"></i>
                      </span>
                      {t("pool closed")}
                    </h3>
                  </div>
                  <SocialPromote />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

const SubscribeSwapTokenLoading = function({currentTime,opendTime,endTime}){
  return (
    <div className="card-default project-main-actions no-padding overflow-hidden">

      <div className="card-body no-padding">
        <div className="flex flex-col">
          <div className="">
            {currentTime > endTime ?
            <Timeline step="3" />
            :
            <Timeline step="2" />
            }

          </div>

          <div className="project-card--container">
            <div className="max-w-2xl mx-auto text-center">

              <div className="flex items-center">
                <div className="mx-auto">
                  <p className="relative mb-4 "><span className="spinner left-0 top-0"></span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

const TokenSocialPromote = function({project}){
  const {t,i18n} = useTranslation("launchpad")
  return (
    <ul className="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <li  className="relative pl-6  mb-2">
        <span className="absolute left-0 top-0 mr-2">
          <i className="fa-duotone fa-circle-small opacity-60 mx-auto" />
        </span>
        <p className="" dangerouslySetInnerHTML={{__html : t("status note")}} >
        </p>
      </li>
      <li className="relative pl-6 mb-2">
        <span className="absolute left-0 top-0 mr-2">
          <i className="fa-duotone fa-circle-small opacity-60 mx-auto" />
        </span>
          <p className="" dangerouslySetInnerHTML={{__html : t("coming soon note",
          {
            twitter : `<a class="link" target="_blank" rel="nofollow" href="https://twitter.com/rada_network">@rada_network</a>`,
            radanetwork : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radanetwork">Telegram channel</a>`,
            radadao : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radadao">Telegram Community</a>`
          }
          )}} />
      </li>
      <li className="relative pl-6  mb-2">
        <span className="absolute left-0 top-0  mr-2">
          <i className="fa-duotone fa-circle-small opacity-60 mx-auto" />
        </span>
          <p className="" dangerouslySetInnerHTML={{__html : t("status note 2",
            {
              token : project.token.name,
              research : `<a class="link" target="_blank" rel="nofollow" href="/${i18n.language}/launchverse/${project.slug}/research">Research</a>`
            }
          )}} />
      </li>

    </ul>
  )
}

const NotInWhitesist = function(){
  const {t} = useTranslation("launchpad")
  return (
    <div className="card-default project-main-actions no-padding overflow-hidden">

      <div className="card-body no-padding">
        <div className="flex flex-col">
          <div className="">
            <Timeline step="3" />
          </div>

          <div className="project-card--container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center mx-auto text-lg md:text-xl">
                <span className="mr-2"><i class="fad fa-calendar-times"></i></span>
                <span className="">{t("Not allow")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeSwapToken