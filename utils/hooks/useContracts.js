import useStore from "@lib/useStore"
import useChainConfig from "@utils/web3/useChainConfig"
import {useMemo} from "react"

import {getBep20Contract,getLaunchpadContract,getLaunchpadContractV2, getShare2EarnContract, getReferralAdminContract, getFixedSwapContract, getAuctionSwapContract, getOpenBoxContract, getErc721Contract, getNftClaimContract} from "../contractHelpers"

import useActiveWeb3React from "./useActiveWeb3React"

export const useERC20 = (address) => {
  const store = useStore()
  const { library,account } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library, store.network ), [address, library,store.network])
}


export const useErc721 = (address) => {
  const store = useStore()
  const { library,account } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address,account ? library.getSigner() : library, store.network ), [address, library, store.network])
}

export const useRIRContract = () => {
  const {getRIRAddress} = useChainConfig()
  const address = getRIRAddress()
  const { library,account } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library, store.network ), [address, library, store.network])
}

export const useBUSDContract = () => {
  const {getBusdAddress} = useChainConfig()
  const address = getBusdAddress()
  const { library,account } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library, store.network ), [address, library, store.network])
}

export const useBUSDContractV2 = () => {
  const {getBusdAddressV2} = useChainConfig()
  const address = getBusdAddressV2()
  const { library,account } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getBep20Contract(address,account ? library.getSigner() : library, store.network ), [address, library, store.network])
}

export const useLaunchpadContract = (address) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getLaunchpadContract(address,account ? library.getSigner() : library, store.network), [address, library, store.network])
}

export const useShare2EarnContract = (address) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getShare2EarnContract(address, account ? library.getSigner() : library, store.network), [address, library, store.network])
}
export const useReferralAdminContract = (address) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getReferralAdminContract(address, account ? library.getSigner() : library, store.network), [address, library, store.network])
}


export const useLaunchpadContractV2 = (pool) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getLaunchpadContractV2(pool,account ? library.getSigner() : library, store.network), [pool?.contract || null, library, store.network])
}

export const useFixedSwapContract = (pool) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getFixedSwapContract(pool,account ? library.getSigner() : library, store.network), [pool?.contract || null, library, store.network])
}

export const useAuctionSwapContract = (pool) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getAuctionSwapContract(pool,account ? library.getSigner() : library, store.network), [pool?.contract || null, library, store.network])
}

export const useOpenBoxContract = (address) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getOpenBoxContract(address,account ? library.getSigner() : library, store.network), [address, library, store.network])
}

export const useNftClaimContract = (address) => {
  const { account, library } = useActiveWeb3React()
  const store = useStore()
  return useMemo(() => getNftClaimContract(address,account ? library.getSigner() : library, store.network), [address, library, store.network])
}

