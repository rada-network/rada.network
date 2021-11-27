import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import useChainConfig,{connectorLocalStorageKey} from '../web3/useChainConfig'
import {toast} from "react-toastify"
import { useTranslation } from 'react-i18next'

const useAuth = () => {
  const {t} = useTranslation()
  const { chainId, activate, deactivate } = useWeb3React()
  const {connectorsByName,setupNetwork} = useChainConfig()
  const login = useCallback(
    (connectorID) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError) {
              toast.error(t(`No browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`))
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector
                walletConnector.walletConnectProvider = null
              }
              toast.error(t('Please authorize to access your account'))
            } else {
              toast.error(error.name + " " + error.message)
            }
          }
        })
      } else {
        toast.error( t('Unable to find connector. The connector config is wrong'))
      }
    },
    [activate],
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
    if (chainId) {
      //dispatch(clearAllTransactions({ chainId }))
    }
  }, [deactivate, chainId])

  return { login, logout }
}

export default useAuth
