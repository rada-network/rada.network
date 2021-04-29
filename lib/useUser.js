import { useWallet } from 'use-wallet'

export default function useUser() {
  const wallet = useWallet()
  const isConnected = () => wallet?.status == 'connected'
  const address = () => isConnected() ? wallet.account : ''

  return {
    isConnected,
    address
  }
}
