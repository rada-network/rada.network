import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import JoinedPools from "../components/dashboard/joinedPools";
import DashboardSocial from "../components/dashboard/social";
import DashboardWallet from "../components/dashboard/wallet";
import useStore from "@lib/useStore";
import Layout from "@components/page-layouts/Global";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/client";
import { getCurrentUser } from "@data/query/user";
import { useState, useEffect } from "react";
import KYC from "@components/KYC";
import { BLOCK_PASS_KYC_COMPLETE, BLOCK_PASS_KYC_REJECT } from "@config/constants";
import { getPoolByWallet } from "@data/query/projects";

function Dashboard() {
  const store = useStore();
  const [session, setSession] = useState();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("common");
  const [kycStatus, setKycStatus] = useState("");
  // approve
  // wating
  // rejected
  store.updateNetwork("bsc");

  useEffect(() => {
    getSession()
      .then((sess) => {
        setSession(sess);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!!session && store.user.access_token !== "") {
      getCurrentUser().then((res) => {
        setUser(res);
        // todo: Check kyc status
      });
    }
  }, [session, store.user.access_token]);

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

  useEffect(() => {
    if (user.kyc_status == "approved") {
      setKycStatus("Approved");
    }

    if (user.kyc_status == "waitting") {
      setKycStatus("Waiting");
    }

    if (user.kyc_status == "rejected") {
      setKycStatus("Rejected");
    }
  }, [user]);

  return (
    <>
    <Layout>
        <div className="pane-content--sec--main grid scrollbar">
          {/* NNTH: Remove 'max-w-screen-md mx-auto' on production */}
          <div className="page max-w-screen-lg mx-auto">
            <div className="section">
              <div className="grid grid-cols-1">
                {/* Post Header */}              

                {/* Post Content */}
                <div className="w-full mt-4">
                  <div className="text-center mx-auto max-w-lg mb-4 md:mb-8">
                    <div className="w-20 h-20 mx-auto relative">
                      <img className="rounded-full" src={user.image} />
                      {/* Display this checkmark if the user already KYCed */}
                      {user.is_kyc && (
                        <span className="w-6 h-6 p-1 absolute right-0 top-0 rounded-full flex 
                        items-center bg-green-500">
                          <i className="text-sm font-bold fas fa-check text-white"></i>
                        </span>
                      )}
                      
                    </div> 

                    {/* Only show this block if the user haven't KYCed.  */}
                    {!user.is_kyc && (
                      <KYC/>
                    )}

                    {user.is_kyc  && (
                      <div className="">
                        <span className="opacity-70">KYC Status: {kycStatus}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:grid grid-cols-2 gap-4">
                    {/* Social */}
                    <DashboardSocial google={google} facebook={facebook} twitter={twitter} user={user}/>
                    {/* Wallet */}
                    <DashboardWallet />
                  </div>

                  <JoinedPools/>
                  
                </div>
                {/* End: Post Content */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "navbar",
        "invest",
      ])),
      lang: context.locale,
    },
  };
}

export default Dashboard
