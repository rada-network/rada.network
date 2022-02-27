import { useBUSDContractV2, useERC20, useRIRContract, useFixedSwapContract, useAuctionSwapContract } from "@utils/hooks/useContracts";
import { useEffect, useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";
import { useAuctionSwapInfo } from "@utils/hooks/index";
import SwapTokensV2 from "./SwapTokenV2";
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { toast } from "react-toastify"
import SocialPromote from "../SocialPromote";
import useChainConfig from "utils/web3/useChainConfig"
import useStore from "@lib/useStore";
import OpenDate from "@components/project/Item/Launchpad/OpenDate";
import ProjectCountdown from "./Countdown";
import OpenBox from "@components/project/Item/Launchpad/OpenBox/OpenBox";
import PoolDetailCountdown from "../PoolDetailCountdown";
import BidInfo from "./BidInfo";
import SubscribeSwapTokenLoading from "@components/project/Item/Launchpad/SubscribeSwapTokenLoading";
import NftList from "@components/project/Item/Launchpad/OpenBox/NftList";


const SubscribeSwapToken = ({ project, openTime, endTime, currentTime, pool }) => {
  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const { account } = useActiveWeb3React()
  const store = useStore()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { getBscScanURL } = useChainConfig()
  const launchpadContract = useAuctionSwapContract(pool)
  const { loading, auctionSwapInfo, fetchPoolInfo } = useAuctionSwapInfo({ pool, status: store.devStatus })
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [step, setStep] = useState(2)
  const [tokenAddress, setTokenAddress] = useState(ethers.constants.AddressZero)
  const boxContract = useERC20(pool.box_contract)
  const [isEnableAdjust, setEnableAdjust] = useState(true)

  const reloadAccount = async function () {
    fetchPoolInfo()
    fetchAccountBalance()
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
        busdBalance: parseInt(utils.formatEther(busdBalance)),
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
    
    setLoadBalance(false);
  }
  useEffect(() => {
    if (!!account) {
      fetchAccountBalance();
    }
  }, [account])

  useEffect(() => {
    if (loading || loadBalance || !auctionSwapInfo) return false;
    if (auctionSwapInfo.order.total == 0 ) {
      setEnableAdjust(true)
    }
    setTokenAddress(auctionSwapInfo.info.addressItem)
    console.log(auctionSwapInfo.info.ended)
    if (auctionSwapInfo.info.ended) {
      if (accountBalance.boxBalance > 0) {
        setStep(3)
      } else {
        if (auctionSwapInfo.order.totalWinItem > 0) {
          setStep(2)
        } else {
          if (auctionSwapInfo.order.total > 0) {
            //place order success
            setStep(2)
          } else {
            //pool close
            setStep(2)
          }
        }
      }
    }
    else {
      setStep(2)
    }
  }, [loading, auctionSwapInfo, accountBalance, loadBalance]);

  useEffect(() => {
    if (step == 2) {
      store.step.update("2");
    } else if (step == 3 || step == 31 || step == 32 || step == 33 || step == 34 || step == 35) {
      store.step.update("3");
    } else if (step == 4 || step == 41) {
      store.step.update("4");
    }
  }, [step])

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };

  if (loading || loadBalance || Object.keys(accountBalance).length == 0) {
    return (
      <SubscribeSwapTokenLoading openTime={openTime} currentTime={currentTime} endTime={endTime} />
    )
  }

  if (!auctionSwapInfo){
    return "Failed to get contract"
  }

  const enableAdjust = () => {
    setEnableAdjust(!isEnableAdjust)
  }

  return (
    <>
      {step == 2 &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

        {auctionSwapInfo.info.ended ? <PoolDetailCountdown project={project} pool={pool} isEndDate={true} whitelist_date={pool.whitelist_date} title={t("Pool closes in")} /> :
          <PoolDetailCountdown project={project} pool={pool} isEndDate={true} end_date={pool.end_date} title={t("Pool closes in")} />}

          <div className="card-body">
            <div className="flex flex-col">

              
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
                <div className={isEnableAdjust ? "w-full" : "w-full disabled"}>
                  <div className="relative flex pb-4 justify-center">
                    {!auctionSwapInfo.info.ended && 
                    <h3 className="text-lg font-medium">
                      {auctionSwapInfo.order.totalItem > 0 ? t("Adjust your bid") : t("Place your bid")}
                    </h3>
                    }
                    {auctionSwapInfo.info.ended && 
                    <h3 className="text-lg font-medium">
                      {t("Your bid result")}
                    </h3>
                    }
                    
                  </div>
                  <SwapTokensV2 auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {step == 3 &&
        <>
        <div className="card-default project-main-actions no-padding overflow-hidden">

          {auctionSwapInfo.info.ended ?
            <PoolDetailCountdown project={project} pool={pool} isEndDate={true} whitelist_date={pool.whitelist_date} title={t("Pool closes in")} /> :
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
                    <OpenBox auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <NftList auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool} />
        </>
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