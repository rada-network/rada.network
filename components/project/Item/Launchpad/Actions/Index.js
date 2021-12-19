import {useState, useEffect} from "react"
import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad,{SubscribeLaunchpadClosed} from "./SubscribeLaunchpad";
import SubscribeSwapToken from "./SubscribeSwapToken"
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import useStore from "@lib/useStore";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import TutorialWidget from "./TutorialWidget"
import { BLOCK_PASS_KYC_COMPLETE } from "@config/constants";
import { useTranslation } from "react-i18next";
import OpenDate from "./OpenDate"
const LaunchpadActions = ({ project,pool }) => {
  const {t,i18n} = useTranslation("launchpad")
  const store = useStore()
  const {account} = useActiveWeb3React()
  const currentTime = (new Date()).getTime() / 1000
  const openTime = (new Date(pool.open_date)).getTime() / 1000
  const endTime = (new Date(pool.end_date)).getTime() / 1000
  if (pool.open_date === null) {
    return <WhitelistCountdown project={project} pool={pool} />
  }
  
  if (openTime > currentTime) {
    return <WhitelistCountdown project={project} pool={pool} />
  }
  
  if (openTime < currentTime && currentTime < endTime) {
    return (
      <>
        {((store.kyc.isKYC && store.kyc.status === BLOCK_PASS_KYC_COMPLETE && store.user.id !== "") || !pool.is_kyc) && !!account ?
          <SubscribeSwapToken project={project} pool={pool} currentTime={currentTime} endTime={endTime} openTime={openTime} />
          :
          <div className="global-padding-lg min-h-full bg-white dark:bg-gray-800 relative z-10">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl text-center mb-4 font-normal">
                <span className="text-color-title">{t("Pool closes in")}</span>
              </h3>

              <ProjectCountdown project={project} pool={pool} isEndDate={true} />

              <div className="mt-4 text-center">
                <div className="inline-block w-auto mx-auto px-4 py-1 
                    text-sm text-center rounded-full
                    border border-gray-200 dark:border-gray-600"
                >
                  <span className="mr-2 opacity-70">{t("Closeat")}</span> 
                  <OpenDate time={pool.end_date} />
                </div>
              </div>

              <SubscribeLaunchpad project={project} pool={pool} />

            </div>
          </div>
        }
        
      </>
    )
  }
  if (currentTime > endTime){
    return (
      <>
        {!!account ?
          <SubscribeSwapToken project={project} pool={pool} currentTime={currentTime} endTime={endTime} openTime={openTime} />
          :
          <div className="card-default project-main-actions no-padding overflow-hidden">
            <div className="card-body no-padding">
              <div className="flex flex-col">
                <div className="">
                  <Timeline step="3" />
                </div>

                <div className="project-card--container">
                  <SubscribeLaunchpadClosed project={project} pool={pool} />
                </div>

              </div>

            </div>

          </div>
        }
        
      </>
    )
  }
}


export default LaunchpadActions