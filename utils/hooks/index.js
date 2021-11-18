import {useState, useEffect} from "react"
import {utils} from "ethers"
import { useLaunchpadContract } from "./useContracts"
import useActiveWeb3React from "./useActiveWeb3React"
import { useWeb3React } from '@web3-react/core'
import { GAS_PRICE_GWEI } from "../../config/gas"
export function useGasPrice() {
  const userGas = GAS_PRICE_GWEI.instant
  return process.env.NEXT_PUBLIC_CHAIN == 'production' ? userGas : GAS_PRICE_GWEI.testnet
}

export const useLaunchpadInfo = ({project}) => {
  const {account,connector,active} = useWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(false)
  const lauchpadContact = useLaunchpadContract(project.swap_contract)
  const fetchLaunchpadInfo = async () => {
    try {
      console.log(account)
      let tokenAddress = await lauchpadContact.tokenAddress()
      let bUSDAddress = await lauchpadContact.bUSDAddress()
      let rirAddress = await lauchpadContact.rirAddress()
      let tokensForSale = await lauchpadContact.tokensForSale()
      let tokenPrice = await lauchpadContact.tokenPrice()
      let tokensAllocated = await lauchpadContact.tokensAllocated()
      let individualMinimumAmount = await lauchpadContact.individualMinimumAmountBusd()
      let individualMaximumAmount = await lauchpadContact.individualMaximumAmountBusd()
      let ordersBuyerCount = await lauchpadContact.ordersBuyerCount()
      let buyers = await lauchpadContact.getBuyers()
      let currentOrder = await lauchpadContact.ordersBuyer(account)
      let updateInfo = {
        tokensForSale : utils.formatEther(tokensForSale),
        tokenPrice : utils.formatEther(tokenPrice),
        tokensAllocated : utils.formatEther(tokensAllocated),
        individualMinimumAmount : utils.formatEther(individualMinimumAmount),
        individualMaximumAmount : utils.formatEther(individualMaximumAmount),
        tokenAddress : utils.getAddress(tokenAddress),
        bUSDAddress : utils.getAddress(bUSDAddress),
        rirAddress : utils.getAddress(rirAddress),
        ordersBuyerCount : parseInt(utils.formatEther(ordersBuyerCount)),
        buyers : buyers,
        currentOrder : currentOrder,
      }
      setLaunchpadInfo(updateInfo)
     } catch (error) {
      setLaunchpadInfo(null)
      console.log(error)
      //console.log("error to fetch launchpad info",error)
    }
  }
  useEffect(() => {
    if (!!account && !!lauchpadContact && active){
      fetchLaunchpadInfo().then(function(){
        
      })
    }
    else{
      setLaunchpadInfo(false)
    }
  }, [account,lauchpadContact,active])
  return {launchpadInfo,fetchLaunchpadInfo}
}