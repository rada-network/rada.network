import { useState, useEffect } from "react"
import { ethers, utils } from "ethers"
import { useAuctionSwapContract, useFixedSwapContract, useLaunchpadContractV2 } from "./useContracts"
import useActiveWeb3React from "./useActiveWeb3React"
import { useWeb3React } from '@web3-react/core'
import { GAS_PRICE_GWEI } from "../../config/gas"
import useStore from "@lib/useStore"
export function useGasPrice() {
  const userGas = GAS_PRICE_GWEI.instant
  return process.env.NEXT_PUBLIC_CHAIN == 'production' ? userGas : GAS_PRICE_GWEI.testnet
}

const DEV_STATUS_FAILED = {
  tokenAddress: "0x0000000000000000000000000000000000000000",
  allocationBusd: 5000,
  allocationRir: 200,
  price: 0.04,
  startDate: 0,
  endDate: 0,
  individualMinimumAmount: 500,
  individualMaximumAmount: 500,
  ordersBuyerCount: 0,
  buyers: [],
  winnerCount: 0,
  winners: [],
  claimable: 0,
  totalClaimable: 0,
  refundable: [
    0,
    0,
  ],
  stat: {
    depositedToken: 0,
    amountBusd: 5000,
    amountRir: 180,
    approvedBusd: 5000,
    approvedRir: 180
  },
  investor: {
    allocationBusd: 0,
    allocationRir: 0,
    amountBusd: 0,
    amountRir: 0,
    claimedToken: 0,
    paid: false,
    refunded: false,
    approved: false,
  }
}

const DEV_STATUS_FAILED_REFUND = {
  tokenAddress: "0x0000000000000000000000000000000000000000",
  allocationBusd: 5000,
  allocationRir: 200,
  price: 0.04,
  startDate: 0,
  endDate: 0,
  individualMinimumAmount: 100,
  individualMaximumAmount: 500,
  ordersBuyerCount: 0,
  buyers: [],
  winnerCount: 0,
  winners: [],
  claimable: 0,
  totalClaimable: 0,
  refundable: [
    300,
    0,
  ],
  stat: {
    depositedToken: 0,
    amountBusd: 5000,
    amountRir: 180,
    approvedBusd: 5000,
    approvedRir: 180
  },
  investor: {
    allocationBusd: 0,
    allocationRir: 0,
    amountBusd: 300,
    amountRir: 0,
    claimedToken: 0,
    paid: true,
    refunded: false,
    approved: false,
  }
}

const DEV_STATUS_SUCCESS = {
  tokenAddress: "0x0000000000000000000000000000000000000000",
  allocationBusd: 5000,
  allocationRir: 200,
  price: 0.04,
  startDate: 0,
  endDate: 0,
  individualMinimumAmount: 100,
  individualMaximumAmount: 500,
  ordersBuyerCount: 0,
  buyers: [],
  winnerCount: 0,
  winners: [],
  claimable: 0,
  totalClaimable: 0,
  refundable: [
    0,
    0,
  ],
  stat: {
    depositedToken: 0,
    amountBusd: 5000,
    amountRir: 180,
    approvedBusd: 5000,
    approvedRir: 180
  },
  investor: {
    allocationBusd: 300,
    allocationRir: 3,
    amountBusd: 300,
    amountRir: 3,
    claimedToken: 0,
    paid: true,
    refunded: false,
    approved: true,
  }
}

const DEV_STATUS_SUCCESS_REFUND = {
  tokenAddress: "0x0000000000000000000000000000000000000000",
  allocationBusd: 5000,
  allocationRir: 200,
  price: 0.04,
  startDate: 0,
  endDate: 0,
  individualMinimumAmount: 100,
  individualMaximumAmount: 500,
  ordersBuyerCount: 0,
  buyers: [],
  winnerCount: 0,
  winners: [],
  claimable: 0,
  totalClaimable: 0,
  refundable: [
    100,
    1,
  ],
  stat: {
    depositedToken: 0,
    amountBusd: 5000,
    amountRir: 180,
    approvedBusd: 5000,
    approvedRir: 180
  },
  investor: {
    allocationBusd: 200,
    allocationRir: 2,
    amountBusd: 300,
    amountRir: 3,
    claimedToken: 0,
    paid: true,
    refunded: false,
    approved: true,
  }
}

