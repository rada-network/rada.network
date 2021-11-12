import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad from "./SubscribeLaunchpad";
import { useState } from "react";
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import ProjectOpening from "./Opening";

const LaunchpadActions = ({project}) => {

  const curentTime = (new Date()).getTime()/1000
  const openTime = parseInt(project.launchpadInfo.startDate)
  const endTime = parseInt(project.launchpadInfo.endDate)
  if (openTime > curentTime){
    return <WhitelistCountdown project={project} />
  }

  if (openTime < curentTime && curentTime < endTime){
    return <SubscribeLaunchpad project={project} />
  }
  return null;
}


export default LaunchpadActions