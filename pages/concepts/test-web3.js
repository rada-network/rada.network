import React, { useState } from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

import { useEagerConnect, useInactiveListener } from '../../utils/hooks'
import useActiveWeb3React from '../../utils/hooks/useActiveWeb3React'
import useChainConfig from '../../utils/web3/useChainConfig'
import useStore from '../../lib/useStore'
import {useRouter} from 'next/router'
import { NetworkLocalStorageKey } from '../../utils/config'
import { useERC20, useLaunchpadContract } from '../../utils/hooks/useContracts'
import { ethers } from 'ethers'

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function ChainId() {
  const { chainId } = useWeb3React()

  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ''}</span>
    </>
  )
}

function BlockNumber() {
  const { chainId, library } = useActiveWeb3React()

  const [blockNumber, setBlockNumber] = useState()
  React.useEffect(() => {
    if (!!library) {
      let stale = false

      //let blockNumberMethod = (library?.chainType === 'hmy') ? library.blockchain.getBlockNumber() : library.getBlockNumber

      library
        .getBlockNumber()
        .then((blockNumber) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = (blockNumber) => {
        setBlockNumber(blockNumber)
      }
      
      if (library.on) {
        library.on('block', updateBlockNumber)
      }

      return () => {
        stale = true
        if (library.on) {
          library.removeListener('block', updateBlockNumber)
        }
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Block Number</span>
      <span role="img" aria-label="numbers">
        🔢
      </span>
      <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
    </>
  )
}

function Account() {
  var { account, library } = useActiveWeb3React()

  return (
    <>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? '-'
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ''}
      </span>
    </>
  )
}

function Balance() {
  const { account, library, chainId } = useActiveWeb3React()

  const [balance, setBalance] = useState()
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false
      library
        .getBalance(account)
        .then((balance) => {
          console.log(balance)
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch((error) => {
          console.log(error)
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>{balance === null ? 'Error' : (balance ?  `Ξ${formatEther(balance)}` : '')}</span>
    </>
  )
}

function Header() {
  const { active, error } = useActiveWeb3React()

  return (
    <>
      <h1 style={{ margin: '1rem', textAlign: 'right' }}>{active ? '🟢' : error ? '🔴' : '🟠'}</h1>
      <h3
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: '1fr min-content 1fr',
          maxWidth: '20rem',
          lineHeight: '2rem',
          margin: 'auto'
        }}
      >
        <ChainId />
        <BlockNumber />
        <Account />
        <Balance />
      </h3>
    </>
  )
}

const Dropdown = ({
  
}) => {
  const options = [
    {
      value : 'bsc',
      label : 'bsc'
    },
    {
      value : 'eth',
      label : 'eth'
    }
  ]
  const store = useStore()
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(store.network);
  const handleChangeNetwork = function(e){
    setSelectedOption(e.target.value)
    store.updateNetwork(e.target.value)
    window.localStorage.setItem(NetworkLocalStorageKey,e.target.value)
    router.reload()
  }
  return (
      <select
        value={selectedOption}
        onChange={e => handleChangeNetwork(e)}>
        {options.map(o => (
          <option key={o.value} value={o.value} selected={o.value == store.network}>{o.label}</option>
        ))}
      </select>
  );
};

const App = function() {
  const context = useActiveWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const isHmyLibrary = false;
  const {injected,walletconnect} = useChainConfig()
  const store = useStore()
  const connectorsByName = {
    "injected" : injected,
    "walletconnect" : walletconnect,
  }
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)
  
  const lauchpadContact = useLaunchpadContract("0x9DB74104FA42AbF00748e56ade256057c46b3a8c")
  const busd = useERC20("0x6945239350ae805b0823cb292a4da5974d166640")
  React.useEffect(() => {
    lauchpadContact.bUSDAddress().then((address) => {
      console.log(address)
    })
    if (!!account){
      const tx = busd.approve("0x9DB74104FA42AbF00748e56ade256057c46b3a8c",ethers.utils.parseEther("100"))
    }
    
  },[account, connector])
  return (
    <>
      <Header />
      <hr style={{ margin: '2rem' }} />
      Network : {store.network}
      <hr style={{ margin: '2rem' }} />
      Change network : 
      <Dropdown></Dropdown>
      <hr style={{ margin: '2rem' }} />
      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '20rem',
          margin: 'auto'
        }}
      >
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !triedEager || !!activatingConnector || connected || !!error

          return (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative'
              }}
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(active || error) && (
          <button
            style={{
              height: '3rem',
              marginTop: '2rem',
              borderRadius: '1rem',
              borderColor: 'red',
              cursor: 'pointer'
            }}
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate
          </button>
        )}

        {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
      </div>

      <hr style={{ margin: '2rem' }} />

      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: 'fit-content',
          maxWidth: '20rem',
          margin: 'auto'
        }}
      >
        {!!(library && !isHmyLibrary && account) && (
          <button
            style={{
              height: '3rem',
              borderRadius: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => {
              library
                .getSigner(account)
                .signMessage('👋')
                .then((signature) => {
                  window.alert(`Success!\n\n${signature}`)
                })
                .catch((error) => {
                  window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
                })
            }}
          >
            Sign Message
          </button>
        )}
        {connector === walletconnect && (
          <button
            style={{
              height: '3rem',
              borderRadius: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => {
              ;(connector).close()
            }}
          >
            Kill WalletConnect Session
          </button>
        )}
        
      </div>
    </>
  )
}

export default App
