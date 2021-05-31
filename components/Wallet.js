import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { Fragment, useState, useRef } from "react"
import { observer, inject } from "mobx-react"
import { useStore } from '../lib/useStore'

import { Dialog, Transition } from "@headlessui/react"
import ReactTooltip from 'react-tooltip';

const WalletContent = ({wallet, closeModal, open}) => {
  const cancelButtonRef = useRef();

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-80"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
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
            <div className="inline-block w-full max-w-2xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded">

              <div className="flex">

                {/* Dialog Header */}
                <div className="flex w-5/12 bg-gradient-to-br from-purple-700 to-purple-500 text-white">
                  <Dialog.Title
                    as="div"
                    className="dialog-header flex flex-col py-6 px-8"
                  >
                    <h3 className="text-xl font-semibold">Connect your wallet</h3>
                    <div className="mt-2">
                      <p className="text-sm text-white text-opacity-50">
                        Connect with one of our available wallet providers.
                      </p>
                    </div>
                  </Dialog.Title>
                </div>

                {/* Dialog Body */}
                <div className="flex w-7/12">

                  <button type="button" className="btn text-gray-900 text-opacity-10 justify-center absolute top-2 right-2 rounded-full w-px-24 h-px-24 hover:bg-red-100 hover:text-red-700" onClick={closeModal}>
                    <i className="far fa-times text-sm"></i>
                  </button>

                  <div className="dialog-body py-8 px-8 bg-gradient-to-tr from-gray-50 to-gray-100">

                    <ul>
                      <li>
                        <a className="group btn rounded-md bg-white border border-black border-opacity-10 py-3 px-5 mb-4 w-full hover:bg-primary-100 hover:border-primary-500 hover:shadow-md" onClick={() => wallet.connect()}>
                          <span className="icon w-px-24 h-px-24 mr-4">
                            <img className="block w-auto" src="/images/icons/metamask-24.png" alt="Metamask" />
                          </span>
                          <div className="flex flex-col flex-1 mr-4">
                            <span className="text-base font-semibold">Metamask</span>
                            <span className="text-xs text-gray-900 text-opacity-50 mt-1 font-normal">One of the most secure wallets with great flexibility</span>
                          </div>
                          <i className="fal fa-long-arrow-right transform group-hover:translate-x-1 transition-transform"/>
                        </a>
                      </li>
                      <li>
                        <a className="group btn rounded-md bg-white border border-black border-opacity-10 py-3 px-5 mb-4 w-full hover:bg-primary-100  hover:border-primary-500 hover:shadow-md" onClick={() => wallet.connect('walletconnect')}>
                          <span className="icon w-px-24 h-px-24 mr-4">
                            <img className="block w-auto" src="/images/icons/walletconnect-24.png" alt="WalletConnect" />
                          </span>
                          <div className="flex flex-col flex-1 mr-4">
                            <span className="text-base font-semibold">WalletConnect</span>
                            <span className="text-xs text-gray-900 text-opacity-50 mt-1 font-normal">Connect with <b>Rainbow</b>, <b>Trust</b>, <b>Argent</b> and more</span>
                          </div>
                          <i className="fal fa-long-arrow-right transform group-hover:translate-x-1 transition-transform"/>
                        </a>
                      </li>
                      <li>
                        <a className="group btn rounded-md bg-white border border-black border-opacity-10 py-3 px-5 mb-8 w-full hover:bg-primary-100  hover:border-primary-500 hover:shadow-md" onClick={() => wallet.connect('walletlink')}>
                          <span className="icon w-px-24 h-px-24 mr-4">
                            <img className="block w-auto rounded-md" src="/images/icons/walletlink-24.png" alt="WalletLink" />
                          </span>
                          <div className="flex flex-col flex-1 mr-4">
                            <span className="text-base font-semibold">WalletLink</span>
                            <span className="text-xs text-gray-900 text-opacity-50 mt-1 font-normal">Connect with <b>Coinbase</b> wallet</span>
                          </div>
                          <i className="fal fa-long-arrow-right transform group-hover:translate-x-1 transition-transform"/>
                        </a>
                      </li>
                    </ul>    

                    <div className="mt-auto">
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

const ConnectedButton = ({wallet}) => (
  <span type="button" className="btn flex text-sm font-medium px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-primary-50 hover:border-purple-500 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
    <span className="icon text-base mr-2"><BiWallet /></span>
    <span>{ `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} `}</span>
    <span onClick={e => wallet.reset()}>Logout</span>
  </span>
)

const NotConnectedButton = ({wallet, showModal}) => (
  <span id="connect-wallet-btn" onClick={ showModal } type="button" className="btn flex text-sm font-medium px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-primary-50 hover:border-purple-500 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true">
    <span className="icon text-base"><i className="fad fa-wallet"></i></span>
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