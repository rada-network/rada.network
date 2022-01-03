import {useState, useEffect} from "react"
import {ethers, utils} from "ethers"
import { useAuctionSwapContract, useFixedSwapContract, useLaunchpadContractV2 } from "./useContracts"
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
  totalClaimable : 0,
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
  totalClaimable : 0,
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
  totalClaimable : 0,
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
  totalClaimable : 0,
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
  totalClaimable : 5000,
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
      let totalClaimable = await lauchpadContact.getTotalClaimable(pool.id)
      let claimable = ethers.constants.Zero
      try {
        claimable = await lauchpadContact.getClaimable(pool.id)
      }
      catch (e) {
        console.log(e)
      }
      
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
        allocationBusd : parseFloat(ethers.utils.formatEther(investor.allocationBusd)).toFixed(2),
        allocationRir : parseFloat(ethers.utils.formatEther(investor.allocationRir)).toFixed(2),
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
        totalClaimable : parseFloat(ethers.utils.formatEther(totalClaimable)),
        refundable : [
          parseFloat(ethers.utils.formatEther(refundable[0])),
          parseFloat(ethers.utils.formatEther(refundable[1])),
        ],
        stat,
        investor
      }
      //console.log(updateInfo)
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

export const usePoolInfo = ({pool,status}) => {
  const {account,connector,active,library} = useActiveWeb3React()
  const [launchpadInfo,setLaunchpadInfo] = useState(false)
  const [loading,setLoading] = useState(true)
  const lauchpadContact = useLaunchpadContractV2(pool)
  
  const fetchPoolInfo = async () => {
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
      
      let claimable = ethers.constants.Zero
      try {
        claimable = await lauchpadContact.getClaimable(pool.id)
      }
      catch (e) {
        console.log(e)
      }
      
      let investor = await lauchpadContact.getInvestor(pool.id,account)

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
        claimable : parseFloat(ethers.utils.formatEther(claimable)),
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
      fetchPoolInfo().then(function(res){
        setLoading(false)
      })
    }
    else{
      setLoading(false)
      setLaunchpadInfo(null)
    }
  }, [account,lauchpadContact,active,setLoading,library])
  return {loading,launchpadInfo,fetchPoolInfo}
}


export const useFixedSwapInfo = ({pool,status}) => {
  const {account,connector,active,library} = useActiveWeb3React()
  const [fixedSwapInfo,setFixedSwapInfo] = useState(null)
  const [loading,setLoading] = useState(true)
  const lauchpadContact = useFixedSwapContract(pool)
  
  const fetchPoolInfo = async () => {
    try {
      let updateInfo;
      let stat = await lauchpadContact.poolStats(pool.id);
      let order = await lauchpadContact.buyerBids(pool.id,account);
      let itemTotal = await lauchpadContact.buyerItemsTotal(pool.id,account);
      order = {
        item : order,
        total : parseInt(ethers.utils.formatUnits(itemTotal,0))
      }
      stat = {
        totalBid : stat.totalBid,
        totalBidItem : parseInt(ethers.utils.formatUnits(stat.totalBidItem,0)),
        totalSold : parseInt(ethers.utils.formatUnits(stat.totalSold,0))
      }
      let info = await lauchpadContact.pools(pool.id);
      info = {
        addressItem : info.addressItem,
        ended : info.ended,
        isPublic : info.isPublic,
        isSaleToken : info.isSaleToken,
        requireWhitelist : info.requireWhitelist,
        title : info.title,
        endId : parseInt(ethers.utils.formatUnits(info.endId,0)),
        startId : parseInt(ethers.utils.formatUnits(info.startId,0)),
        endTime : parseInt(ethers.utils.formatUnits(info.endTime,0)),
        startTime : parseInt(ethers.utils.formatUnits(info.startTime,0)),
        startPrice : parseInt(ethers.utils.formatUnits(info.startPrice)),
        maxBuyPerAddress : parseInt(ethers.utils.formatUnits(info.maxBuyPerAddress,0)),
      }
      updateInfo = {
        stat,
        info,
        order
      }
      setFixedSwapInfo(updateInfo)
      console.log(updateInfo)
     } catch (error) {
      console.log(error)
      //console.log("error to fetch launchpad info",error)
      return null
    }
  }
  
  useEffect(() => {
    if (!!account && !!lauchpadContact && active && library){
      setLoading(true)
      fetchPoolInfo().then(function(res){
        setLoading(false)
      })
    }
    else{
      setLoading(false)
      setFixedSwapInfo(null)
    }
  }, [account,lauchpadContact,active,setLoading,library])
  return {loading,fixedSwapInfo,fetchPoolInfo}
}

