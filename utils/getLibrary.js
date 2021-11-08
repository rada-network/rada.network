import { ethers } from 'ethers'
import {POLLING_INTERVAL} from "./config"
export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}