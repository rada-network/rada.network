import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad from "./SubscribeLaunchpad";
import SubscribeSwapToken from "./SubscribeSwapToken"
import { useState } from "react";
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import ProjectOpening from "./Opening";
import useStore from "@lib/useStore";

const LaunchpadActions = ({ project }) => {
  const store = useStore()

  const curentTime = (new Date()).getTime() / 1000
  const openTime = parseInt(project.launchpadInfo.startDate)
  const endTime = parseInt(project.launchpadInfo.endDate)
  if (openTime > curentTime) {
    return <WhitelistCountdown project={project} />
  }

  if (openTime < curentTime && curentTime < endTime) {
    return (
      <>
        <div className="card-default project-main-actions no-padding mb-10 overflow-hidden">

          <div className="card-body no-padding">

            <div className="flex flex-col">

              <div className="">
                <Timeline step="2" />
              </div>

              <div className="global-padding-lg !px-4 min-h-full max-w-xl w-full mx-auto">
                <span>Closing countdown</span>
                {
                  store.kyc.isKYC ?
                    <SubscribeSwapToken project={project} />
                    :
                    <SubscribeLaunchpad project={project} />
                }

              </div>

            </div>

          </div>

        </div>
      </>
    )
    return <SubscribeLaunchpad project={project} />
  }
  return null;
}


export default LaunchpadActions