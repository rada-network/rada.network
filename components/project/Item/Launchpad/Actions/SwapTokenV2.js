import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContract,useRIRContract, useERC20,useLaunchpadContractV2 } from "@utils/hooks/useContracts"
import useMultiApproveConfirmTransaction from "@utils/hooks/useMultiApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import {useLaunchpadInfo} from "@utils/hooks/index"
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import { set } from "lodash"

const SwapTokensV2 = ({project,accountBalance,fetchAccountBalance,setStep}) => {
  const {launchpadInfo,loading} = useLaunchpadInfo({project})
  if (loading) return null
  return (
    <>
      <SubcribeByRIR project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} setStep={setStep} />
    </>
  )
}

const SubcribeByRIR = ({project,accountBalance,setStep,fetchAccountBalance,launchpadInfo}) => {
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()

  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const launchpadContract = useLaunchpadContractV2(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberRIR,setNumberRIR] = useState(0)
  const [numberBusd,setNumberBusd] = useState(0)
  const [currentOrderBusd,setCurrentOrderBusd] = useState(0)
  const [currentOrderRIR,setCurrentOrderRIR] = useState(0)
  const maxRIR = parseInt(launchpadInfo.individualMaximumAmount) / 100;
  const maxBusd = parseInt(launchpadInfo.individualMaximumAmount);
  useEffect(() => {
    setCurrentOrderBusd(parseInt(ethers.utils.formatEther(launchpadInfo?.currentOrder?.amountBUSD)))
    setCurrentOrderRIR(parseInt(ethers.utils.formatEther(launchpadInfo?.currentOrder?.amountRIR)))
  },[launchpadInfo])
  
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm,handleReload } =
  useMultiApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          const response1 = await rirContract.allowance(account, launchpadContract.address)
          return {busd : parseInt(ethers.utils.formatEther(response2)),rir : parseInt(ethers.utils.formatEther(response1))}
        } catch (error) {
          return {busd : 0, rir : 0}
        }
      },
      onApprove: async (requireApprove) => {
        const busdApprove = parseInt(maxBusd) - parseInt(requireApprove.busd)
        let receipt_busd,receipt_rir
        let data = []
        if (busdApprove > 0){
          receipt_busd =  await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(maxBusd.toString())])
          data.push(receipt_busd)
        }
        const rirApprove = parseInt(maxRIR) - parseInt(requireApprove.rir)
        if (rirApprove > 0){
          receipt_rir = await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(maxRIR.toString())])
          data.push(receipt_rir)
        }
        return data;
      },
      onApproveSuccess: async ({ receipts }) => {
        let txs = []
        for (const receipt of receipts) {
          txs.push(receipt.transactionHash)
        }
        toast.success(`Contract enabled - you can now prefund investment`)
      },
      onConfirm: () => {
        return callWithGasPrice(launchpadContract, 'createSubscription', [ethers.utils.parseEther(numberBusd.toString()),ethers.utils.parseEther(numberRIR.toString()),account])
      },
      onSuccess: async ({ receipt }) => {
        await fetchAccountBalance()
        toast.success(`Subscribed successfully ${receipt.transactionHash}`)
        
        handleReload()
        setCurrentOrderBusd(parseInt(ethers.utils.formatEther(launchpadInfo?.currentOrder?.amountBUSD)) + parseInt(numberBusd))
        setCurrentOrderRIR(parseInt(ethers.utils.formatEther(launchpadInfo?.currentOrder?.amountRIR)) + parseInt(numberRIR))
        setNumberRIR(0)
        setNumberBusd(0)
      },
    })
    const resetApproved = async () => {
      await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, 0])
      await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, 0])
    }
    const maxSelected = parseInt(launchpadInfo.individualMaximumAmount)/100
  return (
    <>
      <div className={`global-padding` + (isApproving || isConfirming ? " disabled" : "") }>

        <div className="mb-4">
          
          <div className="mt-1 relative">
            
            {/* remove the above block if user doesn't have RIR */}
            <div className="">
              <label htmlFor="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("Amount")}</label>
              <select id="amount" name="amount" className="select-custom" defaultValue={numberBusd} onChange={e => {setNumberBusd(e.currentTarget.value)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option key={-1} className="text-gray-300" value={0}>0 BUSD</option>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <>
                    {(maxBusd - currentOrderBusd) >= (i+1)*100 &&
                    <option key={i} className="text-gray-300" value={(i+1) * 100}>{(i+1) * 100} BUSD</option>
                    }
                    </>
                  )
                })}
              </select>
            </div>
            {accountBalance.rirBalance > 0 && 
            <div className="mt-4">
              <label htmlFor="rir" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("RIR")}</label>
              <select id="rir" name="rir" className="select-custom " defaultValue={numberRIR} onChange={e => {setNumberRIR(e.currentTarget.value)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option key="-1" className="text-gray-300" value={0}>{0} RIR</option>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <>
                    {((parseInt(numberBusd) + currentOrderBusd)/100 - currentOrderRIR >= (i + 1)) &&
                    <option key={i} className="text-gray-300" value={(i+1)}>{(i+1)} RIR</option>
                    }
                    </>
                  )
                })}
              </select>
            </div>
            }
            <SwapDescription numberBusd={numberBusd} numberRIR={numberRIR} maxSelected={maxSelected} currentOrderRIR={currentOrderRIR} currentOrderBusd={currentOrderBusd} /> 
          
          </div>
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
        </div>
        <div className="mt-4">
          {!isApproved && 
          <button class="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" onClick={handleApprove} width="100%" scale="md">
            {isApproving && <span className="spinner" />}
          {t("Approve Contract")}
          </button>
          }
          {isApproved && 
          <button class="btn btn-default btn-default-lg w-full btn-purple" onClick={handleConfirm} disabled="" id="swap-button" width="100%" scale="md">
            {isConfirming && <span className="spinner" />}
          {t("Prefund")}
          </button>
          }
          {currentOrderBusd > 0 &&
          <button class="btn btn-default btn-default-lg w-full mt-2" onClick={e => {setStep(3)}} disabled="" id="cancel" width="100%" scale="md">
          {t("Cancel")}
          </button>
          }
        </div>

        <SwapNote numberBusd={numberBusd} numberRIR={numberRIR} maxSelected={maxSelected} currentOrderRIR={currentOrderRIR} currentOrderBusd={currentOrderBusd} />

      </div>

    </>
  )
}

