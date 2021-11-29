import {useState, useEffect} from "react"
import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad from "./SubscribeLaunchpad";
import SubscribeSwapToken from "./SubscribeSwapToken"
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import useStore from "@lib/useStore";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import TutorialWidget from "./TutorialWidget"
const LaunchpadActions = ({ project }) => {
  const store = useStore()
  const {account} = useActiveWeb3React()
  const curentTime = (new Date()).getTime() / 1000
  const openTime = (new Date(project.open_date)).getTime() / 1000
  const endTime = (new Date(project.end_date)).getTime() / 1000
  if (project.open_date === null) {
    return <WhitelistCountdown project={project} />
  }
  
  if (openTime > curentTime) {
    return <WhitelistCountdown project={project} />
  }

  if (openTime < curentTime && curentTime < endTime) {
    return (
      <>
        {((store.kyc.isKYC) || (!store.kyc.isKYC && !project.is_kyc)) && store.user.id !== "" && !!account ?
          <SubscribeSwapToken project={project} />
          :
          <div className="card-default project-main-actions no-padding mb-10 overflow-hidden">
            <div className="card-body no-padding">
              <div className="flex flex-col">
                <div className="">
                  <Timeline step="1" />
                </div>

                <div className="global-padding-lg !px-4 min-h-full max-w-xl w-full mx-auto">
                    <SubscribeLaunchpad project={project} />
                    <TutorialWidget></TutorialWidget>
                </div>

              </div>

            </div>

          </div>
        }
        
      </>
    )
    return <SubscribeLaunchpad project={project} />
  }
  return null;
}


export default LaunchpadActions