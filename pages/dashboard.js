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
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import Avatar from "boring-avatars";

// const globalContext = createContext();

function Dashboard() {
  const store = useStore();
  const [session, setSession] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAvatar, setAvatar] = useState('/placeholders/cryptopunk.jpg');
  const [kycStatus, setKycStatus] = useState("");
  const { t, i18n } = useTranslation("common")

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
        if (res.image) {
          setAvatar(res.image);
        } else {
          setAvatar("/placeholders/cryptopunk.jpg");
        }
      });
    } else {
      setAvatar("/placeholders/cryptopunk.jpg");
    }
  }, [session, store.user.access_token]);

  useEffect(() => {
    if (!!user) {
      if (user.kyc_status == "approved") {
        setKycStatus("Approved");
      }
  
      if (user.kyc_status == "waitting") {
        setKycStatus("Waiting");
      }
  
      if (user.kyc_status == "rejected") {
        setKycStatus("Rejected");
      }
    }
  }, [user]);

  const meta = {
    title:
      (user?.name ? user?.name : "User").replace(/(^|\s)\S/g, (letter) =>
        letter.toUpperCase()
      ) + " LaunchVerse Profile",
  }

  if (loading && user == null) return null;

  return (
    <>
    <Layout extraClass="page-dashboard glassmorphism"  meta={meta}>
      <div className="pane-content--sec pane-content-active !w-full">
      <div className="pane-content--sec--main grid scrollbar">
        {/* NNTH: Remove 'max-w-screen-md mx-auto' on production */}
        <div className="page max-w-screen-xl mx-auto">
          <div className="section">
            <div className="grid grid-cols-1">
              {/* Post Header */}              

              {/* Post Content */}
              <div className="w-full mt-4">
                
                  <div className="text-center mx-auto max-w-lg mb-4 md:mb-8">

                    <div className="w-24 h-24 mx-auto relative">
                      {user && (
                        <img className="w-24 h-24 rounded-full shadow-lg" src={userAvatar} />
                      )}
                      
                      {/* Display this checkmark if the user already KYCed */}
                      {user && user.is_kyc && (
                        <span className="w-6 h-6 p-1 absolute right-0 top-0 rounded-full flex 
                        items-center bg-green-500 shadow-lg">
                          <i className="fa-solid fa-check text-sm text-white"></i>
                        </span>
                      )}

                    </div> 

                    {/* Only show this block if the user haven't KYCed.  */}
                    {user && (
                      <> 
                        {kycStatus != "Approved" ? (
                          <KYC is_short = {true}/>
                        ) : (
                          <div className="mt-4">
                            <span className="opacity-60">KYC Status:</span> <strong>{kycStatus}</strong>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                
                <div className="md:grid grid-cols-2 gap-4">
                  <DashboardSocial user={user}/>
                  <DashboardWallet />
                </div>

                <JoinedPools />
                
              </div>
              {/* End: Post Content */}
            </div>
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