export const useAuctionSwapInfo = ({pool,status}) => {
  const {account,connector,active,library} = useActiveWeb3React()
  const [auctionSwapInfo,setAuctionSwapInfo] = useState(null)
  const [loading,setLoading] = useState(true)
  const lauchpadContact = useAuctionSwapContract(pool)
  
  const fetchPoolInfo = async () => {
    try {
      console.log(lauchpadContact)
      let updateInfo;
    
      let stat = await lauchpadContact.poolStats(pool.id);
      let order = await lauchpadContact.buyerBids(pool.id,account);
      let detail = []
      if (order.length > 0) {
        for (let index of order){
          try{
            let bid = await lauchpadContact.bids(pool.id,ethers.utils.parseUnits(index.toString(),0));
            detail.push({
              index : index,
              claimed : bid.claimed,
              select : range(parseFloat(ethers.utils.formatEther(bid.priceEach)),parseFloat(ethers.utils.formatEther(bid.priceEach)) + 90,10),
              priceEach : parseFloat(ethers.utils.formatEther(bid.priceEach)),
              quantity : parseFloat(ethers.utils.formatUnits(bid.quantity,0)),
              winQuantity : parseFloat(ethers.utils.formatUnits(bid.winQuantity,0))
            })
          }
          catch(e){

          }
        }
      }
      let totalItem = detail.reduce(function(sum,value){
        return sum + parseInt(value.quantity)
      },0)
      let itemTotal = await lauchpadContact.buyerBidCount(pool.id,account);
      order = {
        detail,
        item : order,
        total : parseInt(ethers.utils.formatUnits(itemTotal,0)),
        totalItem : totalItem
      }
      stat = {
        totalBid : stat.totalBid,
        totalBidItem : parseInt(ethers.utils.formatUnits(stat.totalBidItem,0)),
        totalSold : parseInt(ethers.utils.formatUnits(stat.totalSold,0))
      }
      let info = await lauchpadContact.pools(pool.id);
      info = {
        addressItem : info.addressItem,
        ended : info.ended,
        isPublic : info.isPublic,
        isSaleToken : info.isSaleToken,
        requireWhitelist : info.requireWhitelist,
        title : info.title,
        endId : parseInt(ethers.utils.formatUnits(info.endId,0)),
        startId : parseInt(ethers.utils.formatUnits(info.startId,0)),
        endTime : parseInt(ethers.utils.formatUnits(info.endTime,0)),
        startTime : parseInt(ethers.utils.formatUnits(info.startTime,0)),
        startPrice : parseInt(ethers.utils.formatUnits(info.startPrice)),
        maxBuyPerAddress : parseInt(ethers.utils.formatUnits(info.maxBuyPerAddress,0)),
      }
      updateInfo = {
        stat,
        info,
        order
      }
      setAuctionSwapInfo(updateInfo)
      console.log(updateInfo)
     } catch (error) {
      console.log(error)
      //console.log("error to fetch launchpad info",error)
      return null
    }
  }
  
  useEffect(() => {
    if (!!account && !!lauchpadContact && active && library){
      setLoading(true)
      fetchPoolInfo().then(function(res){
        setLoading(false)
      })
    }
    else{
      setLoading(false)
      setAuctionSwapInfo(null)
    }
  }, [account,lauchpadContact,active,setLoading,library])
  return {loading,auctionSwapInfo,fetchPoolInfo}
}


/**
 * range()
 *
 * Returns an array of numbers between a start number and an end number incremented
 * sequentially by a fixed number(step), beginning with either the start number or
 * the end number depending on which is greater.
 *
 * @param {number} start (Required: The start number.)
 * @param {number} end (Required: The end number. If end is less than start,
 *  then the range begins with end instead of start and decrements instead of increment.)
 * @param {number} step (Optional: The fixed increment or decrement step. Defaults to 1.)
 *
 * @return {array} (An array containing the range numbers.)
 *
 * @throws {TypeError} (If any of start, end and step is not a finite number.)
 * @throws {Error} (If step is not a positive number.)
 */
 function range(start, end, step = 1) {
  
  // Test that the first 3 arguments are finite numbers.
  // Using Array.prototype.every() and Number.isFinite().
  const allNumbers = [start, end, step].every(Number.isFinite);

  // Throw an error if any of the first 3 arguments is not a finite number.
  if (!allNumbers) {
    throw new TypeError('range() expects only finite numbers as arguments.');
  }
  
  // Ensure the step is always a positive number.
  if (step <= 0) {
    throw new Error('step must be a number greater than 0.');
  }
  
  // When the start number is greater than the end number,
  // modify the step for decrementing instead of incrementing.
  if (start > end) {
    step = -step;
  }
  
  // Determine the length of the array to be returned.
  // The length is incremented by 1 after Math.floor().
  // This ensures that the end number is listed if it falls within the range.
  const length = Math.floor(Math.abs((end - start) / step)) + 1;
  
  // Fill up a new array with the range numbers
  // using Array.from() with a mapping function.
  // Finally, return the new array.
  return Array.from(Array(length), (x, index) => start + index * step);
  
}