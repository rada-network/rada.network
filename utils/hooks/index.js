import {useState, useEffect} from "react"
import {ethers, utils} from "ethers"
import { useLaunchpadContractV2 } from "./useContracts"
import useActiveWeb3React from "./useActiveWeb3React"
import { useWeb3React } from '@web3-react/core'
import { GAS_PRICE_GWEI } from "../../config/gas"
export function useGasPrice() {
  const userGas = GAS_PRICE_GWEI.instant
  return process.env.NEXT_PUBLIC_CHAIN == 'production' ? userGas : GAS_PRICE_GWEI.testnet
}

export const useLaunchpadInfo = ({pool}) => {
  const {account,connector,active,library} = useActiveWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(false)
  const [loading,setLoading] = useState(true)
  const lauchpadContact = useLaunchpadContractV2(pool)
  
  const fetchLaunchpadInfo = async () => {
    try {
      let info = await lauchpadContact.getPool(pool.id)
      let claimable = await lauchpadContact.getClaimable(pool.id)
      let refundable = await lauchpadContact.getRefundable(pool.id)
      let investor = await lauchpadContact.getInvestor(pool.id,account)
      let stat = await lauchpadContact.poolsStat(pool.id)
      stat = {
        depositedToken : parseFloat(ethers.utils.formatEther(stat.depositedToken)),
        amountBusd : parseFloat(ethers.utils.formatEther(stat.amountBusd)),
        amountRir : parseFloat(ethers.utils.formatEther(stat.amountRir)),
        approvedBusd : parseFloat(ethers.utils.formatEther(stat.approvedBusd)),
        approvedRir : parseFloat(ethers.utils.formatEther(stat.approvedRir))
      }
      investor = {
        allocationBusd : parseFloat(ethers.utils.formatEther(investor.allocationBusd)),
        allocationRir : parseFloat(ethers.utils.formatEther(investor.allocationRir)),
        amountBusd : parseFloat(ethers.utils.formatEther(investor.amountBusd)),
        amountRir : parseFloat(ethers.utils.formatEther(investor.amountRir)),
        claimedToken : parseFloat(ethers.utils.formatEther(investor.claimedToken)),
        paid : investor.paid,
        refunded : investor.refunded,
        approved : investor.approved,
      }
      
      let updateInfo = {
        tokenAddress : info.tokenAddress,
        allocationBusd : parseFloat(ethers.utils.formatEther(info.allocationBusd)),
        allocationRir : parseFloat(ethers.utils.formatEther(info.allocationRir)),
        price : parseFloat(ethers.utils.formatEther(info.price)),
        startDate : parseFloat(ethers.utils.formatEther(info.startDate)),
        endDate : parseFloat(ethers.utils.formatEther(info.endDate)),
        price : parseFloat(ethers.utils.formatEther(info.price)),
        individualMinimumAmount : pool.is_whitelist ? investor.allocationBusd : parseFloat(ethers.utils.formatEther(info.minAllocationBusd)),
        individualMaximumAmount : pool.is_whitelist ? investor.allocationBusd : parseFloat(ethers.utils.formatEther(info.maxAllocationBusd)),
        ordersBuyerCount : 0,
        buyers : [],
        winnerCount : 0,
        winners : [],
        claimable : parseFloat(ethers.utils.formatEther(claimable)),
        refundable : [
          parseFloat(ethers.utils.formatEther(refundable[0])),
          parseFloat(ethers.utils.formatEther(refundable[1])),
        ],
        stat,
        investor
      }
      console.log(updateInfo)
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