const SwapDescription = ({numberBusd,numberRIR,maxSelected,currentOrderBusd,currentOrderRIR}) => {

  const [RIR,setRIR] = useState(0)
  const [busd,setBusd] = useState(0)
  useEffect(() => {
    setBusd(numberBusd)
    setRIR(numberRIR)
  },[numberBusd,numberRIR])
  const p1 = Math.floor((parseInt(RIR) + currentOrderRIR)/maxSelected*5);
  const p2 = Math.floor(((parseInt(busd) + currentOrderBusd)/100 - p1)/maxSelected*5);
  const p3 = 5 - (p1 + p2)
  const sp1 = {
    width: p1/5 * 100 + "%"
  };
  const sp2 = {
    width: p2/5 * 100 + "%"
  };
  const sp3 = {
    width: p3/5 * 100 + "%"
  };
  return (
    <div className="flex mt-4 rounded-2xl overflow-hidden text-xs font-semibold">
      {p1 > 0 && 
      <div className={`w-${p1}/5 flex items-center transition-all`} style={sp1}>
        <div className="w-full flex items-center text-white h-6 pl-2  bg-green-600">
        {(parseInt(RIR) + currentOrderRIR) * 100} BUSD
        </div>
      </div>}
      {p2 > 0 && 
      <div className={`w-${p2}/5 flex items-center transition-lex items-center transition-all`} style={sp2}>
        <div className="w-full h-6 flex items-center  text-gray-700 pl-2 bg-yellow-300 ">{parseInt(busd) + currentOrderBusd - (parseInt(RIR) + currentOrderRIR) * 100 } BUSD</div>    
      </div>}
      {p3 > 0 && 
      <div className={`w-${p3}/5 flex flex items-center transition-all`} style={sp3}>
        <div className="w-full h-6 flex items-center bg-gray-300 dark:bg-gray-700"></div>
      </div>}
    </div>
  )
}

const SwapNote = function({numberBusd,numberRIR,maxSelected,currentOrderBusd,currentOrderRIR}){
  const [RIR,setRIR] = useState(0)
  const [busd,setBusd] = useState(0)
  useEffect(() => {
    setBusd(numberBusd)
    setRIR(numberRIR)
  },[numberBusd,numberRIR])
  return (
    <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
      <li className="flex mb-2 relative pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div className="">{(parseInt(RIR) + currentOrderRIR) * 100} BUSD ({parseInt(RIR) + currentOrderRIR} RIR) is guaranteed.</div>
      </li>
      <li className="relative mb-2 pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div>The rest of your investment will be distributed based on the total subscripption.</div>
      </li>
      <li className="relative mb-2 pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div>Your total prefund: {parseInt(busd) + currentOrderBusd} BUSD</div>
      </li>
    </ul>
  )
}

export default SwapTokensV2