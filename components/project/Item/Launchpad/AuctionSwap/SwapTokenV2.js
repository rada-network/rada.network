import { useState,useEffect } from "react"
import {useLaunchpadInfo} from "@utils/hooks/index"
import { useTranslation } from "next-i18next"
import { CheckSvg } from "@components/svg/SvgIcons"
import SubcribeByBUSD from "./swaptoken/SubscibeByBUSD"


const SwapTokensV2 = ({accountBalance,fetchAccountBalance,auctionSwapInfo,setStep,pool,project}) => {
  return (
    <>
      <SubcribeByBUSD auctionSwapInfo={auctionSwapInfo} project={project} pool={pool} accountBalance={accountBalance} fetchAccountBalance={fetchAccountBalance} setStep={setStep} />
    </>
  )
}
export default SwapTokensV2