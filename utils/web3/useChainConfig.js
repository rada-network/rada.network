import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { RPC_CONFIG,POLLING_INTERVAL,BUSD_CONTRACT,USD_CONTRACT, RIR_ETH_CONTRACT,RIR_BSC_CONTRACT } from '../config'
import useStore from "../../lib/useStore"



const useChainConfig = function(){
  const store = useStore()
  const getNodeUrl = () => {
    // Use custom node if available (both for development and production)
    // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
    if (store.network === "bsc"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.bsc.production.url
      }
      return RPC_CONFIG.bsc.dev.url
    }
    if (store.network === "eth"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.eth.production.url
      }
      return RPC_CONFIG.eth.dev.url
    }
  }

  const getChainId = () => {
    // Use custom node if available (both for development and production)
    // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
    if (store.network === "bsc"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.bsc.production.chainId
      }
      return RPC_CONFIG.bsc.dev.chainId
    }
    if (store.network === "eth"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.eth.production.chainId
      }
      return RPC_CONFIG.eth.dev.chainId
    }
  }

  const getBusdAddress = () => {
    if (store.network === "bsc"){
      return BUSD_CONTRACT[chainId]
    }
    if (store.network === "eth"){
      return USD_CONTRACT[chainId]
    }
  }

  const getRIRAddress = () => {
    if (store.network === "bsc"){
      return RIR_BSC_CONTRACT[chainId]
    }
    if (store.network === "eth"){
      return RIR_ETH_CONTRACT[chainId]
    }
  }

  const rpcUrl = getNodeUrl()
  const chainId = getChainId()

  const injected = new InjectedConnector({ supportedChainIds: [chainId] })

  const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    qrcode: true,
    chainId: chainId,
    pollingInterval: POLLING_INTERVAL,
  })

  /**
   * BSC Wallet requires a different sign method
   * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
   */
  const signMessage = async (provider, account, message) => {
    if (window.BinanceChain) {
      const { signature } = await window.BinanceChain.bnbSign(account, message)
      return signature
    }

    /**
     * Wallet Connect does not sign the message correctly unless you use their method
     * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
     */
    if (provider.provider?.wc) {
      const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
      const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
      return signature
    }

    return provider.getSigner(account).signMessage(message)
  }

  const getRpcUrl = function(){
    return new StaticJsonRpcProvider(getNodeUrl())

  }

  return {getChainId,getNodeUrl,injected,walletconnect,signMessage,getRpcUrl,chainId,getRIRAddress,getBusdAddress}
}


export default useChainConfig