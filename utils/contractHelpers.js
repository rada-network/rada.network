import { ethers } from 'ethers'
// ABI
import bep20Abi from '../config/abi/erc20.json'
import launchpadAbi from '../config/abi/launchpad.json'
import share2earnAbi from '../config/abi/share2earn.json'
import launchpadAbiV2 from '../config/abi/launchpadv2.json'
import launchpadAbiV2Whitelist from '../config/abi/launchpadv2-whitelist.json'
import referralAdminAbi from '../config/abi/referralAdmin.json'
import fixedSwapAbi from '../config/abi/fixedSwap.json'
import auctionSwapAbi from '../config/abi/auctionSwap.json'
import openBoxAbi from '../config/abi/openbox.json'
import erc721 from '../config/abi/erc721.json'

import bep20AbiPolygon from '../config/abi-polygon/erc20.json'
import launchpadAbiPolygon from '../config/abi-polygon/launchpad.json'
import share2earnAbiPolygon from '../config/abi-polygon/share2earn.json'
import launchpadAbiV2Polygon from '../config/abi-polygon/launchpadv2.json'
import launchpadAbiV2WhitelistPolygon from '../config/abi-polygon/launchpadv2-whitelist.json'
import referralAdminAbiPolygon from '../config/abi-polygon/referralAdmin.json'
import fixedSwapAbiPolygon from '../config/abi-polygon/fixedSwap.json'
import auctionSwapAbiPolygon from '../config/abi-polygon/auctionSwap.json'
import openBoxAbiPolygon from '../config/abi-polygon/openbox.json'
import erc721Polygon from '../config/abi-polygon/erc721.json'

import useStore from '@lib/useStore'



const getContract = (abi, address, signer) => {
  if (!!address){
    const signerOrProvider = signer
    return new ethers.Contract(address, abi, signerOrProvider)
  }
  return null
}

export const getBep20Contract = (address, signer, network) => {
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(bep20AbiPolygon, address, signer)
  }
  return getContract(bep20Abi, address, signer)
}

export const getErc721Contract = (address, signer, network) => {
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(erc721Polygon, address, signer)
  }
  return getContract(erc721, address, signer)
}

export const getLaunchpadContract = (address, signer, network) => {
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(launchpadAbiPolygon, address, signer)
  }
  return getContract(launchpadAbi, address, signer)
}

export const getShare2EarnContract = (address, signer, network) => {
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(share2earnAbiPolygon, address, signer)
  }
  return getContract(share2earnAbi, address, signer)
}

export const getLaunchpadContractV2 = (pool, signer, network) => {
  if (pool === null) { return null}
  
  if (!pool.is_whitelist){
    network = network || "bsc"
    if (network == "polygon"){
      return getContract(launchpadAbiV2Polygon, pool.contract, signer)
    }
    return getContract(launchpadAbiV2, pool.contract, signer)
  }
  else{
    network = network || "bsc"
    if (network == "polygon"){
      return getContract(launchpadAbiV2WhitelistPolygon, pool.contract, signer)
    }
    return getContract(launchpadAbiV2Whitelist, pool.contract, signer)
  }
}

export const getFixedSwapContract = (pool, signer, network) => {
  if (pool === null) { return null}
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(fixedSwapAbiPolygon, pool.contract, signer)
  }
  return getContract(fixedSwapAbi, pool.contract, signer)
}

export const getAuctionSwapContract = (pool, signer, network) => {
  if (pool === null) { return null}
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(auctionSwapAbiPolygon, pool.contract, signer)
  }
  return getContract(auctionSwapAbi, pool.contract, signer)
}

export const getOpenBoxContract = (address, signer, network) => {
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(openBoxAbiPolygon, address, signer)
  }
  return getContract(openBoxAbi, address, signer)
}

export const getReferralAdminContract = (address, signer, network) => {
  network = network || "bsc"
  if (network == "polygon"){
    return getContract(referralAdminAbiPolygon, address, signer)
  }
  return getContract(referralAdminAbi, address, signer)
}
