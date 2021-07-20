import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { Fragment, useEffect, useRef } from "react"
import { observer, inject } from "mobx-react"
import { useStore } from '../lib/useStore'

import {IoChevronBackSharp} from "react-icons/io5";

import { Dialog, Transition } from "@headlessui/react"
import styles from '../styles/modules/Dialog.wallet.module.css'
import Avatar from "boring-avatars";

import ReactTooltip from 'react-tooltip'


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
                      <span className="btn__text font-normal">Go back</span>
                    </button>
                    <h3 className="text-xl font-semibold">
                      Connect your 
                      <span 
                        className="hasTooltip" 
                        data-tip="A blockchain wallet is an application or hardware device that allows users to transact, store, and exchange value on a blockchain, as well as monitor and manage their crypto assets."
                      > wallet <i className="fad fa-info-circle text-base" />
                      </span>
                    </h3>
                    <div className="mt-4 text-sm text-white text-opacity-70 leading-6">
                      <p className="">
                        Create an account to <b className="text-white text-opacity-100">vote</b> and <b className="text-white text-opacity-100">discuss</b> your interest topics by connecting to your wallet
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
                            <span className="text-xs text-gray-400 mt-1 font-normal">One of the most secure wallets with great flexibility</span>
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
                            <span className="text-xs text-gray-400 mt-1 font-normal">Connect with <b>Rainbow</b>, <b>Trust</b>, <b>Argent</b> and more</span>
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
                            <span className="text-xs text-gray-400 mt-1 font-normal">Connect with <b>Coinbase</b> wallet</span>
                          </div>
                          <i className={`fal fa-long-arrow-right ${styles.btn_arrow}`}/>
                        </a>
                      </li>
                    </ul>    

                    <div className="mt-8">
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

  )
}

const WalletAvatar = ({wallet}) => {
  const text = wallet.account
  return (
    <div className="mr-2">
      <Avatar
        size={24}
        name={text}
        variant="bauhaus"
        colors={["#8B5CF6", "#34D399", "#FEF3C7", "#FBBF24", "#EF4444"]}
      />
    </div>
  )
}

const ConnectedButton = ({wallet}) => (
  <div className="btn nav-btn btn-connect-wallet" aria-expanded="false" aria-haspopup="true">
    {/* <span>{ `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} `}</span> */}
    <WalletAvatar wallet={wallet} />
    <span className="hidden">{ `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} `}</span>
    <span onClick={e => wallet.reset()}>Logout</span>
  </div>
)

const NotConnectedButton = ({wallet, showModal}) => (
  <div onClick={ showModal } type="button" className="btn nav-btn btn-connect-wallet" aria-expanded="false" aria-haspopup="true">
    <span className="icon leading-5"><i className="fad fa-wallet" /></span>
    <span className="hidden md:inline-block md:ml-2 whitespace-nowrap">Connect Wallet</span>
  </div>
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

  // rebuild tooltip
  useEffect(() => {
    setTimeout(() => ReactTooltip.rebuild(), 200)
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      { store.wallet.isConnected ? <ConnectedButton wallet={wallet} /> : <NotConnectedButton wallet={wallet} showModal={() => store.wallet.showConnect(true)} /> }

      { !store.wallet.isConnected && <WalletContent wallet={wallet} closeModal={() => store.wallet.showConnect(false)} open={open} /> }
    </div>
  )
})