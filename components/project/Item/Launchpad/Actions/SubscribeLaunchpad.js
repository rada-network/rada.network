import useStore from "@lib/useStore";
import { useEffect, useState } from "react";
import fetchJson from "@lib/fetchJson";
import useSWR from "swr";
import { useTranslation } from "next-i18next";
import { getCurrentUser } from "@data/query/user";

import dynamic from "next/dynamic";
import { BLOCK_PASS_KYC_COMPLETE } from "@config/constants";

const WalletRequire = dynamic(import("@components/WalletRequire"));

const SubscribeLaunchpad = ({ project }) => {
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
      <div className="max-w-xl mx-auto">
        <div className="mb-4 md:mb-8">
          <h3 className="text-2xl md:text-3xl text-center font-normal">
            <span className="text-color-title">
              {project?.token.name}'s {t("Whitelist")}
            </span>
          </h3>
          <p className="text-center mt-2 font-normal">
            {t("Complete all the requirements below to joint the pool.")}
          </p>
        </div>

        <div className="list-group">
          {project.is_kyc && <Login />}
          {project.is_kyc && <KYC />}
          <WalletRequire />
        </div>
      </div>
    </>
  );
};

export const SubscribeLaunchpadClosed = ({ project }) => {
  const { t } = useTranslation("launchpad");
  return (
    <>
      <div className="max-w-xl mx-auto">
        <div className="mb-4 md:mb-8">
          <h3 className="text-2xl md:text-3xl text-center font-normal">
            <span className="text-color-title">{t("pool closed")}</span>
          </h3>
          <p className="text-center mt-2 font-normal">{t("pool close note")}</p>
        </div>

        <div className="list-group">
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
    <div className="list-group--item !px-0 md:!pb-4">
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
        setInterval(checkLoad, 1000);
        return;
      }

      const userId = store.user.id;

      const blockpass = new window.BlockpassKYCConnect(
        clientId, // service client_id from the admin console
        {
          refId: userId, // assign the local user_id of the connected user
        }
      );
      blockpass.startKYCConnect();

      blockpass.on("KYCConnectSuccess", () => {
        //add code that will trigger when data have been sent.
        console.log("done: ", arguments);
      });
    }, [loadlib]);

    if (store.kyc.status)
      return <span className="flex label label--success w-24">Done</span>;
    return (
      <button className="btn btn-default w-24" id="blockpass-kyc-connect">
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

export default SubscribeLaunchpad;
