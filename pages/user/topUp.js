import React from "react";
import { useSession } from "next-auth/client";

import { Wallet } from "../../components/Wallet";

import { useState, useEffect, createRef } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import moment from "moment";
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
import RadaSvg from "../../components/svg/rada";

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
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation("invest");
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
  const meta = {
    title:
      (user?.name ? user?.name : "User").replace(/(^|\s)\S/g, (letter) =>
        letter.toUpperCase()
      ) + " Top up",
  };
  const handleTopupChange = (e) => {
    const { name, value, type } = e.target;
    if (
      name === "number_rir" &&
      (isNaN(value) ||
        +value >
          topupInfo.max_rir - topupInfo.pending_rir - topupInfo.approved_rir)
    ) {
      return;
    }
    setTopupForm({
      ...topupForm,
      [name]: type === "number" ? +value : value,
    });
  };

  const handleNumberRirChange = (value) => {
    let valueChanged = (+topupForm.number_rir || 0) + value;
    if (
      valueChanged < 0 ||
      valueChanged >
        topupInfo.max_rir - topupInfo.pending_rir - topupInfo.approved_rir
    )
      return;
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
      toast.error(msg);
    } else {
      setTopupForm({
        number_rir: "",
        txid: "",
      });
      toast.success("Request topup RIR success");
      getInvestProfile().then(function (res) {
        setTopupInfo(res.data.investProfile);
      });
      getInvestDeposit().then((res) => {
        setInvestDeposit(res.data.investDeposit);
      });
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.back()
  };

  return (
    <>
      <StaticLayout meta={meta}>
        <div className="page-section text-center mt-1 mb-2 lg:mt-2"></div>
        <div className="page-section">
          <div className="flex items-center mb-4">
            <a
              href="../user/profile" onClick={handleBack}
              className="flex opacity-70 hover:opacity-100 items-center uppercase"
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

            <div className="ml-auto sm:mr-2 inline-flex px-3 py-1 items-center rounded bg-gray-200 dark:bg-gray-800">
              <span className="text-xs text-gray-500 mr-2 uppercase font-semibold">
                {t("balance")}
              </span>
              <span className="flex w-5 h-5 m-auto opacity-80">
                <RadaSvg />
              </span>
              <span className="ml-1">
                {topupInfo.approved_rir - topupInfo.used_rir} RIR
              </span>
            </div>


          </div>
          <div className="flex items-center">
            
            <div className="flex-1 mt-2 w-100 text-gray-500">
              <span>
                {t("balance note",{
                      number : topupInfo.max_rir - topupInfo.approved_rir - topupInfo.pending_rir
                    })}
              </span>
            </div>
          </div>
          <div className="card--wrapper mt-4">
            <h3 className="text-gray-400 card--header">
              {t("Top-up your balance")}
            </h3>
            <div className="card--body">
              <div className="step--wrapper">
                <div className="step--header flex">
                  <span className="step--indicator">1</span>
                  <h3>{t("Amount of RIR")}</h3>
                </div>
                <div className="step--content">
                  {/* <form> */}
                  <label
                    htmlFor="rir-amount"
                    className="flex inline-field--wrapper relative items-stretch"
                  >
                    <div className="w-12 flex items-center bg-gray-100 border border-gray-200 rounded-l dark:border-gray-700 dark:bg-gray-800">
                      <span className="flex w-5 h-5 m-auto opacity-60">
                        <RadaSvg />
                      </span>
                    </div>
                    <input
                      className="inline--field border-l-none pr-16"
                      id="rir-amount"
                      type="text"
                      name="number_rir"
                      value={topupForm.number_rir}
                      onChange={handleTopupChange}
                      disabled={
                        topupInfo.max_rir -
                          topupInfo.pending_rir -
                          topupInfo.approved_rir ===
                        0
                      }
                    />
                    <div className="absolute flex right-2 top-2">
                      <button
                        onClick={() => handleNumberRirChange(1)}
                        className={`mr-1 leading-0 w-6 center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600`}
                      >
                        +
                      </button>
                      <button
                        disabled={
                          topupForm.number_rir === "" ||
                          topupForm.number_rir === 0
                        }
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
                  <h3 dangerouslySetInnerHTML={{__html : t("Send USDT",{
                    number : `<span class="font-semibold dark:text-white">
                    ${topupForm.number_rir * 100}USDT
                    </span>`
                  })}}>
                  </h3>
                  {/* add 100 if user enter 1RIR, 200 for 2RIR*/}
                </div>
                <div className="step--content">
                  <div className="flex flex-wrap justify-between mb-1">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        {t("wallet address")}
                      </span>
                    </div>
                    <div className="">
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={topupInfo?.rada_treasury_address}
                      >
                        <a href="#" className="btn btn-default btn-default-sm">
                          <span className="btn--text break-all">
                            {topupInfo?.rada_treasury_address}
                          </span>
                          <span className="icon">
                            <i class="fa-regular fa-copy text-2xs"></i>
                          </span>
                          {isCopied && (
                            <span className="btn--text">Copied</span>
                          )}
                        </a>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between mb-1">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        {t("network")}
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
                  <h3>{t("Confirm your transaction")}</h3>
                </div>
                <div className="step--content">
                  <form>
                    <div className="inline-field--wrapper">
                      <label htmlFor="txh" className="inline--label">
                        {t("Paste your Transaction")}
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
            <h3 className="text-gray-400 card--header">{t("Transaction history")}</h3>
            <div className="card--body">
              {investDeposit.map((invest) => (
                <div className="p-3 lg:p-5 flex items-center">
                  <span className="opacity-70 mr-3">
                    {moment(invest.date_created).format("DD MMMM YYYY")}
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
      ...(await serverSideTranslations(context.locale, ["common", "navbar","invest"])),
      lang: context.locale,
      info,
    },
  };
}
