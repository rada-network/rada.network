import { useStore } from "../lib/useStore";

import { useTranslation } from "next-i18next";
import useActiveWeb3React from "../utils/hooks/useActiveWeb3React";

import _ from "lodash";

export const WalletRequire = ({ type }) => {
  type = type || "full";
  const { account, deactivate } = useActiveWeb3React();
  const { t } = useTranslation("common");
  const store = useStore();
  const handleConnectWallet = () => {
    store.wallet.showConnect(true);
  };

  return (
    <>
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
              "Connect your wallet"
            ) : (
              <>
                <div>
                  <strong>{`${account.substr(0, 6)}...${account.substr(
                    -4
                  )} `}</strong>
                </div>
                {store.network == "bsc" ? (
                  <span className="badge badge-coin relative ml-2">BSC</span>
                ) : (
                  <span className="badge badge-coin relative ml-2">
                    ETHEREUM
                  </span>
                )}
                <button className="ml-2 opacity-70 hover:opacity-100 p-1 rounded-lg z-10"><span className="icon"><i className="fas fa-sign-out"></i></span><span className="sr-only">Disconnect</span></button>
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
                className="btn btn-default w-20 md:w-24"
                onClick={handleConnectWallet}
              >
                {t("connect")}
              </button>
            </>
          ) : (
            <span className="flex label label--success w-auto md:w-24">
              <span className="icon mr-1"><i className="fas fa-check"></i></span>
              Done
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletRequire;
