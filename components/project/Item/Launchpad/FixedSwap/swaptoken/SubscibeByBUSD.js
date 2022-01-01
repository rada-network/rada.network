import { useState,useEffect } from "react"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useBUSDContractV2,useRIRContract, useERC20,useLaunchpadContractV2 } from "@utils/hooks/useContracts"
import useMultiApproveConfirmTransaction from "@utils/hooks/useMultiApproveConfirmTransaction"
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import { set } from "lodash"
import useStore from "@lib/useStore"
import { submitPrefundLogApi } from "@data/query/projects"

const SubcribeByBUSD = ({pool,project,accountBalance,setStep,fetchAccountBalance,launchpadInfo}) => {
  const store = useStore()
  const {t} = useTranslation("launchpad")
  const {account} = useActiveWeb3React()

  const rirContract = useRIRContract()
  const bUSDContract = useBUSDContractV2()
  const {callWithGasPrice} = useCallWithGasPrice()

  
  
  return (
    <>
      <div className="global-padding">
        <div className="mb-2 flex gap-4">
          <div className="w-1/2">
            <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Quantity (boxes)</label>
          </div>
          <div className="w-1/2 text-right">
            <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">Price</label>
          </div>
          
        </div>
        <div className="relative">
          <div className="mb-4 flex gap-4 relative item-center">
            <div className="w-1/2 flex-grow">
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
            <div className="w-1/2  flex-grow flex items-center text-right">
              <div className="ml-auto text-xl">
                500 BUSD       
              </div>       
            </div>
          </div>
    
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 dark:border-opacity-50"></div>
          
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        <div className="mt-4  grid grid-cols-2 gap-4"> 
          {/* bỏ grid grid-cols-2 nếu user không có RIR hoặc không dùng RIR */}
          <div className="flex-shrink-0 flex-grow">
            <button className="btn relative  w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            <span className="spinner" /> 
              Enable BUSD
            </button>     
          </div>
          <div  className="flex-shrink-0 flex-grow">
            <button className="btn disabled relative w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            {/* <span className="spinner" />  */}
              Prefund
            </button>         
          </div>
        </div>

        

      </div>
    </>
  )
}
export default SubcribeByBUSD