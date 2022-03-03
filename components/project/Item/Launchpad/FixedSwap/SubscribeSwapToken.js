import Timeline from "../AuctionSwap/Timeline";
import { useBUSDContractV2, useERC20, useRIRContract, useFixedSwapContract } from "@utils/hooks/useContracts";
import { useEffect, useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";

import { useFixedSwapInfo, useLaunchpadInfo } from "@utils/hooks/index";
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
import { registerToken } from "@utils/wallet";
import SubscribeSwapTokenLoading from "@components/project/Item/Launchpad/SubscribeSwapTokenLoading";
import PoolDetailCountdown from "../PoolDetailCountdown";
import OpenBox from "@components/project/Item/Launchpad/OpenBox/OpenBox";
import NftList from "@components/project/Item/Launchpad/OpenBox/NftList";

const SubscribeSwapToken = ({ project ,openTime,endTime,currentTime,pool}) => {
  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const { account } = useActiveWeb3React()
  const store = useStore()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { getBscScanURL } = useChainConfig()
  const launchpadContract = useFixedSwapContract(pool)
  const {loading,fixedSwapInfo,fetchPoolInfo} = useFixedSwapInfo({pool})
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [step, setStep] = useState(2)
  const [tokenAddress,setTokenAddress] = useState(ethers.constants.AddressZero)
  const [poolStatus, setPoolStatus] = useState("");
  const boxContract = useERC20(pool.box_contract)

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
        {poolStatus == "open" && <div className="text-sm flex items-center">{t("Close in")}</div>}
        {poolStatus == "coming" && <div className="text-sm flex items-center">{t("Sale start in")}</div>}
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
    try {
      let dataPromise = []
      dataPromise.push(bUSDContract.balanceOf(account))
      dataPromise.push(boxContract.balanceOf(account))
      let data = await Promise.all(dataPromise)
      let busdBalance = data[0];
      let boxBalance = data[1];
      setAccountBalance({
        busdBalance: parseInt(utils.formatUnits(busdBalance,pool.price_decimal)),
        boxBalance: parseInt(utils.formatUnits(boxBalance, 0)),
      })
      console.log({
        busdBalance: parseInt(utils.formatUnits(busdBalance,pool.price_decimal)),
        boxBalance: parseInt(utils.formatUnits(boxBalance, 0)),
      })
    }
    catch(e){
      console.log(e)
      setAccountBalance({
        busdBalance: 0,
        boxBalance: 0,
      })
    }
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
    if (!fixedSwapInfo) return false;
    setTokenAddress(fixedSwapInfo.info.addressItem)
    if (currentTime > endTime) {
      if (fixedSwapInfo.order.total > 0){
        //place order success
        if (pool.is_openbox){
          setStep(3)
        }
        else{
          setStep(31)
        }
      }
      else{
        //pool close
        setStep(32)
      }
    }
    else{
      if (fixedSwapInfo.order.total == 0){
        setStep(2)
      }
      else{
        if (pool.is_openbox){
          setStep(3)
        }
        else{
          setStep(31)
        }
        //place order success
      }
      
    }

    //pool dont set winner
  }, [loading,fixedSwapInfo]);

  useEffect(() => {
    if (step == 2) {
      store.step.update("2");
    } else if (step == 3 ||step == 31 || step == 32 || step == 33 || step == 34 || step == 35) {
      store.step.update("3");
    } else if (step == 4 || step == 41) {
      store.step.update("4");
    }
  }, [step])

  const handleCopy = () => {
    toast.success("Copied to clipboard", {});
  };

  if (loading || loadBalance) {
    return (
      <SubscribeSwapTokenLoading openTime={openTime} currentTime={currentTime} endTime={endTime} />
    )
  }
  if (!fixedSwapInfo){
    return "Error loading swap info"
  }

  return (
    <>
      {step == 2 &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

        {fixedSwapInfo.info.ended ? <PoolDetailCountdown project={project} pool={pool} isEndDate={true} whitelist_date={pool.whitelist_date} title={t("Pool closes in")} /> :
          <PoolDetailCountdown project={project} pool={pool} isEndDate={true} end_date={pool.end_date} title={t("Pool closes in")} />}

          <div className="card-body">
            <div className="flex flex-col">

              {!fixedSwapInfo.info.ended && (
                <>
                  {/* {auctionSwapInfo.order.total > 0 &&
                    <div className="m-4 bg-green-500 text-white px-8 rounded-md p-4">
                      <div>
                        You current bid:
                        <div>
                          {auctionSwapInfo.order.detail.map((item) => {
                            return (
                              <BidInfo pool={pool} bid_index={item.index} bid_value={item.priceEach} quantity={item.quantity}></BidInfo>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-default"
                          onClick={enableAdjust}>
                          {!isEnableAdjust ? t("Adjust your bid") : t("cancel")}
                        </button>
                      </div>
                    </div>
                  } */}

                  <div className="project-card--container no-padding">
                    <div className={"w-full"}>
                      <div className="sr-only relative flex pb-4 justify-center">
                        <h3 className="text-lg font-medium">
                          {t("Purchase")}
                        </h3>
                      </div>
                      <SwapTokensV2 fixedSwapInfo={fixedSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      }
      {step == 3 &&
        <>
        <div className="card-default project-main-actions no-padding overflow-hidden">

          {currentTime > endTime ?
            "" :
            <PoolDetailCountdown project={project} pool={pool} isEndDate={true} end_date={pool.end_date} title={t("Pool closes in")} />
          }

          <div className="card-body">
            <div className="flex flex-col">
              <div className="project-card--container no-padding">
                <div className="w-full">
                  <div className="relative flex flex-col justify-center">
                    <h3 className="text-lg font-medium">
                      {t("Open your cards")}
                    </h3>
                  </div>

                  <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
                    <OpenBox auctionSwapInfo={fixedSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
                  </div>
                  {currentTime < endTime && (fixedSwapInfo.order.total < fixedSwapInfo.info.maxBuyPerAddress) && (fixedSwapInfo.stat.totalSold < parseInt(pool.raise)) &&
                    <div className="mt-4 w-full text-left p-4 bg-yellow-100 dark:bg-gray-700 rounded-lg flex cursor-pointer items-center group" onClick={e => { setStep(2) }} >
                      <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow transition-all">
                        <i className="fa fa-money-bill"></i>
                      </span>
                      <div>
                        <p className="text-lg text-yellow-600 dark:text-yellow-400 font-medium">{t("Purchase more")}</p>
                      </div>
                    </div>
                    }
                </div>
              </div>

            </div>
          </div>
        </div>
        <NftList auctionSwapInfo={fixedSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
        </>
      }
      {(step == 31) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-body no-padding">
            <div className="flex flex-col">

              <div className="project-card--container">
                <div className="max-w-xl mx-auto">
                  <div className="flex">
                    <div className="w-full">

                      <div className="message message--success">
                        <h3 className="message-body--text">
                          <span className="icon mr-2">
                            <i className="fa-solid fa-badge-check"></i>
                          </span>
                          {t("Purchase success")}
                        </h3>
                        <strong className="message-body--info">
                          {fixedSwapInfo.order.total}
                          <span className="ml-1">{pool.token_name}</span>
                        </strong>
                      </div>

                      {currentTime < endTime && (fixedSwapInfo.order.total < fixedSwapInfo.info.maxBuyPerAddress) && (fixedSwapInfo.stat.totalSold < parseInt(pool.raise)) &&
                      <div className="mt-4 w-full text-left p-4 border border-transparent border-opacity-20 bg-yellow-100 hover:bg-yellow-50  hover:border-yellow-400 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-lg flex cursor-pointer items-center group" onClick={e => { setStep(2) }} >
                        <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-700 rounded-full flex-shrink-0 mr-4 shadow transition-all">
                          <i className="fa fa-money-bill"></i>
                        </span>
                        <div>
                          <p className="text-lg text-yellow-600 dark:text-yellow-400 font-medium">{t("Purchase more")}</p>

                          <a href={`#`}  className="group">
                            <span className="text-sm mr-1">
                              {t("Purchase more note",{"orderBusd" : fixedSwapInfo.order.total,"maxBusd" : fixedSwapInfo.info.maxBuyPerAddress})}
                            </span>
                            <span className="icon text-xs relative left-1 group-hover:left-2 transition-all">
                              <i className="fas fa-angle-right"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                      }

                      <div className="mt-4">
                        <div className="px-4 divide-y dark:divide-gray-600 inline-block w-full mx-auto
                            rounded-md border border-gray-200 dark:border-gray-700">
                          <div className="py-4 flex justify-between items-center">
                            <span className="mr-2 opacity-60 w-2/5 uppercase text-xs">
                              {pool.token_name} Contract: 
                            </span>
                            <div className="flex">
                              <div className="mr-2">
                                <a target="_blank" href={getBscScanURL(tokenAddress)}>
                                  {`${tokenAddress.substr(0, 6)}...${tokenAddress.substr(-6)}`}
                                </a>
                              </div>
                              <CopyToClipboard
                                onCopy={handleCopy}
                                text={fixedSwapInfo.info.addressItem}
                              >
                                <button className="btn ml-2">
                                  <i className="fa-duotone fa-copy text-2xs"></i>
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>

                          {/* {!!pool.end_date && 
                          <div  className="py-4 md:flex">
                            <span className="mr-2 opacity-60 w-2/5">{t("Closeat")}</span> 
                            <OpenDate time={pool.end_date} />
                          </div>
                          } */}
                        </div>
                      </div>

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

export default SubscribeSwapToken