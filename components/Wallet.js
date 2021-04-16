import { useWallet, ConnectionRejectedError } from 'use-wallet'
import { Menu, Transition } from "@headlessui/react"
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { Fragment } from "react"

const WalletContent = ({wallet}) => {
  if (wallet.error?.name) {
    return (
      <>
        <span>
          {wallet.error instanceof ConnectionRejectedError
            ? 'Connection error: the user rejected the activation'
            : wallet.error.message}
        </span>
        <button onClick={() => wallet.reset()}>retry</button>
      </>
    )
  }

  if (wallet.status === 'connected') {
    return (
      <>
        <button onClick={() => wallet.reset()}>disconnect</button>
      </>
    )
  }
  
  return (
    <>
        <Menu.Item>
          <a onClick={() => wallet.connect()}>Connect Metamask</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => wallet.connect('walletconnect')}>WalletConnect</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => wallet.connect('walletlink')}>WalletLink</a>
        </Menu.Item>
    </>
  )
}

export const Wallet = () => {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  return (
    <Menu as="div" className="relative inline-block text-left">
    {({ open }) => (
        <>
          <div>
            <Menu.Button type="button" className="flex px-3 py-2 text-sm font-medium bg-white border border-gray-400 rounded-md btn md:px-4 hover:bg-primary-50 hover:border-purple-500 hover:text-primary-700 focus:outline-none" id="user-menu" aria-expanded="false" aria-haspopup="true">
              <span class="icon text-base"><BiWallet /></span>
              <span class="sr-only md:not-sr-only md:ml-2">{ wallet?.status === 'connected' ? `${wallet.account.substr(0, 4)}...${wallet.account.substr(-4)} ` : 'Connect Wallet' }</span>
            </Menu.Button>
          </div>
          <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
                static
                className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                <WalletContent wallet={wallet} />
              </div>
              
            </Menu.Items>
          </Transition>
        </>
    )}
    </Menu>
  )
}