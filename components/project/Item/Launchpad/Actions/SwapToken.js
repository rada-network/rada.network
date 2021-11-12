import { useState } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useERC20,useLaunchpadContract } from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
const SwapTokens = ({project,accountBalance}) => {
  const [isBusd, setIsBusd] = useState(false)
  return (
    <>
      {accountBalance?.rirBalance > 0 && !isBusd   ? 
      <SubcribeByRIR project={project} setIsBusd={setIsBusd} accountBalance={accountBalance} />
      :
      <SubcribeByBUSD project={project} accountBalance={accountBalance} setIsBusd={setIsBusd} />
      }
    </>
  )
}

const SubcribeByRIR = ({project,accountBalance,setIsBusd}) => {
  const {account} = useActiveWeb3React()
  const rirContract = useERC20(project.launchpadInfo.rirAddress)
  const launchpadContract = useLaunchpadContract(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberRIR,setNumberRIR] = useState("")
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await rirContract.allowance(account, launchpadContract.address)
          return response.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(rirContract, 'approve', [launchpadContract.address, ethers.constants.MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        console.log(receipt)
        toast.success(`Contract enabled - you can now subcribe invest ${receipt.transactionHash}`)
      },
      onConfirm: () => {
        console.log(ethers.utils.parseEther(numberRIR).toString())
        console.log(ethers.utils.parseEther(numberRIR).mul(100).toString())
        return callWithGasPrice(launchpadContract, 'createOrder', [ethers.utils.parseEther(numberRIR),ethers.utils.parseEther(numberRIR).mul(100)])
      },
      onSuccess: async ({ receipt }) => {
        toast.success(`Subscribed successfully ${receipt.transactionHash}`)
      },
    })
    console.log(isApproving, isApproved, isConfirmed, isConfirming)
  const disableBuying =
  !isApproved ||
  isConfirmed ||
  !numberRIR ||
  new ethers.utils.parseEther(numberRIR).lte(0)  
  return (
    <div className="global-padding">
      <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">You pay</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" name="numberRIR" id="numberRIR" className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="Number RIR" value={numberRIR}
          onChange={(e) => {setNumberRIR(e.target.value)}}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" className="sr-only">Currency</label>
            <select id="currency" name="currency" className="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent rounded-md text-sm">
              <option>RIR</option>
            </select>
          </div>
        </div>
      </div>

      {/* <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">for</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" name="price" id="price" className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="0.00" />
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <label for="currency" className="sr-only">Currency</label>
            <span id="currency" name="currency" className="pr-4">
              PRL
            </span>
          </div>
        </div>
      </div> */}

      <div className="mt-8">
        <button className={"btn btn-default btn-default-lg btn-purple mr-2" + (isApproved || isApproving ? " disabled" : "")} disabled="" onClick={e => {handleApprove()}} id="swap-button" width="100%" scale="md">
          Approve RIR
        </button>
        <button className={"btn btn-default btn-default-lg btn-purple" + (disableBuying ? " disabled" : "")} id="swap-button" width="100%" scale="md" onClick={e => {handleConfirm(),setNumberRIR(0)}}>
          Confirm
        </button>
      </div>
      {accountBalance?.busdBalance > 0 && 
      <div className="mt-2">
        <button onClick={(e) => {setIsBusd(true)}} class="btn btn-default btn-default-lg w-full" disabled="" id="swap-button" width="100%" scale="md">
          Switch to BUSD
        </button>
      </div>
      }
    </div>
  )
}

const SubcribeByBUSD = ({project,accountBalance,setIsBusd}) => {
  const {account} = useActiveWeb3React()
  const bUSDContract = useERC20(project.launchpadInfo.bUSDAddress)
  const launchpadContract = useLaunchpadContract(project.swap_contract)
  return (
    <div className="global-padding">
      <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">You pay</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" inputmode="decimal" pattern="^[0-9]*[.,]?[0-9]*$" name="price" id="price" className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="Number BUSD" />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" className="sr-only">Currency</label>
            <select id="currency" name="currency" className="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent rounded-md text-sm">
              <option>BUSD</option>
            </select>
          </div>
        </div>
      </div>

      {/* <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">for</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" name="price" id="price" className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="0.00" />
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <label for="currency" className="sr-only">Currency</label>
            <span id="currency" name="currency" className="pr-4">
              PRL
            </span>
          </div>
        </div>
      </div> */}

      <div className="mt-8">
        <button class="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" width="100%" scale="md">
          Approve BUSD
        </button>
      </div>
      {accountBalance?.rirBalance > 0 && 
      <div className="mt-2">
        <button onClick={(e) => {setIsBusd(false)}} class="btn btn-default btn-default-lg w-full" disabled="" id="swap-button" width="100%" scale="md">
          Switch to RIR
        </button>
      </div>
      }
    </div>
  )
}

export default SwapTokens