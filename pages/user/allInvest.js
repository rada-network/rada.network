import React from "react";
import { useSession } from "next-auth/client";

import { Wallet } from "../../components/Wallet";

import { useState, useEffect, createRef } from "react";

import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Profile from "../../components/Profile";
import { getCurrentUser } from "../../data/query/user";
import { getInvestProfile } from "../../data/query/getInvestProfile";
import { getInvestLog } from "../../data/query/getInvestLog";
import { getInvestDeposit } from "../../data/query/getInvestDeposit";
import { disconnectWallet } from "../../data/query/wallet";
import _ from "lodash";
import { useStore } from "../../lib/useStore";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { StaticLayout } from "../../components/page-layouts/StaticLayout";
import { UserDistribution } from "../../components/user/UserDistribution";
import { usePageStore } from "../../lib/usePageStore";
import { getSession } from "next-auth/client";
import { getPage } from "../../data/query/page";
import submitInvestDeposit from "../../data/query/submitInvestDeposit";
import getClient from "../../data/client";
import utils from "../../lib/util";

export default function UserProfile(props) {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [investDeposit, setInvestDeposit] = useState([]);
  const [investLog, setInvestLog] = useState([]);
  const [topupInfo, setTopupInfo] = useState({});
  const [topupForm, setTopupForm] = useState({
    number_rir: "",
    txid: "",
  });
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();

  const { dataStore, detailStore } = usePageStore();
  useEffect(() => {
    // If session exists, display content
    getCurrentUser().then((res) => {
      setUser(res);
    });
    getInvestProfile().then(function (res) {
      setTopupInfo(res.data.investProfile);
    });
    getInvestDeposit().then((res) => {
      setInvestDeposit(res.data.investDeposit);
    });
    getInvestLog().then((res) => {
      setInvestLog(res.data.investLog);
    });
  }, [session]);
  useEffect(() => {
    getSession()
      .then((sess) => {
        setSession(sess);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  // If no session exists, display access denied message
  if (!session) {
    return (
      <ProfileAccessDenied dataStore={dataStore} detailStore={detailStore} />
    );
  }
  // If session exists, display content
  let google = {},
    wallet = {},
    facebook = {},
    twitter = {};
  google = user.account?.find((item) => {
    return item.provider === "google";
  });
  wallet = user.account?.find((item) => {
    return item.provider === "wallet";
  });
  facebook = user.account?.find((item) => {
    return item.provider === "facebook";
  });
  twitter = user.account?.find((item) => {
    return item.provider === "twitter";
  });
  const meta = {
    title:
      (user?.name ? user?.name : "User").replace(/(^|\s)\S/g, (letter) =>
        letter.toUpperCase()
      ) + " Profile",
  };

  const handleConnectWallet = () => {
    store.wallet.showConnect(true);
  };

  const handleDisconnectWallet = async (id) => {
    const res = await disconnectWallet(id);
    if (res.data.userDisconnect.status === "success") {
      getCurrentUser().then((res) => {
        setUser(res);
      });
    }
  };

  const handleConnectSuccess = () => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  };

  const handleTopupChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "number_rir" && isNaN(value)) {
      return;
    }
    setTopupForm({
      ...topupForm,
      [name]: type === "number" ? +value : value,
    });
  };

  const handleNumberRirChange = (value) => {
    let valueChanged = +topupForm.number_rir + value;
    if (valueChanged < 0) return;
    setTopupForm({
      ...topupForm,
      number_rir: valueChanged,
    });
  };

  const handleTopup = async () => {
    _.isob;
    const topup = {
      txid: topupForm.txid,
      number_rir: +topupForm.number_rir,
    };
    const client = getClient();
    const { data } = await client.mutate({
      mutation: submitInvestDeposit,
      variables: topup,
    });
    const { status, msg } = data.submitInvestDeposit;
    if (status === "error") {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setTopupForm({
        number_rir: "",
        txid: "",
      });
      toast.success("Request topup RIR success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getInvestProfile().then(function (res) {
        setTopupInfo(res.data.investProfile);
      });
      getInvestDeposit().then((res) => {
        setInvestDeposit(res.data.investDeposit);
      });
    }
  };

  return (
    <>
      <StaticLayout meta={meta}>
        <div className="page-section text-center mt-1 mb-2 lg:mt-2"></div>

        <div className="page-section">
          <a
            href="../user/profile"
            className="flex opacity-70 hover:opacity-100 items-center mb-4 uppercase"
          >
            <span className="w-4 h-4 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>arrow-left</title>
                <path
                  fill="currentColor"
                  d="M22.548,10.561H5.437a.251.251,0,0,1-.165-.438l8.637-7.6a1.44,1.44,0,0,0-1.9-2.162L.828,10.2a2.4,2.4,0,0,0,0,3.6l11.179,9.837a1.44,1.44,0,0,0,1.9-2.161l-8.637-7.6a.251.251,0,0,1,.165-.438H22.548a1.44,1.44,0,0,0,0-2.879Z"
                />
              </svg>
            </span>
            Back
          </a>

          <div className="card card-pagecontent">
            <div className="card-header flex">
              <span className="card-title">All your investments</span>
            </div>

            <div className="card-body">
              <div className="grid">
                <div className="list-group">
                  {/* Wallet connected --> Show DisConnect Buttons */}
                  {investLog.length > 0 &&
                    investLog.map((item) => (
                      <a
                        key={item.id}
                        href="link_to_invest_tab"
                        className="list-group--item flex items-center hover:bg-gray-700"
                      >
                        <div className="flex-1 flex">
                          <strong className="w-3/4 pr-2">
                            {item.invest_campaign?.token?.name}
                          </strong>
                          <strong className="w-1/4">
                            {item.number_rir} RIR
                          </strong>
                        </div>
                        <div className="text-right  w-1/4">
                          <span className="label label--neutral  ml-auto">
                            {item.invest_campaign.invest_status}
                          </span>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <UserDistribution props={props} />
        </div>
      </StaticLayout>
    </>
  );
}

const ProfileAccessDenied = ({}) => {
  const store = useStore();
  useEffect(() => {
    store.user.showConnect(true);
  }, []);
  const meta = {
    title: "User profile",
  };
  return (
    <>
      <StaticLayout meta={meta}>
        <div className="page-section text-center">
          <div className="my-8">
            <h1 className="text-3xl">403 forbidden</h1>
          </div>
          <Profile />
        </div>
      </StaticLayout>
    </>
  );
};

export async function getStaticProps(context) {
  const info = await getPage({ slug: "profile-info", lang: context.locale });
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "navbar"])),
      lang: context.locale,
      info,
    },
  };
}
