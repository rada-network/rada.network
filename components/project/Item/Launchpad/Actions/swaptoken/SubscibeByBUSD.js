import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContract,useRIRContract, useERC20,useLaunchpadContractV2 } from "@utils/hooks/useContracts"
import useMultiApproveConfirmTransaction from "@utils/hooks/useMultiApproveConfirmTransaction"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import { set } from "lodash"
import { SwapNote,SwapDescription } from "../SwapTokenV2"
import useStore from "@lib/useStore"
import { submitPrefundLogApi } from "@data/query/projects"

const SubcribeByBUSD = ({pool,project,accountBalance,setStep,fetchAccountBalance,launchpadInfo}) => {
  const store = useStore()
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()

  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const launchpadContract = useLaunchpadContractV2(pool)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberRIR,setNumberRIR] = useState(0)
  const [numberBusd,setNumberBusd] = useState(0)
  const [currentOrderBusd,setCurrentOrderBusd] = useState(0)
  const [currentOrderRIR,setCurrentOrderRIR] = useState(0)
  const maxBusd = parseInt(launchpadInfo.individualMaximumAmount);
  const minBusd = parseInt(launchpadInfo.individualMinimumAmount);
  useEffect(() => {
    setCurrentOrderBusd(launchpadInfo.investor.paid ? parseInt(launchpadInfo.investor.amountBusd) : 0)
    setCurrentOrderRIR(launchpadInfo.investor.paid ? parseInt(launchpadInfo.investor.amountRir) : 0)
  },[launchpadInfo])
  
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
  useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response2 = await bUSDContract.allowance(account, launchpadContract.address)
        console.log(ethers.utils.formatEther(response2))
        return response2.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: async (requireApprove) => {
      store.transaction.showTransaction(true, t("start transaction message"));
      const tx = callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256]);
      store.transaction.startTransaction(true, t("transaction started"));
      return tx;
    },
    onApproveSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
      toast.success(`Approve BUSD Success`)
    },
    onConfirm: () => {
      store.transaction.showTransaction(true, t("start transaction message"));
      if (pool.is_whitelist){
        const tx = callWithGasPrice(launchpadContract, 'makePayment', [pool.id]);
        store.transaction.startTransaction(true, t("transaction started"));
        return tx;
      }
      else{
        const tx = callWithGasPrice(launchpadContract, 'makePayment', [pool.id,ethers.utils.parseEther(numberBusd.toString()),ethers.utils.parseEther(numberRIR.toString())]);
        store.transaction.startTransaction(true, t("transaction started"));
        return tx;
      }
    },
    onSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
      await fetchAccountBalance()
      toast.success(`Successfully prefunded`)
      setCurrentOrderBusd(parseInt(ethers.utils.formatEther(launchpadInfo?.investor?.amountBusd)) + parseInt(numberBusd))
      setCurrentOrderRIR(parseInt(ethers.utils.formatEther(launchpadInfo?.investor?.amountRir)) + parseInt(numberRIR))
      setNumberRIR(0)
      setNumberBusd(0)
      store.updateLoadPoolContent((new Date()).getTime())
      submitPrefundLogApi({project,pool,account})
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
          
          <div className="relative">
            
            {/* remove the above block if user doesn't have RIR */}
            <div className="">
              <label htmlFor="currency" className="uppercase text-xs mb-2 block tracking-wide font-medium opacity-70">{t("Amount")}</label>
              <select id="amount" name="amount" className="select-custom" value={numberBusd} onChange={e => {setNumberBusd(e.currentTarget.value)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option key={-1} className="text-gray-300" value={0}>0 BUSD</option>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <>
                    {(maxBusd - currentOrderBusd) >= (i+1)*100 && (minBusd - currentOrderBusd) <= (i+1)*100 &&
                    <option key={i} className="text-gray-300" value={(i+1) * 100}>{(i+1) * 100} BUSD</option>
                    }
                    </>
                  )
                })}
              </select>
            </div>
            <SwapDescription numberBusd={numberBusd} numberRIR={numberRIR} maxSelected={maxSelected} currentOrderRIR={currentOrderRIR} currentOrderBusd={currentOrderBusd} /> 
          
          </div>
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
        </div>
        <div className="mt-4">
          <button className={`btn relative  w-full btn-default btn-default-lg btn-purple` + (isApproved ? " disabled" : "")} onClick={handleApprove} width="100%" scale="md">
            {isApproving && <span className="spinner" />}
            {isApproved && <span className="button-compact-body--icon--text" ><CheckSvg></CheckSvg></span>}
            {isApproving && 
            <>{t("Approving Contract")}</> 
            }
            {isApproved && 
            <>{t("Approved Contract")} BUSD</> 
            }
            {!isApproving && !isApproved &&
            <>{t("Approve Contract")} BUSD</>
            }
          </button>
        </div>
        <div className="mt-4">
          <button className={`btn relative w-full btn-default btn-default-lg btn-purple` + ((!isApproved) ? " disabled" : "")} onClick={handleConfirm} disabled="" width="100%" scale="md">
            {isConfirming && <span className="spinner" />}
            {isConfirming ? <>{t("Prefund")}</> : <>{t("Prefunding")}</>}
          </button>
          {currentOrderBusd > 0 &&
          <button className="btn btn-default btn-default-lg w-full mt-2" onClick={e => {setStep(31)}} disabled="" id="cancel" width="100%" scale="md">
          {t("Cancel")}
          </button>
          }
        </div>
        {account === "0xC0129E7E233d6D9D4f2717Ba3e1837A4FE6C03af" && 
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`} onClick={resetApproved}  >
            {t("Reset approve")}
          </button>
        }

        <SwapNote numberBusd={numberBusd} numberRIR={numberRIR} maxSelected={maxSelected} currentOrderRIR={currentOrderRIR} currentOrderBusd={currentOrderBusd} />

      </div>

    </>
  )
}
export default SubcribeByBUSD