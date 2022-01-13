import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import OpenDate from "@components/project/Item/Launchpad/OpenDate"
import { useTranslation } from "next-i18next";
import TutorialWidget from "../TutorialWidget"
import SocialPromote from "../SocialPromote";
import SubscribeLaunchpad from "./SubscribeLaunchpad";

const WhitelistCountdown = ({project,pool}) => {
  const {t,i18n} = useTranslation("launchpad")
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">
        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="global-padding-lg min-h-full bg-white dark:bg-gray-800 relative z-10">

              <div className="">
                {pool.open_date ?
                  <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl text-center mb-4 font-normal">
                    <span className="text-color-title">{t("The whitelist will open in")}</span>
                  </h3>

                  <ProjectCountdown project={project} pool={pool} isEndDate={false} />

                  <div className="mt-4 text-center">
                    <div className="inline-block w-auto mx-auto  py-1.5 md:py-1  
                    text-xs md:text-sm text-center rounded-lg
                    border border-gray-200 dark:border-gray-600">
                      <div className="py-1 px-2 md:px-4  border-b border-gray-200 dark:border-gray-700">
                        <span className="mr-2 opacity-70">{t("Open at")}:</span> 
                        <OpenDate time={pool.open_date} />
                      </div>

                      <div className="py-1 px-2 md:px-4">
                        <span className="mr-2 opacity-70">{t("Closeat")}</span> 
                        <OpenDate time={pool.end_date} />
                      </div>
                    </div>
                  </div>

                  <SubscribeLaunchpad project={project} pool={pool} />

                </div>
                :
                <div className="">
                  <h3 className="text-4xl text-center mt-4 mb-4 font-normal">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{t("Coming Soon")}</span>
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