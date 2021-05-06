import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { Dialog, Transition } from "@headlessui/react"
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { Fragment, useState, useRef } from "react"
import { observer, inject } from "mobx-react"
import { useStore } from '../lib/useStore'


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
            <div className="inline-block w-full max-w-sm overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded">

              <button type="button" className="btn text-gray-900 text-opacity-10 justify-center absolute top-2 right-2 rounded-full w-px-24 h-px-24 hover:bg-red-100 hover:text-red-700" onClick={closeModal}>
                <i class="far fa-times text-sm"></i>
              </button>

              <Dialog.Title
                as="div"
                className="dialog-header py-5 px-8"
              >
                <h3 className="text-lg font-semibold">Connect to your Wallet</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-900 text-opacity-60">
                  Select a Wallet Connector to connect with your wallet
                  </p>
                </div>
              </Dialog.Title>

              <div className="dialog-body py-8 px-8 bg-gradient-to-tr from-gray-50 to-gray-100 bg-gray-50">

                <ul>
                  <li>
                    <a className="group btn rounded-md bg-white border border-black border-opacity-10 py-3 px-5 my-2 w-full hover:bg-primary-100 hover:border-primary-500 hover:shadow-md" onClick={() => wallet.connect()}>
                      <span className="icon w-px-24 h-px-24 mr-4">
                        <img className="block w-auto" src="/images/icons/metamask-24.png" alt="Metamask" />
                      </span>
                      <span className="flex-1">Metamask</span>
                      <i className="fal fa-long-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </li>
                  <li>
                    <a className="group btn rounded-md bg-white border border-black border-opacity-10 py-3 px-5 my-2 w-full hover:bg-primary-100  hover:border-primary-500 hover:shadow-md" onClick={() => wallet.connect('walletconnect')}>
                      <span className="icon w-px-24 h-px-24 mr-4">
                        <img className="block w-auto" src="/images/icons/walletconnect-24.png" alt="WalletConnect" />
                      </span>
                      <span className="flex-1">WalletConnect</span>
                      <i className="fal fa-long-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </li>
                  <li>
                    <a className="group btn rounded-md bg-white border border-black border-opacity-10 py-3 px-5 my-2 w-full hover:bg-primary-100  hover:border-primary-500 hover:shadow-md" onClick={() => wallet.connect('walletlink')}>
                      <span className="icon w-px-24 h-px-24 mr-4">
                        <img className="block w-auto rounded-md" src="/images/icons/walletlink-24.png" alt="WalletLink" />
                      </span>
                      <span className="flex-1">WalletLink</span>
                      <i className="fal fa-long-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </li>
                </ul>                    
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