import Head from "next/dist/shared/lib/head";
import RadaSvg from "@components/svg/rada";
import { useState, useEffect } from "react";
import useStore from "@lib/useStore";
import useAuth from "@utils/hooks/useAuth";
import _ from "lodash";
import { getSession } from "next-auth/client";
import { getCurrentUser } from "@data/query/user";
import { useTranslation } from "react-i18next";

function DashboardSocial({user, google, facebook, twitter}) {
  const store = useStore();
  const { t } = useTranslation("common");

  const handleConnect = () => {
    store.user.showConnect(true);
  };

  return (
    <>
      <div className="card--wrapper mb-4 md:mb-0">
        <div className="card--header pb-1">
          Social
        </div>
        <div className="card--body">
          <div className="list-group">
            {!user?.id && (
              <div className="list-group--item !pb-0 md:!pb-4">
                <div className="relative mt-2 mb-2 w-full flex items-center justify-center">
                  <button className="btn btn-default items-center"
                    onClick={handleConnect}
                  >{t("login to join")}
                  </button>
                </div>
              </div>
            )}

            {user?.id && (
              <>
                <div className="list-group--item !pb-0 md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/3">
                    <div className="list-group--item--media brand--google">
                      <span className="icon"><i className="fa-brands fa-google"></i></span>
                    </div>
                    <label htmlFor="blockchain-wallet" className="text-color-desc">
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
                        <strong>{google.oauth_profile.name}</strong>
                      )}
                    </div>
                  </div>
                </div>

                <div className="list-group--item !pb-0 md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/3">
                    <div className="list-group--item--media brand--facebook">
                      <span className="icon"><i className="fa-brands fa-facebook-f"></i></span>
                    </div>
                    <label htmlFor="blockchain-wallet" className="text-color-desc">
                      Facebook
                    </label>
                  </div>
                  <div className="flex-1 -mt-4 md:mt-0">
                    <div className="relative pl-8 md:pl-0 w-full">
                      {_.isEmpty(facebook) ? (
                        <span>
                          {t("no connection", { provider: "Facebook" })}
                        </span>
                      ):(
                        <strong>{facebook.oauth_profile.name}</strong>
                      )}
                    </div>
                  </div>
                </div>

                <div className="list-group--item !pb-0 md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/3">
                    <div className="list-group--item--media brand--twitter">
                      <span className="icon"><i className="fa-brands fa-twitter"></i></span>
                    </div>
                    <label htmlFor="blockchain-wallet" className="text-color-desc">
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSocial
