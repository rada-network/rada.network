export const RPC_CONFIG = {
  bsc : {
    production : {
      name : "Binance Smart Chain Mainnet",
      chainId : 56,
      url : [
        'https://bsc-dataseed.binance.org/',
        "https://bsc-dataseed1.ninicoin.io/"
      ],
      scan : "https://bscscan.com/"
    },
    dev : {
      name : "Binance Smart Chain Testnet",
      chainId : 97,
      url : 'https://data-seed-prebsc-1-s2.binance.org:8545/',
      scan : "https://testnet.bscscan.com/"
    },
    staging : {
      name : "Binance Smart Chain Testnet",
      chainId : 97,
      url : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      scan : "https://testnet.scscan.com/"
    }
  },
  eth : {
    production : {
      name : "Ethereum Mainnet",
      chainId : 1,
      url : 'https://mainnet.infura.io/v3/ac6e5dfdbd5e4d4d85447d7599b5a3e5',
      scan : "https://etherscan.io"
    },
    dev : {
      name : "Ethereum Ribery Testnet",
      chainId : 4,
      url : 'https://rinkeby.infura.io/v3/ac6e5dfdbd5e4d4d85447d7599b5a3e5',
      scan : 'https://rinkeby.etherscan.io/',
    },
    staging : {
      name : "Ethereum Ribery Testnet",
      chainId : 4,
      url : 'https://rinkeby.infura.io/v3/ac6e5dfdbd5e4d4d85447d7599b5a3e5',
      scan : 'https://rinkeby.etherscan.io/',
    }
  },
  polygon : {
    production : {
      name : "Polygon Mainnet",
      chainId : 137,
      url : 'https://polygon-rpc.com',
      scan : "https://polygonscan.com/"
    },
    dev : {
      name : "Polygon Mumbai Testnet",
      chainId : 80001,
      url : 'https://rpc-mumbai.matic.today',
      scan : 'https://mumbai.polygonscan.com/',
    },
    staging : {
      name : "Polygon Mumbai Testnet",
      chainId : 80001,
      url : 'https://rpc-mumbai.matic.today',
      scan : 'https://mumbai.polygonscan.com/',
    }
  },
}

export const BUSD_CONTRACT  = {
  97 : "0x6945239350ae805b0823cb292a4da5974d166640",
  56 : "0xe9e7cea3dedca5984780bafc599bd69add087d56"
}

//busd using in token sale fixed swap and auction swap
export const BUSD_CONTRACT_2  = {
  97 : "0x862BcFA4305DD0ecF1a82796fFc9c3627E0b592a",
  56 : "0xe9e7cea3dedca5984780bafc599bd69add087d56"
}

export const RIR_BSC_CONTRACT  = {
  97 : "0x6768BDC5d03A87942cE7cB143fA74e0DadE0371b",
  56 : "0x30FB969AD2BFCf0f3136362cccC0bCB99a7193bC",
}

export const RIR_ETH_CONTRACT  = {
  1 : "0x6768bdc5d03a87942ce7cb143fa74e0dade0371b",
  4 : "0x6768bdc5d03a87942ce7cb143fa74e0dade0371b",
}

export const USDT_CONTRACT  = {
  1 : "0x6945239350ae805b0823cb292a4da5974d166640",
  4 : "0x6945239350ae805b0823cb292a4da5974d166640",
}

export const RIR_POLYGON_CONTRACT  = {
  137 : "0x6768bdc5d03a87942ce7cb143fa74e0dade0371b",
  80001 : "0x6768bdc5d03a87942ce7cb143fa74e0dade0371b",
}

export const USDT_POLYGON_CONTRACT  = {
  137 : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  80001 : "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
}



export const NetworkLocalStorageKey = "__network"

export const POLLING_INTERVAL = 12000