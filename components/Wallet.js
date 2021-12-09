import { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../lib/useStore";

import { Dialog, Transition } from "@headlessui/react";

import Screen from "./utils/Responsive";

import { useTranslation } from "next-i18next";
import useActiveWeb3React from "../utils/hooks/useActiveWeb3React";

import useChainConfig from "../utils/web3/useChainConfig";
import NetworkSwitch from "./NetworkSwitch";
import { getErrorMessage } from "../utils";
import { toast } from "react-toastify";
import _ from "lodash";
import useAuth from "../utils/hooks/useAuth";

const ConnectWalletModal = observer(({}) => {
  const store = useStore();
  const { t } = useTranslation("common");
  const context = useActiveWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const { injected, walletconnect } = useChainConfig();
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  const { login, logout } = useAuth();
  const closeModal = () => {
    store.wallet.showConnect(false);
  };
  const isOpen = store?.wallet.showingConnect;
  const [showMetamask, setShowMetamask] = useState(true);
  useEffect(() => {
    store.wallet.showConnect(false);
  }, [connector]);

  useEffect(() => {
    if (!window.ethereum) {
      setShowMetamask(false);
    }
  }, []);

  useEffect(() => {
    if (!!error) {
      toast.error(getErrorMessage(error, store.network));
    }
  }, [error]);
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  //const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  //useInactiveListener(!triedEager || !!activatingConnector)
  const listNetworks = [
    {
      name: "Binance Smart Chain",
      networkName: "bsc",
      icon: "bsc",
    },
    {
      name: "Ethereum",
      networkName: "eth",
      icon: "ethereum",
    },
    {
      name: "Polygon",
      networkName: "matic",
      icon: "polygon",
    },
    {
      name: "Solana",
      networkName: "sol",
      icon: "solana",
    },
  ];
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
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
              <Dialog.Overlay className="dialog-overlay fixed inset-0" />
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
              leaveFrom="opacity-100 scale-y-100 h-full"
              leaveTo="opacity-0 scale-y-0 h-0"
            >
              <div
                className="inline-block w-full max-w-lg my-8 overflow-hidden relative
          text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg border-b dark:border-gray-700 border-gray-200
                font-medium p-4 md:p-6 leading-6 text-gray-900 dark:text-gray-300"
                >
                  Connect your wallet
                </Dialog.Title>
                <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="wallet-section pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="wallet-step">
                      <div
                        className="icon mr-2 !flex w-px-24 h-px-24 items-center justify-center
                  rounded-full border-2 border-gray-300 dark:border-gray-600"
                      >
                        <strong className="text-sm">
                          <span className="sr-only">Step</span>1
                        </strong>
                      </div>
                      <h3>Network selected</h3>
                    </div>
                    <ul className="flex mt-4 lg:ml-4">
                      {listNetworks.map(function (item) {
                        if (item.networkName !== store.network) {
                          return null;
                        }
                        return (
                          <li
                            key={item.networkName}
                            className="wallet-item checked"
                          >
                            <button className="wallet-option ">
                              <img
                                className="wallet-icon-img w-14 h-14"
                                src={`/wallet-icons/${item.icon}.svg`}
                                alt={item.name}
                              />
                              {store.network === item.networkName && (
                                <span className="w-4 h-4 text-center bg-green-500 text-white rounded-full absolute rounded-full top-0 right-0 flex items-center">
                                  <i className="fa-duotone mx-auto font-bold fa-check text-2xs"></i>
                                </span>
                              )}
                            </button>

                            <div className="mt-2">{item.name}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* end of wallet-section */}
                  <div className="wallet-section">
                    <div className="wallet-step">
                      <div
                        className="icon mr-2 !flex w-px-24 h-px-24 items-center justify-center
                  rounded-full border-2 border-gray-300 dark:border-gray-600"
                      >
                        <strong className="text-sm">
                          <span className="sr-only">Step</span>2
                        </strong>
                      </div>
                      <h3>Choose a wallet</h3>
                    </div>
                    <ul className="flex mt-4 lg:ml-4">
                      {showMetamask && (
                        <li key={`metamask`} className="wallet-item">
                          <button
                            className="wallet-option "
                            onClick={(e) => {
                              login("injected");
                            }}
                          >
                            <img
                              className="wallet-icon-img w-14 h-14"
                              src="/wallet-icons/metamask.svg"
                              alt="Metamask"
                            />
                          </button>

                          <div>Metamask</div>
                        </li>
                      )}
                      <li key={`walletconnect`} className="wallet-item">
                        <button
                          className="wallet-option"
                          onClick={(e) => {
                            login("walletconnect");
                          }}
                        >
                          <img
                            className="w-14 h-14"
                            src="/wallet-icons/wallet-connect.svg"
                            alt="WalletConnect"
                          />
                        </button>
                        <div>Wallet Connect</div>
                      </li>
                      <li key={`Ledger`} className="wallet-item disabled">
                        <button className="wallet-option">
                          <img
                            className="w-14 h-14"
                            src="/wallet-icons/ledger.svg"
                            alt="Ledger"
                          />
                        </button>
                        <div>Ledger</div>
                      </li>
                      <li key={`Trezor`} className="wallet-item disabled">
                        <button className="wallet-option checked">
                          <img
                            className="w-14 h-14"
                            src="/wallet-icons/trezor.svg"
                            alt="Trezor"
                          />
                        </button>
                        <div>Trezor</div>
                      </li>
                    </ul>
                  </div>
                  {/* end of wallet section */}
                </div>

                <div className="absolute right-4 top-2 md:top-4">
                  <button
                    type="button"
                    className="w-10 h-10 inline-flex items-center justify-center bg-transparent transition
                text-base font-medium text-gray-700 dark:text-gray-200 border border-transparent rounded-full
              hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none
                focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    <i className="fa-duotone fa-close text-base"></i>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

const WalletProfile = ({ type }) => {
  type = type || "full";
  const { account, deactivate } = useActiveWeb3React();
  const { t } = useTranslation("common");
  const store = useStore();
  const { logout } = useAuth();
  const handleConnectWallet = () => {
    store.wallet.showConnect(true);
  };
  const handleDisconnectWallet = async () => {
    logout();
  };
  return (
    <>
      <ConnectWalletModal />
      {type == "full" ? (
        <div className="list-group--item !px-0">
          <div className="list-group--item--title w-full md:w-1/4">
            <div className="list-group--item--media">
              <span className="icon">
                <i className="fa-solid fa-wallet"></i>
              </span>
            </div>
            <label htmlFor="blockchain-wallet" className="text-color-desc">
              {t("Wallet")}
            </label>
          </div>
          <div className="flex-1 md:mt-0">
            <div className="relative pl-8 md:pl-0 w-full flex items-center">
              {_.isEmpty(account) ? (
                <span>{t("no connection", { provider: "wallet" })}</span>
              ) : (
                <>
                  <Screen upto="sm">
                    <div>
                      <strong>{`${account.substr(0, 3)}...${account.substr(
                        -3
                      )} `}</strong>
                    </div>
                  </Screen>
                  <Screen from="md">
                    <div>
                      <strong>{`${account.substr(0, 6)}...${account.substr(
                        -4
                      )} `}</strong>
                    </div>
                  </Screen>
                  {store.network == "bsc" ? (
                    <span className="badge badge-coin relative ml-2">BSC</span>
                  ) : (
                    <span className="badge badge-coin relative ml-2">
                      ETHEREUM
                    </span>
                  )}
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
                  className="btn btn-default w-24"
                  onClick={handleConnectWallet}
                >
                  {t("connect")}
                </button>
              </>
            ) : (
              <button
                className="btn btn-default w-24"
                onClick={() => handleDisconnectWallet()}
              >
                {t("disconnect")}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {_.isEmpty(account) ? (
            <>
              <button
                onClick={handleConnectWallet}
                className="btn btn-primary my-2 px-2 ml-auto lg:mr-3 xl:mr-12 text-sm flex"
              >
                <span className="icon mr-2 opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Wallet</title>
                    <path
                      fill="currentColor"
                      d="M18.874,18a3.757,3.757,0,0,1-3.669-4.538A3.819,3.819,0,0,1,18.982,10.5h2.393a.5.5,0,0,0,.5-.5c0-.793,0-2.254,0-2.254a2.5,2.5,0,0,0-2.5-2.5c-4.476,0,8.862-.01-14-.01a.75.75,0,0,1,0-1.5h13.25a.25.25,0,0,0,.25-.249V3.25c0-1.379-1.57-2.5-3.5-2.5h-11a3.5,3.5,0,0,0-3.5,3.5v15.5a3.5,3.5,0,0,0,3.5,3.5h15a2.5,2.5,0,0,0,2.5-2.5v-2.5a.25.25,0,0,0-.25-.25Z"
                    />
                    <path
                      fill="currentColor"
                      d="M21.874,12h-3a2.25,2.25,0,1,0,0,4.5h3a1.506,1.506,0,0,0,1.25-1.5V13.5A1.506,1.506,0,0,0,21.874,12Z"
                    />
                  </svg>
                </span>
                {t("connect")}
              </button>
            </>
          ) : (
            <div className="border border-primary-500 my-2 pl-2 pr-1 ml-auto lg:mr-3 xl:mr-12 text-sm flex items-center rounded-lg">
              {_.isEmpty(account) ? (
                <span>{t("no connection", { provider: "wallet" })}</span>
              ) : (
                <>
                  <Screen upto="sm">
                    <div className="text-2xs">
                      <strong className="font-normal">{`${account.substr(
                        0,
                        2
                      )}...${account.substr(-3)} `}</strong>
                    </div>
                  </Screen>
                  <Screen from="md">
                    <div className="text-xs">
                      <strong className="font-normal">{`${account.substr(
                        0,
                        6
                      )}...${account.substr(-4)} `}</strong>
                    </div>
                  </Screen>
                  {store.network == "bsc" ? (
                    <span className="badge badge-coin relative ml-2 mr-2">
                      BSC
                    </span>
                  ) : (
                    <span className="badge badge-coin relative ml-2 mr-2">
                      ETHEREUM
                    </span>
                  )}
                  <button
                    className="text-right opacity-70 hover:opacity-100 p-1 rounded-lg z-10"
                    onClick={() => handleDisconnectWallet()}
                  >
                    <span className="icon">
                      <i className="fas fa-sign-out"></i>
                    </span>
                    <span className="sr-only">{t("disconnect")}</span>
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WalletProfile;
