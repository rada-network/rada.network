import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContract,useRIRContract, useERC20,useLaunchpadContractV2 } from "@utils/hooks/useContracts"
import useMultiApproveConfirmTransaction from "@utils/hooks/useMultiApproveConfirmTransaction"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import { useTranslation } from "next-i18next"
import useStore from "@lib/useStore"
import { SwapNote,SwapDescription } from "../SwapTokenV2"
import { BusdSvg, CheckSvg } from "@components/svg/SvgIcons"

const SubcribeByRIR = ({pool,accountBalance,setStep,fetchAccountBalance,launchpadInfo}) => {
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()
  const store = useStore()
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
          return response2.gt(0) || parseInt(ethers.utils.formatEther(launchpadInfo.currentOrder.amountBUSD)) == parseInt(launchpadInfo.individualMaximumAmount)
        } catch (error) {
          return false
        }
      },
      onApprove: async (requireApprove) => {
        return callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toast.success(`Approve BUSD Success`)
      },
      onConfirm: () => {
        if (pool.is_whitelist){
          return callWithGasPrice(launchpadContract, 'makePayment', [pool.id])
        }
        else{
          console.log(numberBusd.toString(),numberRIR.toString())
          return callWithGasPrice(launchpadContract, 'makePayment', [pool.id,ethers.utils.parseEther(numberBusd.toString()),ethers.utils.parseEther(numberRIR.toString())])
        }
        
      },
      onSuccess: async ({ receipt }) => {
        await fetchAccountBalance()
        toast.success(`Successfully prefunded`)
        setCurrentOrderBusd(parseInt(launchpadInfo.investor.amountBusd) + parseInt(numberBusd))
        setCurrentOrderRIR(parseInt(launchpadInfo.investor.amountRIR) + parseInt(numberRIR))
        setNumberRIR(0)
        setNumberBusd(0)
        store.updateLoadPoolContent((new Date()).getTime())
      },
    })
    const { isApproving :isApprovingRIR, isApproved : isApprovedRIR ,handleApprove:handleApproveRIR } =useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await rirContract.allowance(account, launchpadContract.address)
          return response2.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: async (requireApprove) => {
        return callWithGasPrice(rirContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toast.success(`Approve RIR Success`)
      },
      onConfirm: () => {
        
      },
      onSuccess: async ({ receipt }) => {
        
      },
    })
    const resetApproved = async () => {
      await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, 0])
      await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, 0])
    }
    const maxSelected = parseInt(launchpadInfo.individualMaximumAmount)/100
    const handleChangeBUSD = function(e){
      setNumberBusd(e.currentTarget.value)
      let newNumberRIR = parseInt(e.currentTarget.value)/100 < parseInt(accountBalance.rirBalance) ? parseInt(e.currentTarget.value)/100 : 0;
      setNumberRIR(newNumberRIR)
    }
  return (
    <>
      <div className={`global-padding` + (isApproving || isApprovingRIR || isConfirming ? " disabled" : "") }>

        <div className="mb-4">
          
          <div className="mt-1 relative">
            
            {/* remove the above block if user doesn't have RIR */}
            <div className="">
              <label htmlFor="currency" className="uppercase text-xs mb-2 block tracking-wide font-medium opacity-70">{t("Amount")}</label>
              <select id="amount" name="amount" className="select-custom" value={numberBusd} onChange={e => {handleChangeBUSD(e)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option key={-1} className="text-gray-300" value={0}>0 BUSD</option>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <>
                    {(maxBusd - currentOrderBusd) >= (i+1)*100 && (minBusd - currentOrderBusd) <= (i+1)* 100  &&
                    <option key={i} className="text-gray-300" value={(i+1) * 100}>{(i+1) * 100} BUSD</option>
                    }
                    </>
                  )
                })}
              </select>
            </div>
            {parseInt(accountBalance.rirBalance) > 0 && 
            <div className="mt-4">
              <label htmlFor="rir" className="uppercase text-xs mb-2 block tracking-wide font-medium opacity-70">
                {t("RIR")}
              </label>
              <select id="rir" name="rir" className="select-custom " value={numberRIR} onChange={e => {setNumberRIR(e.currentTarget.value)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option key="0" className="text-gray-300" value={0}>{t("dont use RIR")}</option>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <>
                    {((parseInt(numberBusd) + currentOrderBusd)/100 - currentOrderRIR >= (i + 1)) &&
                    <option key={i+1} className="text-gray-300" value={(i+1)}>{(i+1)} RIR</option>
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
        <div className={`mt-4 grid gap-4` + ( (parseInt(numberRIR) > 0 ) ? "" : "")}> 
          {/* bỏ grid grid-cols-2 nếu user không có RIR hoặc không dùng RIR */} 
          <div className="flex-shrink-0 flex-grow">
            <button className={`btn relative w-full btn-default btn-default-lg btn-purple` + (isApproved ? " disabled" : "")} width="100%" scale="md" onClick={handleApprove}>
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
          {parseFloat(accountBalance.rirBalance) > 0 && parseInt(numberRIR) > 0 &&
          <div  className="flex-shrink-0 flex-grow">
            <button className={`btn relative w-full btn-default btn-default-lg btn-purple` + (isApprovedRIR ? " disabled" : "") } scale="md" onClick={handleApproveRIR}>
            {isApprovingRIR && <span className="spinner" />}
            {isApprovedRIR && <span className="button-compact-body--icon--text" ><CheckSvg></CheckSvg></span>}
            {isApprovingRIR && 
            <>{t("Approving Contract")}</> 
            }
            {isApprovedRIR && 
            <>{t("Approved Contract")} RIR</> 
            }
            {!isApprovingRIR && !isApprovedRIR &&
            <>{t("Approve Contract")} RIR</>
            }
            </button>         
          </div>
          }
        </div>
        <div className="mt-4">
          <button className={`btn btn-default btn-default-lg w-full btn-purple` + (((isApprovedRIR || (parseFloat(accountBalance.rirBalance) == 0.0 ||  parseInt(numberRIR) == 0)) && isApproved) ? "" : " disabled")} onClick={handleConfirm}  >
            {isConfirming && <span className="spinner" />}
            {t("Prefund")}
          </button>
          {currentOrderBusd > 0 &&
          <button class="btn btn-default btn-default-lg w-full mt-2" onClick={e => {setStep(31)}} disabled="" id="cancel" width="100%" scale="md">
          {t("Cancel")}
          </button>
          }
          {account === "0x61c55832d24bfea603C12A9bea93cc7Efe92e504" && 
          <button className={`btn btn-default btn-default-lg w-full btn-purple mt-2`} onClick={resetApproved}  >
            {t("Reset approve")}
          </button>
          }
        </div>

        <SwapNote numberBusd={numberBusd} numberRIR={numberRIR} maxSelected={maxSelected} currentOrderRIR={currentOrderRIR} currentOrderBusd={currentOrderBusd} />

      </div>

    </>
  )
}



export default SubcribeByRIR