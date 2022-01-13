import {useState, useEffect} from "react"
import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad,{SubscribeLaunchpadClosed} from "./SubscribeLaunchpad";
import SubscribeSwapToken from "./SubscribeSwapToken"
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import useStore from "@lib/useStore";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import TutorialWidget from "../TutorialWidget"
import { BLOCK_PASS_KYC_COMPLETE } from "@config/constants";
import { useTranslation } from "react-i18next";
import OpenDate from "@components/project/Item/Launchpad/OpenDate"
import { observer } from "mobx-react";
const LaunchpadActions = observer(({ project,pool }) => {
  const {t,i18n} = useTranslation("launchpad")
  const store = useStore()
  const {account} = useActiveWeb3React()
  const currentTime = (new Date(pool.current_date)).getTime() / 1000
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
          <div div className="flex flex-col space-y-4">

            {/* Main Actions */}
            <div className="card card-default">
          
              {/* Timer */}
              <div className="card-header flex-col md:flex-row items-start md:items-end bg-green-500 text-white rounded-md m-1 !w-auto">
                <div className="flex flex-col">
                  <h3 className="mb-2 font-medium">
                    <span className="text-white">{t("Pool closes in")}</span>
                  </h3>
                  <ProjectCountdown project={project} pool={pool} isEndDate={true} />
                </div>

                <div className="mt-2">
                  <span className="mr-2 opacity-60">{t("Closeat")}</span> 
                  <OpenDate time={pool.end_date} />
                </div>
              </div>
              {/* END: Timer */}

              {/* MainAction */}
              <div className="card-body">
                <SubscribeLaunchpad project={project} pool={pool} />
              </div>
              {/* END: MainAction */}

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
})


export default LaunchpadActions