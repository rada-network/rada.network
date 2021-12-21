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

const DEV_STATUS_FAILED = {
  tokenAddress : "0x0000000000000000000000000000000000000000",
  allocationBusd : 5000,
  allocationRir : 200,
  price : 0.04,
  startDate : 0,
  endDate : 0,
  individualMinimumAmount : 500,
  individualMaximumAmount : 500,
  ordersBuyerCount : 0,
  buyers : [],
  winnerCount : 0,
  winners : [],
  claimable : 0,
  refundable : [
    0,
    0,
  ],
  stat : {
    depositedToken : 0,
    amountBusd : 5000,
    amountRir : 180,
    approvedBusd : 5000,
    approvedRir : 180
  },
  investor : {
    allocationBusd : 0,
    allocationRir : 0,
    amountBusd : 0,
    amountRir : 0,
    claimedToken : 0,
    paid : false,
    refunded : false,
    approved : false,
  }
}

const DEV_STATUS_FAILED_REFUND = {
  tokenAddress : "0x0000000000000000000000000000000000000000",
  allocationBusd : 5000,
  allocationRir : 200,
  price : 0.04,
  startDate : 0,
  endDate : 0,
  individualMinimumAmount : 100,
  individualMaximumAmount : 500,
  ordersBuyerCount : 0,
  buyers : [],
  winnerCount : 0,
  winners : [],
  claimable : 0,
  refundable : [
    300,
    0,
  ],
  stat : {
    depositedToken : 0,
    amountBusd : 5000,
    amountRir : 180,
    approvedBusd : 5000,
    approvedRir : 180
  },
  investor : {
    allocationBusd : 0,
    allocationRir : 0,
    amountBusd : 300,
    amountRir : 0,
    claimedToken : 0,
    paid : true,
    refunded : false,
    approved : false,
  }
}

const DEV_STATUS_SUCCESS = {
  tokenAddress : "0x0000000000000000000000000000000000000000",
  allocationBusd : 5000,
  allocationRir : 200,
  price : 0.04,
  startDate : 0,
  endDate : 0,
  individualMinimumAmount : 100,
  individualMaximumAmount : 500,
  ordersBuyerCount : 0,
  buyers : [],
  winnerCount : 0,
  winners : [],
  claimable : 0,
  refundable : [
    0,
    0,
  ],
  stat : {
    depositedToken : 0,
    amountBusd : 5000,
    amountRir : 180,
    approvedBusd : 5000,
    approvedRir : 180
  },
  investor : {
    allocationBusd : 300,
    allocationRir : 3,
    amountBusd : 300,
    amountRir : 3,
    claimedToken : 0,
    paid : true,
    refunded : false,
    approved : true,
  }
}

const DEV_STATUS_SUCCESS_REFUND = {
  tokenAddress : "0x0000000000000000000000000000000000000000",
  allocationBusd : 5000,
  allocationRir : 200,
  price : 0.04,
  startDate : 0,
  endDate : 0,
  individualMinimumAmount : 100,
  individualMaximumAmount : 500,
  ordersBuyerCount : 0,
  buyers : [],
  winnerCount : 0,
  winners : [],
  claimable : 0,
  refundable : [
    100,
    1,
  ],
  stat : {
    depositedToken : 0,
    amountBusd : 5000,
    amountRir : 180,
    approvedBusd : 5000,
    approvedRir : 180
  },
  investor : {
    allocationBusd : 200,
    allocationRir : 2,
    amountBusd : 300,
    amountRir : 3,
    claimedToken : 0,
    paid : true,
    refunded : false,
    approved : true,
  }
}

const DEV_STATUS_CLAIM = {
  tokenAddress : "0xbaDB6b73c2FBE647a256Cf8F965f89573A054113",
  allocationBusd : 5000,
  allocationRir : 200,
  price : 0.04,
  startDate : 0,
  endDate : 0,
  individualMinimumAmount : 100,
  individualMaximumAmount : 500,
  ordersBuyerCount : 0,
  buyers : [],
  winnerCount : 0,
  winners : [],
  claimable : 500,
  refundable : [
    0,
    0,
  ],
  stat : {
    depositedToken : 60000,
    amountBusd : 5000,
    amountRir : 180,
    approvedBusd : 5000,
    approvedRir : 180
  },
  investor : {
    allocationBusd : 200,
    allocationRir : 2,
    amountBusd : 300,
    amountRir : 3,
    claimedToken : 0,
    paid : true,
    refunded : true,
    approved : true,
  }
}

export const useLaunchpadInfo = ({pool,status}) => {
  const {account,connector,active,library} = useActiveWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(false)
  const [loading,setLoading] = useState(true)
  const lauchpadContact = useLaunchpadContractV2(pool)
  
  const fetchLaunchpadInfo = async () => {
    try {
      let updateInfo;
      if (process.env.NEXT_PUBLIC_CHAIN === "dev" && !!status && status !== ""){
        switch (status){
          case "success" :
            updateInfo = DEV_STATUS_SUCCESS
            break;
          case "successRefund" :
            updateInfo = DEV_STATUS_SUCCESS_REFUND
            break;
          case "fail" :
            updateInfo = DEV_STATUS_FAILED
            break;
          case "failRefund" :
            updateInfo = DEV_STATUS_FAILED_REFUND
            break;
          case "claim" :
            updateInfo = DEV_STATUS_CLAIM
            break;
          default :
            break
        }
        if (!!updateInfo){
          setLaunchpadInfo(updateInfo)
          return null
        }
      }
      
      let info = await lauchpadContact.pools(pool.id)
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
      
      updateInfo = {
        tokenAddress : info.tokenAddress,
        allocationBusd : parseFloat(ethers.utils.formatEther(info.allocationBusd)),
        allocationRir : parseFloat(ethers.utils.formatEther(info.allocationRir)),
        price : parseFloat(ethers.utils.formatEther(info.price)),
        startDate : parseFloat(ethers.utils.formatEther(info.startDate)),
        endDate : parseFloat(ethers.utils.formatEther(info.endDate)),
        individualMinimumAmount : pool.is_whitelist ? investor.amountBusd : parseFloat(ethers.utils.formatEther(info.minAllocationBusd)),
        individualMaximumAmount : pool.is_whitelist ? investor.amountBusd : parseFloat(ethers.utils.formatEther(info.maxAllocationBusd)),
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