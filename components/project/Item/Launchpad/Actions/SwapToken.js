import { useState } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useERC20,useLaunchpadContract } from "@utils/hooks/useContracts"
import useMultiApproveConfirmTransaction from "@utils/hooks/useMultiApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import {useLaunchpadInfo} from "@utils/hooks/index"

const SwapTokens = ({project,accountBalance,fetchAccountBalance}) => {
  const [isBusd, setIsBusd] = useState(false)
  return (
    <>
      {accountBalance?.rirBalance > 0 && !isBusd   ? 
      <SubcribeByRIR project={project} setIsBusd={setIsBusd} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} />
      :
      <SubcribeByBUSD project={project} accountBalance={accountBalance} setIsBusd={setIsBusd} fetchAccountBalance={fetchAccountBalance}/>
      }
    </>
  )
}

const SubcribeByRIR = ({project,accountBalance,setIsBusd,fetchAccountBalance}) => {
  const {account} = useActiveWeb3React()

  const {launchpadInfo} = useLaunchpadInfo({project})

  const rirContract = useERC20(launchpadInfo.rirAddress)
  const bUSDContract = useERC20(launchpadInfo.bUSDAddress)
  const launchpadContract = useLaunchpadContract(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberRIR,setNumberRIR] = useState(0)
  
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
        const receipt_rir = await callWithGasPrice(rirContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberRIR)])
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
  new ethers.utils.parseEther(numberRIR).lte(0)  
  return (
    <div className={`global-padding` + (isApproving || isConfirming ? " disabled" : "")}>
      <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">Number RIR</label>
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
      <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">Number BUSD pay for token</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" name="bumber BUSD" id="number BUSD" disabled={true} className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="Number BUSD" value={parseFloat(numberRIR)*100}
          />
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
        <button className={"btn btn-default btn-default-lg btn-purple mr-2" + (isApproved || isApproving ? " disabled" : "")} disabled="" onClick={e => {handleApprove()}} id="swap-button" width="100%" scale="md">
          Approve
        </button>
        <button className={"btn btn-default btn-default-lg btn-purple" + (disableBuying ? " disabled" : "")} id="swap-button" width="100%" scale="md" onClick={e => {handleConfirm()}}>
          Subscribe
        </button>
      </div>
      {/* <div className="mt-8">
        <button className={"btn btn-default btn-default-lg btn-purple mr-2" + (isApproved || isApproving ? " " : "disabled")} disabled="" onClick={e => {resetApproved()}} id="swap-button" width="100%" scale="md">
          Reset Approved
        </button>
      </div> */}
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

const SubcribeByBUSD = ({project,accountBalance,setIsBusd,fetchAccountBalance}) => {
  const {account} = useActiveWeb3React()

  const {launchpadInfo} = useLaunchpadInfo({project})

  const rirContract = useERC20(launchpadInfo.rirAddress)
  const bUSDContract = useERC20(launchpadInfo.bUSDAddress)
  const launchpadContract = useLaunchpadContract(project.swap_contract)
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberBusd,setNumberBusd] = useState(0)
  
  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm,handleReload } =
  useMultiApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response2 = await bUSDContract.allowance(account, launchpadContract.address)
          return response2.gt(0) 
        } catch (error) {
          return false
        }
      },
      onApprove: async () => {
        const receipt_busd =  await callWithGasPrice(bUSDContract, 'approve', [launchpadContract.address, ethers.utils.parseEther(numberBusd)])
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
        return callWithGasPrice(launchpadContract, 'createOrder', [ethers.utils.parseEther(numberBusd),false])
      },
      onSuccess: async ({ receipt }) => {
        await fetchAccountBalance()
        toast.success(`Subscribed successfully`)
        handleReload()
        setNumberBusd(0)
      },
    })
  const disableBuying =
  !isApproved ||
  isConfirmed ||
  !numberBusd ||
  new ethers.utils.parseEther(numberBusd).lte(0)
  return (
    <div className={`global-padding` + (isApproving || isConfirming ? " disabled" : "")}>
      <div className="mb-4">
        <label for="price" className="block text-xs font-medium uppercase mb-2">You pay</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input type="text" inputmode="decimal" pattern="^[0-9]*[.,]?[0-9]*$" name="numberBusd" id="numberBusd" className="inputbox inputbox-lg inputbox-numbers !pr-20"
          value={numberBusd} onChange={(e) => {setNumberBusd(e.target.value)}} placeholder="Number BUSD" />
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
        <button className={"btn btn-default btn-default-lg btn-purple mr-2" + (isApproved || isApproving ? " disabled" : "")} onClick={e => {handleApprove()}} id="swap-button" width="100%" scale="md">
          Approve BUSD
        </button>
        <button className={"btn btn-default btn-default-lg btn-purple" + (disableBuying ? " disabled" : "")} id="swap-button" width="100%" scale="md" onClick={e => {handleConfirm()}}>
          Subscribe
        </button>
      </div>
      {accountBalance?.rirBalance > 0 && 
      <div className="mt-2">
        <button onClick={(e) => {setIsBusd(false)}} class="btn btn-default btn-default-lg w-full"  id="swap-button" width="100%" scale="md">
          Switch to RIR
        </button>
      </div>
      }
    </div>
  )
}

export default SwapTokens