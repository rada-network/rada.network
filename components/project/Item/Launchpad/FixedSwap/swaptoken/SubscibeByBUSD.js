import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContractV2,useFixedSwapContract,useRIRContract} from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice,useCallWithoutGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import useStore from "@lib/useStore"
import SubscribeSwapTokenLoading from "../../SubscribeSwapTokenLoading"
import { getRaiseTokenByPlatfrom } from "@utils/hooks/index"

const SubcribeByBUSD = ({pool,project,accountBalance,setStep,fetchAccountBalance,fixedSwapInfo}) => {
  const store = useStore()
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()
  const launchpadContract = useFixedSwapContract(pool)
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const {callWithoutGasPrice} = useCallWithoutGasPrice()
  const [numberBox,setNumberBox] = useState(1)
  const [numberBusd,setNumberBusd] = useState(fixedSwapInfo.info.startPrice)
  const [loading, setLoading] = useState(true);

  
  const maxSelected = fixedSwapInfo.info.maxBuyPerAddress - fixedSwapInfo.order.total > fixedSwapInfo.info.maxBuyPerOrder ? fixedSwapInfo.info.maxBuyPerOrder : fixedSwapInfo.info.maxBuyPerAddress - fixedSwapInfo.order.total;
  const handleChangeNumberBox = function(e){
    setNumberBox(e.currentTarget.value)
    setNumberBusd(parseInt(e.currentTarget.value)*fixedSwapInfo.info.startPrice )
  }
  const usd_token = getRaiseTokenByPlatfrom(project.platform.networkName)
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
  useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response2 = await bUSDContract.allowance(account, launchpadContract.address)
        setLoading(false)
        return response2.gt(0)
      } catch (error) {
        setLoading(false)
        return false
      }
    },
    onApprove: async (requireApprove) => {
      store.transaction.showTransaction(true, t("start transaction message"));
      const tx = callWithoutGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256]);
      store.transaction.startTransaction(true, t("transaction started"));
      return tx;
    },
    onApproveSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
    },
    onConfirm: async () => {
      store.transaction.showTransaction(true, t("start transaction message"));
      const gas = await launchpadContract.estimateGas.placeOrder(pool.id, numberBox);
      console.log(ethers.utils.formatUnits(gas, 0))
      const tx = await callWithoutGasPrice(launchpadContract, 'placeOrder', [pool.id,numberBox],);
      store.transaction.startTransaction(true, t("transaction started"));
      return tx;
    },
    onSuccess: async ({ receipt }) => {
      store.transaction.update(receipt.transactionHash);
      await fetchAccountBalance()
      store.updateLoadPoolContent((new Date()).getTime())
    },
  })

  if (loading) {
    return (
      <SubscribeSwapTokenLoading />
    )
  }

  return (
    <>
      <div className="p-4 md:p-6 xl:p-8">
        {!isApproved && 
        <div className="max-w-xs mx-auto text-center flex flex-col">
          <button className={`btn !text-sm relative mx-auto btn-default btn-default-lg btn-primary`} onClick={handleApprove} width="100%" scale="md">
            {isApproving && <span className="spinner" />}
            {isApproved && <span className="button-compact-body--icon--text" ><CheckSvg></CheckSvg></span>}
            {isApproving && 
            <>{t("Approving Contract")}</> 
            }
            {isApproved && 
            <>{t("Approved Contract")} {usd_token}</> 
            }
            {!isApproving && !isApproved &&
            <>{t("Approve Contract")} {usd_token}</>
            }
          </button>
          <p className="mt-4 text-xs">{t("Enable USD to purchase boxes")}</p>
        </div>
        }

        {isApproved && 
        <>
          <div className="mb-2 flex uppercase text-2xs md:text-xs tracking-wider gap-4">
            <div className="w-1/3 flex items-center">
              {/* <span className="icon mr-2"><i class="fa-duotone fa-box"></i></span> */}
              <label for="currency" className="block tracking-wide font-medium opacity-60 text-xs">Boxes</label>
            </div>
            <div className="w-1/3">
              <label for="price" className="block tracking-wide font-medium opacity-60 text-xs">Price</label>
            </div>
            <div className="w-1/3 text-right">
              <label className="block tracking-wide font-medium opacity-60 text-xs">Total</label>
            </div>
            
          </div>
          <div className="relative">
            <div className="mb-4 flex gap-4 relative items-center ">
              <div className="w-1/3 flex-grow">
                <select id="box" name="amount" className="select-custom w-full " value={numberBox} onChange={handleChangeNumberBox}>
                  {Array(maxSelected).fill(null).map((_, i) => {
                    return (
                      <option key={i} className="text-gray-300" value={(i+1)}>{i+1}</option>
                    )
                  })}
                </select>
              </div>
              <div id="price" className="w-1/3 text-base flex">
              {fixedSwapInfo.info.startPrice} {usd_token}
              </div>
              <div className="w-1/3 flex-grow flex items-center text-right">
                <div className="ml-auto text-base">
                  {numberBusd} {usd_token}       
                </div>       
              </div>
            </div>
          </div>
          
          <div> 
            
            <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 dark:border-opacity-50">
              <div className="text-sm opacity-60">You can purchase upto {fixedSwapInfo.info.maxBuyPerAddress - fixedSwapInfo.order.total} boxes</div>
              <button className={`btn !text-sm relative max-w-lg btn-default btn-default-lg btn-primary ml-auto` + ((!isApproved) ? " disabled" : "")} onClick={handleConfirm} disabled="" width="100%" scale="md">
                {isConfirming && <span className="spinner" />}
                {isConfirming ? <>{t("Place Order")}</> : <>{t("Place Order")}</>}
              </button>
            </div>
          </div>
          
          {fixedSwapInfo.order.total > 0 &&
          <div className="mt-4">
            <button className="btn btn-default btn-default-lg w-full mt-2" 
            onClick={e => {
              if (pool.is_openbox){
                setStep(3)
              }
              else{
                setStep(31)
              }
              
            }} disabled="" id="cancel" width="100%" scale="md">
            {t("Back")}
            </button>
          </div>
          }
        </>
        }

      </div>
    </>
  )
}
export default SubcribeByBUSD