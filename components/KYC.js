import useStore from "@lib/useStore";
import { useEffect, useState } from "react";
import fetchJson from "@lib/fetchJson";
import useSWR from "swr";
import { useTranslation } from "next-i18next";

import dynamic from "next/dynamic";
import { getCurrentUser } from "@data/query/user";
import { BLOCK_PASS_KYC_COMPLETE, BLOCK_PASS_KYC_REJECT } from "@config/constants";


const KYC = () => {
  const store = useStore();

  const Info = () => {
    if (store.kyc.status) return <span>{store.kyc.status}</span>;
    return <span>Complete your KYC</span>;
  };

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
        env: "prod",
        refId: userId, // assign the local user_id of the connected user
      }
    );
    blockpass.startKYCConnect();

    blockpass.on("KYCConnectSuccess", () => {
      //add code that will trigger when data have been sent.
      console.log("done: ", arguments);
    });
  }, [loadlib]);

  if (store.kyc.status === BLOCK_PASS_KYC_COMPLETE) {
    return <span className="flex label label--success w-auto md:w-24">
      <span className="icon mr-1"><i className="fas fa-check"></i></span>
      Done
    </span>;
  }
  if (store.kyc.status === BLOCK_PASS_KYC_REJECT) {
    return (
      <a href={`https://identity.blockpass.org/`} target="_blank" rel="nofolow" className={`btn btn-default w-20 md:w-24 ` + (store.user.id == "" ? "disabled" : "")} id="blockpass-kyc-connect">
        Resubmit
      </a>
    );
  }
  if (store.kyc.status !== "") {
    return <span className="flex label label--neutral w-24">{`In Progress`}</span>;
  }


  return (
    <div className="mt-4"> 
      <button className={`btn btn-default w-20 md:w-24 ` + (store.user.id == "" ? "disabled" : "")} id="blockpass-kyc-connect">
        KYC
      </button>
    </div>
  );
}

export default KYC;

