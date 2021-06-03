import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { Fragment, useState, useRef } from "react"
import { observer, inject } from "mobx-react"
import { useStore } from '../lib/useStore'

import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";

import { Dialog, Transition } from "@headlessui/react"
import styles from '../styles/modules/Dialog.wallet.module.css'
import Avatar from "react-avatar";
import {CommentAvatar} from "./comments/commentAvatar";

const WalletContent = ({wallet, closeModal, open}) => {
  const cancelButtonRef = useRef();

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className={`${styles.dialog_outside_wrapper}`}
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={closeModal}
      >
        <div className={`min-h-screen ${styles.dialog_outside}`}>
        
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
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
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >

            <div className={`inline-block w-full ${styles.dialog}`}>

              <div className={`${styles.dialog_wrapper}`}>

                {/* Dialog Header */}
                <div className={`dialog_header ${styles.dialog_header_wrapper}`}>
                  <Dialog.Title
                    as="div"
                    className={`${styles.dialog_header}`}
                  >
                    <button type="button" className={`btn ${styles.btn_back}`} onClick={closeModal}>
                      <span className="icon"><IoChevronBackSharp/></span>
                      <span className="btn-text font-normal">Go back</span>
                    </button>
                    <h3 className="text-xl font-semibold">Connect your wallet</h3>
                    <div className="mt-4 text-sm text-white text-opacity-70 leading-6">
                      <p className="">
                        Connect your wallet to <b className="text-white text-opacity-100">vote</b> and <b className="text-white text-opacity-100">discuss</b> on projects you like the most.
                      </p>
                    </div>
                  </Dialog.Title>
                  <div className={`${styles.dialog_header__deco}`} />
                </div>

                {/* Dialog Body */}
                <div className={`${styles.dialog_body_wrapper}`}>

                  <div className={`${styles.dialog_body}`}>

                    <ul>
                      <li>
                        <a className={`${styles.btn}`} onClick={() => wallet.connect()}>
                          <span className={`icon ${styles.btn_icon}`}>
                            <img src="/images/icons/metamask-24.png" alt="Metamask" />
                          </span>
                          <div className={`${styles.btn_text}`}>
                            <span className="text-base font-semibold">Metamask</span>
                            <span className="text-xs text-gray-900 text-opacity-50 mt-1 font-normal">One of the most secure wallets with great flexibility</span>
                          </div>
                          <i className={`fal fa-long-arrow-right ${styles.btn_arrow}`}/>
                        </a>
                      </li>
                      <li>
                        <a className={`${styles.btn}`} onClick={() => wallet.connect('walletconnect')}>
                          <span className={`icon ${styles.btn_icon}`}>
                            <img src="/images/icons/walletconnect-24.png" alt="WalletConnect" />
                          </span>
                          <div className={`${styles.btn_text}`}>
                            <span className="text-base font-semibold">WalletConnect</span>
                            <span className="text-xs text-gray-900 text-opacity-50 mt-1 font-normal">Connect with <b>Rainbow</b>, <b>Trust</b>, <b>Argent</b> and more</span>
                          </div>
                          <i className={`fal fa-long-arrow-right ${styles.btn_arrow}`}/>
                        </a>
                      </li>
                      <li>
                        <a className={`${styles.btn}`} onClick={() => wallet.connect('walletlink')}>
                          <span className={`icon ${styles.btn_icon}`}>
                            <img src="/images/icons/walletlink-24.png" alt="WalletLink" />
                          </span>
                          <div className={`${styles.btn_text}`}>
                            <span className="text-base font-semibold">WalletLink</span>
                            <span className="text-xs text-gray-900 text-opacity-50 mt-1 font-normal">Connect with <b>Coinbase</b> wallet</span>
                          </div>
                          <i className={`fal fa-long-arrow-right ${styles.btn_arrow}`}/>
                        </a>
                      </li>
                    </ul>    

                    <div className="mt-8">
                      <p className="text-xs text-gray-900 text-opacity-50">
                        We do not own your private keys and cannot access your funds without your confirmation.
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

  )
}

const WalletAvatar = ({wallet}) => {
  const text = wallet.account ?  wallet.account.substr(wallet.account.length - 3,1) + " " + wallet.account.substr(wallet.account.length - 2,1)  : 'a n';
  return (

    <div className="user-wallet_avatar_xs user-wallet_avatar_green mr-2">
      <Avatar name={text} maxInitials={2} textSizeRatio={6} />
    </div>

  )
}

const ConnectedButton = ({wallet}) => (
  <div className="btn text-sm font-medium px-3 py-2 bg-white border border-gray-200 rounded hover:bg-primary-50 hover:border-purple-500 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
    {/* <WalletAvatar wallet={wallet} /> */}
    <span className="icon text-base mr-2"><i className="fad fa-wallet"/></span>
    <span onClick={e => wallet.reset()}>Logout</span>
  </div>
)

const NotConnectedButton = ({wallet, showModal}) => (
  <span id="connect-wallet-btn" onClick={ showModal } type="button" className="btn text-sm font-medium px-3 py-2 bg-white border border-gray-200 rounded hover:bg-primary-50 hover:border-purple-500 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true">
    <span className="icon text-base"><i className="fad fa-wallet"/></span>
    <span className="sr-only md:not-sr-only md:ml-2">Connect Wallet</span>
  </span>
)


export const Wallet = observer(() => {
  const store = useStore()
  const wallet = useWallet()

  if (wallet.status === 'connected') {
      store.wallet.update(wallet.account)
  } else {
      store.wallet.update("")
  }  
  // const [isOpen, setIsOpen] = useState(false)
  const open = store?.wallet.showingConnect

  return (
    <div className="relative inline-block text-left">
      { store.wallet.isConnected ? <ConnectedButton wallet={wallet} /> : <NotConnectedButton wallet={wallet} showModal={() => store.wallet.showConnect(true)} /> }

      { !store.wallet.isConnected && <WalletContent wallet={wallet} closeModal={() => store.wallet.showConnect(false)} open={open} /> }
    </div>
  )
})