const DEV_STATUS_CLAIM = {
  tokenAddress: "0xbaDB6b73c2FBE647a256Cf8F965f89573A054113",
  allocationBusd: 5000,
  allocationRir: 200,
  price: 0.04,
  startDate: 0,
  endDate: 0,
  individualMinimumAmount: 100,
  individualMaximumAmount: 500,
  ordersBuyerCount: 0,
  buyers: [],
  winnerCount: 0,
  winners: [],
  claimable: 500,
  totalClaimable: 5000,
  refundable: [
    0,
    0,
  ],
  stat: {
    depositedToken: 60000,
    amountBusd: 5000,
    amountRir: 180,
    approvedBusd: 5000,
    approvedRir: 180
  },
  investor: {
    allocationBusd: 200,
    allocationRir: 2,
    amountBusd: 300,
    amountRir: 3,
    claimedToken: 0,
    paid: true,
    refunded: true,
    approved: true,
  }
}

const DEV_STATUS_NFT_ENDED = {
  stat: {
    highestPrice: 250,
    totalBid: 18,
    totalBidItem: 28,
    totalSold: 1
  },
  info: {
    addressItem: "0x04765e334e19adFDbA244B66C4BB88a324110d57",
    ended: true,
    isPublic: true,
    isSaleToken: true,
    requireWhitelist: false,
    endId: 1000,
    startId: 1,
    endTime: 1672379856,
    startTime: 1640451600,
    startPrice: 150,
    maxBuyPerAddress: 10
  },
  order: {
    detail: [
      {
        index: 8,
        claimed: false,
        select: [
          170,
          180,
          190,
          200,
          210,
          220,
          230,
          240,
          250,
          260
        ],
        priceEach: 170,
        quantity: 1,
        baseQuantity: 1,
        winQuantity: 1,
        isEditing: false
      },
      {
        index: 9,
        claimed: false,
        select: [
          150,
          160,
          170,
          180,
          190,
          200,
          210,
          220,
          230,
          240
        ],
        priceEach: 150,
        quantity: 2,
        baseQuantity: 2,
        winQuantity: 1,
        isEditing: false
      }
    ],
    item: [
      8,
      9,
      10,
      13,
      14,
      17
    ],
    total: 6,
    totalItem: 9,
    totalWinItem: 2,
    refundBalance: 500
  }
}


