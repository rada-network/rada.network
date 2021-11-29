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
import { set } from "lodash"
import SubcribeByRIR from "./swaptoken/SubscribeByRIR"
import SubcribeByBUSD from "./swaptoken/SubscibeByBUSD"


const SwapTokensV2 = ({project,accountBalance,fetchAccountBalance,setStep}) => {
  const {launchpadInfo,loading} = useLaunchpadInfo({project})
  if (loading) return null
  return (
    <>
      {project.is_allow_rir ?
      <SubcribeByRIR project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} setStep={setStep} />
      :
      <SubcribeByBUSD project={project} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} setStep={setStep} />
      }

    </>
  )
}

export const SwapDescription = ({numberBusd,numberRIR,maxSelected,currentOrderBusd,currentOrderRIR}) => {

  const [RIR,setRIR] = useState(numberRIR)
  const [busd,setBusd] = useState(numberBusd)
  useEffect(() => {
    setBusd(numberBusd)
    setRIR(numberRIR)
  },[numberBusd,numberRIR])
  const p1 = ((parseInt(RIR) + currentOrderRIR)/maxSelected*5);
  const p2 = (((parseInt(busd) + currentOrderBusd)/100 - p1*maxSelected/5)/maxSelected*5);
  const p3 = 5 - (p1 + p2)
  console.log((parseInt(busd) + currentOrderBusd)/100)
  console.log(busd,RIR,currentOrderRIR,currentOrderBusd,maxSelected)
  console.log(p1,p2,p3)
  const sp1 = {
    width: p1/5 * 100 + "%"
  };
  const sp2 = {
    width: p2/5 * 100 + "%"
  };
  const sp3 = {
    width: p3/5 * 100 + "%"
  };
  return (
    <div className="flex mt-4 rounded-2xl overflow-hidden text-xs font-semibold">
      {p1 > 0 && 
      <div className={`w-${p1}/5 flex items-center transition-all`} style={sp1}>
        <div className="w-full flex items-center text-white h-6 pl-2  bg-green-600">
        {(parseInt(RIR) + currentOrderRIR) * 100} BUSD
        </div>
      </div>}
      {p2 > 0 && 
      <div className={`w-${p2}/5 flex items-center transition-lex items-center transition-all`} style={sp2}>
        <div className="w-full h-6 flex items-center  text-gray-700 pl-2 bg-yellow-300 ">{parseInt(busd) + currentOrderBusd - (parseInt(RIR) + currentOrderRIR) * 100 } BUSD</div>    
      </div>}
      {p3 > 0 && 
      <div className={`w-${p3}/5 flex flex items-center transition-all`} style={sp3}>
        <div className="w-full h-6 flex items-center bg-gray-300 dark:bg-gray-700"></div>
      </div>}
    </div>
  )
}

export const SwapNote = function({numberBusd,numberRIR,maxSelected,currentOrderBusd,currentOrderRIR}){
  const [RIR,setRIR] = useState(0)
  const [busd,setBusd] = useState(0)
  useEffect(() => {
    setBusd(numberBusd)
    setRIR(numberRIR)
  },[numberBusd,numberRIR])
  return (
    <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
      {RIR > 0 && 
      <li key={0} className="flex mb-2 relative pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div className="">{(parseInt(RIR) + currentOrderRIR) * 100} BUSD ({parseInt(RIR) + currentOrderRIR} RIR) is guaranteed.</div>
      </li>
      }
      <li key={1} className="relative mb-2 pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div>The rest of your investment will be distributed based on the total subscripption.</div>
      </li>
      <li key={2} className="relative mb-2 pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div>Your total prefund: {parseInt(busd) + currentOrderBusd} BUSD</div>
      </li>
    </ul>
  )
}

export default SwapTokensV2