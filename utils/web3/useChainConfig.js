import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { RPC_CONFIG,POLLING_INTERVAL,BUSD_CONTRACT,USDT_CONTRACT, RIR_ETH_CONTRACT,RIR_BSC_CONTRACT } from '../config'
import useStore from "../../lib/useStore"
import {sample} from "lodash"



export const ConnectorNames = {
  Injected : "injected",
  WalletConnect : "walletconnect",
}

export const getNodeUrl = (network) => {
  // Use custom node if available (both for development and production)
  // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
  if (network === "bsc"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return sample(RPC_CONFIG.bsc.production.url)
    }
    return RPC_CONFIG.bsc.dev.url
  }
  if (network === "eth"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.eth.production.url
    }
    return RPC_CONFIG.eth.dev.url
  }
}

const rpcUrls = {}
const provider = {}
export const getProvider = function(network){
  if (provider[network] === undefined){
    rpcUrls[network] = getNodeUrl(network)
    provider[network] = new StaticJsonRpcProvider(rpcUrls[network])
  }
  else return provider[network]
}

export const getProviderURL = function(network){
  if (rpcUrls[network] === undefined){
    rpcUrls[network] = getNodeUrl(network)
  }
  else return rpcUrls[network]
}

export const getChainName = (network) => {
  // Use custom node if available (both for development and production)
  // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
  if (network === "bsc"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.bsc.production.name
    }
    return RPC_CONFIG.bsc.dev.name
  }
  if (network === "eth"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.eth.production.name
    }
    return RPC_CONFIG.eth.dev.name
  }
}

export const getChainScanUrl = function(network){
  if (network === "bsc"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.bsc.production.scan
    }
    return RPC_CONFIG.bsc.dev.scan
  }
  if (network=== "eth"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.eth.production.scan
    }
    return RPC_CONFIG.eth.dev.scan
  }
}

export const getChainId = (network) => {
  // Use custom node if available (both for development and production)
  // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
  if (network === "bsc"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.bsc.production.chainId
    }
    return RPC_CONFIG.bsc.dev.chainId
  }
  if (network === "eth"){
    if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
      return RPC_CONFIG.eth.production.chainId
    }
    return RPC_CONFIG.eth.dev.chainId
  }
}

const useChainConfig = function(){
  const store = useStore()
  

  const getChainName = () => {
    // Use custom node if available (both for development and production)
    // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
    if (store.network === "bsc"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.bsc.production.name
      }
      return RPC_CONFIG.bsc.dev.name
    }
    if (store.network === "eth"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.eth.production.name
      }
      return RPC_CONFIG.eth.dev.name
    }
  }

  const getChainScanUrl = function(){
    if (store.network === "bsc"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.bsc.production.scan
      }
      return RPC_CONFIG.bsc.dev.scan
    }
    if (store.network === "eth"){
      if (process.env.NEXT_PUBLIC_CHAIN === 'production') {
        return RPC_CONFIG.eth.production.scan
      }
      return RPC_CONFIG.eth.dev.scan
    }
  }

  const getBscScanURL = (address) => {
    let url = getChainScanUrl()
    return url + "address/" + address
  }

  const getBusdAddress = () => {
    if (store.network === "bsc"){
      return BUSD_CONTRACT[chainId]
    }
    if (store.network === "eth"){
      return USDT_CONTRACT[chainId]
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

  const chainId = getChainId(store.network)

  const injected = new InjectedConnector({ supportedChainIds: [chainId] })

  const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: getProviderURL(store.network) },
    qrcode: true,
    chainId: chainId,
    pollingInterval: POLLING_INTERVAL,
  })

  const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
  }

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

  /**
   * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
   * @returns {boolean} true if the setup succeeded, false otherwise
   */
  const setupNetwork = async () => {
    const provider = window.ethereum
    let name = "BNB",symbol = "bnb",decimals=18;
    if (store.network == "eth"){
      name = "ETH";
      symbol = "eth";
    }
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: getChainName(),
              nativeCurrency: {
                name: name,
                symbol: symbol,
                decimals: decimals,
              },
              rpcUrls: [getProviderURL(store.network)],
              blockExplorerUrls: [`${getChainScanUrl()}/`],
            },
          ],
        })
        return true
      } catch (error) {
        console.error('Failed to setup the network in Metamask:', error)
        return false
      }
    } else {
      console.error(`Can't setup the ${store.network} network on metamask because window.ethereum is undefined`)
      return false
    }
  }

  return {injected,walletconnect,signMessage,chainId,getRIRAddress,getBusdAddress,setupNetwork,connectorsByName, getBscScanURL}
}

export  const connectorLocalStorageKey = "connectorIdv2";
export  const walletLocalStorageKey = "wallet";

export default useChainConfig