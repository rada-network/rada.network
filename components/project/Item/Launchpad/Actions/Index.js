import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import { useState } from "react";
// import CountDownLg from "../../../concepts/timers/countdownLg-whitelist";
import ProjectOpening from "./Opening";

const LaunchpadActions = ({project}) => {
  const [countdownDone, setCountdownDone] = useState(Date.parse(project.open_date) < new Date())
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <Timeline step="1" />
            </div>

            <div className="global-padding-lg min-h-full">

              <div className="">
                {
                !countdownDone ? <ProjectCountdown project={project} setCountdownDone={setCountdownDone} />
                :
                  <ProjectOpening project={project} />
                }
              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default LaunchpadActions