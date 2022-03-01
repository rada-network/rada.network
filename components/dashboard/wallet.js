import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import { useState, useEffect } from "react";
import useStore from "@lib/useStore";
import useAuth from "@utils/hooks/useAuth";
import dynamic from "next/dynamic";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useRIRContract } from "@utils/hooks/useContracts";
import { ethers, utils } from "ethers";
import _ from "lodash";
import { useTranslation } from "react-i18next";
const WalletProfile = dynamic(import("@components/Wallet"))


function DashboardWallet() {
  const { t } = useTranslation("common");
  const store = useStore();
  const { account, deactivate } = useActiveWeb3React();
  const [accountBalance, setAccountBalance] = useState(0);
  const rirContract = useRIRContract();
  const { logout } = useAuth();


  const fetchAccountBalance = async function () {
    let rirBalance = await rirContract.balanceOf(account);
    setAccountBalance(utils.formatEther(rirBalance));
  };

  useEffect(() => {
    if (!!account) {
      fetchAccountBalance()
    }
  }, [account]);

  const handleConnectWallet = () => {
    if (!!account) {
      logout();
    } else {
      store.wallet.showConnect(true);
    }
  };

  return (
    <>
      <div className="card card-default mb-4 md:mb-0">
        <div className="card-header pb-1">
          <h3>{t("Wallet")}</h3>
        </div>
        <div className="card-body !px-4 md:!px-6 !py-0">
          <div className="list-group">
            {/* <WalletProfile hidenSelectbox={true} /> */}

            <div className="list-group--item !px-0 relative">
              <div className="list-group--item--title w-full md:w-1/3">
                <div className="list-group--item--media dark:!bg-gray-700">
                  <span className="icon "><i className="fa-solid fa-wallet"></i></span>
                </div>
                <label htmlFor="blockchain-wallet" className="text-color-desc">
                  {t("Wallet")}
                </label>
              </div>
              <div className="flex-1">
                <div className="relative pl-8 md:pl-0 w-full flex items-center">
                  {!!account ? (
                    <strong>{`${account.substr(0, 4)}...${account.substr(-6)} `}</strong>
                  ) : (
                    <span className="text-sm">{t("no connection", { provider: "wallet" })}</span>
                  )}
                </div>
              </div>
              <div className="text-right absolute top-6 md:top-4 right-0">
                <button className="btn btn-default btn-primary"
                  onClick={handleConnectWallet}
                >
                  {!!account ? t("disconnect") : t("connect")}
                </button>
              </div>
            </div>

            <div className="list-group--item !px-0 justify-between md:!justify-start">
              <div className="list-group--item--title w-auto md:w-1/3">
                <div className="list-group--item--media dark:!bg-gray-700">
                  <RadaSvg />
                </div>
                <label className="text-color-desc">
                  {t("rir banlance")}
                </label>
              </div>
              <div className="ml-auto md:ml-0 md:mt-0">
                <div className="relative md:pl-0 w-full flex items-center">
                  <strong className="mr-1">{accountBalance}</strong> RIR
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 flex items-centers rounded-lg">
            {t("Want to earn free RIR")}
            <a href={t("learn more url")} target="_blank" className="ml-auto flex items-center text-yellow-500">
              {t("Learn more")}
              <i className="fas fa-angle-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardWallet
