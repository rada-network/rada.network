import { useCallback } from 'react'
import ethers, { Contract, CallOverrides } from 'ethers'
import { get } from 'lodash'

/**
 * Perform a contract call with a gas price returned from useGasPrice
 * @param contract Used to perform the call
 * @param methodName The name of the method called
 * @param methodArgs An array of arguments to pass to the method
 * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export function useCallFunction() {

  const callFunction = useCallback(
    async (
      contract,
      methodName,
      methodArgs,
    )=> {
      const contractMethod = get(contract, methodName)
      const tx = await contractMethod(
        ...methodArgs
      )

      return tx
    },
    [],
  )

  return { callFunction }
}
