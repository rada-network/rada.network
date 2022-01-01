import Timeline from "./Timeline";
import { useBUSDContractV2, useERC20, useRIRContract, useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import { useEffect, useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";

import { useLaunchpadInfo } from "@utils/hooks/index";
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


const SubscribeSwapToken = ({ project ,openTime,endTime,currentTime,pool}) => {
  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const { account } = useActiveWeb3React()
  const store = useStore()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { getBscScanURL } = useChainConfig()
  const launchpadContract = useLaunchpadContractV2(pool)
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [step, setStep] = useState(2)
  const [claimDisbaled, setClaimDisbaled] = useState(false)
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
        {poolStatus == "open" && <div className="text-base">{t("Pool closes in")}</div>}
        {poolStatus == "coming" && <div className="text-base">{t("Sale start in")}</div>}
        {poolStatus == "closed" && <div className="text-base">{t("pool closed")}</div>}
        {poolStatus == "tba" && <div className="text-base">{t("Comming Soon")}</div>}
        {poolStatus == "coming" && <MiniCountdown pool={pool} isEndDate={false} />}
        {poolStatus == "open" && <MiniCountdown pool={pool} isEndDate={true} />}
      </div>
    )
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
    setStep(2)
    //pool dont set winner
  }, []);

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };

  const getPercentageClaimToken = function(){
    return ((launchpadInfo.investor.claimedToken) / launchpadInfo.totalClaimable * 100).toFixed(1)
  }

  // if (loading) {
  //   return (
  //     <SubscribeSwapTokenLoading openTime={openTime} currentTime={currentTime} endTime={endTime} />
  //   )
  // }
  return (
    <>
      {step == 2 &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="2" />
              </div>

              <div className="project-card--container">
                <div className="mb-8 sr-only">
                  <h3 className="text-2xl text-center font-normal">
                    <span className="text-color-title">Swap tokens</span>
                  </h3>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="box box--transparent">
                    <div className="box-header !px-0">How to buy boxes</div>
                    <ul className="mt-4 flex-shrink-0 flex-grow">
                      <li className="list-pair mb-2">
                        <span className="list-key !w-3/4">Minimum boxes per order</span>
                        <span className="ml-auto list-value font-semibold tabular-nums">
                          1
                        </span>
                      </li>
                      <li className="list-pair mb-2">
                        <span className="list-key !w-3/4">Maximum boxes per order </span>
                        <span className="ml-auto list-value font-semibold tabular-nums">
                          10
                        </span>
                      </li>
                    
                    </ul>
                    <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
                      <li className="flex mb-2 relative pl-6">
                        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
                          <CheckSvg />  
                        </span>
                        <div className="">Some notice</div>
                      </li>
                    </ul>
                  </div>
                  <div className="box box--gray">
                    <div className="box-header relative flex">Bid </div>
                    <SwapTokensV2 />
                  </div>

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