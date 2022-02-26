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
  // const maxSelected = 1;
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
      <div className="p-0 md:py-8 md:px-16 rounded-lg">
        {!isApproved && 
        <div className="max-w-xs mx-auto text-center flex flex-col">
          <button className={`btn relative mx-auto btn-default btn-default-lg btn-primary`} onClick={handleApprove} width="100%" scale="md">
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
          <p className="mt-4 text-sm">{t("Enable USD to purchase boxes")}</p>
        </div>
        }

        {isApproved && 
        <>
          {/* <div className="mb-2 flex uppercase text-2xs md:text-xs tracking-wider">
            <div className="w-1/3 flex items-center">
              <label for="currency" className="block tracking-wide font-medium opacity-60 text-xs">{pool.token_name}</label>
            </div>
            <div className="w-1/3">
              <label for="price" className="block tracking-wide font-medium opacity-60 text-xs">{t("Token Price")}</label>
            </div>
            <div className="w-1/3 text-right">
              <label className="block tracking-wide font-medium opacity-60 text-xs">{t("Total")}</label>
            </div>
          </div> */}

          <div className="relative">
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start relative">

              <div className="w-32 md:mr-12 mb-4 mt-2 flex-shrink-0">
                <img
                  src={
                    process.env.NEXT_PUBLIC_CDN +
                    "/images/box.png"
                  }
                  alt="DefiHorse"
                  width={672}
                  height={672}
                  className=""
                />
              </div>
              
              <div className="flex flex-col w-full">

                <h4 className="text-2xl font-medium text-center md:text-left">{project.content.title} {pool.token_name}</h4>

                <div className="text-sm mb-4 pb-4 md:pb-0 text-center md:text-left border-b border-gray-200 dark:border-gray-700 md:border-b-0">
                  <strong className="">{fixedSwapInfo.info.maxBuyPerAddress - fixedSwapInfo.order.total}</strong>
                  <span className="opacity-60">
                  /
                  {fixedSwapInfo.info.maxBuyPerAddress}&nbsp;
                  {t("Purchase Limit")}
                  </span>
                </div>

                <div id="price" className="flex items-baseline mb-2">
                  <span className="text-xs opacity-60 uppercase font-medium mr-2 w-16 md:w-12">Price:</span>
                  <strong className="font-medium text-base">{fixedSwapInfo.info.startPrice} {usd_token}</strong>
                </div>

                <div className="flex items-baseline">
                  <span className="text-xs opacity-60 uppercase font-medium mr-2 w-16 md:w-12">QTY:</span>

                  {maxSelected > 1 && <select id="box" name="amount" className="select-custom w-full " value={numberBox} onChange={handleChangeNumberBox}>
                    {Array(maxSelected).fill(null).map((_, i) => {
                      return (
                        <option key={i} className="text-gray-300" value={(i+1)}>{i+1}</option>
                      )
                    })}
                  </select>
                  }

                  {maxSelected == 1 && 
                  <div>
                    <div id="box" name="amount" className="select-custom !w-28 !p-0 flex justify-between cursor-not-allowed" value={numberBox} >
                      <span className="icon border-r py-1.5 px-2 disabled"><i class="fa-solid fa-plus"></i></span>
                      <strong className="p-1.5 font-medium">{maxSelected}</strong>
                      <span className="icon border-l py-1.5 px-2 disabled"><i class="fa-solid fa-minus"></i></span>
                    </div>
                    <small className="block mt-2">You can only buy 1 box at a time</small>
                  </div>
                  }
                </div>

                <div className="flex items-baseline mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs opacity-60 uppercase font-medium mr-2 w-16 md:w-12">Total:</span>
                  <strong className="text-base">{numberBusd} {usd_token}</strong>
                </div>

                
                <div className="flex flex-col md:flex-row mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className={`btn relative btn-default btn-default-lg btn-primary` + ((!isApproved) ? " disabled" : "")} onClick={handleConfirm} disabled="" scale="md">
                    <span>
                      {isConfirming && <span className="spinner" />}
                      {isConfirming ? <>{t("Place Order")}</> : <>{t("Place Order")}</>}
                    </span>
                  </button>

                  {fixedSwapInfo.order.total > 0 &&
                  <button className="btn btn-default btn-default-lg mt-4 md:mt-0 md:ml-4" 
                  onClick={e => {
                    if (pool.is_openbox){
                      setStep(3)
                    }
                    else{
                      setStep(31)
                    }
                    
                  }} disabled="" id="cancel" scale="md">
                  {t("Cancel")}
                  </button>
                  }
                </div>

                {/* <div className="flex-grow flex items-center text-right">
                  <div className="ml-auto text-base">
                    {numberBusd} {usd_token}       
                  </div>       
                </div> */}
              </div>

            </div>
          </div>
          
          {/* <div> 
            <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 dark:border-opacity-50">

              <button className={`btn relative max-w-lg btn-default btn-default-lg btn-primary ml-auto flex-col` + ((!isApproved) ? " disabled" : "")} onClick={handleConfirm} disabled="" width="100%" scale="md">
                <span>
                  {isConfirming && <span className="spinner" />}
                  {isConfirming ? <>{t("Place Order")}</> : <>{t("Place Order")}</>}
                </span>
                <span className="block text-xs opacity-60">{numberBusd} {usd_token}</span> 
              </button>
            </div>
          </div> */}
          
          {/* {fixedSwapInfo.order.total > 0 &&
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
          } */}
        </>
        }

      </div>
    </>
  )
}
export default SubcribeByBUSD