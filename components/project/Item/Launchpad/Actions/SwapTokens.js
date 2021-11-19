import { useState } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContract,useRIRContract, useERC20,useLaunchpadContract } from "@utils/hooks/useContracts"
import useMultiApproveConfirmTransaction from "@utils/hooks/useMultiApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import {useLaunchpadInfo} from "@utils/hooks/index"
import { useTranslation } from "next-i18next"
import SelectTokenType from "./SelectToken"

const SwapTokens = ({project,accountBalance,fetchAccountBalance}) => {
  const {launchpadInfo,loading} = useLaunchpadInfo({project})
  const [isBusd, setIsBusd] = useState(accountBalance.rirBalance > 0 ? false : true)
  if (loading) return null
  return (
    <>
      {accountBalance?.rirBalance > 0 && !isBusd   ? 
      <SubcribeByRIR project={project} setIsBusd={setIsBusd} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} />
      :
      <SubcribeByBUSD project={project} accountBalance={accountBalance} setIsBusd={setIsBusd} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo}/>
      }
    </>
  )
}

const SubcribeByRIR = ({project,accountBalance,setIsBusd,fetchAccountBalance,launchpadInfo}) => {
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()

  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContract()
  const launchpadContract = useLaunchpadContract(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberRIR,setNumberRIR] = useState(1)

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm,handleReload } =
  useMultiApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response1 = await rirContract.allowance(account, launchpadContract.address)
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          return response1.gt(0) && response2.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: async () => {
        const receipt_rir = await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberRIR.toString())])
        const numberBusd = (parseFloat(numberRIR) * 100).toString()
        const receipt_busd =  await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberBusd)])
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
        //console.log(ethers.utils.parseEther(numberRIR).toString())
        const numberBusd = (parseFloat(numberRIR) * 100).toString()
        return callWithGasPrice(launchpadContract, 'createOrder', [ethers.utils.parseEther(numberBusd),true])
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
  const disableBuying =
  !isApproved ||
  isConfirmed ||
  !numberRIR ||
  new ethers.utils.parseEther(numberRIR.toString()).lte(0)  
  return (
    <div className={`global-padding` + (isApproving || isConfirming ? " disabled" : "") }>

        <div className="mb-4">
          
          <div className="mt-1 relative flex">
            <div className="flex-1">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("Currency")}</label>
              <SelectTokenType setIsBusd={setIsBusd} init={0} accountBalance={accountBalance}/>
            </div>
            {/* remove the above block if user doesn't have RIR */}
            <div className="flex-1">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("Amount")}</label>
              <select id="amount" onChange={e => {setNumberRIR(e.currentTarget.value)}} name="amount" className="select-custom !rounded-l-none">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected value={1}>1 RIR</option>
                <option className="text-gray-300" value={2}>2 RIR</option>
                <option className="text-gray-300" value={3}>3 RIR</option>
                <option className="text-gray-300" value={4}>4 RIR</option>
                <option className="text-gray-300" value={5}>5 RIR</option>
              </select>
            </div>
          </div>
          <div className="dark:text-gray-400 mt-2 text-gray-500 text-right">{t("You have to pay")} <strong>{numberRIR * 100} BUSD</strong></div>
        </div>
        <div className="mt-4">
          {!isApproved && 
          <button class="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" onClick={handleApprove} width="100%" scale="md">
          {t("Approve Contract")}
          </button>
          }
          {isApproved && 
          <button class="btn btn-default btn-default-lg w-full btn-purple" onClick={handleConfirm} disabled="" id="swap-button" width="100%" scale="md">
          {t("Prefund")}
          </button>
          }
        </div>

      </div>
  )
}

const SubcribeByBUSD = ({project,accountBalance,setIsBusd,fetchAccountBalance,launchpadInfo}) => {
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()

  const bUSDContract = useBUSDContract()
  const launchpadContract = useLaunchpadContract(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberBusd,setNumberBusd] = useState(100)

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm,handleReload } =
  useMultiApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          return response2.gt(0) 
        } catch (error) {
          console.log(error)
          return false
        }
      },
      onApprove: async () => {
        const receipt_busd =  await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberBusd.toString())])
        return [receipt_busd]
      },
      onApproveSuccess: async ({ receipts }) => {
        let txs = []
        for (const receipt of receipts) {
          txs.push(receipt.transactionHash)
        }
        toast.success(`Contract enabled - you can now subcribe invest`)
      },
      onConfirm: () => {
        //console.log(ethers.utils.parseEther(numberRIR).toString())
        return callWithGasPrice(launchpadContract, 'createOrder', [ethers.utils.parseEther(numberBusd.toString()),false])
      },
      onSuccess: async ({ receipt }) => {
        await fetchAccountBalance()
        toast.success(`Subscribed successfully`)
        handleReload()
        setNumberBusd(0)
      },
    })

  console.log(isApproving, isApproved, isConfirmed, isConfirming)
  return (
    <div className={`global-padding` + (isApproving || isConfirming ? " disabled" : "") }>

        <div className="mb-4">
          
          <div className="mt-1 relative flex">
            <div className="flex-1">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("Currency")}</label>
              <SelectTokenType setIsBusd={setIsBusd} init={1} accountBalance={accountBalance}/>
            </div>
            {/* remove the above block if user doesn't have RIR */}
            <div className="flex-1">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">{t("Amount")}</label>
              <select id="amount" name="amount" onChange={e => {setNumberBusd(e.currentTarget.value)}} className="select-custom !rounded-l-none">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected value={100}>100 BUSD</option>
                <option className="text-gray-300" value={200}>200 BUSD</option>
                <option className="text-gray-300" value={300}>300 BUSD</option>
                <option className="text-gray-300" value={400}>400 BUSD</option>
                <option className="text-gray-300" value={500}>500 BUSD</option>
              </select>
            </div>
          </div>
          <div className="dark:text-gray-400 mt-2 text-gray-500 text-right">{t("You have to pay")} <strong>{numberBusd} BUSD</strong></div>
        </div>
        <div className="mt-4">
          {!isApproved && 
          <button class="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" onClick={handleApprove} width="100%" scale="md">
          {t("Approve Contract")}
          </button>
          }
          {isApproved && 
          <button class="btn btn-default btn-default-lg w-full btn-purple" onClick={handleConfirm} disabled="" id="swap-button" width="100%" scale="md">
          {t("Prefund")}
          </button>
          }
        </div>

      </div>
  )
}

export default SwapTokens