export const useLaunchpadInfo = ({ pool, status }) => {
  const { account, connector, active, library } = useActiveWeb3React()
  const [launchpadInfo, setLaunchpadInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const lauchpadContact = useLaunchpadContractV2(pool)

  const fetchLaunchpadInfo = async () => {
    try {
      let updateInfo;
      if (process.env.NEXT_PUBLIC_CHAIN === "dev" && !!status && status !== "") {
        switch (status) {
          case "success":
            updateInfo = DEV_STATUS_SUCCESS
            break;
          case "successRefund":
            updateInfo = DEV_STATUS_SUCCESS_REFUND
            break;
          case "fail":
            updateInfo = DEV_STATUS_FAILED
            break;
          case "failRefund":
            updateInfo = DEV_STATUS_FAILED_REFUND
            break;
          case "claim":
            updateInfo = DEV_STATUS_CLAIM
            break;
          default:
            break
        }
        if (!!updateInfo) {
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
      let dataPromise = []
      dataPromise.push(lauchpadContact.pools(pool.id))
      dataPromise.push(lauchpadContact.getTotalClaimable(pool.id))
      dataPromise.push(lauchpadContact.getRefundable(pool.id))
      dataPromise.push(lauchpadContact.getInvestor(pool.id, account))
      dataPromise.push(lauchpadContact.poolsStat(pool.id))
      let data = await Promise.all(dataPromise)
      let info = data[0]
      let totalClaimable = data[1]
      let refundable = data[2]
      let investor = data[3]
      let stat = data[4]
      stat = {
        depositedToken: parseFloat(ethers.utils.formatEther(stat.depositedToken)),
        amountBusd: parseFloat(ethers.utils.formatEther(stat.amountBusd)),
        amountRir: parseFloat(ethers.utils.formatEther(stat.amountRir)),
        approvedBusd: parseFloat(ethers.utils.formatEther(stat.approvedBusd)),
        approvedRir: parseFloat(ethers.utils.formatEther(stat.approvedRir))
      }
      investor = {
        allocationBusd: parseFloat(ethers.utils.formatEther(investor.allocationBusd)).toFixed(2),
        allocationRir: parseFloat(ethers.utils.formatEther(investor.allocationRir)).toFixed(2),
        amountBusd: parseFloat(ethers.utils.formatEther(investor.amountBusd)),
        amountRir: parseFloat(ethers.utils.formatEther(investor.amountRir)),
        claimedToken: parseFloat(ethers.utils.formatEther(investor.claimedToken)),
        paid: investor.paid,
        refunded: investor.refunded,
        approved: investor.approved,
      }

      updateInfo = {
        tokenAddress: info.tokenAddress,
        allocationBusd: parseFloat(ethers.utils.formatEther(info.allocationBusd)),
        allocationRir: parseFloat(ethers.utils.formatEther(info.allocationRir)),
        price: parseFloat(ethers.utils.formatEther(info.price)),
        startDate: parseFloat(ethers.utils.formatEther(info.startDate)),
        endDate: parseFloat(ethers.utils.formatEther(info.endDate)),
        individualMinimumAmount: pool.is_whitelist ? investor.amountBusd : parseFloat(ethers.utils.formatEther(info.minAllocationBusd)),
        individualMaximumAmount: pool.is_whitelist ? investor.amountBusd : parseFloat(ethers.utils.formatEther(info.maxAllocationBusd)),
        ordersBuyerCount: 0,
        buyers: [],
        winnerCount: 0,
        winners: [],
        claimable: parseFloat(ethers.utils.formatEther(claimable)),
        totalClaimable: parseFloat(ethers.utils.formatEther(totalClaimable)),
        refundable: [
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
    if (!!account && !!lauchpadContact && active && library) {
      setLoading(true)
      fetchLaunchpadInfo().then(function (res) {
        setLoading(false)
      })
    }
    else {
      setLoading(false)
      setLaunchpadInfo(null)
    }
  }, [account, lauchpadContact, active, setLoading, library])
  return { loading, launchpadInfo, fetchLaunchpadInfo }
}

export const usePoolInfo = ({ pool, status }) => {
  const { account, connector, active, library } = useActiveWeb3React()
  const [launchpadInfo, setLaunchpadInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const lauchpadContact = useLaunchpadContractV2(pool)

  const fetchPoolInfo = async () => {
    try {
      let updateInfo;
      if (process.env.NEXT_PUBLIC_CHAIN === "dev" && !!status && status !== "") {
        switch (status) {
          case "success":
            updateInfo = DEV_STATUS_SUCCESS
            break;
          case "successRefund":
            updateInfo = DEV_STATUS_SUCCESS_REFUND
            break;
          case "fail":
            updateInfo = DEV_STATUS_FAILED
            break;
          case "failRefund":
            updateInfo = DEV_STATUS_FAILED_REFUND
            break;
          case "claim":
            updateInfo = DEV_STATUS_CLAIM
            break;
          case "nft_ended":
            updateInfo = DEV_STATUS_NFT_ENDED
            break;
          default:
            break
        }
        if (!!updateInfo) {
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

      let investor = await lauchpadContact.getInvestor(pool.id, account)

      investor = {
        allocationBusd: parseFloat(ethers.utils.formatEther(investor.allocationBusd)),
        allocationRir: parseFloat(ethers.utils.formatEther(investor.allocationRir)),
        amountBusd: parseFloat(ethers.utils.formatEther(investor.amountBusd)),
        amountRir: parseFloat(ethers.utils.formatEther(investor.amountRir)),
        claimedToken: parseFloat(ethers.utils.formatEther(investor.claimedToken)),
        paid: investor.paid,
        refunded: investor.refunded,
        approved: investor.approved,
      }

      updateInfo = {
        claimable: parseFloat(ethers.utils.formatEther(claimable)),
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
    if (!!account && !!lauchpadContact && active && library) {
      setLoading(true)
      fetchPoolInfo().then(function (res) {
        setLoading(false)
      })
    }
    else {
      setLoading(false)
      setLaunchpadInfo(null)
    }
  }, [account, lauchpadContact, active, setLoading, library])
  return { loading, launchpadInfo, fetchPoolInfo }
}


export const useFixedSwapInfo = ({ pool, status }) => {
  const { account, connector, active, library } = useActiveWeb3React()
  const [fixedSwapInfo, setFixedSwapInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const lauchpadContact = useFixedSwapContract(pool)

  const fetchPoolInfo = async () => {
    try {
      let updateInfo;

      let dataPromise = []
      dataPromise.push(lauchpadContact.poolStats(pool.id))
      dataPromise.push(lauchpadContact.buyerBids(pool.id, account))
      dataPromise.push(lauchpadContact.buyerItemsTotal(pool.id, account))
      dataPromise.push(lauchpadContact.pools(pool.id))
      let data = await Promise.all(dataPromise)
      let stat = data[0];
      let order = data[1];
      let itemTotal = data[2];
      let info = data[3];
      console.log(info)
      order = {
        item: order,
        total: parseInt(ethers.utils.formatUnits(itemTotal, 0))
      }
      stat = {
        totalBid: stat.totalBid,
        totalBidItem: parseInt(ethers.utils.formatUnits(stat.totalBidItem, 0)),
        totalSold: parseInt(ethers.utils.formatUnits(stat.totalSold, 0))
      }
      
      info = {
        addressItem: info.addressItem,
        ended: info.ended,
        isPublic: info.isPublic,
        isSaleToken: info.isSaleToken,
        requireWhitelist: info.requireWhitelist,
        title: info.title,
        endTime: parseInt(ethers.utils.formatUnits(info.endTime, 0)),
        startTime: parseInt(ethers.utils.formatUnits(info.startTime, 0)),
        startPrice: parseInt(ethers.utils.formatUnits(info.startPrice)),
        maxBuyPerAddress: parseInt(ethers.utils.formatUnits(info.maxBuyPerAddress,0)),
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
    if (!!account && !!lauchpadContact && active && library) {
      setLoading(true)
      fetchPoolInfo().then(function (res) {
        setLoading(false)
      })
    }
    else {
      setLoading(false)
      setFixedSwapInfo(null)
    }
  }, [account, lauchpadContact, active, setLoading, library])
  return { loading, fixedSwapInfo, fetchPoolInfo }
}

export const useAuctionSwapInfo = ({ pool, status }) => {
  const { account, connector, active, library } = useActiveWeb3React()
  const [auctionSwapInfo, setAuctionSwapInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const lauchpadContact = useAuctionSwapContract(pool)

  const fetchPoolInfo = async () => {
    try {
      let updateInfo;
      let dataPromise = []
      dataPromise.push(lauchpadContact.poolStats(pool.id))
      dataPromise.push(lauchpadContact.buyerBids(pool.id, account))
      dataPromise.push(lauchpadContact.pools(pool.id))
      dataPromise.push(lauchpadContact.buyerBidCount(pool.id, account))
      let data = await Promise.all(dataPromise)
      let stat = data[0];
      let order = data[1];
      let info = data[2];
      let itemTotal = data[3];
      let detail = []
      if (order.length > 0) {
        let bidsPromise = []
        for (let index of order) {
          bidsPromise.push(lauchpadContact.bids(pool.id, ethers.utils.parseUnits(index.toString(), 0)));
        }
        let bids = await Promise.all(bidsPromise)
        detail = bids.map((bid,i) => {
          return {
            index : order[i],
            claimed: bid.claimed,
            select: range(parseFloat(ethers.utils.formatEther(bid.priceEach)), parseFloat(ethers.utils.formatEther(bid.priceEach)) + 90, 10),
            priceEach: parseFloat(ethers.utils.formatEther(bid.priceEach)),
            basePriceEach: parseFloat(ethers.utils.formatEther(bid.priceEach)),
            quantity: parseFloat(ethers.utils.formatUnits(bid.quantity, 0)),
            baseQuantity: parseFloat(ethers.utils.formatUnits(bid.quantity, 0)),
            winQuantity: parseFloat(ethers.utils.formatUnits(bid.winQuantity, 0)),
            isEditing: false
          }
        })
      }
      let totalItem = detail.reduce(function (sum, value) {
        return sum + parseInt(value.quantity)
      }, 0)
      let totalWinItem = detail.reduce(function (sum, value) {
        return sum + parseInt(value.winQuantity)
      }, 0)
      
      let totalBusd = detail.reduce(function (sum, value) {
        return sum + parseInt(value.quantity * value.priceEach)
      }, 0)

      let totalWinBusd = detail.reduce(function (sum, value) {
        return sum + parseInt(value.winQuantity * value.priceEach)
      }, 0)

      let refundBalanceBUSD = totalBusd - totalWinBusd;

      order = {
        detail,
        item: order,
        total: parseInt(ethers.utils.formatUnits(itemTotal, 0)),
        totalItem: totalItem,
        totalWinItem: totalWinItem,
        refundBalance: refundBalanceBUSD
      }
      stat = {
        highestPrice: parseInt(ethers.utils.formatEther(stat.highestPrice)),
        totalBid: stat.totalBid,
        totalBidItem: parseInt(ethers.utils.formatUnits(stat.totalBidItem, 0)),
        totalSold: parseInt(ethers.utils.formatUnits(stat.totalSold, 0))
      }
      
      info = {
        addressItem: info.addressItem,
        ended: info.ended,
        isPublic: info.isPublic,
        isSaleToken: info.isSaleToken,
        requireWhitelist: info.requireWhitelist,
        title: info.title,
        //endId: parseInt(ethers.utils.formatUnits(info.endId, 0)),
        //startId: parseInt(ethers.utils.formatUnits(info.startId, 0)),
        endTime: parseInt(ethers.utils.formatUnits(info.endTime, 0)),
        startTime: parseInt(ethers.utils.formatUnits(info.startTime, 0)),
        startPrice: parseInt(ethers.utils.formatUnits(info.startPrice)),
        maxBuyPerAddress: parseInt(ethers.utils.formatUnits(info.maxBuyPerAddress, 0)),
      }
      updateInfo = {
        stat,
        info,
        order
      }

      if (process.env.NEXT_PUBLIC_CHAIN === "dev" && !!status && status !== "") {
        switch (status) {
          case "nft_ended":
            updateInfo = DEV_STATUS_NFT_ENDED
            break
          default:
            break
        }
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
    if (!!account && !!lauchpadContact && active && library) {
      setLoading(true)
      fetchPoolInfo().then(function (res) {
        setLoading(false)
      })
    }
    else {
      setLoading(false)
      setAuctionSwapInfo(null)
    }
  }, [account, lauchpadContact, active, setLoading, library])
  return { loading, auctionSwapInfo, fetchPoolInfo }
}

export const getRaiseTokenByNetwork = function(){
  const store = useStore()
  if (store.network == "bsc"){
    return "BUSD"
  }
  return "USDT"
}

export const getRaiseTokenByPlatfrom = function(network){
  if (network == "bsc"){
    return "BUSD"
  }
  return "USDT"
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
export function range(start, end, step = 1) {

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