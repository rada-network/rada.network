import { useCallback } from 'react'
import ethers, { Contract, CallOverrides } from 'ethers'
import { get } from 'lodash'

/**
 * Perform a contract call
 * @param contract Used to perform the call
 * @param methodName The name of the method called
 * @param methodArgs An array of arguments to pass to the method
 * @returns value
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
