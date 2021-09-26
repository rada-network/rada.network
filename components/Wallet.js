import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { createRef, Fragment, useEffect, useRef, useState} from "react"
import { observer, inject } from "mobx-react"
import { useStore } from '../lib/useStore'
import {connectWallet} from "../data/query/wallet"
import {getCurrentUser} from "../data/query/user"

import {IoChevronBackSharp} from "react-icons/io5";

import { Dialog, Transition } from "@headlessui/react"
import styles from '../styles/modules/Dialog.wallet.module.css'
import Avatar from "boring-avatars";

import ReactTooltip from 'react-tooltip'
import {useTranslation} from "next-i18next";

const btnRef = createRef()

const WalletAvatar = ({wallet}) => {
  const text = wallet.account
  return (
    <div className="">
      <Avatar
        size={16}
        name={text}
        variant="beam"
        colors={["#8B5CF6", "#34D399", "#FEF3C7", "#FBBF24", "#EF4444"]}
      />
    </div>
  )
}

const ConnectedButton = ({wallet}) => (
  <div className="btn btn-default btn-login" aria-expanded="false" aria-haspopup="true">
    {/* <span>{ `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} `}</span> */}
    {/* <WalletAvatar wallet={wallet}  onClick={e => wallet.reset()} />
    <span className="btn--text text-xs ml-2">{ `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} `}</span>
    <span className="icon"><i className="fa-duotone fa-sign-out" /></span>
    <span className="sr-only">Logout</span> */}
  </div>
)

const NotConnectedButton = ({wallet, isOpen, openModal, closeModal, setWalletType}) => {
  const {t} = useTranslation()
  return (
  <>
  <Transition show={isOpen} as={Fragment}>
    <Dialog
        as="div"
        id="modal"
        className={`fixed inset-0 z-10 overflow-y-auto dialog-outside-wrapper`}
        initialFocus={btnRef}
        static
        onClose={closeModal}
      >
        <div className={`min-h-screen dialog-outside`}>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-1600"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="dialog-overlay fixed inset-0" onClick={closeModal} />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >

            <div className={`inline-block w-full z-200 relative dialog`}>

              <div className={`dialog-wrapper`}>

                {/* Dialog Header */}
                <div className={`dialog_header ${styles.dialog_header_wrapper}`}>
                  <Dialog.Title
                    as="div"
                    className={`${styles.dialog_header}`}
                  >
                    <button type="button" className={`btn ${styles.btn_back}`} onClick={closeModal}>
                      <span class="btn--caret-left"></span>
                      <span className="btn--text font-normal">Back</span>
                    </button>
                    <h3 className="text-xl font-semibold">
                      Connect 
                      <span
                        className="hasTooltip"
                        data-tip="A blockchain wallet is an application or hardware device that allows users to transact, store, and exchange value on a blockchain, as well as monitor and manage their crypto assets."
                        data-event="click"
                      > wallet <i className="fa-duotone fa-info-circle text-base" />
                      </span>
                    </h3>
                    <div className="mt-4 text-white text-opacity-70 leading-6">
                      <p className="">
                        Connect your wallet to receive our exclusive rewards and airdrops
                      </p>
                    </div>
                  </Dialog.Title>
                  <div className={`${styles.dialog_header__deco}`} />
                </div>

                {/* Dialog Body */}
                <div className={`${styles.dialog_body_wrapper}`}>

                  <div className={`${styles.dialog_body}`}>

                    <div className={``}>
                      <ul>
                        <li ref={btnRef}>
                          <a className={`btn btn-default ${styles.btn}`} onClick={() => {
                            wallet.connect()
                          setWalletType('metamask')
                        }
                          }>
                            <span className={`icon ${styles.btn_icon}`}>
                              <img src="/images/icons/metamask-24.png" alt="Metamask - Secure wallets with great flexibility" />
                            </span>
                            <div className={`${styles.btn_text}`}>
                              <span className="text-base font-semibold text-color-title">Metamask</span>
                              {/* <span className="text-color-desc text-sm">Secure wallets with great flexibility</span> */}
                            </div>
                            <i className={`fas fa-long-arrow-right ${styles.btn_arrow}`}/>
                          </a>
                        </li>
                        <li>
                          <a className={`btn btn-default ${styles.btn}`} onClick={() => {
                            wallet.connect('walletconnect')
                             setWalletType('walletconnect')
                            }
                             }>
                            <span className={`icon ${styles.btn_icon}`}>
                              <img src="/images/icons/walletconnect-24.png" alt="WalletConnect - Connect with Rainbow, Trust, Argent..." />
                            </span>
                            <div className={`${styles.btn_text}`}>
                              <span className="text-base font-semibold text-color-title">WalletConnect</span>
                              {/* <span className="text-color-desc text-sm">Connect with <b>Rainbow</b>, <b>Trust</b>, <b>Argent</b>...</span> */}
                            </div>
                            <i className={`fas fa-long-arrow-right ${styles.btn_arrow}`}/>
                          </a>
                        </li>
                        <li>
                          <a className={`btn btn-default ${styles.btn}`} onClick={() => {
                            wallet.connect('walletlink')
                             setWalletType('walletlink')
                            }
                             }>
                            <span className={`icon ${styles.btn_icon}`}>
                              <img src="/images/icons/walletlink-24.png" alt="WalletLink - Connect with Coinbase wallet" />
                            </span>
                            <div className={`${styles.btn_text}`}>
                              <span className="text-base font-semibold text-color-title">WalletLink</span>
                              {/* <span className="text-color-desc text-sm">Connect with <b>Coinbase</b> wallet</span> */}
                            </div>
                            <i className={`fas fa-long-arrow-right ${styles.btn_arrow}`}/>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="px-8 md:px-0 mt-6 md:mt-8">
                      <p className="text-xs text-gray-400">
                        We have no access to your private key and funds without your confirmation
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </Transition.Child>

        </div>

      </Dialog>


    </Transition>
  </>
)}


export const Wallet = observer(({handleConnectSuccess}) => {

  const store = useStore()
  const wallet = useWallet()

  const [walletType, setWalletType] = useState('')

  const connect = async (walletInfo) =>{
    const res = await connectWallet(walletInfo)
     if(res.data.userConnect?.status === 'success'){
      handleConnectSuccess()
    }
  }

  useEffect(() => {
    if (wallet.status === 'connected') {
      store.wallet.update(wallet.account)
      const network = wallet['ethereum']
      if(walletType === 'walletconnect'){
        const walletInfo = {
          provider: "wallet",
          provider_account_id: wallet.account[0],
          type: walletType
        }
        connect(walletInfo)
      }
      const walletInfo = {
        provider: "wallet",
        provider_network: network ? "etherium mainnet":'',
        provider_account_id: wallet.account,
        type: walletType
      }
      connect(walletInfo)
  } else {
      store.wallet.update("")
  }
  }, [wallet.status])

  const isOpen = store?.wallet.showingConnect
  const openModal = () => store.wallet.showConnect(true)
  const closeModal = () => { store.wallet.showConnect(false);  ReactTooltip.hide() }

  // rebuild tooltip
  useEffect(() => {
    setTimeout(() => ReactTooltip.rebuild(), 500)
  }, [isOpen]);



  return (
    <div className="relative inline-block text-left">
      { store.wallet.isConnected ?
      <ConnectedButton wallet={wallet} /> :
      <NotConnectedButton wallet={wallet} isOpen={isOpen} openModal={openModal} closeModal={closeModal} setWalletType={(type)=>setWalletType(type)} /> }
    </div>
  )
})