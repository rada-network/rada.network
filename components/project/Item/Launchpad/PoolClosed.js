import ProjectCountdown from "./AuctionSwap/Countdown";
import OpenDate from "./OpenDate";
import { useTranslation } from "react-i18next";
import SocialPromote from "./SocialPromote";
import dynamic from "next/dynamic";
const WalletRequire = dynamic(import("@components/WalletRequire"));

const PoolClosed = ({ project }) => {
  const { t } = useTranslation("launchpad");
  return (
    <>
      <div className="max-w-lg w-full mx-auto">
        <div className="mt-4">
          <h3 className="text-2xl text-center font-normal">
            <span className="text-color-title">{t("pool closed")}</span>
          </h3>

        </div>

        <div className="max-w-2xl mx-auto p-4 lg:px-8 rounded-lg">
          <div className="mb-4">
            <p className="text-center font-normal text-base">{t("pool close note")}</p>
          </div>
          <div className="list-group rounded-md bg-gray-100 dark:bg-gray-900 px-4">
            <WalletRequire />
          </div>
          <div className="">
            <SocialPromote />
          </div>
        </div>

      </div>
    </>
  );
};

export default PoolClosed;