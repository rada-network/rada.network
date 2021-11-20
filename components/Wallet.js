import { createRef, Fragment, useEffect, useRef, useState} from "react"
import { observer } from "mobx-react"
import { useStore } from '../lib/useStore'

import { Dialog, Transition } from "@headlessui/react"
import styles from '../styles/modules/Dialog.wallet.module.css'
import Avatar from "boring-avatars";

import ReactTooltip from 'react-tooltip'
import {useTranslation} from "next-i18next";
import useActiveWeb3React from "../utils/hooks/useActiveWeb3React"
import {useEagerConnect,useInactiveListener} from "../utils/hooks"
import useChainConfig from "../utils/web3/useChainConfig"
import NetworkSwitch from "./NetworkSwitch"
import { getErrorMessage } from "../utils"
import { toast } from "react-toastify";
import _ from "lodash"

const btnRef = createRef()

const ConnectWalletModal = observer(({}) => {
  const store = useStore()
  const {t} = useTranslation()
  const context = useActiveWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const {injected,walletconnect} = useChainConfig()
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  const closeModal = () => { store.wallet.showConnect(false); }
  const isOpen = store?.wallet.showingConnect
  useEffect(() => {
    store.wallet.showConnect(false)
  }, [connector])

  useEffect(() => {
    if (!!error){
      toast.error(getErrorMessage(error,store.network))
    }
  }, [error])
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])



  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  //const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  //useInactiveListener(!triedEager || !!activatingConnector)

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
                          <a className={`btn btn-default btn-neutral ${styles.btn}`} onClick={() => {activate(injected);setActivatingConnector(injected)}
                          }>
                            <span className={`icon ${styles.btn_icon}`}>
                              <img src={process.env.NEXT_PUBLIC_CDN +"/images/icons/metamask-24.png"} alt="Metamask - Secure wallets with great flexibility" />
                            </span>
                            <div className={`${styles.btn_text}`}>
                              <span className="text-base font-semibold text-color-title">Metamask</span>
                              {/* <span className="text-color-desc text-sm">Secure wallets with great flexibility</span> */}
                            </div>
                            <i className={`fas fa-long-arrow-right ${styles.btn_arrow}`}/>
                          </a>
                        </li>
                        <li>
                          <a className={`btn btn-default btn-neutral ${styles.btn}`} onClick={() => {activate(walletconnect);setActivatingConnector(setActivatingConnector(walletconnect))}}>
                            <span className={`icon ${styles.btn_icon}`}>
                              <img src={process.env.NEXT_PUBLIC_CDN + "/images/icons/walletconnect-24.png"} alt="WalletConnect - Connect with Rainbow, Trust, Argent..." />
                            </span>
                            <div className={`${styles.btn_text}`}>
                              <span className="text-base font-semibold text-color-title">WalletConnect</span>
                              {/* <span className="text-color-desc text-sm">Connect with <b>Rainbow</b>, <b>Trust</b>, <b>Argent</b>...</span> */}
                            </div>
                            <i className={`fas fa-long-arrow-right ${styles.btn_arrow}`}/>
                          </a>
                        </li>
                        {/* <li>
                          <a className={`btn btn-default btn-neutral ${styles.btn}`} onClick={() => {}}>
                            <span className={`icon ${styles.btn_icon}`}>
                              <img src={process.env.NEXT_PUBLIC_CDN + "/images/icons/walletlink-24.png"} alt="WalletLink - Connect with Coinbase wallet" />
                            </span>
                            <div className={`${styles.btn_text}`}>
                              <span className="text-base font-semibold text-color-title">WalletLink</span>
                            </div>
                            <i className={`fas fa-long-arrow-right ${styles.btn_arrow}`}/>
                          </a>
                        </li> */}
                      </ul>
                    </div>

                    <div className="px-4 md:px-4 mt-6 md:mt-8">
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
)})

