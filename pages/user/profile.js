import React from "react";
import { useSession } from "next-auth/client";

import { Wallet } from "../../components/Wallet";

import { useState, useEffect, createRef } from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Profile from "../../components/Profile";
import { getCurrentUser } from "../../data/query/user";
import { getInvestProfile } from "../../data/query/getInvestProfile";
import { getInvestLog } from "../../data/query/getInvestLog";
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

export default function UserProfile(props) {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [topupInfo, setTopupInfo] = useState({});
  const [investLog, setInvestLog] = useState([]);
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

  return (
    <>
      <StaticLayout meta={meta}>
        <div className="page-section text-center mt-1 mb-2 lg:mt-2">
          <div className="">
            <span className="avatar avatar-3xl shadow">
              <img src={user.image} alt={user.name} />
            </span>
            <Wallet handleConnectSuccess={handleConnectSuccess} />
          </div>
          <div className="mt-4">
            <div className="flex">
              <h1 className="ml-auto mr-auto text-2xl">
                {t("hello")}&nbsp;<strong>{user.name}</strong> #
                {user?.id?.split("-")[user?.id?.split("-").length - 1]}
              </h1>
            </div>
            <a
              href="./topUp"
              className="mr-auto mt-3 ml-2 inline-flex px-3 py-1 items-center rounded bg-gray-200 dark:bg-gray-800"
            >
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
              <span className="ml-1">
                {topupInfo.approved_rir - topupInfo.used_rir} RIR
              </span>
            </a>

            {topupInfo.max_rir > 0 &&
              topupInfo.approved_rir < topupInfo.max_rir && (
                <div className="flex-1 mt-2 w-100 text-gray-500">
                  <span>
                    Your allocation is {topupInfo.max_rir} RIR. You can top up{" "}
                    {topupInfo.max_rir -
                      topupInfo.pending_rir -
                      topupInfo.approved_rir}{" "}
                    RIR to your account.
                  </span>
                  <a
                    href="./topUp"
                    className="btn-neutral px-2 py-1 rounded ml-2 text-sm uppercase font-semibold"
                  >
                    Top up
                  </a>
                </div>
              )}
          </div>
        </div>

        <div className="page-section">
          {/* Connection */}
          <div className="card card-pagecontent">
            <div className="card-header">
              <span className="card-title">{t("connection")}</span>
            </div>

            <div className="card-body">
              <div className="grid">
                <div className="list-group">
                  {/* Wallet connected --> Show DisConnect Buttons */}
                  <div className="list-group--item !pb-0 md:!pb-4">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media">
                        <span className="icon">
                          <i className="fa-solid fa-wallet"></i>
                        </span>
                      </div>
                      <label
                        htmlFor="blockchain-wallet"
                        className="text-color-desc"
                      >
                        Wallet
                      </label>
                    </div>
                    <div className="flex-1 -mt-4 md:mt-0">
                      <div className="relative pl-8 md:pl-0 w-full flex items-center">
                        {_.isEmpty(wallet) ? (
                          <span>
                            {t("no connection", { provider: "wallet" })}
                          </span>
                        ) : (
                          <>
                            <div>
                              {user?.account?.map((address) => {
                                return (
                                  address.provider === "wallet" && (
                                    <strong>{`${address.provider_account_id.substr(
                                      0,
                                      4
                                    )}...${address.provider_account_id.substr(
                                      -4
                                    )} `}</strong>
                                  )
                                );
                              })}
                            </div>
                            <strong></strong>
                            <span className="badge badge-coin relative ml-2">
                              ETHEREUM
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right relative -top-4 md:top-0">
                      {_.isEmpty(wallet) ? (
                        <button
                          className="btn btn-default"
                          onClick={handleConnectWallet}
                        >
                          {t("connect")}
                        </button>
                      ) : (
                        <button
                          className="btn btn-default"
                          onClick={() => handleDisconnectWallet(wallet.id)}
                        >
                          {t("disconnect")}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Google disconnected --> Show Connect Buttons */}
                  <div className="list-group--item !pb-0 md:!pb-4">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media">
                        <span className="icon">
                          <i className="fa-brands fa-google"></i>
                        </span>
                      </div>
                      <label
                        htmlFor="blockchain-wallet"
                        className="text-color-desc"
                      >
                        Google
                      </label>
                    </div>
                    <div className="flex-1 -mt-4 md:mt-0">
                      <div className="relative pl-8 md:pl-0 w-full">
                        {_.isEmpty(google) ? (
                          <span>
                            {t("no connection", { provider: "Google" })}
                          </span>
                        ) : (
                          <strong>{google.oauth_profile.email}</strong>
                        )}
                      </div>
                    </div>
                    <div className="text-right relative -top-4 md:top-0 hidden">
                      {_.isEmpty(google) ? (
                        <button
                          className="btn btn-default disabled"
                          onClick={(e) => signIn("google")}
                        >
                          {t("connect")}
                        </button>
                      ) : (
                        <button className="btn btn-default disabled">
                          {t("disconnect")}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Facebook connected --> Show DisConnect Buttons */}
                  <div className="list-group--item !pb-0 md:!pb-4">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media">
                        <span className="icon">
                          <i className="fa-brands fa-facebook-f"></i>
                        </span>
                      </div>
                      <label
                        htmlFor="blockchain-wallet"
                        className="text-color-desc"
                      >
                        Facebook
                      </label>
                    </div>
                    <div className="flex-1 -mt-4 md:mt-0">
                      <div className="relative pl-8 md:pl-0 w-full">
                        {_.isEmpty(facebook) ? (
                          <span>
                            {t("no connection", { provider: "Facebook" })}
                          </span>
                        ) : (
                          <strong>{facebook.oauth_profile.email}</strong>
                        )}
                      </div>
                    </div>
                    <div className="text-right relative -top-4 md:top-0 hidden">
                      {_.isEmpty(facebook) ? (
                        <button
                          className="btn btn-default disabled"
                          onClick={(e) => signIn("facebook")}
                        >
                          {t("connect")}
                        </button>
                      ) : (
                        <button className="btn btn-default disabled">
                          {t("disconnect")}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Twitter connected --> Show DisConnect Buttons */}
                  <div className="list-group--item !pb-0 md:!pb-4">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media">
                        <span className="icon">
                          <i className="fa-brands fa-twitter"></i>
                        </span>
                      </div>
                      <label
                        htmlFor="blockchain-wallet"
                        className="text-color-desc"
                      >
                        Twitter
                      </label>
                    </div>
                    <div className="flex-1 -mt-4 md:mt-0">
                      <div className="relative pl-8 md:pl-0 w-full">
                        {_.isEmpty(twitter) ? (
                          <span>
                            {t("no connection", { provider: "Twitter" })}
                          </span>
                        ) : (
                          <strong>@{twitter.oauth_profile.screen_name}</strong>
                        )}
                      </div>
                    </div>
                    <div className="text-right relative -top-4 md:top-0 hidden">
                      {_.isEmpty(twitter) ? (
                        <button
                          className="btn btn-default disabled"
                          onClick={(e) => signIn("twitter")}
                        >
                          {t("connect")}
                        </button>
                      ) : (
                        <button className="btn btn-default disabled">
                          {t("disconnect")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Connection */}

          <div className="card card-pagecontent">
            <div className="card-header flex">
              <span className="card-title">Your recent investments</span>
              <a
                href="./allInvest"
                className="ml-auto btn-neutral rounded px-2 py-1"
              >
                View all
              </a>
            </div>

            <div className="card-body">
              <div className="grid">
                <div className="list-group">
                  {/* Wallet connected --> Show DisConnect Buttons */}
                  {investLog.length > 0 &&
                    investLog.map((item) => (
                      <a
                        key={item.id}
                        href="./allInvest"
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
