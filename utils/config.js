export const RPC_CONFIG = {
  bsc : {
    production : {
      chainId : 56,
      url : 'https://bsc-dataseed.binance.org/'
    },
    dev : {
      chainId : 97,
      url : 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    },
    staging : {
      chainId : 97,
      url : 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    }
  },
  eth : {
    production : {
      chainId : 1,
      url : 'https://mainnet.infura.io/v3/ac6e5dfdbd5e4d4d85447d7599b5a3e5'
    },
    dev : {
      chainId : 4,
      url : 'https://rinkeby.infura.io/v3/ac6e5dfdbd5e4d4d85447d7599b5a3e5'
    },
    staging : {
      chainId : 4,
      url : 'https://rinkeby.infura.io/v3/ac6e5dfdbd5e4d4d85447d7599b5a3e5'
    }
  },
}

export const NetworkLocalStorageKey = "__network"

export const POLLING_INTERVAL = 12000