export const WalletProfile = ({type}) => {
  type = type || "full"
  const { account, library,chainId, deactivate,error,connector} = useActiveWeb3React()
  const { t } = useTranslation("invest");
  const store = useStore()
  const handleConnectWallet = () => {
    store.wallet.showConnect(true);
  };
  const handleDisconnectWallet = async () => {
    deactivate()
  };

  const handleConnectSuccess = () => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  };

  return (
    <>
    <ConnectWalletModal />
    {type == "full" ?
    <div className="list-group--item md:!pb-4">
      <div className="list-group--item--title w-full md:w-1/4">
        <div className="list-group--item--media">
          <span className="icon">
            <i className="fa-solid fa-wallet"></i>
          </span>
        </div>
        <label
          htmlFor="blockchain-wallet"
          className="text-color-desc"
        >
          Wallet
        </label>
      </div>
      <div className="flex-1 md:mt-0">
        <div className="relative pl-8 md:pl-0 w-full flex items-center">
          {_.isEmpty(account) ? (
            <span>
              {t("no connection", { provider: "wallet" })}
            </span>
          ) : (
            <>
              <div>
                <strong>{`${account.substr(
                  0,
                  6
                )}...${account.substr(
                  -4
                )} `}</strong>
              </div>
              <strong></strong>
              {store.network == "bsc" ?
              <span className="badge badge-coin relative ml-2">
                BSC
              </span>
              :
              <span className="badge badge-coin relative ml-2">
                ETHEREUM
              </span>
              }
            </>
          )}

        </div>
        {/* {!!error && <div className="relative pl-8 md:pl-0 w-full flex items-center">
          <h4 className="error">{getErrorMessage(error,store.network)}</h4>
        </div>} */}
      </div>
      <div className="text-right -mt-2 md:mt-0">
        {_.isEmpty(account) ? (
          <>
            <NetworkSwitch />
            <button
              className="btn btn-default"
              onClick={handleConnectWallet}
            >
              {t("connect")}
            </button>
          </>
        ) : (
          <button
            className="btn btn-default"
            onClick={() => handleDisconnectWallet()}
          >
            {t("disconnect")}
          </button>
        )}
      </div>
    </div>
    :
    <>
    {_.isEmpty(account) ? (
      <>
        <button onClick={handleConnectWallet} className="btn btn-primary my-2 px-2 ml-auto lg:mr-12 text-sm flex">
        <span class="icon mr-2 opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Wallet</title><path fill="currentColor" d="M18.874,18a3.757,3.757,0,0,1-3.669-4.538A3.819,3.819,0,0,1,18.982,10.5h2.393a.5.5,0,0,0,.5-.5c0-.793,0-2.254,0-2.254a2.5,2.5,0,0,0-2.5-2.5c-4.476,0,8.862-.01-14-.01a.75.75,0,0,1,0-1.5h13.25a.25.25,0,0,0,.25-.249V3.25c0-1.379-1.57-2.5-3.5-2.5h-11a3.5,3.5,0,0,0-3.5,3.5v15.5a3.5,3.5,0,0,0,3.5,3.5h15a2.5,2.5,0,0,0,2.5-2.5v-2.5a.25.25,0,0,0-.25-.25Z"/><path fill="currentColor"  d="M21.874,12h-3a2.25,2.25,0,1,0,0,4.5h3a1.506,1.506,0,0,0,1.25-1.5V13.5A1.506,1.506,0,0,0,21.874,12Z"/></svg>
        </span>
        {t("connect")}</button>
      </>
    ) : (
      <button
        className="btn btn-primary my-2 px-2 ml-auto lg:mr-12 text-sm flex"
        onClick={() => handleDisconnectWallet()}
      >
        <span class="icon mr-2 opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Wallet</title><path fill="currentColor" d="M18.874,18a3.757,3.757,0,0,1-3.669-4.538A3.819,3.819,0,0,1,18.982,10.5h2.393a.5.5,0,0,0,.5-.5c0-.793,0-2.254,0-2.254a2.5,2.5,0,0,0-2.5-2.5c-4.476,0,8.862-.01-14-.01a.75.75,0,0,1,0-1.5h13.25a.25.25,0,0,0,.25-.249V3.25c0-1.379-1.57-2.5-3.5-2.5h-11a3.5,3.5,0,0,0-3.5,3.5v15.5a3.5,3.5,0,0,0,3.5,3.5h15a2.5,2.5,0,0,0,2.5-2.5v-2.5a.25.25,0,0,0-.25-.25Z"/><path fill="currentColor"  d="M21.874,12h-3a2.25,2.25,0,1,0,0,4.5h3a1.506,1.506,0,0,0,1.25-1.5V13.5A1.506,1.506,0,0,0,21.874,12Z"/></svg>
        </span>
        {t("disconnect")}
      </button>
    )}
    </>
    }
    </>
  )
}

export const WalletRequire = ({type}) => {
  type = type || "full"
  const { account, library,chainId, deactivate,error} = useActiveWeb3React()
  const { t } = useTranslation("invest");
  const store = useStore()
  const handleConnectWallet = () => {
    store.wallet.showConnect(true);
  };
  const handleDisconnectWallet = async () => {
    deactivate()
  };

  const handleConnectSuccess = () => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  };

  return (
    <>
    <div className="list-group--item md:!pb-4">
      <div className="list-group--item--title w-full md:w-1/4">
        <div className="list-group--item--media">
          <span className="icon">
            <i className="fa-solid fa-wallet"></i>
          </span>
        </div>
        <label
          htmlFor="blockchain-wallet"
          className="text-color-desc"
        >
          Wallet
        </label>
      </div>
      <div className="flex-1 md:mt-0">
        <div className="relative pl-8 md:pl-0 w-full flex items-center">
          {_.isEmpty(account) ? (
            ""
          ) : (
            <>
              <div>
                <strong>{`${account.substr(
                  0,
                  6
                )}...${account.substr(
                  -4
                )} `}</strong>
              </div>
              <strong></strong>
              {store.network == "bsc" ?
              <span className="badge badge-coin relative ml-2">
                BSC
              </span>
              :
              <span className="badge badge-coin relative ml-2">
                ETHEREUM
              </span>
              }
            </>
          )}
          
        </div>
        {/* {!!error && <div className="relative pl-8 md:pl-0 w-full flex items-center">
          <h4 className="error">{getErrorMessage(error,store.network)}</h4>
        </div>} */}
      </div>
      <div className="text-right -mt-2 md:mt-0">
        {_.isEmpty(account) ? (
          <>
            {/* <NetworkSwitch /> */}
            <button
              className="btn btn-default"
              onClick={handleConnectWallet}
            >
              {t("connect")}
            </button>
          </>
        ) : (
          <span className="flex label label--success w-full">Done</span>
        )}
      </div>
    </div>
    </>
  )
  
}