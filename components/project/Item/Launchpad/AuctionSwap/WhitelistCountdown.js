import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import OpenDate from "@components/project/Item/Launchpad/OpenDate"
import { useTranslation } from "next-i18next";
import TutorialWidget from "../TutorialWidget"
import SocialPromote from "../SocialPromote";
import SubscribeLaunchpad from "./SubscribeLaunchpad";
import PoolDetailCountdown from "../PoolDetailCountdown";

const WhitelistCountdown = ({project,pool}) => {
  const {t,i18n} = useTranslation("launchpad")
  return (
    <>
      <div className="project-main-actions no-padding overflow-hidden">
        <div className="card-body no-padding card card-default">
          <div className="flex flex-col">
              <div className="">
                {pool.open_date ? (
                  <div className="card card-default">
                    <PoolDetailCountdown project={project} pool={pool} isEndDate={false} end_date={pool.end_date} open_date={pool.open_date} title={t("The whitelist will open in")}/>
                    <div className="card-body">
                      <SubscribeLaunchpad project={project} pool={pool} />
                    </div>
                  </div>
                )
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
    </>
  );
}

export default WhitelistCountdown