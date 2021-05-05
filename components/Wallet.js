import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { Dialog, Transition } from "@headlessui/react"
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { Fragment, useState, useRef, useContext, createContext } from "react"
import login from "../../joom_clone/src/pages/api/login";
import {useAuthState} from "../context/auth";

const WalletContent = ({wallet, closeModal, open}) => {
  const cancelButtonRef = useRef();
  const {isAuthenticated_, address} = useAuthState()
  console.log(`isAuthenticated: ${isAuthenticated_}, ${address}`)

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
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
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Connect to your Wallet
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                Select a Wallet Connector to connect with your wallet
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  <ul>
                      <li>
                        <a onClick={() => wallet.connect()}>Connect Metamask</a>
                      </li>
                      <li>
                        <a onClick={() => wallet.connect('walletconnect')}>WalletConnect</a>
                      </li>
                      <li>
                        <a onClick={() => wallet.connect('walletlink')}>WalletLink</a>
                      </li>
                  </ul>                    
                </button>
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


export const Wallet = () => {
  const wallet = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      { wallet?.status === 'connected' ? <ConnectedButton wallet={wallet} /> : <NotConnectedButton wallet={wallet} showModal={() => setIsOpen(true)} /> }

      { wallet?.status !== 'connected' && <WalletContent wallet={wallet} closeModal={() => setIsOpen(false)} open={isOpen} /> }
    </div>
  )
}