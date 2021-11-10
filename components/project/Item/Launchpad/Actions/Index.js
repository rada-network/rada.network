import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import WhitelistCountdown from "./WhitelistCountdown";
import SubscribeLaunchpad from "./SubscribeLaunchpad";
import { useState } from "react";
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import ProjectOpening from "./Opening";

const LaunchpadActions = ({project}) => {

  const curentTime = (new Date()).getTime()
  const openTime = (new Date(project.open_date)).getTime()
  const endTime = (new Date(project.end_date)).getTime()
  if (openTime > curentTime){
    return <WhitelistCountdown project={project} />
  }

  if (openTime < curentTime && curentTime < endTime){
    return <SubscribeLaunchpad project={project} />
  }
  return null;
}


export default LaunchpadActions