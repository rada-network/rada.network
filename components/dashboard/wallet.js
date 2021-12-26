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


  const fetchAccountBalance = async function () {
    let rirBalance = await rirContract.balanceOf(account);
    setAccountBalance(utils.formatEther(rirBalance));
  };

  useEffect(() => {
    if (!!account) {
      fetchAccountBalance()
    }
  },[account]);

  return (
    <>
      <div className="card--wrapper  mb-4 md:mb-0">
        <div className="card--header pb-1">
          {t("Wallet")}
        </div>
        <div className="card--body">
          <div className="list-group">
            <WalletProfile hidenSelectbox={true}/>

            <div className="list-group--item !pb-0 md:!pb-4">
              <div className="list-group--item--title w-1/3">
                <div className="list-group--item--media dark:!bg-gray-700">
                  <RadaSvg />
                </div>
                <label htmlFor="blockchain-wallet" className="text-color-desc">
                  {t("rir banlance")}
                </label>
              </div>
              
              <div className="flex-1 md:mt-0">
                <div className="relative pl-8 md:pl-0 w-full flex items-center">
                  {accountBalance} RIR
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex items-centers dark:border-gray-500 dark:border-opacity-10">
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
