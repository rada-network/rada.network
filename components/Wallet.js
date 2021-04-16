import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { Menu, Transition } from "@headlessui/react"

export const Wallet = () => {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  if (wallet.error?.name) {
    return (
      <p>
        <span>
          {wallet.error instanceof ConnectionRejectedError
            ? 'Connection error: the user rejected the activation'
            : wallet.error.message}
        </span>
        <button onClick={() => wallet.reset()}>retry</button>
      </p>
    )
  }

  if (wallet.status === 'connected') {
    return (
      <p>
        <span>{ `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} `} </span>
        <button onClick={() => wallet.reset()}>disconnect</button>
      </p>
    )
  }
  
  return (
    <p>
        <div>
        <button onClick={() => wallet.connect()}>Connect Metamask</button>
        </div>
        <div>
        <button onClick={() => wallet.connect('walletconnect')}>WalletConnect</button>
        </div>
        <div>
        <button onClick={() => wallet.connect('walletlink')}>WalletLink</button>
        </div>
    </p>
  )
}