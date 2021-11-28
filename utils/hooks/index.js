import {useState, useEffect} from "react"
import {utils} from "ethers"
import { useLaunchpadContractV2 } from "./useContracts"
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
  const lauchpadContact = useLaunchpadContractV2(project.swap_contract)
  const fetchLaunchpadInfo = async () => {
    try {
      let individualMinimumAmount = await lauchpadContact.individualMinimumAmountBusd()
      let individualMaximumAmount = await lauchpadContact.individualMaximumAmountBusd()
      let buyers = await lauchpadContact.getSubscribers()
      let currentOrder = await lauchpadContact.getOrderSubscriber(account)
      let winners = await lauchpadContact.getWinners()
      let claimable = await lauchpadContact.getClaimable(account)
      let updateInfo = {
        individualMinimumAmount : utils.formatEther(individualMinimumAmount),
        individualMaximumAmount : utils.formatEther(individualMaximumAmount),
        ordersBuyerCount : buyers.length,
        buyers : buyers,
        currentOrder : currentOrder,
        winnerCount : winners.length,
        winners,
        claimable
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