import { parseUnits } from 'ethers/lib/utils'
export const GAS_PRICE = {
  default : '5',
  fast : '6',
  instant : '7',
  testnet :  '10',
}

export const GAS_PRICE_POLYGON = {
  default : '9',
  fast : '29',
  instant : '250',
  testnet :  '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}

export const GAS_PRICE_POLYGON_GWEI = {
  default: parseUnits(GAS_PRICE_POLYGON.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE_POLYGON.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE_POLYGON.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE_POLYGON.testnet, 'gwei').toString(),
}