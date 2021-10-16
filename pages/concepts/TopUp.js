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
          <div className="flex items-center">
            <div className="mr-auto inline-flex px-3 py-1 items-center rounded bg-gray-200 dark:bg-gray-800">
              <span className="text-xs text-gray-500 mr-2 uppercase font-semibold">
                Balance
              </span>
              <span className="flex w-5 h-5 m-auto opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22.14 23.04"
                >
                  <path
                    d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z"
                    fill="#374050"
                    stroke="#9ca2af"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.4"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z"
                    fill="#9ca2af"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z"
                    fill="#9ca2af"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z"
                    fill="#9ca2af"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z"
                    fill="#9ca2af"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z"
                    fill="#9ca2af"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z"
                    fill="#9ca2af"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
              <span className="ml-1">{topupInfo.approved_rir} RIR</span>
            </div>
            <div className="flex-1 mt-2 ml-2 w-100 text-gray-500">
              <span>
                Your allocation is {topupInfo.max_rir} RIR. You can top up{" "}
                {topupInfo.max_rir -
                  topupInfo.pending_rir -
                  topupInfo.approved_rir}{" "}
                RIR to your account.
              </span>
            </div>
          </div>
          <div className="card--wrapper mt-4">
            <h3 className="text-gray-400 card--header">Top up your balance</h3>
            <div className="card--body">
              <div className="step--wrapper">
                <div className="step--header flex">
                  <span className="step--indicator">1</span>
                  <h3>Amount of RIR you want to top up</h3>
                </div>
                <div className="step--content">
                  {/* <form> */}
                  <label
                    for="rir-amount"
                    className="flex inline-field--wrapper relative items-stretch"
                  >
                    <div className="w-12 flex items-center bg-gray-100 border border-gray-200 rounded-l dark:border-gray-700 dark:bg-gray-800">
                      <span className="flex w-5 h-5 m-auto opacity-60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 22.14 23.04"
                        >
                          <path
                            d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z"
                            fill="#374050"
                            stroke="#9ca2af"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="0.4"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z"
                            fill="#9ca2af"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z"
                            fill="#9ca2af"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z"
                            fill="#9ca2af"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z"
                            fill="#9ca2af"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z"
                            fill="#9ca2af"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z"
                            fill="#9ca2af"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                          <path
                            d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      className="inline--field border-l-none pr-16"
                      id="rir-amount"
                      type="text"
                      name="number_rir"
                      value={topupForm.number_rir}
                      onChange={handleTopupChange}
                    />
                    <div className="absolute flex right-2 top-2">
                      <button
                        disabled={topupForm.number_rir === ""}
                        onClick={() => handleNumberRirChange(1)}
                        className={`mr-1 leading-0 w-6 center bg-gray-200 dark:bg-gray-800 ${
                          topupForm.number_rir !== ""
                            ? "hover:bg-gray-300 dark:hover:bg-gray-600"
                            : ""
                        }`}
                      >
                        +
                      </button>
                      <button
                        disabled={topupForm.number_rir === ""}
                        onClick={() => handleNumberRirChange(-1)}
                        className={`mr-1 leading-0 w-6 center bg-gray-200 dark:bg-gray-800 ${
                          topupForm.number_rir !== ""
                            ? "hover:bg-gray-300 dark:hover:bg-gray-600"
                            : ""
                        }`}
                      >
                        -
                      </button>
                    </div>
                  </label>
                  <div className="mt-1 text-right text-sm opacity-40">
                    {topupForm.number_rir * 100}USDT
                  </div>
                  {/* </form> */}
                </div>
              </div>
              {/* End: Step 1 */}

              <div className="sep"></div>

              <div className="step--wrapper">
                <div className="step--header flex">
                  <span className="step--indicator">2</span>
                  <h3>
                    Send{" "}
                    <span className="font-semibold dark:text-white">
                      {topupForm.number_rir * 100}USDT{" "}
                    </span>{" "}
                    to RADA&rsquo;s Treasury Wallet
                  </h3>
                  {/* add 100 if user enter 1RIR, 200 for 2RIR*/}
                </div>
                <div className="step--content">
                  <div className="flex flex-wrap justify-between mb-1">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        Wallet Address
                      </span>
                    </div>
                    <div className="">
                      <a href="#" className="btn btn-default btn-default-sm">
                        <span className="btn--text break-all">
                          0x6cdF11996eEd528d69Cd8B56503fDb19EC0B2977
                        </span>
                        <span className="icon">
                          <i class="fa-regular fa-copy text-2xs"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between mb-1">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        Network
                      </span>
                    </div>
                    <div className="text-sm">
                      BSC{" "}
                      <span className="text-gray-500">
                        Binance Smart Chain (BEP20)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* End: Step 2 */}
              <div className="sep"></div>
              <div className="step--wrapper">
                <div className="step--header flex">
                  <span className="step--indicator">3</span>
                  <h3>Confirm your transaction</h3>
                </div>
                <div className="step--content">
                  <form>
                    <div className="inline-field--wrapper">
                      <label for="txh" className="inline--label">
                        TXH of the transaction
                      </label>
                      <input
                        className="inline--field"
                        id="txh"
                        type="text"
                        name="txid"
                        value={topupForm.txid}
                        onChange={handleTopupChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
              {/* End: Step 3 */}
            </div>
            {/* Card body */}

            <div className="card--footer p-3 lg:p-5">
              <button
                disabled={topupForm.number_rir === "" || topupForm.txid === ""}
                className={`btn btn-primary ${
                  topupForm.number_rir === "" || topupForm.txid === ""
                    ? "disabled"
                    : ""
                } py-2 px-3`}
                onClick={handleTopup}
              >
                Confirm
              </button>
            </div>
          </div>

          <div className="card--wrapper mt-5">
            <h3 className="text-gray-400 card--header">Transaction history</h3>
            <div className="card--body">
              {investDeposit.map((invest) => (
                <div className="p-3 lg:p-5 flex items-center">
                  <span className="opacity-70 mr-3">
                    {utils.titleTime(invest.date_created)}
                  </span>
                  <span className="w-3/6">TOP UP</span>
                  <span className="ml-2">
                    {invest.is_approved
                      ? invest.approved_rir
                      : invest.pending_rir}
                    RIR
                  </span>
                  <span
                    className={`mr-0 shink-0 ml-auto label label--${
                      invest.is_approved ? "active" : "inactive"
                    }`}
                  >
                    {invest.is_approved ? "Succeeded" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
            {/* Card body */}
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
