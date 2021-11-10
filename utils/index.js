import {UnsupportedChainIdError } from '@web3-react/core'

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

export function getErrorMessage(error,network) {
  if (error instanceof NoEthereumProviderError) {
    return `No ${network} browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return `Please authorize this website to access your ${network} account.`
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}