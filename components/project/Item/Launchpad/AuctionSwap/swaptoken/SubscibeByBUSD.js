import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useAuctionSwapContract, useBUSDContractV2,useRIRContract} from "@utils/hooks/useContracts"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import useStore from "@lib/useStore"

const SubcribeByBUSD = ({pool,project,accountBalance,setStep,fetchAccountBalance,auctionSwapInfo}) => {
  const store = useStore()
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()
  const launchpadContract = useAuctionSwapContract(pool)
  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const {callWithGasPrice} = useCallWithGasPrice()
  const [numberBox,setNumberBox] = useState(1)
  const [numberBusd,setNumberBusd] = useState(auctionSwapInfo.info.startPrice)

  
  const maxSelected = auctionSwapInfo.info.maxBuyPerAddress - auctionSwapInfo.order.total
  const handleChangeNumberBox = function(e){
    setNumberBox(e.currentTarget.value)
    setNumberBusd(parseInt(e.currentTarget.value)*auctionSwapInfo.info.startPrice )
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
      return callWithGasPrice(launchpadContract, 'placeOrder', [pool.id,numberBox,ethers.utils.parseEther(numberBusd.toString())])
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
        <div className="flex relative p-2 flex items-center border border-gray-100 dark:border-gray-800 mb-4 rounded-md">
          <button className="btn btn-default !px-1 mr-2">
            <span className="w-4 spin-10 h-4 rounded-full border-2 border-gray-300 dark:border-gray-400 border-l-purple-500 dark:border-l-purple-600" />
          </button>
          <span>Your current position</span>
          <div className="ml-auto">
            <span className="font-semibold">8</span>
            <span className="opacity-50">/215</span>
          </div>
        </div>
        <div className="mb-4 p2-4 text-xs uppercase tracking-wide flex border-b dark:border-opacity-40 border-gray-200 dark:border-gray-700">
          <div className="w-1/6 flex-shrink-0 pr-2">
            <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Boxes</label>
          </div>
          <div className="w-1/4 flex-shrink-0 pl-2">
            <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">BUSD per box</label>
          </div>
          <div className="w-1/4 flex-shrink-0 px-4">
            <label className="mb-2 block tracking-wide font-medium opacity-70">Total</label>
          </div>
          
        </div>
        <div className="mb-4 flex items-center relative">
          <div className="w-1/6 pr-2 flex-shrink-0">
            <select id="box" name="amount" className="select-custom w-full ">
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              <option className="text-gray-300" selected>1</option>
              <option className="text-gray-300">2</option>
              <option className="text-gray-300">3</option>
              <option className="text-gray-300">4</option>
              <option className="text-gray-300">5</option>
              <option className="text-gray-300">6</option>
              <option className="text-gray-300">7</option>
              <option className="text-gray-300">8</option>
              <option className="text-gray-300">9</option>
              <option className="text-gray-300">10</option>
            </select>
          </div>
          <div className="w-1/4 pl-2 flex-shrink-0">
            <select id="rir" name="rir" className="select-custom w-full ">
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              <option className="text-gray-300" selected>100</option>
              <option className="text-gray-300">200 </option>
              <option className="text-gray-300">300</option>
              <option className="text-gray-300">400</option>
              <option className="text-gray-300">500</option>
              <option className="text-gray-300">600</option>
              <option className="text-gray-300">700</option>
              <option className="text-gray-300">800</option>
              <option className="text-gray-300">900</option>
              <option className="text-gray-300">1000</option>
            </select>          
          </div>
          <div className="w-1/4 pl-4 font-semibold">600</div>
          <button className="ml-2 md:ml-4 flex-shrink-0 flex-grow btn btn-primary py-2 flex justify-center">
            <i className="fas fa-check-circle mr-1"></i> Increase
          </button>
        </div>

        <div className="flex  items-center relative">
          <div className="w-1/6 pr-2 flex-shrink-0">
            <select id="box" name="amount" className="select-custom w-full ">
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              <option className="text-gray-300" selected>--</option>
              <option className="text-gray-300">1</option>
              <option className="text-gray-300">2</option>
              <option className="text-gray-300">3</option>
              <option className="text-gray-300">4</option>
              <option className="text-gray-300">5</option>
              <option className="text-gray-300">6</option>
              <option className="text-gray-300">7</option>
              <option className="text-gray-300">8</option>
              <option className="text-gray-300">9</option>
              <option className="text-gray-300">10</option>
            </select>
          </div>
          <div className="w-1/4 pl-2 flex-shrink-0">
            <select id="rir" name="rir" className="select-custom  w-full ">
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              <option className="text-gray-300" selected>Price</option>
              <option className="text-gray-300" >100</option>
              <option className="text-gray-300">200</option>
              <option className="text-gray-300">300</option>
              <option className="text-gray-300">400</option>
              <option className="text-gray-300">500</option>
              <option className="text-gray-300">600</option>
              <option className="text-gray-300">700</option>
              <option className="text-gray-300">800</option>
              <option className="text-gray-300">900</option>
              <option className="text-gray-300">1000</option>
            </select>          
          </div>
          <div className="w-1/4 pl-2"></div>
          <button className="ml-2 md:ml-4 py-2 flex-grow flex-shrink-0 btn btn-primary px-2 disabled flex justify-center">
            <i className="fas fa-plus-circle mr-1"></i>Add bid</button>
        </div>
        
        
        


          

          
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        {/* <div className="mt-4  grid grid-cols-2 gap-4"> 
         
          <div className="flex-shrink-0 flex-grow">
            <button className="btn relative disabled  w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
          
              Enable BUSD
            </button>     
          </div>
          <div  className="flex-shrink-0 flex-grow">
            <button className="btn relative w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            
              Prefund
            </button>         
          </div>
        </div> */}

        

      </div>

    </>
  )
}
export default SubcribeByBUSD