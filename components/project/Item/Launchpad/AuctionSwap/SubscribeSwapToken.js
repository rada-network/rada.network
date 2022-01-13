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
import OpenBox from "./openbox/OpenBox";
import PoolDetailCountdown from "../PoolDetailCountdown";


const SubscribeSwapToken = ({ project, openTime, endTime, currentTime, pool }) => {
  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const { account } = useActiveWeb3React()
  const store = useStore()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { getBscScanURL } = useChainConfig()
  const launchpadContract = useAuctionSwapContract(pool)
  const { loading, auctionSwapInfo, fetchPoolInfo } = useAuctionSwapInfo({ pool,status : store.devStatus})
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [step, setStep] = useState(2)
  const [tokenAddress, setTokenAddress] = useState(ethers.constants.AddressZero)
  const boxContract = useERC20(pool.box_contract)

  const reloadAccount = async function () {
    await fetchPoolInfo()
    await fetchAccountBalance()
  }

  const fetchAccountBalance = async function () {
    let busdBalance = await bUSDContract.balanceOf(account);
    let boxBalance = await boxContract.balanceOf(account);
    setAccountBalance({
      busdBalance: parseInt(utils.formatEther(busdBalance)),
      boxBalance: parseInt(utils.formatUnits(boxBalance,0)),
    })
    setLoadBalance(false);
  }
  useEffect(() => {
    if (!!account) {
      fetchAccountBalance();
    }
  }, [account])

  useEffect(() => {
    if (loading || loadBalance) return false;
    setTokenAddress(auctionSwapInfo.info.addressItem)
    if (auctionSwapInfo.info.ended) {
      if (accountBalance.boxBalance > 0){
        setStep(3)
      }
      else{
        if (auctionSwapInfo.order.totalWinItem > 0) {
          setStep(2)
        }
        else {
          if (auctionSwapInfo.order.total > 0) {
            //place order success
            setStep(2)
          }
          else {
            //pool close
            setStep(2)
          }
        }
      }
      
    }
    else {
      setStep(2)
    }
  }, [loading, auctionSwapInfo,accountBalance, loadBalance]);

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

  return (
    <>
      {step == 2 &&
        <div className="project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding card card-default">
            <div className="flex flex-col">
              

              {auctionSwapInfo.info.ended ? <PoolDetailCountdown project={project} pool={pool} isEndDate={true} whitelist_date={pool.whitelist_date} title={t("Pool closes in")}/> : 
              <PoolDetailCountdown project={project} pool={pool} isEndDate={true} end_date={pool.end_date} title={t("Pool closes in")}/>}

              <div className="project-card--container !p-0 mt-4">
                <div className="flex">
                  <div className="w-full">
                    <div className="box-header relative flex !border-opacity-50">
                      <h3 className="mb-2 font-medium">
                        Bid
                      </h3>
                    </div>
                    <SwapTokensV2 auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool}/>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      }
      {step == 3 &&
        <div className="project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding card card-default">
            <div className="flex flex-col">

            {auctionSwapInfo.info.ended ? 
              <PoolDetailCountdown project={project} pool={pool} isEndDate={true} whitelist_date={pool.whitelist_date} title={t("Pool closes in")}/> : 
              <PoolDetailCountdown project={project} pool={pool} isEndDate={true} end_date={pool.end_date} title={t("Pool closes in")}/>
            }

              <div className="project-card--container !p-0 mt-4">
                <div className="flex">
                  <div className="w-full">
                    <div className="box-header relative flex !border-opacity-50">
                      <h3 className="mb-2 font-medium">
                        Open your {pool.token_name}
                      </h3>
                      <div className="ml-auto flex !text-sm items-center">
                        <span className="mr-2 !font-normal">Your {pool.token_name } balance:</span>
                        <div className="ml-auto">
                          <span className="font-semibold">{accountBalance.boxBalance}</span>
                        </div>
                      </div>
                    </div>
                    <OpenBox auctionSwapInfo={auctionSwapInfo} accountBalance={accountBalance} fetchAccountBalance={reloadAccount} setStep={setStep} project={project} pool={pool}/>
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

const SubscribeSwapTokenLoading = function ({ currentTime, opendTime, endTime }) {
  return (
    <div className="card-default project-main-actions no-padding overflow-hidden">

      <div className="card-body no-padding">
        <div className="flex flex-col">
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

const TokenSocialPromote = function ({ project }) {
  const { t, i18n } = useTranslation("launchpad")
  return (
    <ul className="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <li className="relative pl-6  mb-2">
        <span className="absolute left-0 top-0 mr-2">
          <i className="fa-duotone fa-circle-small opacity-60 mx-auto" />
        </span>
        <p className="" dangerouslySetInnerHTML={{ __html: t("status note") }} >
        </p>
      </li>
      <li className="relative pl-6 mb-2">
        <span className="absolute left-0 top-0 mr-2">
          <i className="fa-duotone fa-circle-small opacity-60 mx-auto" />
        </span>
        <p className="" dangerouslySetInnerHTML={{
          __html: t("coming soon note",
            {
              twitter: `<a class="link" target="_blank" rel="nofollow" href="https://twitter.com/rada_network">@rada_network</a>`,
              radanetwork: `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radanetwork">Telegram channel</a>`,
              radadao: `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radadao">Telegram Community</a>`
            }
          )
        }} />
      </li>
      <li className="relative pl-6  mb-2">
        <span className="absolute left-0 top-0  mr-2">
          <i className="fa-duotone fa-circle-small opacity-60 mx-auto" />
        </span>
        <p className="" dangerouslySetInnerHTML={{
          __html: t("status note 2",
            {
              token: project.token.name,
              research: `<a class="link" target="_blank" rel="nofollow" href="/${i18n.language}/launchverse/${project.slug}/research">Research</a>`
            }
          )
        }} />
      </li>

    </ul>
  )
}

const NotInWhitesist = function () {
  const { t } = useTranslation("launchpad")
  return (
    <div className="card-default project-main-actions no-padding overflow-hidden">

      <div className="card-body no-padding">
        <div className="flex flex-col">
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