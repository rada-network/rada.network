import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import OpenDate from "./OpenDate"
import { useTranslation } from "next-i18next";
import TutorialWidget from "./TutorialWidget"
import SocialPromote from "../SocialPromote";
import SubscribeLaunchpad from "./SubscribeLaunchpad";

const WhitelistCountdown = ({project,pool}) => {
  const {t,i18n} = useTranslation("launchpad")
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h2>Public Sale</h2>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="relative z-0">
              <Timeline step="1" />
            </div>
            <div className="global-padding-lg min-h-full bg-white dark:bg-gray-800 relative z-10">

              <div className="">
                {pool.open_date ?
                <div>
                  <h3 class="text-2xl text-center mb-4 font-normal">
                    <span className="text-color-title">{t("The whitelist will open in")}</span>
                  </h3>
                  
                  <ProjectCountdown project={project} pool={pool} />
                  <div>
                    <p className="text-sm text-center mt-4 leading-7">
                      {/* <span className="text-color-desc">{t("Please wait until the whitelist opens!")}</span><br />
                      <span className="text-color-desc">{t("You need to apply to join the whitelist.")}</span><br /> */}
                      <span className="text-color-desc">{t("Openat")} </span> <OpenDate time={pool.open_date} />
                    </p>
                  </div>
                  <SubscribeLaunchpad project={project} pool={pool} />
                </div>
                :
                <div className="">
                  <h3 class="text-4xl text-center mt-4 mb-4 font-normal">
                    <span className="text-gray-700 dark:text-white font-semibold">{t("Coming Soon")}</span>
                  </h3>
                  <SocialPromote />
                </div>
                }

                <TutorialWidget project={project}></TutorialWidget>
              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default WhitelistCountdown