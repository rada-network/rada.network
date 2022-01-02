import useChainConfig from "@utils/web3/useChainConfig"
import {useMemo} from "react"

import {getBep20Contract, getLotteryContract,getLaunchpadContract,getLaunchpadContractV2, getShare2EarnContract, getReferralAdminContract, getFixedSwapContract, getAuctionSwapContract} from "../contractHelpers"

import useActiveWeb3React from "./useActiveWeb3React"

export const useERC20 = (address) => {
  const { library,account } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library ), [address, library])
}

export const useRIRContract = () => {
  const {getRIRAddress} = useChainConfig()
  const address = getRIRAddress()
  const { library,account } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library ), [address, library])
}

export const useBUSDContract = () => {
  const {getBusdAddress} = useChainConfig()
  const address = getBusdAddress()
  const { library,account } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library ), [address, library])
}

export const useBUSDContractV2 = () => {
  const {getBusdAddressV2} = useChainConfig()
  const address = getBusdAddressV2()
  const { library,account } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library ), [address, library])
}


export const useLotteryContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLotteryContract(address, library.getSigner()), [address, library])
}

export const useLaunchpadContract = (address) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContract(address,account ? library.getSigner() : library), [address, library])
}

export const useShare2EarnContract = (address) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getShare2EarnContract(address, account ? library.getSigner() : library), [address, library])
}
export const useReferralAdminContract = (address) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getReferralAdminContract(address, account ? library.getSigner() : library), [address, library])
}


export const useLaunchpadContractV2 = (pool) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContractV2(pool,account ? library.getSigner() : library), [pool?.contract || null, library])
}

export const useFixedSwapContract = (pool) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getFixedSwapContract(pool,account ? library.getSigner() : library), [pool?.contract || null, library])
}

export const useAuctionSwapContract = (pool) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getAuctionSwapContract(pool,account ? library.getSigner() : library), [pool?.contract || null, library])
}

