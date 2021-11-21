import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import useStore from '../../lib/useStore'
import useChainConfig from '../web3/useChainConfig'
// eslint-disable-next-line import/no-unresolved

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, ...web3React } = useWeb3React()
  const refEth = useRef(library)
  const {getRpcUrl,chainId} = useChainConfig()
  const simpleRpcProvider = getRpcUrl()
  const [provider, setProvider] = useState(library || simpleRpcProvider)
  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return { library: provider,chainId: chainId, ...web3React }
}

export default useActiveWeb3React
