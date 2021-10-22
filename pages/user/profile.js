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
import RadaSvg from "../../components/svg/rada";

export default function UserProfile(props) {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [topupInfo, setTopupInfo] = useState({});
  const [investLog, setInvestLog] = useState([]);
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
        <div className="page-section mt-1 mb-2 lg:mt-2">
          <div className="text-center">

            <div className="">
              <span className="avatar avatar-xl md:avatar-3xl shadow">
                <img src={user.image} alt={user.name} />
              </span>
              <Wallet handleConnectSuccess={handleConnectSuccess} />
            </div>

            <div className="w-full mt-1 md:mt-3">
              <div className="flex items-cente">
                <h1 className="text-md lg:text-xl mx-auto text-center">
                  {t("hello")}&nbsp;
                  <strong>{user.name}</strong>&nbsp;
                </h1>
              </div>

              <div className="md:px-4 md:py-2 px-2 mt-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <div className="w-full mt-2">
                <div className="flex flex-wrap items-end justify-between mb-2">
                  <div className="w-auto">
                    <div className="field-label--text">
                      ID
                    </div>
                  </div>
                  <div className="flex items-center">
                  #{user?.id?.split("-")[user?.id?.split("-").length - 1]}
                  </div>
                  
                </div>
              </div>
              <div className="w-full mt-2">
                <div className="flex flex-wrap items-end justify-between mb-2">
                  <div className="w-auto">
                    <div className="field-label--text">
                      {t("balance")}
                        <span
                          className="hasTooltip"
                          data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                          data-event="click"
                        > <i className="fa-duotone fa-info-circle text-base" />
                        </span>
                      </div>
                  </div>
                  <div className="flex items-center">
                    <a
                    href="./topUp"
                    className="mr-auto inline-flex px-2 py-0.5 items-center rounded bg-gray-200 dark:bg-gray-800"
                    >

                    <span className="flex w-4 h-4 mr-1 opacity-80">
                      <RadaSvg />
                    </span>
                    <span>
                      {topupInfo.approved_rir - topupInfo.used_rir} RIR
                    </span>
                    </a>
                  </div>
                </div>
              </div>
               {/* End: balance */}

              <div className="w-full mt-2">
                <div className="flex flex-wrap items-end justify-between mb-2">
                  <div className="w-auto">
                    <div className="field-label--text">
                      {t("max balance")}
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0 tabular-nums">
                    <span className="w-4 h-4 mr-1"><RadaSvg /></span> {topupInfo.max_rir} RIR
                    <a href="./topUp" className="ml-2 text-xs uppercase rounded px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800">Top Up</a>

                  </div>
                  
                </div>
              </div>
              {/* End: max allocation */}
              <div className="w-full mt-2">
                <div className="flex flex-wrap items-end justify-between mb-2">
                  <div className="w-auto">
                    <div className="field-label--text">
                    {t("max balance topup")}
                    </div>
                  </div>
                  <div className="flex items-center  flex-shrink-0 tabular-nums">
                    <span className="w-4 h-4 mr-1"><RadaSvg /></span> {topupInfo.max_rir - topupInfo.approved_rir - topupInfo.pending_rir} RIR 
                  </div>
                  
                </div>
              </div>



              </div>
              {/* end of meta  */}

            </div>

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
                  <div className="list-group--item md:!pb-4">
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
                    <div className="flex-1 md:mt-0">
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
                    <div className="text-right -mt-2 md:mt-0">
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
                  <div className="list-group--item">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media brand--google">
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
                    <div className="flex-1">
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
                  <div className="list-group--item">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media brand--facebook">
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
                    <div className="flex-1">
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
                  <div className="list-group--item">
                    <div className="list-group--item--title w-full md:w-1/4">
                      <div className="list-group--item--media brand--twitter">
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
                    <div className="flex-1">
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
          {investLog.length > 0 &&
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
          }
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
