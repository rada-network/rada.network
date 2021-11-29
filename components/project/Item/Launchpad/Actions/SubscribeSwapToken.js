import Subscriber from "./Subscriber";
import Timeline from "./Timeline";
import SwapTokens from "./SwapTokens"
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


const SubscribeSwapToken = ({ project }) => {

  const { t, i18n } = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const { account } = useActiveWeb3React()
  const { launchpadInfo, loading, fetchLaunchpadInfo } = useLaunchpadInfo({ project })
  const { callWithGasPrice } = useCallWithGasPrice()
  const launchpadContract = useLaunchpadContractV2(project.swap_contract)
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance] = useState(true)
  const [orderBusd, setOrderBusd] = useState(0)
  const [orderRIR, setOrderRIR] = useState(0)
  const [approvedBusd, setApprovedBusd] = useState(0)
  const [step, setStep] = useState(2)
  const [claimDisbaled, setClaimDisbaled] = useState(false)

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
    let currentOrder = launchpadInfo?.currentOrder?.amountBUSD ? launchpadInfo?.currentOrder?.amountBUSD : 0
    let currentOrderRIR = launchpadInfo?.currentOrder?.amountRIR ? launchpadInfo?.currentOrder?.amountRIR : 0
    let currentApprovedBusd = launchpadInfo?.currentOrder?.approvedBUSD ? launchpadInfo?.currentOrder?.approvedBUSD : 0
    setOrderBusd(utils.formatEther(currentOrder))
    setOrderRIR(utils.formatEther(currentOrderRIR))
    setApprovedBusd(utils.formatEther(currentApprovedBusd))
  }, [launchpadInfo])
  useEffect(() => {
    if (launchpadInfo.currentOrder && launchpadInfo.claimable && launchpadInfo.winnerCount > 0 &&
      (parseInt(ethers.utils.formatEther(launchpadInfo.claimable[1])) > 0 ||
        parseInt(ethers.utils.formatEther(launchpadInfo.currentOrder.claimedToken)) > 0)) {
      setStep(4)
    }
    else {
      if ((orderBusd > 0 || launchpadInfo.winnerCount > 0)) {
        setStep(3)
      }
    }

  }, [orderBusd, launchpadInfo]);

  const handleClaimToken = async function (e) {
    try {
      setClaimDisbaled(true)
      const tx = await callWithGasPrice(launchpadContract, "claim", [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toast.success("Commit success")
      }
      setClaimDisbaled(false)
      fetchAccountBalance()
    } catch (error) {
      setClaimDisbaled(false)
      console.log(error)
      //toast.error(error.data.message)
    }
  }

  if (loading || loadBalance) {
    return (
      <SubscribeSwapTokenLoading></SubscribeSwapTokenLoading>
    )
  }
  const maxRIR = parseInt(launchpadInfo.individualMaximumAmount) / 100;
  const maxBusd = parseInt(launchpadInfo.individualMaximumAmount);
  console.log(launchpadInfo)
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
                  <h3 className="text-3xl text-center font-normal">
                    <span className="text-color-title"></span>
                  </h3>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="box box--transparent">

                    <div className="box-header !px-0">{t("Your allocation")}</div>

                    <ul class="mt-4 flex-shrink-0 flex-grow">
                      {project.is_allow_rir && <li class="list-pair mb-2">
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
                          {launchpadInfo?.individualMaximumAmount} BUSD {accountBalance?.rirBalance > 0 && project.is_allow_rir && <>( {launchpadInfo?.individualMaximumAmount / 100} RIR )</>}
                        </span>
                      </li>
                      <li class="list-pair mb-2">
                        <span class="list-key">{t("Your minimum allocation")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {launchpadInfo?.individualMinimumAmount} BUSD {accountBalance?.rirBalance > 0 && project.is_allow_rir && <>( {launchpadInfo?.individualMinimumAmount / 100} RIR )</>}
                        </span>
                      </li>
                      <li class="list-pair mb-2">
                        <span class="list-key">{t("Your BUSD Balance")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {accountBalance?.busdBalance} BUSD
                        </span>
                      </li>
                      {project.is_allow_rir && <li class="list-pair mb-2">
                        <span class="list-key">{t("Your RIR Balance")}</span>
                        <span class="ml-auto list-value font-semibold">
                          {accountBalance?.rirBalance} RIR
                        </span>
                      </li>}
                    </ul>

                    <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                      <p>
                        <span className="icon mr-2 text-base">
                          <i class="fas fa-info-circle text-yellow-500"></i>
                        </span>
                        <span>
                          {t("Allocation note")}
                        </span>
                      </p>
                    </div>

                  </div>

                  <div className="box box--gray">
                    <div className="box-header">{t("Prefund your investment")}</div>
                    <SwapTokensV2 project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} setStep={setStep} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {(step == 3 && launchpadInfo.winnerCount == 0) &&
        <div className="card-default project-main-actions no-padding overflow-hidden">
          <div className="card-header text-center sr-only">
            <h2>Public Sale</h2>
          </div>

          <div className="card-body no-padding">
            <div className="flex flex-col">
              <div className="">
                <Timeline step="3" />
              </div>

              <div className="global-padding-lg !px-6 min-h-full w-full mx-auto">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="flex items-center">
                    <div className="">
                      <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">
                        {orderRIR > 0 ?
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

                      <div className="flex flex-col md:flex-row mt-8 max-w-2xl justify-evenly mx-auto">
                        {project?.share_campaign?.length > 0 &&
                          <Link href={`/${i18n.language}/launchverse/${project.slug}/share2earn`}>
                            <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-primary-700 dark:bg-primary-700 text-white rounded-lg flex items-center cursor-pointer">
                              <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full flex-shrink-0 mr-4 shadow">
                                <i class="fa-duotone fa-hand-holding-heart"></i>
                              </span>
                              <div>
                                <p className="mb-1 opacity-80">{t("Refer a friend to earn RIR")}</p>

                                <a href={`/launchverse/${project.slug}/share2earn`} class="group text-white">
                                  <span class="text-sm">{t("Join Share2Earn")}</span>
                                  <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                                </a>

                              </div>
                            </div>
                          </Link>
                        }

                        {(parseInt(orderBusd) < maxBusd || (parseInt(orderRIR) < maxRIR && project.is_allow_rir)) &&
                          <>
                            <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex cursor-pointer items-center">
                              <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow">
                                <i class="fad fa-dollar-sign"></i>
                              </span>
                              <div>
                                <p className="mb-1 opacity-80">Adjust your prefunding</p>

                                <a href={`#`} onClick={e => { setStep(2) }} class="group">
                                  <span class="text-sm">Increase your chance</span>
                                  <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                                </a>
                              </div>
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
          </div>
    }

          {(step == 3 && launchpadInfo.winnerCount > 0 && parseFloat(approvedBusd) > 0) &&
            <div className="card-default project-main-actions no-padding overflow-hidden">

              <div className="card-body no-padding">
                <div className="flex flex-col">
                  <div className="">
                    <Timeline step="3" />
                  </div>

                  <div className="project-card--container">
                    <div className="max-w-2xl mx-auto text-center">

                      <div className="flex items-center">
                        <div className="s2e-illustration flex-shrink-0"></div>
                        <div className="text-left ml-2">
                          <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">Congratulations! You’re selected as a {project.content.title}'s investor
                          </h3>
                          <p>Approved  BUSD : <strong>{approvedBusd} BUSD</strong></p>
                          <p>Prefunded BUSD : <strong>{orderBusd} BUSD</strong></p>
                          {parseInt(orderBusd) - parseInt(approvedBusd) > 0 && <p>{parseInt(orderBusd) - parseInt(approvedBusd)} BUSd will be refunded when you claim your token for the first time.</p>
                          }
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          }

          {(step == 3 && launchpadInfo.winnerCount > 0 && parseFloat(approvedBusd) == 0.0) &&
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
                          <h3 className="text-xl mb-4 text-yellow-600 dark:text-red-500">Your application was rejected</h3>
                          <p>Unfortunately your application has failed. Good luck next time!</p>
                        </div>
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
                          <span class="list-key !opacity-100">{project.token.symbol} Token available to claim :</span>
                          <div class="ml-auto list-value font-semibold">{ethers.utils.formatEther(launchpadInfo.claimable[1])} {project.token.symbol}
                          </div>
                        </li>
                        {parseInt(ethers.utils.formatEther(launchpadInfo.claimable[0])) > 0 && <li class="list-pair mb-2">
                          <span class="list-key !opacity-100">Refunded BUSD:</span>
                          <div class="ml-auto list-value font-semibold">{ethers.utils.formatEther(launchpadInfo.claimable[0])} BUSD
                          </div>
                        </li>
                        }
                        <li class="list-pair mb-2">
                          <span class="list-key !opacity-100"></span>
                          <div class="ml-auto list-value font-semibold">
                            <button onClick={e => { handleClaimToken(e) }} className={`btn-primary py-2 px-4 rounded-md ml-2` + (claimDisbaled ? " disabled" : "")}>Claim</button>
                          </div>
                        </li>
                      </ul>

                      {/* <div className="box p-4">
                <div className="flex items-baseline border-b pb-2  border-gray-200 dark:border-gray-800">
                  <h4 className="text-md items-baseline font-semibold">
                    Bạn đã rút
                  </h4>
                  <span className="ml-auto font-semibold">
                    2,500 PRL
                  </span>
                </div>
                <ul class="mb-0 mt-auto flex-shrink-0 flex-grow">
                  <li class="list-pair py-2 border-b border-gray-200 dark:border-gray-800">
                    <span class="list-key text-semibold !text-gray-800 dark:!text-gray-200"><span className="dark:text-gray-400 text-gray-700 mr-1">on</span>
                      <date>15 tháng 9, 2021</date></span>
                    <div class="ml-auto font-semibold list-value">
                    2,500 PRL
                    </div>
                  </li>
                  <li class="list-pair py-2 border-b border-gray-200 dark:border-gray-800">
                    <span class="list-key text-semibold !text-gray-800 dark:!text-gray-200"><span className="dark:text-gray-400 dark-gray-700 mr-1">on</span>
                      <date>01 tháng 9, 2021</date></span>
                    <div class="ml-auto font-semibold list-value">
                    2,500 PRL
                    </div>
                  </li>
                </ul>
              </div> */}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          }

          {(orderBusd > 0 && launchpadInfo.winnerCount == 0) &&
            <div className="card-default project-main-actions no-padding overflow-hidden mt-4">
              <div className="card-header items-center">
                <h3>Subscriber ({launchpadInfo?.ordersBuyerCount})</h3>
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
                <h3>Winners ({launchpadInfo?.winnerCount})</h3>
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

      const SubscribeSwapTokenLoading = function(){
  return (
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
                <h3 className="text-3xl text-center font-normal">
                  <span class="spinner"></span>
                </h3>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <h3 className="text-3xl text-center font-normal">
                  <span class="spinner"></span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}

      export default SubscribeSwapToken