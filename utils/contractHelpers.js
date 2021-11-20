import { ethers } from 'ethers'
// ABI
import bep20Abi from '../config/abi/erc20.json'
import loteryAbi from '../config/abi/lotery.json'
import launchpadAbi from '../config/abi/launchpad.json'
import share2earnAbi from '../config/abi/share2earn.json'
import launchpadAbiV2 from '../config/abi/launchpadv2.json'
import referralAdminAbi from '../config/abi/referralAdmin.json'



const getContract = (abi, address, signer) => {
  if (!!address){
    const signerOrProvider = signer
    return new ethers.Contract(address, abi, signerOrProvider)
  }
  return null
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

export const getShare2EarnContract = (address, signer) => {
  return getContract(share2earnAbi, address, signer)
}

export const getLaunchpadContractV2 = (address, signer) => {
  return getContract(launchpadAbiV2, address, signer)
}
export const getReferralAdminContract = (address, signer) => {
  return getContract(referralAdminAbi, address, signer)
}
