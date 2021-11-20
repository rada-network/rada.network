import Subscriber from "./Subscriber";
import Timeline from "./Timeline";
import SwapTokens from "./SwapTokens"
import { useBUSDContract, useERC20, useRIRContract } from "@utils/hooks/useContracts";
import { useEffect,useState } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { utils } from "ethers";
import { useTranslation } from "next-i18next";

import { useLaunchpadInfo } from "@utils/hooks/index";
import SwapTokensV2 from "./SwapTokenV2";


const SubscribeSwapToken = ({project}) => {

  const {t} = useTranslation("launchpad")
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const {account} = useActiveWeb3React()
  const {launchpadInfo,loading,fetchLaunchpadInfo} = useLaunchpadInfo({project})
  const [accountBalance, setAccountBalance] = useState({})
  const [loadBalance, setLoadBalance]  = useState(true)
  const [orderBusd,setOrderBusd] = useState(0)
  const [orderRIR,setOrderRIR] = useState(0)
 
  const fetchAccountBalance =  async function(){
    await fetchLaunchpadInfo()
    let rirBalance = await rirContract.balanceOf(account);
    let busdBalance = await bUSDContract.balanceOf(account);
    setAccountBalance({
      rirBalance : utils.formatEther(rirBalance),
      busdBalance : utils.formatEther(busdBalance),
    })
  }
  useEffect(() => {
    if (!!account){
      fetchAccountBalance().then(function(){
        setLoadBalance(false)
      });
    }
  },[account])
  useEffect(() => {
    let currentOrder = launchpadInfo?.currentOrder?.amountBUSD ? launchpadInfo?.currentOrder?.amountBUSD : 0
    let currentOrderRIR = launchpadInfo?.currentOrder?.amountRIR ? launchpadInfo?.currentOrder?.amountRIR : 0
    setOrderBusd(currentOrder)
    setOrderRIR(currentOrderRIR)
  },[launchpadInfo])
  if (loading || loadBalance){
    return (
    <div className="card-default project-main-actions no-padding overflow-hidden">
      <div className="card-header text-center sr-only">
        <h3>Public Sale</h3>
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
              {/* <span class="spinner"></span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <>
    {orderBusd == 0 ?
    <div className="card-default project-main-actions no-padding overflow-hidden">
      <div className="card-header text-center sr-only">
        <h3>Public Sale</h3>
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
                  <li class="list-pair mb-2">
                    <span class="list-key">{t("Your maximum allocation")}</span>
                    <span class="ml-auto list-value font-semibold">
                      {launchpadInfo?.individualMaximumAmount} BUSD {accountBalance?.rirBalance > 0 && <>( {launchpadInfo?.individualMaximumAmount/100} RIR )</>}
                    </span>
                  </li>
                  <li class="list-pair mb-2">
                    <span class="list-key">{t("Your minimum allocation")}</span>
                    <span class="ml-auto list-value font-semibold">
                    {launchpadInfo?.individualMinimumAmount} BUSD {accountBalance?.rirBalance > 0 && <>( {launchpadInfo?.individualMinimumAmount/100} RIR )</>}
                    </span>
                  </li>
                  {/* <li class="list-pair mb-2">
                    <span class="list-key">{t("Your BUSD")}</span>
                    <span class="ml-auto list-value font-semibold">
                    {accountBalance?.busdBalance}
                    </span>
                  </li> */}
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
                <SwapTokensV2 project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <div className="card-default project-main-actions no-padding overflow-hidden">
      <div className="card-header text-center sr-only">
        <h3>Public Sale</h3>
      </div>

      <div className="card-body no-padding">
        <div className="flex flex-col">
          <div className="">
            <Timeline step="3" />
          </div>

          <div className="global-padding-lg !px-6 min-h-full w-full mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center">
                <div className="s2e-illustration flex-shrink-0"></div>
                <div className="text-left ml-2">
                  <h3 className="text-xl mb-4 text-yellow-600 dark:text-yellow-400">
                    {t("prefunded note",
                      {
                        amount : utils.formatEther(orderBusd.toString())
                      }
                      )
                    }
                  </h3>
                  <p>{t("prefunded note line2")} </p>
                  <p>{t("share to earn note")}</p>
                  <a href="" className="btn btn-primary mt-4 px-4 py-2">{t("Share to earn")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }

    {orderBusd > 0 &&
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
    </>
  );
}

export default SubscribeSwapToken