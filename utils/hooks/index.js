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
  const {account,connector,active,library} = useActiveWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(false)
  const [loading,setLoading] = useState(true)
  const lauchpadContact = useLaunchpadContract(project.swap_contract)
  const fetchLaunchpadInfo = async () => {
    try {
      let tokenAddress = await lauchpadContact.tokenAddress()
      let rirAddress = await lauchpadContact.rirAddress()
      let individualMinimumAmount = await lauchpadContact.individualMinimumAmountBusd()
      let individualMaximumAmount = await lauchpadContact.individualMaximumAmountBusd()
      let ordersBuyerCount = await lauchpadContact.ordersBuyerCount()
      let buyers = await lauchpadContact.getBuyers()
      let currentOrder = await lauchpadContact.ordersBuyer(account)
      let updateInfo = {
        individualMinimumAmount : utils.formatEther(individualMinimumAmount),
        individualMaximumAmount : utils.formatEther(individualMaximumAmount),
        tokenAddress : utils.getAddress(tokenAddress),
        rirAddress : utils.getAddress(rirAddress),
        ordersBuyerCount : parseInt(utils.formatEther(ordersBuyerCount)),
        buyers : buyers,
        currentOrder : currentOrder,
      }
      setLaunchpadInfo(updateInfo)
     } catch (error) {
      console.log(error)
      //console.log("error to fetch launchpad info",error)
      return null
    }
  }
  useEffect(() => {
    if (!!account && !!lauchpadContact && active && library){
      setLoading(true)
      fetchLaunchpadInfo().then(function(res){
        setLoading(false)
      })
    }
    else{
      setLoading(false)
      setLaunchpadInfo(null)
    }
  }, [account,lauchpadContact,active,setLoading,library])
  return {loading,launchpadInfo,fetchLaunchpadInfo}
}