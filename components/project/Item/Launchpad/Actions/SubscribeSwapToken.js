import Subscriber from "./Subscriber";
import Timeline from "./Timeline";
import { useBUSDContract, useERC20, useRIRContract, useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import { useEffect, useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { ethers, utils } from "ethers";
import { useTranslation } from "next-i18next";

import { useLaunchpadInfo } from "@utils/hooks/index";
import SwapTokensV2 from "./SwapTokenV2";
import Link from "next/link"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { toast } from "react-toastify"
import { set } from "store";
import SocialPromote from "../SocialPromote";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useChainConfig from "utils/web3/useChainConfig"


const SubscribeSwapToken = ({ project ,openTime,endTime,currentTime,pool}) => {
  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const { account } = useActiveWeb3React()
  const { launchpadInfo, loading, fetchLaunchpadInfo } = useLaunchpadInfo({ pool })
  const { callWithGasPrice } = useCallWithGasPrice()
  const { getRIRAddress, getBscScanURL } = useChainConfig()
  const launchpadContract = useLaunchpadContractV2(pool)
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [loadWhitelist, setLoadWhitelist] = useState(true)
  const [inWhitelist, setInWhitelist] = useState(!pool.is_whitelist)
  const [orderBusd, setOrderBusd] = useState(0)
  const [orderRIR, setOrderRIR] = useState(0)
  const [approvedBusd, setApprovedBusd] = useState(0)
  const [approveRIR, setApprovedRIR] = useState(0)
  const [step, setStep] = useState(2)
  const [claimDisbaled, setClaimDisbaled] = useState(false)
  const [tokenAddress,setTokenAddress] = useState(ethers.constants.AddressZero)
  const fetchAccountBalance = async function () {
    await fetchLaunchpadInfo()
    let rirBalance = await rirContract.balanceOf(account);
    let busdBalance = await bUSDContract.balanceOf(account);
    setAccountBalance({
      rirBalance: utils.formatEther(rirBalance),
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
    if (!!account && !!launchpadInfo) {
      setTokenAddress(launchpadInfo.tokenAddress)
    }
  }, [launchpadInfo,account])

  useEffect(() => {
    if (!!account && pool.is_whitelist && !!launchpadInfo) {
      if (launchpadInfo.investor.allocationBusd > 0){
        
        setInWhitelist(true)
        setLoadWhitelist(false)
      }
    }
    else{
      setLoadWhitelist(false)
    }
  }, [account,launchpadInfo])
  useEffect(() => {
    if (!loading){
      let currentOrderBusd = launchpadInfo.investor.amountBusd && launchpadInfo.investor.paid ? launchpadInfo.investor.amountBusd : 0
      let currentOrderRIR = launchpadInfo.investor.amountRir && launchpadInfo.investor.paid ? launchpadInfo.investor.amountRir : 0
      let currentApprovedBusd = launchpadInfo.investor.aprprove ? launchpadInfo.investor.allocationBusd : 0
      let currentApproveRIR = launchpadInfo.investor.approved ? launchpadInfo.investor.allocationRir : 0
      setOrderBusd(currentOrderBusd)
      setOrderRIR(currentOrderRIR)
      setApprovedBusd(currentApprovedBusd)
      setApprovedRIR(currentApproveRIR)
    }
  }, [launchpadInfo,loading])
  useEffect(() => {
    //pool dont set winner
    if (launchpadInfo.winnerCount == 0){
      if (parseInt(orderBusd) > 0){
        // prefund success wait to approve whitelist
        setStep(31)
      }
      else{
        //pool has closeed, cant prefund
        if (currentTime > endTime){
          setStep (32)
        }
        else{
          //pool can prefund
          setStep(2)
        }
      }
    }
    //pool set winner
    else{
      //user win
      if (parseInt(approvedBusd) > 0){
        if (launchpadInfo.claimable && launchpadInfo.currentOrder && (parseInt(ethers.utils.formatEther(launchpadInfo.claimable[1])) > 0 || parseInt(ethers.utils.formatEther(launchpadInfo.currentOrder.claimedToken)) > 0 )){
          setStep(4)
        }
        else{
          setStep(33)
        }
      }
      //user not win
      else{
        //user sub
        if (parseInt(orderBusd) > 0){
          setStep(34)
        }
        //user not sub
        else{
          setStep(35)
        }
      }
    }

  }, [orderBusd, launchpadInfo]);

  const handleClaimToken = async function (e) {
    try {
      setClaimDisbaled(true)
      const tx = await callWithGasPrice(launchpadContract, "claim", [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toast.success(t("Claim success!"))
      }
      setClaimDisbaled(false)
      fetchAccountBalance()
    } catch (error) {
      setClaimDisbaled(false)
      console.log(error)
      if (!!error?.data?.message){
        toast.error(t(error?.data?.message?.replace("execution reverted: ","")))
      }
      else if (!!error?.message){
        toast.error(t(error?.message))
      }
      else{
        toast.error(t(error))
      }
    }
  }

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };

  if (loading || loadBalance || loadWhitelist) {
    return (
      <SubscribeSwapTokenLoading openTime={openTime} currentTime={currentTime} endTime={endTime} />
    )
  }
  if (!inWhitelist) {
    return (
      <NotInWhitesist></NotInWhitesist>
    )
  }
  const maxRIR = parseInt(launchpadInfo.individualMaximumAmount) / 100;
  const maxBusd = parseInt(launchpadInfo.individualMaximumAmount);
  return (
    <>
      {step == 2 &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-header text-center sr-only">
            <h2>Public Sale</h2>
          </div>

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="2" />
              </div>

              <div className="project-card--container">
                <div className="mb-8 sr-only">
                  <h3 className="text-2xl md:text-3xl text-center font-normal">
                    <span className="text-color-title"></span>
                  </h3>
                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                  <div className="box box--transparent">

                    <div className="box-header !px-0">{t("Your allocation")}</div>

                    <ul class="mt-4 flex-shrink-0 flex-grow">
                      {pool.is_allow_rir && parseInt(orderRIR) > 0 && <li class="list-pair mb-2">
                        <span class="list-key">{t("Prefunded RIR")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {orderRIR} RIR
                        </span>
                      </li>}
                      <li class="list-pair mb-2">
                        <span class="list-key">{t("Prefunded BUSD")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {orderBusd} BUSD
                        </span>
                      </li>
                      <li class="list-pair mb-2">
                        <span class="list-key">{t("Your maximum allocation")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {launchpadInfo?.individualMaximumAmount} BUSD {accountBalance?.rirBalance > 0 && pool.is_allow_rir && <>( {launchpadInfo?.individualMaximumAmount / 100} RIR )</>}
                        </span>
                      </li>
                      <li class="list-pair mb-2">
                        <span class="list-key">{t("Your minimum allocation")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {launchpadInfo?.individualMinimumAmount} BUSD {accountBalance?.rirBalance > 0 && pool.is_allow_rir && <>( {launchpadInfo?.individualMinimumAmount / 100} RIR )</>}
                        </span>
                      </li>
                      {pool.is_allow_rir && parseFloat(accountBalance.rirBalance) > 0 && <li class="list-pair mb-2">
                        <span class="list-key">{t("Your RIR Balance")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {accountBalance.rirBalance} RIR
                        </span>
                      </li>}
                    </ul>

                    {pool.is_allow_rir && <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                      <p>
                        <span className="icon mr-2 text-base">
                          <i class="fas fa-info-circle text-yellow-500"></i>
                        </span>
                        <span>
                          {t("Allocation note")}
                        </span>
                      </p>
                    </div>
                    }

                  </div>

                  <div className="box box--gray -mx-4 -mb-6 md:m-0">
                    <div className="box-header">{t("Prefund your investment")}</div>
                    <SwapTokensV2 accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} setStep={setStep} pool={pool} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {step == 32 &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-header text-center sr-only">
            <h2>Public Sale</h2>
          </div>

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="3" />
              </div>
              <div className="project-card--container">
                <div className="max-w-xl mx-auto">
                  <div className="mb-4 md:mb-8">
                    <h3 className="text-2xl md:text-3xl text-center font-normal">
                      <span className="text-color-title">
                        {t("pool closed")}
                      </span>
                    </h3>
                    
                  </div>
                  <SocialPromote />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {(step == 31) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-header text-center sr-only">
            <h2>Public Sale</h2>
          </div>

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="3" />
              </div>

              <div className="project-card--container">
                <div className="max-w-xl mx-auto">
                  <div className="flex">
                    <div className="w-full">
                      <h3 className="text-xl mb-4 text-green-400 dark:text-green-600">
                      ✨{orderRIR > 0 ?
                          <span>{t("prefunded note",
                            {
                              amount: orderBusd,
                              rir: orderRIR,
                            }
                          )
                          }</span>
                          :
                          <span>{t("prefunded note usd",
                            {
                              amount: orderBusd,
                            }
                          )
                          }</span>
                        }
                      </h3>
                      <TokenSocialPromote project={project} />
                      {currentTime < endTime && (parseInt(orderBusd) < maxBusd || ((parseInt(orderRIR) < maxRIR && parseInt(accountBalance.rirBalance) > 0) && pool.is_allow_rir)) &&
                      <div className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex cursor-pointer items-center" onClick={e => { setStep(2) }} >
                        <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow transition-all">
                          <i class="fa fa-money-bill"></i>
                        </span>
                        <div>
                          <p className="mb-1 text-lg text-yellow-600 dark:text-yellow-400">{t("Adjust prefund")}</p>
                        
                          <a href={`#`}  class="group">
                            <span class="text-sm">{t("adjust note",{"orderBusd" : orderBusd,"maxBusd" : maxBusd})}</span>
                            <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
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

      {(step == 33) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="3" />
              </div>

              <div className="project-card--container">
                <div className="max-w-xl mx-auto">

                  <div className="flex">
                    {/* <div className="s2e-illustration flex-shrink-0"></div> */}
                    <div className="w-full">
                      <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">
                      ✨ {t("status success",{name : project.content.title})}
                      </h3>
                      <p>{t("Prefunded BUSD")} : <strong>{orderBusd} BUSD</strong></p>
                      <p>{t("Approved BUSD")}&nbsp; : <strong>{approvedBusd} BUSD</strong></p>
                      {parseInt(ethers.utils.formatEther(launchpadInfo.claimable[0])) > 0 &&
                      <p>{t("Refund BUSD")}&nbsp; : <strong>{ethers.utils.formatEther(launchpadInfo.claimable[0])} BUSD</strong></p>
                      }
                      {parseInt(ethers.utils.formatEther(launchpadInfo.claimable[0])) > 0 &&
                      <p> {t("refund note")}</p>
                      }
                    </div>
                    
                  </div>
                  <div className="flex items-center mt-2">
                    <TokenSocialPromote project={project} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }

      {(step == 34) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="">
              <Timeline step="3" />
            </div>

            <div className="project-card--container">
              <div className="max-w-2xl mx-auto text-center">

                <div className="flex items-center">
                  <div className="mx-auto">
                    <h3 className="text-xl mb-4 text-yellow-600 dark:text-red-500">{t("status failed")}</h3>
                    {parseInt(ethers.utils.formatEther(launchpadInfo.claimable[0])) > 0 &&
                    <>
                    <p>{t("status failed note refund")}</p> 
                    <p>{t("Refund BUSD")}: <strong>{ethers.utils.formatEther(launchpadInfo.claimable[0])} BUSD</strong></p> 
                    <div class="ml-auto mt-4 list-value font-semibold">
                      <button onClick={e => { handleClaimToken(e) }} className={`btn-primary py-2 px-4 rounded-md ml-2` + (claimDisbaled ? " disabled" : "")}>Claim</button>
                    </div>
                    </>
                    }
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      }

      {(step == 35) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="3" />
              </div>

              <div className="project-card--container">
                <div className="max-w-2xl mx-auto text-center">

                  <div className="flex items-center">
                    <div className="mx-auto">
                      <h3 className="text-xl mb-4 text-yellow-600 dark:text-red-500">{t("Not allow")}</h3>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SocialPromote ></SocialPromote>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }
      {/* claim token */}
      {(step == 4) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="4" />
              </div>

              <div className="project-card--container">
                <div className="max-w-md mx-auto">
                  <ul class="mb-4 mt-auto flex-shrink-0 flex-grow">
                    <li class="list-pair mb-2">
                      <span class="w-3/5 !opacity-100">{project.token.symbol} Contract:</span>
                      <div class="w-2/5 ml-auto ">
                        <div className="">
                          <CopyToClipboard
                            onCopy={handleCopy}
                            text={tokenAddress}
                          >
                            <a href={getBscScanURL(tokenAddress)} target="_blank" className="btn btn-default btn-default-sm">
                              <span className="icon">
                                <i class={`cf cf-${project?.platform?.networkName}`}></i>
                              </span>
                              <span className="btn--text">{ `${tokenAddress.substr(0, 6)}...${tokenAddress.substr(-6)} `}</span>
                              <span className="icon">
                                <i class="fa-regular fa-copy text-2xs"></i>
                              </span>
                            </a>
                          </CopyToClipboard>
                          
                        </div>
                      </div>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="w-3/5 !opacity-100">{t("token claim note",{name : project.token.symbol})}:</span>
                      <div class="w-2/5 ml-auto  font-semibold">{ethers.utils.formatEther(launchpadInfo.claimable[1])} {project.token.symbol}
                      </div>
                    </li>
                    {parseFloat(ethers.utils.formatEther(launchpadInfo.claimable[0])) > 0 && <li class="list-pair mb-2">
                      <span class="w-3/5 !opacity-100">{t("busd claim note")}:</span>
                      <div class="w-2/5 ml-auto font-semibold">{ethers.utils.formatEther(launchpadInfo.claimable[0])} BUSD
                      </div>
                    </li>
                    }
                  </ul>
                </div>
                <div className="flex items-center">
                  <div className="mx-auto">
                    <div class="ml-auto mt-4 list-value font-semibold">
                    {(parseFloat(ethers.utils.formatEther(launchpadInfo.claimable[0])) > 0 || parseFloat(ethers.utils.formatEther(launchpadInfo.claimable[1])) > 0) && 
                      <button onClick={e => { handleClaimToken(e) }} className={`btn-primary py-2 px-4 rounded-md ml-2` + (claimDisbaled ? " disabled" : "")}>Claim</button>
                    }
                    </div>
                  </div>
                </div>
                <div className="flex items-center">                  
                  <SocialPromote ></SocialPromote>
                </div>

              </div>
            </div>
          </div>
        </div>
      }

      {(orderBusd > 0 && launchpadInfo.winnerCount == 0) &&
        <div className="card-default project-main-actions no-padding overflow-hidden mt-4">
          <div className="card-header items-center">
            <h3>{t("Prefunders")} ({launchpadInfo?.ordersBuyerCount})</h3>
          </div>

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="global-padding-lg min-h-full">

                <Subscriber project={project} buyers={launchpadInfo.buyers} />
              </div>
            </div>
          </div>
        </div>
      }

      {(orderBusd > 0 && launchpadInfo.winnerCount > 0) &&
        <div className="card-default project-main-actions no-padding overflow-hidden mt-4">
          <div className="card-header items-center">
            <h3>{t("Winners")} ({launchpadInfo?.winnerCount})</h3>
          </div>

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="global-padding-lg min-h-full">

                <Subscriber project={project} buyers={launchpadInfo.winners} />
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
        <span className="absolute left-0 top-0.5 w-4 h-4 inline-flex items-center text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full justify-items-center mr-2">
          <i class="fas text-2xs opacity-60 fa-check mx-auto" /> 
        </span>
        <p class="" dangerouslySetInnerHTML={{__html : t("status note")}} >
        </p>
      </li>
      <li className="relative pl-6 mb-2"> 
        <span className="absolute left-0 top-0.5 w-4 h-4 inline-flex items-center text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full justify-items-center mr-2">
          <i class="fas text-2xs opacity-60 fa-check mx-auto" /> 
        </span>
          <p class="" dangerouslySetInnerHTML={{__html : t("coming soon note",
          {
            twitter : `<a class="link" target="_blank" rel="nofollow" href="https://twitter.com/rada_network">@rada_network</a>`,
            radanetwork : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radanetwork">Telegram channel</a>`,
            radadao : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radadao">Telegram Community</a>`
          }
          )}} />
      </li>
      <li className="relative pl-6  mb-2">
        <span className="absolute left-0 top-0.5 w-4 h-4 inline-flex items-center text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full justify-items-center  mr-2">
          <i class="fas text-2xs opacity-60 fa-check mx-auto" /> 
        </span>
          <p class="" dangerouslySetInnerHTML={{__html : t("status note 2",
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
            <Timeline step="1" />
          </div>

          <div className="project-card--container">
            <div className="max-w-2xl mx-auto text-center">

              <div className="flex items-center">
                <div className="mx-auto">
                  {t("Not allow")}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeSwapToken