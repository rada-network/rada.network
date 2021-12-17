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
const LaunchpadActions = ({ project,pool }) => {
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
          <div className="card-default project-main-actions no-padding mb-10 overflow-hidden">
            <div className="card-body no-padding">
              <div className="flex flex-col">
                <div className="">
                  <Timeline step="1" />
                </div>

                <div className="project-card--container">
                  <SubscribeLaunchpad project={project} pool={pool} />
                  <TutorialWidget></TutorialWidget>
                </div>

              </div>

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
          <div className="card-default project-main-actions no-padding mb-10 overflow-hidden">
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