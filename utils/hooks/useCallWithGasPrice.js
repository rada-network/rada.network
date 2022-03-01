import { useCallback } from 'react'
import ethers, { Contract, CallOverrides } from 'ethers'
import { useGasPrice,useGasPricePolygon } from './index'
import { get } from 'lodash'
import useStore from '@lib/useStore'

/**
 * Perform a contract call with a gas price returned from useGasPrice
 * @param contract Used to perform the call
 * @param methodName The name of the method called
 * @param methodArgs An array of arguments to pass to the method
 * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export function useCallWithGasPrice() {
  const store = useStore()
  let gasPrice = useGasPrice()
  if (store.network === "polygon"){
    gasPrice = useGasPricePolygon()
  }
  const callWithGasPrice = useCallback(
    async (
      contract,
      methodName,
      methodArgs,
      overrides,
    )=> {
      const contractMethod = get(contract, methodName)
      const hasManualGasPriceOverride = overrides?.gasPrice

      const tx = await contractMethod(
        ...methodArgs,
        hasManualGasPriceOverride ? { ...overrides } : { ...overrides, gasPrice },
      )
      
      return tx
    },
    [gasPrice],
  )

  return { callWithGasPrice }
}


export function useCallWithoutGasPrice() {
  const store = useStore()
  const callWithoutGasPrice = useCallback(
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

  return { callWithoutGasPrice }
}
