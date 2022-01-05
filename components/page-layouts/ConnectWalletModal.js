

import { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../lib/useStore";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import useActiveWeb3React from "../../utils/hooks/useActiveWeb3React";
import useChainConfig from "../../utils/web3/useChainConfig";

import { getErrorMessage } from "../../utils";
import { toast } from "react-toastify";
import _ from "lodash";
import useAuth from "../../utils/hooks/useAuth";

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
        logout()
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

  export default ConnectWalletModal