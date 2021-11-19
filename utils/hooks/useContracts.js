import useChainConfig from "@utils/web3/useChainConfig"
import {useMemo} from "react"
import {getBep20Contract, getLotteryContract,getLaunchpadContract,getLaunchpadContractV2} from "../contractHelpers"
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


export const useLotteryContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLotteryContract(address, library.getSigner()), [address, library])
}

export const useLaunchpadContract = (address) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContract(address,account ? library.getSigner() : library), [address, library])
}


export const useLaunchpadContractV2 = (address) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContractV2(address,account ? library.getSigner() : library), [address, library])
}