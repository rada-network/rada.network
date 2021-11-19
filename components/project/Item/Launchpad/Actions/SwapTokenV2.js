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

const SwapTokensV2 = ({project,accountBalance,fetchAccountBalance}) => {
  const {launchpadInfo,loading} = useLaunchpadInfo({project})
  if (loading) return null
  return (
    <>
      <SubcribeByRIR project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} />
    </>
  )
}

const SubcribeByRIR = ({project,accountBalance,setIsBusd,fetchAccountBalance,launchpadInfo}) => {
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()

  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const launchpadContract = useLaunchpadContractV2(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberRIR,setNumberRIR] = useState(accountBalance.rirBalance > 0 ? 1 : 0)
  const [numberBusd,setNumberBusd] = useState(100)

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm,handleReload } =
  useMultiApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          if (parseInt(numberRIR) == 0){
            return response2.gt(0)
          }
          const response1 = await rirContract.allowance(account, launchpadContract.address)
          return response1.gt(0) && response2.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: async () => {
        
        const receipt_busd =  await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberBusd.toString())])
        if (parseInt(numberRIR) == 0){
          return [receipt_busd]
        }
        const receipt_rir = await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberRIR.toString())])
        return [receipt_rir,receipt_busd]
      },
      onApproveSuccess: async ({ receipts }) => {
        let txs = []
        for (const receipt of receipts) {
          txs.push(receipt.transactionHash)
        }
        toast.success(`Contract enabled - you can now subcribe invest`)
      },
      onConfirm: () => {
        const isRIR = parseInt(numberRIR) > 0 ? true : false
        console.log(numberBusd,numberRIR,isRIR)
        return callWithGasPrice(launchpadContract, 'createOrder', [ethers.utils.parseEther(numberBusd.toString()),ethers.utils.parseEther(numberRIR.toString()),isRIR])
      },
      onSuccess: async ({ receipt }) => {
        await fetchAccountBalance()
        toast.success(`Subscribed successfully ${receipt.transactionHash}`)
        handleReload()
        setNumberRIR(0)
      },
    })
    const resetApproved = async () => {
      await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, 0])
      await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, 0])
    }
    const maxSelected = parseInt(launchpadInfo.individualMaximumAmount)/100
  const disableBuying =
  !isApproved ||
  isConfirmed ||
  !numberRIR ||
  new ethers.utils.parseEther(numberRIR.toString()).lte(0)  
  return (
    <>
      <div className={`global-padding` + (isApproving || isConfirming ? " disabled" : "") }>

        <div className="mb-4">
          
          <div className="mt-1 relative">
            
            {/* remove the above block if user doesn't have RIR */}
            <div className="">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("Amount")}</label>
              <select id="amount" name="amount" className="select-custom" onChange={e => {setNumberBusd(e.currentTarget.value)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <option className="text-gray-300" value={(i+1) * 100} selected={(i+1) * 100 == numberBusd ? true : false}>{(i+1) * 100} BUSD</option>
                  )
                })}
              </select>
            </div>
            {accountBalance.rirBalance > 0 && 
            <div className="mt-4">
              <label for="rir" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("RIR")}</label>
              <select id="rir" name="rir" className="select-custom " onChange={e => {setNumberRIR(e.currentTarget.value)}}>
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" value={0} selected={true}>{0} RIR</option>
                {Array(maxSelected).fill(null).map((_, i) => {
                  return (
                    <>
                    {parseInt(numberBusd)/100 >= i+1 &&
                    <option className="text-gray-300" value={(i+1)} selected={i === 0 ? true : false}>{(i+1)} RIR</option>
                    }
                    </>
                  )
                })}
              </select>
            </div>
            }
            <SwapDescription numberBusd={numberBusd} numberRIR={numberRIR} /> 
          
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
        </div>

        <SwapNote numberBusd={numberBusd} numberRIR={numberRIR} />

      </div>

    </>
  )
}

const SwapDescription = ({numberBusd,numberRIR}) => {
  const [RIR,setRIR] = useState(0)
  const [busd,setBusd] = useState(0)
  useEffect(() => {
    setBusd(numberBusd)
    setRIR(numberRIR)
  },[numberBusd,numberRIR])
  return (
    <div className="flex mt-4 rounded-2xl overflow-hidden text-xs font-semibold">
      <div className={`w-2/5 flex items-center transition-all`}>
        <div className="w-full flex items-center text-white h-6 pl-2  bg-green-600">
        {parseInt(RIR) * 100} busd
        </div>
      </div>
      <div className="w-2/5 flex flex items-center transition-all">
        <div className="w-full h-6 flex items-center  text-gray-700 pl-2 bg-yellow-300 ">{busd - parseInt(RIR) * 100 } busd</div>    
      </div>
      <div className="w-1/5 flex flex items-center transition-all">
        <div className="w-full h-6 flex items-center bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}

const SwapNote = function({numberBusd,numberRIR}){
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
        <div className="">{RIR * 100} BUSD ({RIR} RIR) is guaranteed.</div>
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
        <div>Your total prefund: {busd} BUSD</div>
      </li>
    </ul>
  )
}

export default SwapTokensV2