import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import JoinedPools from "./dashboard/joinedPools";
import DashboardSocial from "./dashboard/social";
import DashboardWallet from "./dashboard/wallet";
import useStore from "@lib/useStore";
import Layout from "@components/page-layouts/Global";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Dashboard() {
  const store = useStore();
  store.updateNetwork("bsc");
  const { t } = useTranslation("common");

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
                      <img className="rounded-full" src="/placeholders/cryptopunk.jpg" />
                      {/* Display this checkmark if the user already KYCed */}
                      <span className="w-6 h-6 p-1 absolute right-0 top-0 rounded-full flex 
                      items-center bg-green-500">
                        <i className="text-sm font-bold fas fa-check text-white"></i>
                      </span>
                    </div> 
                    <h3 className="text-2xl font-semibold mt-4">Andrew Hicker</h3>
                    {/* Only show this block if the user haven't KYCed.  */}
                    <div className="">
                      <span className="opacity-70">Haven't KYC yet!</span>  
                      <button className="btn btn-default ml-4">KYC</button>
                    </div>
                  </div>
                  
                  <div className="md:grid grid-cols-2 gap-4">
                    {/* Social */}
                    <DashboardSocial />
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
