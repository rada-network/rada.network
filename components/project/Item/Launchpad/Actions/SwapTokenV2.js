import { useState,useEffect } from "react"
import {useLaunchpadInfo} from "@utils/hooks/index"
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import SubcribeByRIR from "./swaptoken/SubscribeByRIR"
import SubcribeByBUSD from "./swaptoken/SubscibeByBUSD"


const SwapTokensV2 = ({accountBalance,fetchAccountBalance,setStep,pool}) => {
  const {launchpadInfo,loading} = useLaunchpadInfo({pool})
  if (loading) return null
  return (
    <>
      {pool.is_allow_rir ?
      <SubcribeByRIR pool={pool} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} setStep={setStep} />
      :
      <SubcribeByBUSD pool={pool} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} launchpadInfo={launchpadInfo} setStep={setStep} />
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
    <>
    <div className="mt-4 mb-8">
      <label htmlFor="currency" className="uppercase text-xs block tracking-wide font-medium opacity-70">
        Status
      </label>

      <div className="h-2.5 relative mt-0 mb-8">
        <div className="h-2.5 mb-4 mt-2 border-r-2 border-l-2 border-gray-300 dark:border-gray-500 relative">
          <span className="absolute -left-1 -bottom-3.5 text-2xs">0</span>
          <span className="absolute -right-4 -bottom-3.5 text-2xs">{maxSelected*100}BUSD</span>
          <span className="block w-full h-0.5 bg-gray-300 dark:bg-gray-600 absolute top-1"></span>
        </div>

        <div className="h-2.5 absolute top-0 w-full flex font-semibold rounded-full">
          {p1 > 0 && 
          <div className={`h2.5 border-r-2 border-gray-300 dark:border-gray-500 w-${p1}/5 flex items-center transition-all relative`} style={sp1}>
            <div className="w-full flex h-1 bg-green-500">
            </div>
            <span className="absolute -right-6 -bottom-3.5 text-2xs bg-gray-100 dark:bg-gray-900 px-2">
              {(parseInt(RIR) + parseInt(currentOrderRIR)) * 100}BUSD
            </span>
          </div>}
          {p2 > 0 && 
          <div className={`h2.5 border-r-2 border-gray-300 dark:border-gray-500 w-${p2}/5 flex items-center transition-all relative`} style={sp2}>
            <div className="w-full flex h-1 bg-yellow-400">
            </div>
            <span className="absolute -right-6 -bottom-3.5 text-2xs bg-gray-100 dark:bg-gray-900 px-2">
              {parseInt(busd) + currentOrderBusd}BUSD
            </span>
          </div>}
          {p3 > 0 && 
          <div className={`w-${p3}/5 flex items-center transition-all`} style={sp3}>
            <div className="w-full h-5 flex items-center bg-transparent">
            </div>
          </div>}
        </div>
      </div>
    </div>
    </>
  )
}

export const SwapNote = function({numberBusd,numberRIR,maxSelected,currentOrderBusd,currentOrderRIR}){
  const {t} = useTranslation("launchpad")
  const [RIR,setRIR] = useState(0)
  const [busd,setBusd] = useState(0)
  useEffect(() => {
    setBusd(numberBusd)
    setRIR(numberRIR)
  },[numberBusd,numberRIR])
  return null
  return (
    <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
      {RIR > 0 &&
      <li key={1} className="relative mb-2 pl-6">
        <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <CheckSvg />  
        </span>
        <div>{t("Prefund description")}</div>
      </li>
      }
    </ul>
  )
}

export default SwapTokensV2