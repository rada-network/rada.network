import { ethers } from 'ethers'
// ABI
import bep20Abi from '../config/abi/erc20.json'
import loteryAbi from '../config/abi/lotery.json'
import launchpadAbi from '../config/abi/launchpad.json'


const getContract = (abi, address, signer) => {
  const signerOrProvider = signer
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address, signer) => {
  return getContract(bep20Abi, address, signer)
}

export const getLotteryContract = (address, signer) => {
  return getContract(loteryAbi, address, signer)
}

export const getLaunchpadContract = (address, signer) => {
  return getContract(launchpadAbi, address, signer)
}
