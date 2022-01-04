import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContractV2,useFixedSwapContract,useRIRContract} from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import useStore from "@lib/useStore"

const SubcribeByBUSD = ({pool,project,accountBalance,setStep,fetchAccountBalance,fixedSwapInfo}) => {
  const store = useStore()
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()
  const launchpadContract = useFixedSwapContract(pool)
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberBox,setNumberBox] = useState(1)
  const [numberBusd,setNumberBusd] = useState(fixedSwapInfo.info.startPrice)

  
  const maxSelected = fixedSwapInfo.info.maxBuyPerAddress - fixedSwapInfo.order.total
  const handleChangeNumberBox = function(e){
    setNumberBox(e.currentTarget.value)
    setNumberBusd(parseInt(e.currentTarget.value)*fixedSwapInfo.info.startPrice )
  }
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
  useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response2 = await bUSDContract.allowance(account, launchpadContract.address)
        return response2.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: async (requireApprove) => {
      store.transaction.showTransaction(true);
      return callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
    },
    onConfirm: () => {
      store.transaction.showTransaction(true);
      return callWithGasPrice(launchpadContract, 'placeOrder', [pool.id,numberBox])
    },
    onSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
      await fetchAccountBalance()
      store.updateLoadPoolContent((new Date()).getTime())
    },
  })
  return (
    <>
      <div className="global-padding">
        <div className="mb-4 flex uppercase text-xs tracking-wider gap-4 pb-2 border-b border-gray-200 dark:border-gray-800">
          <div className="w-1/3">
            <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Quantity</label>
          </div>
          <div className="w-1/3">Price</div>
          <div className="w-1/3 text-right">
            <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">Total</label>
          </div>
          
        </div>
        <div className="relative">
          <div className="mb-4 flex gap-4 relative items-center ">
            <div className="w-1/3 flex-grow">
              <select id="box" name="amount" className="select-custom w-full " value={numberBox} onChange={handleChangeNumberBox}>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <option key={i} className="text-gray-300" value={(i+1)}>{i+1} Boxes</option>
                  )
                })}
              </select>
            </div>
            <div className="w-1/3 text-base flex">
             150 BUSD
            </div>
            <div className="w-1/3 flex-grow flex items-center text-right">
              <div className="ml-auto text-base">
                {numberBusd} BUSD       
              </div>       
            </div>
          </div>
    
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 dark:border-opacity-50"></div>
        
        <div className="mt-4  grid grid-cols-2 gap-4"> 
          <div className="flex-shrink-0 flex-grow">
            <button className={`btn !text-sm relative w-full btn-default btn-default-lg btn-purple` + (isApproved ? " disabled" : "")} onClick={handleApprove} width="100%" scale="md">
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
          <div className="flex-shrink-0 flex-grow">
            <button className={`btn !text-sm relative w-full btn-default btn-default-lg btn-purple` + ((!isApproved) ? " disabled" : "")} onClick={handleConfirm} disabled="" width="100%" scale="md">
              {isConfirming && <span className="spinner" />}
              {isConfirming ? <>{t("Place Order")}</> : <>{t("Place Order")}</>}
            </button>
          </div>
        </div>
        <div className="mt-4">
          {fixedSwapInfo.order.total > 0 &&
          <button className="btn btn-default btn-default-lg w-full mt-2" onClick={e => {setStep(31)}} disabled="" id="cancel" width="100%" scale="md">
          {t("Cancel")}
          </button>
          }
        </div>

        

      </div>
    </>
  )
}
export default SubcribeByBUSD