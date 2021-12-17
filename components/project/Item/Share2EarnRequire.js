import useStore from "@lib/useStore";
import { useEffect, useState } from "react";
import fetchJson from "@lib/fetchJson";
import useSWR from "swr";
import { useTranslation } from "next-i18next";

import dynamic from "next/dynamic";
import { getCurrentUser } from "@data/query/user";
import { BLOCK_PASS_KYC_COMPLETE, BLOCK_PASS_KYC_REJECT } from "@config/constants";

const WalletRequire = dynamic(import("@components/WalletRequire"));

const Share2EarnRequire = ({ shareCampaign }) => {
  const store = useStore();
  const { t } = useTranslation("launchpad");
  const [loading,setLoading] = useState(true)
  useEffect(() =>{
    if (store.user.id !== "" && store.user.access_token !== ""){
      getCurrentUser().then((res) => {
        if (res.is_kyc){
          store.kyc.update(res.kyc_status);
        }
        setLoading(false);
      })
    }
  },[store.user.id,store.user.access_token])
  const { data } = useSWR(
    "/api/kyc-status?refId=" + store.user.id,
    fetchJson
  );
  if (data && store.kyc.status !== BLOCK_PASS_KYC_COMPLETE && !loading) {
    store.kyc.update(data.status);
  }
  return (
    <>
      <div className="p-4 mt-4 rounded-lg border border-gray-300 dark:border-gray-700 mx-auto">
        <div className="mb-4">
          <p className="text-center mt-2 font-normal">
            {t("Complete all the requirements below to joint the event")}
          </p>
        </div>

        <div className="list-group text-sm">
          <Login />
          {store.user.id !== "" && <KYC />}
          <WalletRequire />
        </div>
      </div>
    </>
  );
};


const Login = () => {
  const store = useStore();
  const { t } = useTranslation("common");
  const Info = () => {
    if (store.user.id) return <span>#{store.user.id.split("-").pop()}</span>;
    return <span>{t("login to join")}</span>;
  };
  const Button = () => {
    if (store.user.id)
      return <span className="flex label label--success w-24">Done</span>;
    return (
      <button
        className="btn btn-default w-24"
        onClick={(e) => store.user.showConnect(true)}
      >
        {t("login")}
      </button>
    );
  };
  return (
    <div className={`list-group--item !px-0 md:!pb-4 `}>
      <div className="list-group--item--title w-full md:w-1/4">
        <div className="list-group--item--media">
          <span className="icon">
            <i className="fas fa-user-check"></i>
          </span>
        </div>
        <label htmlFor="blockchain-wallet" className="text-color-desc">
          User
        </label>
      </div>
      <div className="flex-1 md:mt-0">
        <div className="relative pl-8 md:pl-0 w-full flex items-center">
          <Info />
        </div>
      </div>
      <div className="text-right -mt-2 md:mt-0">
        <Button />
      </div>
    </div>
  );
};

const KYC = () => {
  const store = useStore();

  const Info = () => {
    if (store.kyc.status) return <span>{store.kyc.status}</span>;
    return <span>Click to KYC</span>;
  };

  const Button = () => {
    const [loadlib, setLoadlib] = useState(false);
    const clientId = process.env.NEXT_PUBLIC_BLOCKPASS_CLIENTID || "rada_launchverse_b9128"; // why empty from env
    useEffect(() => {
      if (store.kyc.status) return;

      if (!loadlib && !window.BlockpassKYCConnect) {
        let intervalId = 0;
        const checkLoad = () => {
          if (window.BlockpassKYCConnect) {
            clearInterval(intervalId);
            setLoadlib(true);
          }
        };
        intervalId = setInterval(checkLoad, 1000);
        return;
      }

      const userId = store.user.id;

      const blockpass = new window.BlockpassKYCConnect(
        clientId, // service client_id from the admin console
        {
          env : "prod",
          refId: userId, // assign the local user_id of the connected user
        }
      );
      blockpass.startKYCConnect();

      blockpass.on("KYCConnectSuccess", () => {
        //add code that will trigger when data have been sent.
        console.log("done: ", arguments);
      });
    }, [loadlib]);

    if (store.kyc.status === BLOCK_PASS_KYC_COMPLETE){
      return <span className="flex label label--success w-24">Done</span>;
    }
    if (store.kyc.status === BLOCK_PASS_KYC_REJECT){
      return <span className="flex label label--neutral w-24">Rejected</span>;
    }
    if (store.kyc.status !== ""){
      return <span className="flex label label--neutral w-24">{`In Progress`}</span>;
    }
    return (
      <button className={`btn btn-default w-24 ` + (store.user.id == "" ? "disabled" : "")} id="blockpass-kyc-connect">
        KYC
      </button>
    );
  };

  return (
    <>
      <div className="list-group--item !px-0 md:!pb-4">
        <div className="list-group--item--title w-full md:w-1/4">
          <div className="list-group--item--media">
            <span className="icon">
              <i className="fas fa-user-check"></i>
            </span>
          </div>
          <label for="blockchain-wallet" className="text-color-desc">
            KYC
          </label>
        </div>
        <div className="flex-1 md:mt-0">
          <div className="relative pl-8 md:pl-0 w-full flex items-center">
            <Info />
          </div>
        </div>
        <div className="text-right -mt-2 md:mt-0">
          <Button />
        </div>
      </div>
    </>
  );
};

export default Share2EarnRequire;
