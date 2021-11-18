import {useMemo} from "react"
import {getBep20Contract, getLotteryContract,getLaunchpadContract} from "../contractHelpers"
import useActiveWeb3React from "./useActiveWeb3React"

export const useERC20 = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}


export const useLotteryContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLotteryContract(address, library.getSigner()), [address, library])
}

export const useLaunchpadContract = (address) => {
  const { account, library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContract(address,account ? library.getSigner() : library), [address, library])
}