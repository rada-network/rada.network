import { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../lib/useStore";
import NetworkSwitch from "./NetworkSwitch";
import Screen from "./utils/Responsive";
import { useTranslation } from "next-i18next";
import useActiveWeb3React from "../utils/hooks/useActiveWeb3React";
import useAuth from "../utils/hooks/useAuth";
import { Dialog, Transition } from "@headlessui/react";
import useChainConfig from "../utils/web3/useChainConfig";
import { getErrorMessage } from "../utils";
import { toast } from "react-toastify";
import _ from "lodash";

const WalletProfile = ({ type, hidenSelectbox }) => {
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
      {type == "full" ? (
        <div className="list-group--item !pb-0 md:!pb-4">

          <div className="list-group--item--title w-1/3">
            <div className="list-group--item--media">
              <span className="icon">
                <i className="fa-solid fa-wallet"></i>
              </span>
            </div>
            <label htmlFor="blockchain-wallet" className="text-color-desc">
              {t("Wallet")}
            </label>
          </div>

          <div className="flex-1 -mt-4 md:mt-0">
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

          </div>
          <div className="text-right -mt-2 md:mt-0">
            {_.isEmpty(account) ? (
              <>
                {!hidenSelectbox && (
                  <NetworkSwitch />
                )}

                <button
                  className="btn btn-default w-20 md:w-24"
                  onClick={handleConnectWallet}
                >
                  {t("connect")}
                </button>
              </>
            ) : (
              <button
                className="btn btn-default w-20 md:w-24"
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
              {type === "simple" &&
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
              }
            </>
          ) : (
            <div className="btn btn-default btn-primary my-2 pl-2 pr-1 ml-auto lg:mr-3 xl:mr-12 text-sm flex items-center rounded-lg"
              onClick={() => handleDisconnectWallet()}
            >
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
                    <span className="bg-white text-gray-700 text-2xs py-0.5 px-1 mx-1 rounded">
                      BSC
                    </span>
                  ) : (
                    <span className="bg-white text-gray-700 text-2xs py-0.5 px-1 mx-1 rounded">
                      ETHEREUM
                    </span>
                  )}

                  <button
                    className="text-right p-1 rounded-lg z-10"
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
